const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const explore = require('./models/explore')


app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));


const methodOverride = require("method-override")

app.use(methodOverride("_method"))


app.get('/index', (req,res) => {
res.render('index.ejs', {explore:explore})
});

app.get("/show/:index", (req, res) => {
  res.render("show.ejs", { explore: explore[req.params.index] });
});
app.get('/new', (req,res) => {
    res.render('new.ejs')
});

app.get('/edit/:index', (req,res) => {

    res.render('edit.ejs',
     {explore : explore[req.params.index], 
    index: req.params.index}

    )
});

app.put('/edit/:index', (req,res) => {
    explore[req.params.index] = req.body;
    res.redirect('/index')
})

app.delete("/index/:index", (req,res) => {
explore.splice(req.params.index,1)
res.redirect('/index')
});

app.post('/index', (req,res) => {
 explore.push(req.body)
 console.log(explore)
 res.redirect('/index')
})


app.listen(3000, () =>{
    console.log('app is running on port 3000')
})