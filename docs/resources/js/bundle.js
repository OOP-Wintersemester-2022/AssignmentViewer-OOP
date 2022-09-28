/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assignments/Assignment.js":
/*!***************************************!*\
  !*** ./src/assignments/Assignment.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* eslint-env browser */\r\n\r\nclass Assignment {\r\n\r\n    constructor(title, author, edit, abstract, content, starter, solution, simpleSolution, advancedSolution, solutionComment, simpleSolutionComment, advancedSolutionComment, solutionAvailableOn, toc) {\r\n        this.title = title;\r\n        this.author = author;\r\n        this.edit = edit;\r\n        this.abstract = abstract;\r\n        this.content = content;\r\n        this.starter = starter;\r\n        this.solution = solution;\r\n        this.simpleSolution = simpleSolution;\r\n        this.advancedSolution = advancedSolution;\r\n        this.solutionComment = solutionComment;\r\n        this.simpleSolutionComment = simpleSolutionComment;\r\n        this.advancedSolutionComment = advancedSolutionComment;\r\n        this.solutionAvailableOn = solutionAvailableOn;\r\n        this.toc = toc;\r\n        Object.freeze(this);\r\n    }\r\n\r\n    getFormattedEditDate() {\r\n        return this.edit.toLocaleString();\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Assignment);\n\n//# sourceURL=webpack://android-assignment-viewer/./src/assignments/Assignment.js?");

/***/ }),

