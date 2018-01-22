//express box in routes 

var express = require("express")
var router = express.Router()
const user = require('./user.js')
const wiki = require('./wiki.js')


router.use('/wiki', wiki)
router.get("/",function(req,res,next){
	//res.send("hello")
	res.render('index',function(err,html){
		res.send(html)
	})
	//res.sendFile('../views/index.html')
	
})

module.exports = router;




