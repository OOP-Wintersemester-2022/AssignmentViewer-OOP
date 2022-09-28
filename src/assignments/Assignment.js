/* eslint-env browser */

class Assignment {

    constructor(title, author, edit, abstract, content, starter, solution, simpleSolution, advancedSolution, solutionComment, simpleSolutionComment, advancedSolutionComment, solutionAvailableOn, toc) {
        this.title = title;
        this.author = author;
        this.edit = edit;
        this.abstract = abstract;
        this.content = content;
        this.starter = starter;
        this.solution = solution;
        this.simpleSolution = simpleSolution;
        this.advancedSolution = advancedSolution;
        this.solutionComment = solutionComment;
        this.simpleSolutionComment = simpleSolutionComment;
        this.advancedSolutionComment = advancedSolutionComment;
        this.solutionAvailableOn = solutionAvailableOn;
        this.toc = toc;
        Object.freeze(this);
    }

    getFormattedEditDate() {
        return this.edit.toLocaleString();
    }

}

export default Assignment;