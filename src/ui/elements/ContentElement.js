/* eslint-env browser */
/* global SimpleBar, hljs */

import AssignmentElement from "./AssignmentElement.js";

class ContentElement extends AssignmentElement {

    constructor() {
        super(document.querySelector("#content-element-template"));
    }

    render(assignment) {
        super.render();
        let sb = new SimpleBar(this.el);
        this.el.innerHTML = assignment.content;
        hljs.highlightAll();

    }

}

export default ContentElement;