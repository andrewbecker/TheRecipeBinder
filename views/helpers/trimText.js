module.exports = function(origString) {
	console.log(origString);
  var newString = origString.toString();
  newString = newString.substring(0, 100);
  newString += '...';
  return newString;
}