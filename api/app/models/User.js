
//app/models/user.js
//load the things we need
var mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator')
 ObjectId = mongoose.Types.ObjectId

//define the schema for our user model
var UserSchema = mongoose.Schema({	
	firstName:{type:String, required: [true, 'First name is required']},
	lastName:{type:String, required: [true, 'Last name is required']},
	//email:{type:String, required: true},
	email: { type: String,rrequired: [true, 'Email id is required']
	/*validate: function(email) {
      return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    },unique: true */},
	password:{type:String, rrequired:  [true, 'Password is required']},
   created_date:{ type: Date, required: true, default: Date.now }
});

//UserSchema.plugin(uniqueValidator,{ message: 'Error, expected {PATH} to be unique.' });

//create the model for users and expose it to our app
module.exports = mongoose.model('users', UserSchema);