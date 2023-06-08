const fs = require("fs");
const path = require("path");


const BASE_DIR = "";
const SRC_DIR = "../src";
const LIB_NAME = "mayhemJS.mjs";

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

(async function() {

    await fs.writeFile(path.join(BASE_DIR, LIB_NAME), "", err => {
        if(err) {
            console.error(err);
            console.error("Error While creating the module file");
        }
    });

    const parentDir = await getDirectories(SRC_DIR);

    for(let dir of parentDir) {
        if(!(dir.includes('.')) && dir !== "todo") {

            const _dir = path.join(SRC_DIR, dir);
            let n = await getDirectories(path.join(SRC_DIR, dir));

            for(let src of n) {
                if(src.endsWith(".js")) {
                    const reader = fs.createReadStream(path.join(_dir, src), "utf-8");
                    reader.on("data", function(chunk){
                        let str = chunk.trim();
                        let exc = ["import", "export"]
                        if(!exc.some(i => str.startsWith(i))) {
                            writeToBuild("\n"+chunk);
                        }
                    });
                    reader.on("end", function(chunk) {
                        writeToBuild("\n");
                    })
                }
            }
        }
    }

})()