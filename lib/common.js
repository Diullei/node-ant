/*!
 * Apache Ant adapter
 * Author: Diullei Gomes
 * Released under the MIT license
 */

var common = { 
	assert: function(validation, message) {
		if(!validation)
			throw new Error(message);
	}
};

exports.common = common;