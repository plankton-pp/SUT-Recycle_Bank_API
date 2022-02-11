const conn = require('../config/dbConfig')

getProductdetail = (year) => {
    return new Promise(async (resolve, reject) => {             
        if(year = ''){
            try {
                const sql = 
                `SELECT * FROM (SELECT Product_ID,Name FROM product) e 
                LEft JOIN (SELECT date_format(FROM_UNIXTIME(placedetail.Create_Date),'%M %Y') as month,Product_ID as Product_Used,sum(Unit) 
                FROM placedetail GROUP BY Product_ID) f
                ON e.Product_ID = f.Product_Used`;                
                const result = await conn.query(sql);    
                console.log("sql",sql)            
                resolve(result);
            } catch (e) {
                reject(e);
            }
        }else{
            year = '%'.concat(year.concat('%'));
            try {
                const sql = 
                `SELECT * FROM (SELECT Product_ID,Name FROM product) e 
                LEft JOIN (SELECT date_format(FROM_UNIXTIME(placedetail.Create_Date),'%M %Y') as month,Product_ID as Product_Used,sum(Unit) 
                FROM placedetail WHERE YEAR(FROM_UNIXTIME(CREATE_Date)) like ? GROUP BY Product_ID) f ON e.Product_ID = f.Product_Used`;
                const result = await conn.query(sql, [year]);   
                console.log("sql",sql)       
                console.log("year",year)         
                resolve(result);
            } catch (e) {
                reject(e);
            }
        }

        
    });
};

module.exports = {
    getProductdetail,
    
};