/***/ "./src/assignments/FetchAssignmentTask.js":
/*!************************************************!*\
  !*** ./src/assignments/FetchAssignmentTask.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Assignment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Assignment.js */ \"./src/assignments/Assignment.js\");\n/* eslint-env browser */\r\n/* global showdown */\r\n\r\n\r\n\r\nconst URL_TEMPLATE =\r\n    \"https://raw.githubusercontent.com/$ORGANIZATION/$REPO/main/\",\r\n    DOWNLOAD_URL_TEMPLATE =\r\n    \"https://github.com/$ORGANIZATION/$REPO/archive/refs/heads/\",\r\n    GET_COMMITS_URL_TEMPLATE =\r\n    \"https://api.github.com/repos/$ORGANIZATION/$REPO/commits?sha=main\",\r\n    CONFIG_FILE_NAME = \"assignment.json\",\r\n    README_FILE_NAME = \"README.md\",\r\n    ALTERNATIVE_README_FILE_NAME = \"Readme.md\",\r\n    STARTER_CODE_ARCHIVE = \"starter.zip\",\r\n    SOLUTION_CODE_ARCHIVE = \"solution.zip\",\r\n    SIMPLE_SOLUTION_CODE_ARCHIVE = \"simple-solution.zip\",\r\n    ADVANCED_SOLUTION_CODE_ARCHIVE = \"advanced-solution.zip\",\r\n    markdownConverter = new showdown.Converter();\r\n\r\nfunction createBaseURL(task) {\r\n    return URL_TEMPLATE.replace(\"$ORGANIZATION\", task.organization).replace(\r\n        \"$REPO\", task.repo);\r\n}\r\n\r\nfunction createConfigURL(task) {\r\n    return createBaseURL(task) + CONFIG_FILE_NAME;\r\n}\r\n\r\nfunction createReadmeURL(task) {\r\n    return createBaseURL(task) + README_FILE_NAME;\r\n}\r\n\r\nfunction createAlternativeReadmeURL(task) {\r\n    return createBaseURL(task) + ALTERNATIVE_README_FILE_NAME;\r\n}\r\n\r\n\r\nfunction createBaseDownloadURL(task) {\r\n    return DOWNLOAD_URL_TEMPLATE.replace(\"$ORGANIZATION\", task.organization)\r\n        .replace(\"$REPO\", task.repo);\r\n}\r\n\r\nfunction createStarterCodeDownloadURL(task) {\r\n    return createBaseDownloadURL(task) + STARTER_CODE_ARCHIVE;\r\n}\r\n\r\nfunction createSolutionCodeDownloadURL(task) {\r\n    return createBaseDownloadURL(task) + SOLUTION_CODE_ARCHIVE;\r\n}\r\n\r\nfunction createSimpleSolutionCodeDownloadURL(task) {\r\n    return createBaseDownloadURL(task) + SIMPLE_SOLUTION_CODE_ARCHIVE;\r\n}\r\n\r\nfunction createAdvancedSolutionCodeDownloadURL(task) {\r\n    return createBaseDownloadURL(task) + ADVANCED_SOLUTION_CODE_ARCHIVE;\r\n}\r\n\r\nfunction createCommitsURL(task) {\r\n    return GET_COMMITS_URL_TEMPLATE.replace(\"$ORGANIZATION\", task.organization)\r\n        .replace(\"$REPO\", task.repo);\r\n}\r\n\r\nfunction fixRelativeLinksInHTML(url, html) {\r\n    return html.replaceAll(\"img src=\\\"./\", `img src=\\\"${url}`);\r\n}\r\n\r\nfunction findAndMarkImageDescriptions(html) {\r\n    let tmpEl = document.createElement(\"div\"),\r\n        images;\r\n    tmpEl.innerHTML = html;\r\n    images = tmpEl.querySelectorAll(\"p img\");\r\n    for (let i = 0; i < images.length; i++) {\r\n        let imageLabel = images[i].parentElement.nextElementSibling;\r\n        if (imageLabel !== null) {\r\n            imageLabel.classList.add(\"image-label\");\r\n        }\r\n    }\r\n    return tmpEl.innerHTML;\r\n}\r\n\r\nfunction extractTOC(html) {\r\n    let tmpEl = document.createElement(\"div\"),\r\n        headings, toc = [];\r\n    tmpEl.innerHTML = html;\r\n    toc.push({\r\n        label: \"Start\",\r\n        id: tmpEl.querySelector(\"h1\").id,\r\n    });\r\n    headings = tmpEl.querySelectorAll(\"h2\");\r\n    for (let i = 0; i < headings.length; i++) {\r\n        toc.push({\r\n            label: headings[i].innerHTML,\r\n            id: headings[i].id,\r\n        });\r\n    }\r\n    return toc;\r\n}\r\n\r\nfunction extractLatestCommit(commits) {\r\n    return {\r\n        author: commits[0].commit.author.name,\r\n        date: new Date(commits[0].commit.author.date),\r\n    };\r\n}\r\n\r\nasync function fetchFileAsText(url, alternativeURL) {\r\n    let response = await fetch(url);\r\n    if (response.ok !== true) {\r\n        if (alternativeURL === undefined) {\r\n            throw new Error(`Could not fetch: ${url}`);\r\n        } else {\r\n            let result = await fetchFileAsText(alternativeURL);\r\n            return result;\r\n        }\r\n    } else {\r\n        let result = await response.text();\r\n        return result;\r\n    }\r\n}\r\n\r\nclass FetchAssignmentTask {\r\n\r\n    constructor(organization, repo) {\r\n        this.organization = organization;\r\n        this.repo = repo;\r\n        Object.freeze(this);\r\n    }\r\n\r\n    async run() {\r\n        markdownConverter.setOption(\"disableForced4SpacesIndentedSublists\",\r\n            true);\r\n        markdownConverter.setOption(\"tables\", true);\r\n        try {\r\n            let config = await fetchFileAsText(createConfigURL(this)),\r\n                readme = await fetchFileAsText(createReadmeURL(this), createAlternativeReadmeURL(this)),\r\n                commits = await fetchFileAsText(createCommitsURL(this)),\r\n                configAsObject = JSON.parse(config),\r\n                commitsAsObject = JSON.parse(commits),\r\n                latestCommit = extractLatestCommit(commitsAsObject),\r\n                readmeAsHTML = markdownConverter.makeHtml(readme),\r\n                starterURL = configAsObject.hasStarterCode ?\r\n                createStarterCodeDownloadURL(this) : undefined,\r\n                solutionURL = configAsObject.hasSolutionCode ?\r\n                createSolutionCodeDownloadURL(this) : undefined,\r\n                simpleSolutionURL = configAsObject.hasSimpleSolutionCode ?\r\n                createSimpleSolutionCodeDownloadURL(this) : undefined,\r\n                advancedSolutionURL = configAsObject\r\n                .hasAdvancedSolutionCode ?\r\n                createAdvancedSolutionCodeDownloadURL(this) : undefined,\r\n                solutionComment = configAsObject.solutionComment || \"\",\r\n                simpleSolutionComment = configAsObject\r\n                .simpleSolutionComment || \"\",\r\n                advancedSolutionComment = configAsObject\r\n                .advancedSolutionComment ||\r\n                \"\",\r\n                solutionAvailableOn = configAsObject.solutionAvailableOn,\r\n                toc;\r\n            readmeAsHTML = fixRelativeLinksInHTML(createBaseURL(this),\r\n                readmeAsHTML);\r\n            readmeAsHTML = findAndMarkImageDescriptions(readmeAsHTML);\r\n            toc = extractTOC(readmeAsHTML);\r\n            return new _Assignment_js__WEBPACK_IMPORTED_MODULE_0__.default(configAsObject.title, latestCommit.author,\r\n                latestCommit.date, configAsObject.abstract,\r\n                readmeAsHTML,\r\n                starterURL, solutionURL, simpleSolutionURL,\r\n                advancedSolutionURL,\r\n                solutionComment, simpleSolutionComment,\r\n                advancedSolutionComment,\r\n                solutionAvailableOn, toc);\r\n        } catch (error) {\r\n            console.error(error);\r\n            return undefined;\r\n        }\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FetchAssignmentTask);\n\n//# sourceURL=webpack://android-assignment-viewer/./src/assignments/FetchAssignmentTask.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assignments_FetchAssignmentTask_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assignments/FetchAssignmentTask.js */ \"./src/assignments/FetchAssignmentTask.js\");\n/* harmony import */ var _ui_AssignmentViewer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui/AssignmentViewer.js */ \"./src/ui/AssignmentViewer.js\");\n/* eslint-env browser */\r\n\r\n\r\n\r\n\r\nfunction getParameterFromHash() {\r\n    let hash = location.hash.substring(1),\r\n        organization = hash.split(\"/\")[0],\r\n        repository = hash.split(\"/\")[1];\r\n    if (organization !== undefined && repository !== undefined) {\r\n        return {\r\n            organization: organization,\r\n            repository: repository\r\n        }\r\n    } else {\r\n        throw new Error(\"No  repository specified by hash parameters!\")\r\n    }\r\n}\r\n\r\nasync function loadAssignment() {\r\n    try {\r\n        let parameter = getParameterFromHash(),\r\n            task = new _assignments_FetchAssignmentTask_js__WEBPACK_IMPORTED_MODULE_0__.default(parameter.organization, parameter.repository),\r\n            assignment = await task.run();\r\n        _ui_AssignmentViewer_js__WEBPACK_IMPORTED_MODULE_1__.default.render(assignment);\r\n    } catch (error) {\r\n        // Show error message\r\n        console.error(error);\r\n    }\r\n}\r\n\r\nloadAssignment();\r\n// Ensure content is updated when url is changed without reloading website\r\nwindow.addEventListener(\"hashchange\", loadAssignment);\n\n//# sourceURL=webpack://android-assignment-viewer/./src/index.js?");

