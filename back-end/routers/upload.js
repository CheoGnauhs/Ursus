const router = require('express').Router();
const ipfsAPI = require('ipfs-api');
const fs = require('fs')
const multer = require('multer');

var upload = multer({ dest: "uploads/" });
const ipfs = new ipfsAPI('127.0.0.1', '5001');

router.post("/postfile", upload.single('file'), function (req, res) {
    console.log(req.file);
    console.log(req.file.path);
    uploadFile = fs.readFileSync("./" + req.file.path);
    console.log(uploadFile);
    ipfs.files.add(uploadFile, function (err, file) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            console.log(file);
            res.send({ state: "success", file: file });
        }
    })
})

module.exports = router;