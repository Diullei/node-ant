/*!
 * Apache Ant adapter
 * Author: Diullei Gomes
 * Released under the MIT license
 */

// helper
function verifyThrow(msssage){ return function(err) { return err.message === msssage; } };

/************************************************
 * spy to access privete members of jxon to test
*************************************************/
var spy_jxon = {};

var common = require('../lib/common');

var fake_require = function(){return common;};
var script = '(function(require){'
				+ fs.readFileSync('../lib/jxon.js', "utf-8")
				+ 'spy_jxon.toXML = toXML;'
				+ 'spy_jxon.startsWith = startsWith;'
				+ 'spy_jxon.isAttribute = isAttribute;'
				+ 'spy_jxon.escapeHtml = escapeHtml;'
				+ 'spy_jxon.normalizeValue = normalizeValue;'
				+ 'spy_jxon.wrapTag = wrapTag;'
			+ '})(fake_require)';
eval(script);
// *****************************************

var jxon = spy_jxon;

module('jxon module');

test('wrapTag(...) function', function(){
	// TODO:
});

test('escapeHtml(...) function', function(){
	equal(jxon.escapeHtml('html & html'), 'html &amp; html', "having 'html & html' must return 'html &amp; html'");
	equal(jxon.escapeHtml('<html'), '&lt;html', "having '<html' must return '&lt;html'");
	equal(jxon.escapeHtml('html>'), 'html&gt;', "having 'html>' must return 'html&gt;'");
	equal(jxon.escapeHtml("'html'"), '&#39;html&#39;', "having 'html' must return &#39;html&#39;");
	equal(jxon.escapeHtml('"html"'), '&quot;html&quot;', 'having "html" must return &quot;html&quot;');
});

test('normalizeValue(...) function', function(){
	equal(jxon.escapeHtml('<test>&value: "test" & \'test\'</test>'), 
		'&lt;test&gt;&amp;value: &quot;test&quot; &amp; &#39;test&#39;&lt;/test&gt;', 
		'having: "<test>&value: "test" & \'test\'</test>" must return: "&lt;test&gt;&amp;value: &quot;test&quot; &amp; &#39;test&#39;&lt;/test&gt;"');
});

test('startsWith(...) function', function(){
	ok(jxon.startsWith(null, null), "must be true to (null, null) arguments");
	ok(jxon.startsWith('@test', '@'), "must be true to ('@test', '@') arguments");
	ok(!jxon.startsWith('@test', '#'), "must be false to ('@test', '#') arguments");
});

test("isAttribute(...) function", function(){
	ok(jxon.isAttribute('@test'), "having '@teste' must be true");
	ok(!jxon.isAttribute('test'), "having 'teste' must be true");
});

test("toXML(...) function", function(){
	raises(function() { jxon.toXML(); }, 
		verifyThrow("missing arg: 'obj'"),
		"must throw error message: 'missing arg: obj' when 'obj' argument is null");

	raises(function() { jxon.toXML(undefined); }, 
		verifyThrow("missing arg: 'obj'"),
		"must throw error message: 'missing arg: obj' when 'obj' argument is undefined");

	raises(function() { jxon.toXML({}); }, 
		verifyThrow("argument 'obj' must have properties"),
		"must throw error message: argument 'obj' must have properties");

	raises(function() { jxon.toXML({a: 'a'}, {}); }, 
		verifyThrow("arg 'nodeName' must be a string"),
		"'nodeName' argument must be a string");

	raises(function() { jxon.toXML({'@a': 'a'}); }, 
		verifyThrow("attribute can only be set on node"),
		"set attribute to a non node object");
	
	equal(jxon.toXML({a: 'a', b: 'b'}), '<a>a</a>\n<b>b</b>', "having arg obj as: {a: 'a', b: 'b'} must return: <a>a</a><b>b</b>");
});
