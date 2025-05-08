import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ["submitElement"];

    submit() {
        if (this.submitElementTarget) {
            this.element.requestSubmit(this.submitElementTarget);
        } else {
            this.element.requestSubmit();
        }
    }
}