/* eslint-env browser */

import AssignmentElement from "./AssignmentElement.js";

function createEntryToTableOfContents(entry) {
    let newEl = document.createElement("li");
    newEl.classList.add("entry");
    newEl.innerHTML = entry.label;
    newEl.setAttribute("data-target-id", entry.id);
    newEl.addEventListener("click", (event) => {
        let targetEl = document.querySelector(`[id="${event.target.getAttribute("data-target-id")}"`);
        targetEl.scrollIntoView({
            behavior: "smooth",
        });
    });
    return newEl;
}

function scrollToTOCHeader() { // For "scroll-to-top"-Button on mobile devices
    document.querySelector(".toc-header").scrollIntoView();
}

class TableOfContents extends AssignmentElement {

    constructor() {
        super(document.querySelector("#toc-element-template"));
        let tocLink = document.querySelector(".toc-link");
        tocLink.addEventListener("click", () => {
            scrollToTOCHeader();
        });
    }

    render(assignment) {
        super.render();
        let tocEl = this.el.querySelector(".toc-list");
        for (let i = 0; i < assignment.toc.length; i++) {
            let newTocEntry = createEntryToTableOfContents(assignment.toc[i]);
            tocEl.append(newTocEntry);
        }
    }

    reset() {
        super.reset();
        let tocLink = document.querySelector(".toc-link");
        tocLink.removeEventListener("click", scrollToTOCHeader);
    }

}


export default TableOfContents;