const conn = require('../config/dbConfig')

getProductsAndPrice = () => {
    return new Promise(async (resolve, reject) => {

            try {
                const sql = "SELECT Product_ID, Name, Detail, ROUND((Price_per_unit*10)/100, 2) as bankprice,ROUND(Price_per_unit-(Price_per_unit*10)/100, 2) as userprice ,Price_per_unit as price FROM `product`";
                const result = await conn.query(sql);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        
    });
};

module.exports = {
    getProductsAndPrice,
    
};