/***/ }),

/***/ "./src/ui/AssignmentViewer.js":
/*!************************************!*\
  !*** ./src/ui/AssignmentViewer.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _elements_ContentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements/ContentElement.js */ \"./src/ui/elements/ContentElement.js\");\n/* harmony import */ var _elements_SupportElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements/SupportElement.js */ \"./src/ui/elements/SupportElement.js\");\n/* harmony import */ var _elements_PropertiesElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./elements/PropertiesElement.js */ \"./src/ui/elements/PropertiesElement.js\");\n/* harmony import */ var _elements_TableOfContents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./elements/TableOfContents.js */ \"./src/ui/elements/TableOfContents.js\");\n/* eslint-env browser */\r\n\r\n\r\n\r\n\r\n\r\n\r\nfunction downloadAssignmentAsPDF() {\r\n    window.print();\r\n}\r\n\r\nclass AssignmentViewer {\r\n\r\n    constructor() {\r\n        let assignmentContainer = document.querySelector(\".assignment-container\"),\r\n            leftSidebarElement = document.querySelector(\".sidebar-left\");\r\n        this.contentElement = new _elements_ContentElement_js__WEBPACK_IMPORTED_MODULE_0__.default();\r\n        this.propertiesElement = new _elements_PropertiesElement_js__WEBPACK_IMPORTED_MODULE_2__.default({\r\n            download: downloadAssignmentAsPDF,\r\n        });\r\n        this.supportElement = new _elements_SupportElement_js__WEBPACK_IMPORTED_MODULE_1__.default();\r\n        this.tableOfContents = new _elements_TableOfContents_js__WEBPACK_IMPORTED_MODULE_3__.default();\r\n        this.contentElement.hide();\r\n        this.propertiesElement.hide();\r\n        this.supportElement.hide();\r\n        this.tableOfContents.hide();\r\n        this.contentElement.appendTo(assignmentContainer);\r\n        this.propertiesElement.appendTo(leftSidebarElement);\r\n        this.supportElement.appendTo(leftSidebarElement);\r\n        this.tableOfContents.appendTo(leftSidebarElement);\r\n\r\n    }\r\n\r\n    render(assignment) {\r\n        this.contentElement.render(assignment);\r\n        this.propertiesElement.render(assignment);\r\n        this.supportElement.render(assignment);\r\n        this.tableOfContents.render(assignment);\r\n        this.contentElement.show();\r\n        this.propertiesElement.show();\r\n        this.supportElement.show();\r\n        this.tableOfContents.show();\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new AssignmentViewer());\n\n//# sourceURL=webpack://android-assignment-viewer/./src/ui/AssignmentViewer.js?");

