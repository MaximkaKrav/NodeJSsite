const express = require("express");
const app = express();
const hbs = require("hbs");
const multer = require("multer");
const upload = multer({
    dest: "uploadFiles"
});
const folder = require("./folder");
const {
    link
} = require("fs");
const storageConf = multer.diskStorage({
    destination: (reg, file, cb) => {
        cb(null, "uploadFiles")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partical");

app.use(express.static(__dirname));
app.use(multer({
    storage: storageConf
}).single("filedate"));
app.get("/", function(require, response) {
    let links = folder.getFiles("./uploadFiles/");
    response.render("index", {
        title: "Main page",
        description: " Вывод хранимых файлов",
        links: links,
    });
});
app.get("/upload", function(require, response) {
    response.render("upload", {
        title: "Загрузка",
        buttonName: "Загрузить файл"
    });
});

app.post("/upload", upload.single("filedate"), function(require, response, next) {
    let filedata = request.file;
    if (!filedata) res.send("error")
    else response.render("upload", {
        title: "Загрузка файлов",
        buttonName: "Загрузить файл"
    })
})



app.listen(4000, function() {
    console.log("Server start");
});