const { execSync} = require('child_process'); 
const fs = require('fs');

function preprocess(jsfile) {}

exports.rereq = function(mod) {
    if (fs.existsSync(mod + ".ts")) {
        const cmdout = execSync("node_modules/typescript/bin/tsc --lib es2019 " + mod+".ts");
        console.log("Compiled the typescript module:");
        console.log(cmdout.toString());
    }
    const fullName = require.resolve(mod);
    delete require.cache[fullName];
    return require(mod);
}