/***/ }),

/***/ "./src/ui/elements/AssignmentElement.js":
/*!**********************************************!*\
  !*** ./src/ui/elements/AssignmentElement.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* eslint-env browser */\r\n\r\nfunction inflate(template) {\r\n    let el = document.createElement(\"div\");\r\n    el.innerHTML = template;\r\n    return el.firstChild;\r\n}\r\n\r\nclass AssignmentElement {\r\n\r\n    constructor(templateElement) {\r\n        this.template = templateElement.innerHTML.trim();\r\n        this.el = inflate(this.template);\r\n    }\r\n\r\n    appendTo(el) {\r\n        el.append(this.el);\r\n    }\r\n\r\n    render(assignment) {\r\n        this.reset();\r\n    }\r\n\r\n    show() {\r\n        if (this.el) {\r\n            this.el.classList.remove(\"hidden\");\r\n        }\r\n    }\r\n\r\n    hide() {\r\n        this.el.classList.add(\"hidden\");\r\n    }\r\n\r\n    reset() {\r\n        let emptyElement = inflate(this.template);\r\n        console.log(emptyElement);\r\n        this.el.replaceWith(emptyElement);\r\n        this.el = emptyElement;\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AssignmentElement);\n\n//# sourceURL=webpack://android-assignment-viewer/./src/ui/elements/AssignmentElement.js?");

/***/ }),

