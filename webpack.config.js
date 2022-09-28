/* eslint-env node */

const path = require("path"),
    ENTRY = "./src/index.js",
    FILE_PATH = "./docs/resources/js/",
    FILE_NAME = "bundle.js";

module.exports = {
    mode: "development",
    entry: ENTRY,
    output: {
        path: path.resolve(__dirname, FILE_PATH),
        filename: FILE_NAME,
    },
};