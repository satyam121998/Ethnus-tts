const express = require('express');
const gtts = require('gtts.js').gTTS;
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render('index.ejs');
});

app.post("/", (req,res) => {
    var text = req.body.text;
    const speech = new gtts(text);
    speech.save("output.mp3")
    .then(function() {
        res.download("output.mp3")
    }).catch(function (err) {
        console.log("err occured ", err);
    })
})

var port  = process.env.PORT || 5000;

app.listen(port, function(){
    console.log(`server is listening on ${port}`);
})

