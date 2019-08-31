const assert = require('assert');

module.exports = function StocksDao(StocksModel) {
    this.create = create;
    this.update = update;
    this.getStockById = getStockById;
    this.getStocks = getStocks;

    async function create(stockData) {
        const stock = new StocksModel(stockData);

        return stock.save();
    }

    async function update(id, stock) {
        const oldStock = await getStockById(id, { writable: true });
        assert(oldStock, 'User not found!');

        Object.keys(stock).forEach(k => {
            oldStock[k] = stock[k];
        });

        oldStock.save();
    }

    async function getStockById(id, { fields, writable = false } = {}) {
        let promise = StocksModel.findOne({ id }, fields)
        !writable && (promise = promise.lean());

        return promise;
    }

    async function getStocks(query = {}, { fields = {}, writable = false } = {}) {
        let promise = StocksModel.find(query, fields)
        !writable && (promise = promise.lean());

        return promise;
    }
}