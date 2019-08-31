const assert = require('assert');

module.exports = function UsersService(stocksDao) {
    this.getStocks = getStocks;

    function getStocks() {
        return stocksDao.getStocks();
    }
}