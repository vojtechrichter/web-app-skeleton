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
                <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                </svg>
                <span>Loading...</span>
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