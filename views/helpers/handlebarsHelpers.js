module.exports = {
	trimString: function(origString) {
		var newString = '';
		if (origString) {
			newString = origString.toString();
  			newString = newString.substring(0, 100);
  			newString += '...';
  		}
  		return newString;
  	}
}