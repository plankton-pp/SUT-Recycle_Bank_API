const conn = require('../config/dbConfig')

getIncomedetail = (year) => {
    return new Promise(async (resolve, reject) => {        
        if(!year){
            try {
                const sql = 
                `SELECT date_format(FROM_UNIXTIME(Create_Date),'%M %Y') as month , sum(Net_Price) AS Bank, sum(Net_Price)*.25 AS Emp, sum(Net_Price)*.75 AS Fund 
                FROM place                  
                GROUP BY Month`;
                const result = await conn.query(sql, [year]);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        }else{
            year = '%'.concat(year.concat('%'));
            try {
                const sql = 
                `SELECT date_format(FROM_UNIXTIME(Create_Date),'%M %Y') as month , sum(Net_Price) AS Bank, sum(Net_Price)*.25 AS Emp, sum(Net_Price)*.75 AS Fund 
                FROM place 
                WHERE YEAR(FROM_UNIXTIME(CREATE_Date)) like ?
                GROUP BY Month`;
                const result = await conn.query(sql, [year]);               
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
