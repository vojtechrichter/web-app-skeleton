import { Controller } from "@hotwired/stimulus";
import naja from 'naja';

export default class extends Controller {
    static targets = ['redirect'];
    get() {
        let options = {};
        if (this.hasRedirectTarget) {
            options.forceRedirect = true;
        }

        options.history = false;

        naja.makeRequest('GET', this.element.dataset.url, null, options);
    }
}