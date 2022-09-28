/* eslint-env browser */

function inflate(template) {
    let el = document.createElement("div");
    el.innerHTML = template;
    return el.firstChild;
}

class AssignmentElement {

    constructor(templateElement) {
        this.template = templateElement.innerHTML.trim();
        this.el = inflate(this.template);
    }

    appendTo(el) {
        el.append(this.el);
    }

    render(assignment) {
        this.reset();
    }

    show() {
        if (this.el) {
            this.el.classList.remove("hidden");
        }
    }

    hide() {
        this.el.classList.add("hidden");
    }

    reset() {
        let emptyElement = inflate(this.template);
        console.log(emptyElement);
        this.el.replaceWith(emptyElement);
        this.el = emptyElement;
    }

}

export default AssignmentElement;