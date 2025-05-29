import naja from 'naja';

class LoaderExtension {


    constructor(defaultLoadingIndicatorSelector) {
        this.defaultLoadingIndicatorSelector = defaultLoadingIndicatorSelector;
        this.originalContents = new Map();
    }

    initialize(naja) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.defaultLoadingIndicator = document.querySelector(this.defaultLoadingIndicatorSelector);
            });
        } else {
            this.defaultLoadingIndicator = document.querySelector(this.defaultLoadingIndicatorSelector);
        }

        naja.uiHandler.addEventListener('interaction', this.locateLoadingIndicator.bind(this));
        naja.addEventListener('start', this.showLoader.bind(this));
        naja.addEventListener('complete', this.hideLoader.bind(this));
    }

    locateLoadingIndicator(event) {
        const element = event.detail.element;
        const loadingIndicator = element.querySelector(':scope [data-loader]') || element.closest('[data-loader]');

        this.originElement = element;

        if (loadingIndicator) {
            event.detail.options.loadingIndicator = loadingIndicator;
        } else if (element.matches('button, a[data-naja], input[type="submit"]')) {
            this.originalContents.set(element, element.innerHTML);

            const loaderHtml = `
                <div class="inline-flex items-center">
                    <svg class="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading...</span>
                </div>
            `;

            // Replace content with loader
            element.innerHTML = loaderHtml;

            // Disable the element
            if (element instanceof HTMLButtonElement || element instanceof HTMLInputElement) {
                element.disabled = true;
            } else if (element instanceof HTMLAnchorElement) {
                element.style.pointerEvents = 'none';
            }

            event.detail.options.loadingIndicator = element;
        }
    }

    showLoader(event) {
        event.detail.options.loadingIndicator?.classList.remove('hidden');
    }

    hideLoader(event) {
        const element = this.originElement;

        if (this.originalContents.has(element)) {
            element.innerHTML = this.originalContents.get(element);

            // Re-enable the element
            if (element instanceof HTMLButtonElement || element instanceof HTMLInputElement) {
                element.disabled = false;
            } else if (element instanceof HTMLAnchorElement) {
                element.style.pointerEvents = '';
            }

            this.originalContents.delete(element);
        } else {
            event.detail.options.loadingIndicator?.classList.add('hidden');
        }
    }
}

export default LoaderExtension;