/***/ "./src/ui/elements/ContentElement.js":
/*!*******************************************!*\
  !*** ./src/ui/elements/ContentElement.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _AssignmentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AssignmentElement.js */ \"./src/ui/elements/AssignmentElement.js\");\n/* eslint-env browser */\r\n/* global SimpleBar, hljs */\r\n\r\n\r\n\r\nclass ContentElement extends _AssignmentElement_js__WEBPACK_IMPORTED_MODULE_0__.default {\r\n\r\n    constructor() {\r\n        super(document.querySelector(\"#content-element-template\"));\r\n    }\r\n\r\n    render(assignment) {\r\n        super.render();\r\n        let sb = new SimpleBar(this.el);\r\n        this.el.innerHTML = assignment.content;\r\n        hljs.highlightAll();\r\n\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContentElement);\n\n//# sourceURL=webpack://android-assignment-viewer/./src/ui/elements/ContentElement.js?");

/***/ }),

/***/ "./src/ui/elements/PropertiesElement.js":
/*!**********************************************!*\
  !*** ./src/ui/elements/PropertiesElement.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _AssignmentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AssignmentElement.js */ \"./src/ui/elements/AssignmentElement.js\");\n/* eslint-env browser */\r\n\r\n\r\n\r\nfunction addLink(el, link, label) {\r\n    let linkEl = el.querySelector(\".links\"),\r\n        newLinkEl = document.createElement(\"a\");\r\n    newLinkEl.innerHTML = label;\r\n    newLinkEl.href = link;\r\n    newLinkEl.classList.add(\"download\");\r\n    linkEl.append(newLinkEl);\r\n}\r\n\r\nfunction createLinkElement(link, label) {\r\n    let newLinkEl = document.createElement(\"a\");\r\n    newLinkEl.innerHTML = label;\r\n    newLinkEl.href = link;\r\n    newLinkEl.classList.add(\"download\");\r\n    return newLinkEl;\r\n}\r\n\r\nclass PropertiesElement extends _AssignmentElement_js__WEBPACK_IMPORTED_MODULE_0__.default {\r\n\r\n    constructor(pdfDownloader) {\r\n        super(document.querySelector(\"#properties-element-template\"));\r\n        this.pdfDownloader = pdfDownloader;\r\n    }\r\n\r\n    render(assignment) {\r\n        super.render();\r\n        this.el.querySelector(\".title\").innerHTML = assignment.title;\r\n        this.el.querySelector(\".author\").innerHTML = assignment.author;\r\n        this.el.querySelector(\".edit\").innerHTML = assignment.getFormattedEditDate();\r\n        this.el.querySelector(\".abstract\").innerHTML = assignment.abstract;\r\n        if (assignment.starter !== undefined) {\r\n            this.el.querySelector(\".links\").append(createLinkElement(assignment.starter, \"Startercode\"));\r\n        }\r\n        if (assignment.simpleSolution !== undefined) {\r\n            let solutionAvailableOnDate = Date.parse(assignment.solutionAvailableOn),\r\n                now = new Date();\r\n            if (now >= solutionAvailableOnDate) {\r\n                this.el.querySelector(\".links\").append(createLinkElement(assignment.simpleSolution, \"Einfacher Lösungsvorschlag<span class=\\\"hint\\\">\" + assignment.simpleSolutionComment + \"</a>\"));\r\n            }\r\n        }\r\n        if (assignment.solution !== undefined) {\r\n            let solutionAvailableOnDate = Date.parse(assignment.solutionAvailableOn),\r\n                now = new Date();\r\n            if (now >= solutionAvailableOnDate) {\r\n                this.el.querySelector(\".links\").append(createLinkElement(assignment.solution, \"Lösungsvorschlag<span class=\\\"hint\\\">\" + assignment.solutionComment + \"</a>\"));\r\n            }\r\n        }\r\n        if (assignment.advancedSolution !== undefined) {\r\n            let solutionAvailableOnDate = Date.parse(assignment.solutionAvailableOn),\r\n                now = new Date();\r\n            if (now >= solutionAvailableOnDate) {\r\n                this.el.querySelector(\".links\").append(createLinkElement(assignment.advancedSolution, \"Erweiterter Lösungsvorschlag<span class=\\\"hint\\\">\" + assignment.advancedSolutionComment + \"</a>\"));\r\n            }\r\n        }\r\n\r\n        if (this.el.querySelector(\".links\").childNodes.length === 0) {\r\n            this.el.querySelector(\".links\").previousElementSibling.remove();\r\n        }\r\n        document.querySelector(\".download-pdf\").addEventListener(\"click\", () => this.pdfDownloader.download());\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PropertiesElement);\n\n//# sourceURL=webpack://android-assignment-viewer/./src/ui/elements/PropertiesElement.js?");

