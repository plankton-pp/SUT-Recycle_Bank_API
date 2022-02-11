const conn = require('../config/dbConfig')



getSumyearperformance = (year) => {
    return new Promise(async (resolve, reject) => {
        if(year != ''){
            try {
                const sql = "SELECT date_format(FROM_UNIXTIME(Create_Date),'%M %Y') as Month, SUM(Unit) as Unit, SUM(Member_Price) as Member_Price, SUM(Bank_Price) as Bank_Price, SUM(Total_Price) as Total_Price FROM placedetail WHERE date_format(FROM_UNIXTIME(Create_Date),'%Y') = ? GROUP BY month";
                const result = await conn.query(sql, [year]);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        }else{
            try {
                const sql = "SELECT date_format(FROM_UNIXTIME(Create_Date),'%M %Y') as Month, SUM(Unit) as Unit, SUM(Member_Price) as Member_Price, SUM(Bank_Price) as Bank_Price, SUM(Total_Price) as Total_Price FROM placedetail WHERE date_format(FROM_UNIXTIME(Create_Date),'%Y') = date_format(curdate(),'%Y') GROUP BY month";
                const result = await conn.query(sql);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        }
    });
};



module.exports = {
    getSumyearperformance,
    
};
