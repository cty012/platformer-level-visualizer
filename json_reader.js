const fs = require("fs");
const path = require("path");

class JSONReader {
    constructor(path) {
        this.path = path;
    }

    getFiles() {
        return fs.readdirSync(this.path).filter(file => file.endsWith(".json")).map(file => file.slice(0, -5));
    }

    read(file) {
        return JSON.parse(this.readString(file));
    }

    readString(file) {
        return fs.readFileSync(path.join(this.path, file), "utf-8");
    }
}

exports.JSONReader = JSONReader;
