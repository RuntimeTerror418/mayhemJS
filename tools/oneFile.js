/**
 * NODE JS
 * This tool is used to put together all the compiled
 * typescript source code as a one file inside the build folder
 *
 * @author RuntimeTerror 418
 */
const fs = require("fs");
const path = require("path");

const SRC_DIR = "../src";
const MODULE_FILE_PATH = "../build/mayhem.js";

(async function() {

    const pFileDir = await getDirectories(SRC_DIR);
    const JS_FILE_PROMISE = [];

    /**
     * Read all the Compiled JS Source in the ../src folder
     * and push them as a promise into the JS_FILE_PROMISE array
     */
    for(let dir of pFileDir) {
        if(!dir.includes(".")) {
            let currDir = path.join(SRC_DIR, dir);
            const subdir = await getDirectories(currDir);
            for(let dir of subdir) {
                if(dir.endsWith(".js")) {
                    const filePath = path.join(currDir, dir);
                    JS_FILE_PROMISE.push(getFile(filePath));
                }
            }
        }
    }

    // first clear module paths
    fs.writeFileSync(MODULE_FILE_PATH, "", {encoding:"utf-8"});

    await Promise.all(JS_FILE_PROMISE)
        .then(e => {
            for(let file of e) {
                const splitted = file.split("\n");
                for(let line of splitted) {
                    const trimmed = line.trim();
                    if(!trimmed.startsWith("//") && !trimmed.startsWith("import")) {
                        fs.appendFileSync(MODULE_FILE_PATH, line, {encoding:"utf-8"});
                    }
                }
            }
        });

    console.log("Build Successful");

})();


function getDirectories (path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, {encoding: "utf-8"}, (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    });
}

function getFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, {encoding: "utf-8"}, (err, data) => {
            if(err) reject(err);
            resolve(data);
        })
    })
}