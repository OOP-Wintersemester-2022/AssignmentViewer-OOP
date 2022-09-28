/* eslint-env node */

const express = require("express"),
    http = require("http");
var app, server;

class AppServer {
    constructor(appDir) {
        app = express();
        // Static serving client code
        app.use("/app", express.static(appDir));
    }

    start(port) {
        server = http.createServer(app);
        server.listen(port);
        return server;
    }

    /**
     * Stops running express server
     */
    stop() {
        if (this.server === undefined) {
            return;
        }
        this.server.close();
    }
}

/**
 * Starts webserver to test application
 */

(new AppServer("docs")).start(8000);