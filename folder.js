let getFiles = function(folder){

const fs = require("fs");
let filesFolder = [];

fs.readdirSync(folder).forEach((file) =>{
        
        filesFolder.push(file);
});
return filesFolder;


};
module.exports.getFiles = getFiles;