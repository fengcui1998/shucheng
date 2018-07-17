var home = require('./mock/home.json');
var dilte = require('./mock/352876.json');
var dataObj = {
    '/api/index': home,
    '/api/dilte': dilte
}
module.exports = function(url) {
    return dataObj[url]
}