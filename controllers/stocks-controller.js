
module.exports = (stocksService) => {
    return {
        get_stocks: async (req, res, next) => {
            try {
                const stocks = await stocksService.getStocks();

                res.send({
                    status: 'success',
                    stocks
                });
            } catch (err) {
                res.send({
                    status: 'error',
                    message: err.message
                });
            }
        }
    }
}