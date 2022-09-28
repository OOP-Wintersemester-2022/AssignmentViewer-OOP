/* eslint-env browser */
/* global showdown */

import Assignment from "./Assignment.js";

const URL_TEMPLATE =
    "https://raw.githubusercontent.com/$ORGANIZATION/$REPO/main/",
    DOWNLOAD_URL_TEMPLATE =
    "https://github.com/$ORGANIZATION/$REPO/archive/refs/heads/",
    GET_COMMITS_URL_TEMPLATE =
    "https://api.github.com/repos/$ORGANIZATION/$REPO/commits?sha=main",
    CONFIG_FILE_NAME = "assignment.json",
    README_FILE_NAME = "README.md",
    ALTERNATIVE_README_FILE_NAME = "Readme.md",
    STARTER_CODE_ARCHIVE = "starter.zip",
    SOLUTION_CODE_ARCHIVE = "solution.zip",
    SIMPLE_SOLUTION_CODE_ARCHIVE = "simple-solution.zip",
    ADVANCED_SOLUTION_CODE_ARCHIVE = "advanced-solution.zip",
    markdownConverter = new showdown.Converter();

function createBaseURL(task) {
    return URL_TEMPLATE.replace("$ORGANIZATION", task.organization).replace(
        "$REPO", task.repo);
}

function createConfigURL(task) {
    return createBaseURL(task) + CONFIG_FILE_NAME;
}

function createReadmeURL(task) {
    return createBaseURL(task) + README_FILE_NAME;
}

function createAlternativeReadmeURL(task) {
    return createBaseURL(task) + ALTERNATIVE_README_FILE_NAME;
}


function createBaseDownloadURL(task) {
    return DOWNLOAD_URL_TEMPLATE.replace("$ORGANIZATION", task.organization)
        .replace("$REPO", task.repo);
}

function createStarterCodeDownloadURL(task) {
    return createBaseDownloadURL(task) + STARTER_CODE_ARCHIVE;
}

function createSolutionCodeDownloadURL(task) {
    return createBaseDownloadURL(task) + SOLUTION_CODE_ARCHIVE;
}

function createSimpleSolutionCodeDownloadURL(task) {
    return createBaseDownloadURL(task) + SIMPLE_SOLUTION_CODE_ARCHIVE;
}

function createAdvancedSolutionCodeDownloadURL(task) {
    return createBaseDownloadURL(task) + ADVANCED_SOLUTION_CODE_ARCHIVE;
}

function createCommitsURL(task) {
    return GET_COMMITS_URL_TEMPLATE.replace("$ORGANIZATION", task.organization)
        .replace("$REPO", task.repo);
}

function fixRelativeLinksInHTML(url, html) {
    return html.replaceAll("img src=\"./", `img src=\"${url}`);
}

function findAndMarkImageDescriptions(html) {
    let tmpEl = document.createElement("div"),
        images;
    tmpEl.innerHTML = html;
    images = tmpEl.querySelectorAll("p img");
    for (let i = 0; i < images.length; i++) {
        let imageLabel = images[i].parentElement.nextElementSibling;
        if (imageLabel !== null) {
            imageLabel.classList.add("image-label");
        }
    }
    return tmpEl.innerHTML;
}

function extractTOC(html) {
    let tmpEl = document.createElement("div"),
        headings, toc = [];
    tmpEl.innerHTML = html;
    toc.push({
        label: "Start",
        id: tmpEl.querySelector("h1").id,
    });
    headings = tmpEl.querySelectorAll("h2");
    for (let i = 0; i < headings.length; i++) {
        toc.push({
            label: headings[i].innerHTML,
            id: headings[i].id,
        });
    }
    return toc;
}

function extractLatestCommit(commits) {
    return {
        author: commits[0].commit.author.name,
        date: new Date(commits[0].commit.author.date),
    };
}

async function fetchFileAsText(url, alternativeURL) {
    let response = await fetch(url);
    if (response.ok !== true) {
        if (alternativeURL === undefined) {
            throw new Error(`Could not fetch: ${url}`);
        } else {
            let result = await fetchFileAsText(alternativeURL);
            return result;
        }
    } else {
        let result = await response.text();
        return result;
    }
}

class FetchAssignmentTask {

    constructor(organization, repo) {
        this.organization = organization;
        this.repo = repo;
        Object.freeze(this);
    }

    async run() {
        markdownConverter.setOption("disableForced4SpacesIndentedSublists",
            true);
        markdownConverter.setOption("tables", true);
        try {
            let config = await fetchFileAsText(createConfigURL(this)),
                readme = await fetchFileAsText(createReadmeURL(this), createAlternativeReadmeURL(this)),
                commits = await fetchFileAsText(createCommitsURL(this)),
                configAsObject = JSON.parse(config),
                commitsAsObject = JSON.parse(commits),
                latestCommit = extractLatestCommit(commitsAsObject),
                readmeAsHTML = markdownConverter.makeHtml(readme),
                starterURL = configAsObject.hasStarterCode ?
                createStarterCodeDownloadURL(this) : undefined,
                solutionURL = configAsObject.hasSolutionCode ?
                createSolutionCodeDownloadURL(this) : undefined,
                simpleSolutionURL = configAsObject.hasSimpleSolutionCode ?
                createSimpleSolutionCodeDownloadURL(this) : undefined,
                advancedSolutionURL = configAsObject
                .hasAdvancedSolutionCode ?
                createAdvancedSolutionCodeDownloadURL(this) : undefined,
                solutionComment = configAsObject.solutionComment || "",
                simpleSolutionComment = configAsObject
                .simpleSolutionComment || "",
                advancedSolutionComment = configAsObject
                .advancedSolutionComment ||
                "",
                solutionAvailableOn = configAsObject.solutionAvailableOn,
                toc;
            readmeAsHTML = fixRelativeLinksInHTML(createBaseURL(this),
                readmeAsHTML);
            readmeAsHTML = findAndMarkImageDescriptions(readmeAsHTML);
            toc = extractTOC(readmeAsHTML);
            return new Assignment(configAsObject.title, latestCommit.author,
                latestCommit.date, configAsObject.abstract,
                readmeAsHTML,
                starterURL, solutionURL, simpleSolutionURL,
                advancedSolutionURL,
                solutionComment, simpleSolutionComment,
                advancedSolutionComment,
                solutionAvailableOn, toc);
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

}

export default FetchAssignmentTask;