const fs = require("fs");

class JSONReader {
    constructor(path) {
        this.path = path;
    }
    read() {
        return JSON.parse(this.readString());
    }
    readString() {
        return fs.readFileSync(this.path, "utf-8");
    }
}

exports.JSONReader = JSONReader;
