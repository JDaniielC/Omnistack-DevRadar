module.exports = function StringAsArray(string){
	return string.split(',').map(text => text.trim());
}