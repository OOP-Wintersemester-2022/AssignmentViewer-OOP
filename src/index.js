/* eslint-env browser */

import FetchAssignmentTask from "./assignments/FetchAssignmentTask.js";
import AssignmentViewer from "./ui/AssignmentViewer.js";

function getParameterFromHash() {
    let hash = location.hash.substring(1),
        organization = hash.split("/")[0],
        repository = hash.split("/")[1];
    if (organization !== undefined && repository !== undefined) {
        return {
            organization: organization,
            repository: repository
        }
    } else {
        throw new Error("No  repository specified by hash parameters!")
    }
}

async function loadAssignment() {
    try {
        let parameter = getParameterFromHash(),
            task = new FetchAssignmentTask(parameter.organization, parameter.repository),
            assignment = await task.run();
        AssignmentViewer.render(assignment);
    } catch (error) {
        // Show error message
        console.error(error);
    }
}

loadAssignment();
// Ensure content is updated when url is changed without reloading website
window.addEventListener("hashchange", loadAssignment);