/***/ }),

/***/ "./src/ui/elements/SupportElement.js":
/*!*******************************************!*\
  !*** ./src/ui/elements/SupportElement.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _AssignmentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AssignmentElement.js */ \"./src/ui/elements/AssignmentElement.js\");\n/* eslint-env browser */\r\n\r\n\r\n\r\nclass SupportElement extends _AssignmentElement_js__WEBPACK_IMPORTED_MODULE_0__.default {\r\n\r\n    constructor() {\r\n        super(document.querySelector(\"#support-element-template\"));\r\n    }\r\n\r\n    render(assignment) {\r\n        super.render();\r\n    }\r\n\r\n    reset() {\r\n        super.reset();\r\n    }\r\n\r\n}\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SupportElement);\n\n//# sourceURL=webpack://android-assignment-viewer/./src/ui/elements/SupportElement.js?");

/***/ }),

/***/ "./src/ui/elements/TableOfContents.js":
/*!********************************************!*\
  !*** ./src/ui/elements/TableOfContents.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _AssignmentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AssignmentElement.js */ \"./src/ui/elements/AssignmentElement.js\");\n/* eslint-env browser */\r\n\r\n\r\n\r\nfunction createEntryToTableOfContents(entry) {\r\n    let newEl = document.createElement(\"li\");\r\n    newEl.classList.add(\"entry\");\r\n    newEl.innerHTML = entry.label;\r\n    newEl.setAttribute(\"data-target-id\", entry.id);\r\n    newEl.addEventListener(\"click\", (event) => {\r\n        let targetEl = document.querySelector(`[id=\"${event.target.getAttribute(\"data-target-id\")}\"`);\r\n        targetEl.scrollIntoView({\r\n            behavior: \"smooth\",\r\n        });\r\n    });\r\n    return newEl;\r\n}\r\n\r\nfunction scrollToTOCHeader() { // For \"scroll-to-top\"-Button on mobile devices\r\n    document.querySelector(\".toc-header\").scrollIntoView();\r\n}\r\n\r\nclass TableOfContents extends _AssignmentElement_js__WEBPACK_IMPORTED_MODULE_0__.default {\r\n\r\n    constructor() {\r\n        super(document.querySelector(\"#toc-element-template\"));\r\n        let tocLink = document.querySelector(\".toc-link\");\r\n        tocLink.addEventListener(\"click\", () => {\r\n            scrollToTOCHeader();\r\n        });\r\n    }\r\n\r\n    render(assignment) {\r\n        super.render();\r\n        let tocEl = this.el.querySelector(\".toc-list\");\r\n        for (let i = 0; i < assignment.toc.length; i++) {\r\n            let newTocEntry = createEntryToTableOfContents(assignment.toc[i]);\r\n            tocEl.append(newTocEntry);\r\n        }\r\n    }\r\n\r\n    reset() {\r\n        super.reset();\r\n        let tocLink = document.querySelector(\".toc-link\");\r\n        tocLink.removeEventListener(\"click\", scrollToTOCHeader);\r\n    }\r\n\r\n}\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TableOfContents);\n\n//# sourceURL=webpack://android-assignment-viewer/./src/ui/elements/TableOfContents.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;