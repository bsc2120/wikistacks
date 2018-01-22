var express = require("express")
var router = express.Router()
const db = require('../models')
const Page = db.Page;
const User = db.User;

router.get('/',function(req,res,next){
	//if(err) return next(err)
	res.redirect('/')
	
})
router.post('/', function(req,res,next){
	//if(err) return next(err)
	//res.send('posting to the /wiki page')
	

	var page = Page.build({
		title: req.body.title,
		name: req.body.name,
		urlTitle: req.body.title,
		content: req.body.content,
		email: req.body.email,
		status: req.body.status

	})

	page.save().then(function(page){
		res.json(page.route);
	})
})

router.get('/add',function(req,res,next){
	//if(err) return next(err) //we dont know whats happening here?!
	//res.send('adder page')
	res.render('addpage')
})
router.get('/:urlTitle',function(req,res,next){
	//res.send('/wiki/'+req.params.urlTitle)

	Page.findOne({
		where:{urlTitle:req.params.urlTitle}
	})
	.then(function(foundpage){
		//res.json(foundpage)
		res.render('wikipage',{
			page:foundpage
		})
	})
	.catch(next)
	
});

module.exports = router 





