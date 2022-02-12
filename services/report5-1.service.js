const conn = require('../config/dbConfig')



getSumyearperformance = (year) => {
    return new Promise(async (resolve, reject) => {
        if(year != ''){
            try {
                const sql = 
                `SELECT 
                DATE_FORMAT(DATE_ADD(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'), INTERVAL 543 YEAR),'%b %Y') as Month, 
                SUM(Unit) as Unit, 
                SUM(Member_Price) as Member_Price, 
                SUM(Bank_Price) as Bank_Price, 
                SUM(Total_Price) as Total_Price 
                FROM placedetail 
                WHERE IF(
                MONTH(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'))>9
                ,YEAR(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'))+1
                ,YEAR(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'))
                ) + 543 = ?
                GROUP BY Month`;
                const result = await conn.query(sql, [year]);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        }else{
            try {
                const sql = 
                `SELECT 
                DATE_FORMAT(DATE_ADD(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'), INTERVAL 543 YEAR),'%b %Y') as Month, 
                SUM(Unit) as Unit, 
                SUM(Member_Price) as Member_Price, 
                SUM(Bank_Price) as Bank_Price, 
                SUM(Total_Price) as Total_Price 
                FROM placedetail 
                WHERE IF(
                	MONTH(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'))>9
                	,YEAR(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'))+1
               		,YEAR(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'))
                ) + 543 
                = 
                IF(
                    MONTH(date_format(NOW(),'%Y-%m-%d'))>9
                    ,YEAR(date_format(NOW(),'%Y-%m-%d'))+1
                    ,YEAR(date_format(NOW(),'%Y-%m-%d'))
                    ) + 543
                GROUP BY Month`;
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
