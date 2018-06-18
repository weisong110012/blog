const path = require('path');
const fs=require('fs');
var upload=(cxt,next)=>{
    var filePaths = [];
    const files = cxt.request.files || {};

    for (let key in files) {
        const file = files[key];
        const filePath = path.join(__dirname,'../static/img', file.name);
        const reader = fs.createReadStream(file.path);
        const writer = fs.createWriteStream(filePath);
        reader.pipe(writer);
        filePaths.push(path.join('static/img', file.name))
    }
    var info = {
        "error": 0,
        "url": filePaths[0]
    };
    cxt.response.body=info
}
module.exports=upload