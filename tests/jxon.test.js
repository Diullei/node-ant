var jxon = require('../lib/jxon');

module('jxon: toXML function');

test("first argument 'obj' can't be null", function(){
	raises(function() {
		jxon.toXML();
	}, 
	function(err) {
		return err.message === "missing arg: 'obj'";
	},
	"must throw error message: 'missing arg: obj' when 'obj' argument is null");

	raises(function() {
		jxon.toXML(undefined);
	}, 
	function(err) {
		return err.message === "missing arg: 'obj'";
	},
	"must throw error message: 'missing arg: obj' when 'obj' argument is undefined");
});

test("first argument 'obj' must have properties", function(){
	raises(function() {
		jxon.toXML({});
	}, 
	function(err) {
		return err.message === "argument 'obj' must have properties";
	},
	"must throw error message: argument 'obj' must have properties");
});

