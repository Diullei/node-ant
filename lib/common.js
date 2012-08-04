/*!
 * Apache Ant adapter
 * Version: 0.1.0 (2012/08/04)
 * Author: Diullei Gomes
 * Released under the MIT license
 */

var common = { 
	VERSION: '0.2.0',
	assert: function(validation, message) {
		if(!validation)
			throw new Error(message);
	}
};

exports.common = common;