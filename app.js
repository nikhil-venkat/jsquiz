var express = require('express'),
http = require('http'),
url = require('url'),
mongodb = require('mongodb'),
ObjectID = mongodb.ObjectID,
fs = require('fs'),
app = express();

app.use(express.json());
app.use(express.urlencoded());
app.set('uploadDir', 'assets/files');

//app.use(express.bodyParser({ keepExtensions: true, uploadDir: 'assets/files' }));
//All assets like js/css/image files are loaded from the assets folder
app.use(express.static('assets'));

/**Session configs**/
var MemStore = require('connect/lib/middleware/session/memory');
app.use(express.cookieParser("secretKey"));
app.use(express.session({store:MemStore({
	reapInterval:6000
})}));


//User logins
var users = require('./users');

//firebase 
//var Firebase = require("firebase");

//index page
app.get('/',function(req,res){
	res.sendfile('./views/index.html');
});

app.get('/home',function(req,res){
	res.sendfile('./views/index.html');
});

/**other pages**/
app.get('/views/:page',function(req,res){
	res.sendfile('./views/'+req.params.page);
});

//Login page
app.get('/login',function(req,res){
	res.sendfile('./views/index.html');
});

//check login
app.post('/login',function(req,res){
	if(req.body.logout){
		//loggin user out
		req.session.user = '';
		res.send({'loggedInUser':''});
	}else{
		var user = users.authenticate(req.body.username,req.body.password);
		var redirectTo = {};
		if(user.length !== 0){
			req.session.user = user;
			redirectTo = {
				'page': '/profile'
			};
			redirectTo = JSON.stringify(redirectTo);
			res.writeHead(200, {
				'Content-Type': 'application/json'
			});
			res.end(redirectTo);
		}else{
			redirectTo = {
				'page': '/loginFailed'
			};
			redirectTo = JSON.stringify(redirectTo);
			res.writeHead(200, {
				'Content-Type': 'application/json'
			});
			res.end(redirectTo);
		}
	}

});

app.post('/signup',function(req,res){
	var user = users.signUp(req.body.username,req.body.password);
		var redirectTo = {};
		if(user.length !== 0){
			req.session.user = user;
			redirectTo = {
				'page': '/profile'
			};
			redirectTo = JSON.stringify(redirectTo);
			res.writeHead(200, {
				'Content-Type': 'application/json'
			});
			res.end(redirectTo);
		}else{
			redirectTo = {
				'page': '/loginFailed'
			};
			redirectTo = JSON.stringify(redirectTo);
			res.writeHead(200, {
				'Content-Type': 'application/json'
			});
			res.end(redirectTo);
		}
});

//Login Failed Page
app.get('/loginFailed',function(req,res){
	res.sendfile('./views/loginFailed.html');
	
});

//logout
app.post('/logout',function(req,res){
	req.session.user = '';
	res.send({'loggedInUser':''});
});



//Get loggin in user details
app.get('/getLoggedInUser',function(req,res){
	var user;
	if(req.session.user){
		user = {
			'loggedInUser': req.session.user[0].username};
	}else{
		user = {'loggedInUser': ''};
	}
	res.send(user);
});


app.listen(process.env.VCAP_APP_PORT||3000);
console.log('Launching servers now...');
setTimeout(function(){
	console.log('Server started successfully...');
},1000);
