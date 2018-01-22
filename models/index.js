const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
	logging: false
})

const Page = db.define('page', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	urlTitle: {
		type: Sequelize.STRING,
		allowNull: false
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	status: {type: Sequelize.ENUM('open', 'closed')},
	date: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
//  ANOTHER WAY TO WRITE THE GETTER METHOD	
//  routes: {
//      type: Sequelize.VIRTUAL,
//      get() {
//		  return '/wiki/' + this.urlTitle;
//	    }
//  }
}, {
	getterMethods:{
			routes: function(){
			return '/wiki/' + this.urlTitle;
		}
	},
	hooks:{
		beforeValidate: function(page){
			if(page.urlTitle){
				//replaces spaces with underline && checks to make sure the title contains only alphanumeric characters 
				page.urlTitle=page.urlTitle.replace(/\s+/g, '_').replace(/\W/g,'')
			}else{
				page.urlTitle= Math.random().toString(36).slice(2,7)
					
			}
		}
	}
})

//ANOTHER WAY TO WRITE HOOK
// Page.hook('beforeValidate', function(page){
// 	if (page.urlTitle) {
// 		page.urlTitle=page.urlTitle.replace(/\s+/g, '_').replace(/\W/g,'')
// 	} else {
// 		page.urlTitle= Math.random().toString(36).slice(2,7)
// 	}
// })

const User = db.define('user',{
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}, 
	email: {
		type: Sequelize.STRING,
		validate:{
			isEmail: true
		}, 
		allowNull: false
	}
})



module.exports = {db,Page,User}





