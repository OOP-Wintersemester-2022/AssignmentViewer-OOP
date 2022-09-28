/* eslint-env browser */

import AssignmentElement from "./AssignmentElement.js";

class SupportElement extends AssignmentElement {

    constructor() {
        super(document.querySelector("#support-element-template"));
    }

    render(assignment) {
        super.render();
    }

    reset() {
        super.reset();
    }

}


export default SupportElement;