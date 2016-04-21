module.exports = {
	trimString: function(origString) {
		var newString = '';
		if origString.length > 0 {
  			newString = origString.toString();
  			newString = newString.substring(0, 100);
  			newString += '...';
  		}
  		return newString;
  	}
}