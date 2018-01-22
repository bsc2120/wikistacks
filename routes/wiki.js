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

	var page = Page.build({
		title: req.body.title,
		name: req.body.name,
		urlTitle: req.body.title,
		content: req.body.content,
		email: req.body.email,
		status: req.body.status

	})

	page.save()
	.then(function(page){
		console.log(page)
		res.redirect(page.route);
	})
})


router.get('/add',function(req,res,next){
	//if(err) return next(err) //we dont know whats happening here?!
	res.render('addpage')
})

//anything hardcoded need to be BEFORE anything dynamic
router.get('/:urlTitle',function(req,res,next){
	Page.findOne({
		where:{urlTitle: req.params.urlTitle}
	})
	.then(function(foundPage){
		// res.json(foundpage)
		res.render('wikipage', {
			page: foundPage
		})
	})
	.catch(next)
	
});

module.exports = router 





