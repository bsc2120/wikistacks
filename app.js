var morgan = require("morgan");
var express = require("express");
var body_parser = require("body-parser")
var nunjucks = require("nunjucks"); 
const routes = require("./routes")
const db = require('./models').db;



var app = express();
//uses body parser to parse incoming requests
app.use(body_parser.urlencoded({extended: true}));
//this is for nunjucks configuration

var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);


//this is for static routing 
app.use(express.static("public"))

//links to the routes file 
app.use("/", routes);

//db.get('urlTitle')

db.sync({force:false})
	.then(() => app.listen(1337, () => console.log("listening on port 1337")))


