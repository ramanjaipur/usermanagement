'use strict';
var User       = require('../models/User');


/*save user api*/
exports.saveuser = function(req, res,next) 
{	 
	var UserModel = new User(req.body);
	UserModel.save(function(err, User) 
	{
        if(err) 
        {
      		if (err.errors)
      		{
   			 	const error = {};
    			const keys = Object.keys(err.errors);
    			keys.forEach((key) => {
        		let message = err.errors[key].message;

	            if (err.errors[key].properties && err.errors[key].properties.message) 
	            {
	                message = err.errors[key].properties.message.replace('`{PATH}`', key);

	            }
	             message = message.replace('Path ', '').replace(key,'').trim();
	             //message = key+' '+message;
				 message = message;
	             error[key] = message;
       		 });

		        res.status(400);
	            res.json({
	                type: true,
	                data:error
	            });
	         }
        } else {
        	res.status(201);
            res.json({
                type: false,
				message :"you have successfully registered with us. Please login and enjoy the service",	
                data: User
            });
        }
    });

}

/*login api*/
exports.login = function(req, res,next) 
{	 
if(req.body == null || req.body.email ==null)
	{
		res.status(400);
	     res.json({
	        type: true,
	        data:"Post id is required"
	      });
	}
	else 
	if(req.body == null || req.body.password ==null)
	{

		res.status(400);
	     res.json({
	        type: true,
	        data:"Post id is required"
	      });
	}
	else
	{
		User.findOne({email:req.body.email,password:req.body.password}).exec(function(err, user) 
		{
			if(err) 
			{
				 res.status(400);
					res.json({
						type: true,
						data:err,
						message :"Something went wrong. Please try again",	
					});
			} else {
				res.status(200);
				
				if(user)
				{
					var logmessage = "you have successfully logged";
				}
				else
				{
						var logmessage = "Invalid username and password";
				}
				res.json({
					type: false,
					data: user,
					message : logmessage
					
				});
			}
		});
	}

}


/*userlist api*/
exports.userlist = function(req, res,next) 
{	 

		User.find({}).sort({created:-1}).exec(function(err, user)
		{
			if(err) 
			{
				 res.status(400);
					res.json({
						type: true,
						data:err,
						message :"Something went wrong. Please try again",	
					});
			} else {
				res.status(200);
				
				
			var logmessage = "Successfully Display user list";
				
				res.json({
					type: false,
					data: user,
					message : logmessage
					
				});
			}
		});
	
}



/*list post api*/
exports.postlist = function(req, res,next) 
{	 
	Post.find({}).sort({created_date: -1}).exec(function(err, post) 
	{
        if(err) 
        {
   			 res.status(400);
	            res.json({
	                type: false,
	                data:err
	            });
        } else {
        	res.status(200);
            res.json({
                type: true,
                data: post
            });
        }
    });

}

/*delete content*/
exports.deletepost = function(req, res,next) 
{	 
	if(req.body == null || req.body.id ==null)
	{

		res.status(400);
	     res.json({
	        type: false,
	        data:"Post id is required"
	      });
	}
	else 
	{
		var id = new Object(req.body.id);
		Post.findByIdAndRemove(id,function(err, post) 
		{
	        if(err) 
	        {
	   			 res.status(400);
		            res.json({
		                type: false,
		                data:err
		            });
	        } else {
	        	if(post==null)
	        	{
					res.status(400);
		            res.json({
		                type: true,
		                message :"Post id is worng"
		            });
	        	}else
	        	{
	        	res.status(200);
	            res.json({
	                type: true,
	                message :"you have successfully delete"
	            });
	        	}
	        	
	        }
	    });

	}
}

/*delete content*/
exports.updatepost = function(req, res,next) 
{	 
	if(req.body == null || req.body.id ==null)
	{

		res.status(400);
	     res.json({
	        type: false,
	        data:"User id is required"
	      });
	}else 
	if(req.body.title == null || req.body.content ==null)
	{

		res.status(400);
	     res.json({
	        type: false,
	        data:"title and content is required"
	      });
	}
	else 
	{
		Post.findByIdAndUpdate(req.body.id,{$set:req.body},{new: true},function(err, post) 
		{
	        if(err) 
	        {
	        	console.log(err);
	   			 res.status(400);
		            res.json({
		                type: false,
		                data:err
		            });
	        } else {
	        	if(post==null)
	        	{
					res.status(400);
		            res.json({
		                type: true,
		                message :"Post id is worng"
		            });
	        	}else
	        	{
	        	res.status(200);
	            res.json({
	                type: true,
	                message :"you have successfully update",
	                data : post
	            });
	        	}
	        	
	        }
	    });

	}
}