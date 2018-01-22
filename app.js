const morgan = require("morgan");
const express = require("express");
const body_parser = require("body-parser")
const nunjucks = require("nunjucks"); 
const routes = require("./routes")
const db = require('./models').db;

const app = express();

//uses body parser to parse incoming requests
app.use(body_parser.urlencoded({extended: true}));

//this is for nunjucks configuration
const env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);


//this is for static routing 
app.use(express.static("public"))

//links to the routes file 
app.use("/", routes);

db.sync({force:false})
	.then(() => app.listen(1337, () => console.log("listening on port 1337")))


