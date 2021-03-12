module.exports = function StringAsArray(arrayAsString){
        return arrayAsString.split(',').map(text => text.trim());
}