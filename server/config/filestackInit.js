const filestack = require('filestack-js')

exports.initialize = function(){
	filestack.init(process.env.FILESTACK_KEY);
}
