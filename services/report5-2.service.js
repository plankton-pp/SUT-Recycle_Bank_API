const conn = require('../config/dbConfig')

getIncomedetail = (year) => {
    return new Promise(async (resolve, reject) => {        
        if(String(year).length > 0){
            // year = '%'.concat(year.concat('%'));
            try {
                const sql = 
                `SELECT DATE_FORMAT(DATE_ADD(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'), INTERVAL 543 YEAR),'%b %Y') as MonthYear , sum(Bank_Price) AS Bank, sum(Bank_Price)*.25 AS Emp, sum(Bank_Price)*.75 AS Fund 
                FROM placedetail 
                WHERE IF(
                    MONTH(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'))>9
                    ,YEAR(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'))+1
                    ,YEAR(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'))
                    ) + 543 = ?
                GROUP BY MonthYear`;
                const result = await conn.query(sql, [year]);             
                resolve(result);
            } catch (e) {
                reject(e);
            }            
        }else{
            try {
                const sql = 
                `SELECT DATE_FORMAT(DATE_ADD(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'), INTERVAL 543 YEAR),'%b %Y') as MonthYear , sum(Bank_Price) AS Bank, sum(Bank_Price)*.25 AS Emp, sum(Bank_Price)*.75 AS Fund 
                FROM placedetail   
                WHERE
                IF(
                    MONTH(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'))>9
                    ,YEAR(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'))+1
                    ,YEAR(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'))
                    ) + 543 = IF(
                        MONTH(date_format(NOW(),'%Y-%m-%d'))>9
                        ,YEAR(date_format(NOW(),'%Y-%m-%d'))+1
                        ,YEAR(date_format(NOW(),'%Y-%m-%d'))
                        ) + 543               
                GROUP BY MonthYear`;
                const result = await conn.query(sql);
                resolve(result);
            } catch (e) {
                reject(e);
            }            
        }

        
    });
};

module.exports = {
    getIncomedetail,
    
};
