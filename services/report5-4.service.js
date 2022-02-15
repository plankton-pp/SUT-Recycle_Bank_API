const conn = require('../config/dbConfig')

getProductdetail = (year) => {
    return new Promise(async (resolve, reject) => {             
        if(String(year).length > 0){
                // year = '%'.concat(year.concat('%'));
                try {
                    const sql = 
                    `SELECT DATE_FORMAT(DATE_ADD(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'), INTERVAL 543 YEAR),'%b %Y') as Month, Role ,sum(Unit) as Unit
                    FROM members 
                    LEft JOIN placedetail
                    ON members.ID = placedetail.Member_ID
                    WHERE IF(
                    MONTH(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'))>9
                    ,YEAR(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'))+1
                    ,YEAR(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'))
                    ) + 543 = ?
                    GROUP by Role,month`;
                    const result = await conn.query(sql, [year]);   
                    console.log("sql",sql)       
                    console.log("year",year)         
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
        }else{
            try {
                const sql = 
                `SELECT DATE_FORMAT(DATE_ADD(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'), INTERVAL 543 YEAR),'%b %Y') as Month, Role ,sum(Unit) as Unit
                FROM members 
                LEft JOIN placedetail
                ON members.ID = placedetail.Member_ID
                WHERE IF(
                MONTH(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'))>9
                ,YEAR(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'))+1
                ,YEAR(date_format(FROM_UNIXTIME(Create_Date),'%Y-%m-%d'))
                ) + 543 = IF(
                MONTH(date_format(NOW(),'%Y-%m-%d'))>9
                ,YEAR(date_format(NOW(),'%Y-%m-%d'))+1
                ,YEAR(date_format(NOW(),'%Y-%m-%d'))
                ) + 543
                GROUP by Role,month`;                
                const result = await conn.query(sql);    
                console.log("sql",sql)            
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
