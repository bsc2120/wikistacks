//express box in routes 

var express = require("express")
var router = express.Router()
const user = require('./user.js')
const wiki = require('./wiki.js')
const { Page } = require('../models')

router.use('/wiki', wiki)

router.get("/",function(req,res,next){
	// res.render('index', function(err, html){
	// 	res.send(html)
	// })

	Page.findAll()
		.then(function(pages) {
			res.render('index', {
				pages: pages
			})
		})
})


module.exports = router;




