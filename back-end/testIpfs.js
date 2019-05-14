const Express = require('express');
const ipfsAPI = require('ipfs-api');
const fs = require('fs')

const app = new Express();
const ipfs = new ipfsAPI('127.0.0.1', '5001');

let testFile = fs.readFileSync("../front-end/src/assets/logo.png");

app.get("/addFile", function (req, res) {
    ipfs.files.add(testFile, function (err, file) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(file);
            res.send(file);
        }
    })
});

app.get('/getfile', function(req, res) {
    
    //This hash is returned hash of addFile router.
    const validCID = 'QmbWDpD8K1DnnPaTizA7LQtV2LyNYrw8BZ1kEfKDP3xiNi'

    ipfs.files.get(validCID, function (err, files) {
        files.forEach((file) => {
          console.log(file.path)
        })
      })

})

app.get("/addText", function (req, res) {
    let content = ipfsAPI.Buffer.from("ABC");
    ipfs.add(content).then((response) => {
        console.log(response);
        res.send(response);
    })
})

app.listen(3000, () => { console.log("App is running at port 3000!") });