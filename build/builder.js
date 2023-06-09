const fs = require("fs");
const path = require("path");

const BASE_DIR = "";
const SRC_DIR = "../src";
const LIB_NAME = "mayhemJS.mjs";
const TEMP_FILE_PATH = "./mayhem_temp.js";
const MODULE_FILE_PATH = "./mayhem.js";

const getDirectories = path => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, data) => {
            if(err) {
                console.error("Something went wrong while getting paths for " + path);
                reject(err);
            }
            resolve(data);
        })
    });
}

const writeToBuild = (data) => {
   return new Promise((resolve, reject) => {
       fs.appendFile(path.join(BASE_DIR, LIB_NAME), data, (err, data) => {
           if(err) throw err;
           resolve(true);
       })
   })
}

const createBundled = async(parent, subPar) => {
    for(let name of parent) {
        if(name.endsWith(".js")) {   // all javascript files
            await fs.readFile(path.join(subPar, name), {encoding:"utf-8"}, (err, data) => {
                if(err) throw err;
                writeToBuild(data + "\n\n");
            });
        }
    }
}

const createFile = (name) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path.join(BASE_DIR, LIB_NAME), "", err => {
            if(err) {
                throw err;
            }
            resolve("file created");
        });
    });
}


(async function() {

    // await createFile(TEMP_FILE_PATH);
    // await createFile(MODULE_FILE_PATH);

    const parentDir = await getDirectories(SRC_DIR);

    for(let dir of parentDir) {
        if(!(dir.includes('.')) && dir !== "todo") {

            const _dir = path.join(SRC_DIR, dir);
            let n = await getDirectories(path.join(SRC_DIR, dir));
            n = n.filter(i => i.endsWith(".js")).map(i => path.join(_dir, i));

        }
    }

})()