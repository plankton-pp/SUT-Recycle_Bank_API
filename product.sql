-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2022 at 08:44 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `Product_ID` int(11) NOT NULL,
  `Type_ID` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Detail` varchar(45) NOT NULL,
  `Price_per_unit` float NOT NULL,
  `Unit_Detail` varchar(45) NOT NULL,
  `Fee_ID` int(11) NOT NULL,
  `Update_Date` varchar(45) NOT NULL,
  `Update_By` int(11) NOT NULL,
  `Create_Date` varchar(45) NOT NULL,
  `Create_By` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`Product_ID`, `Type_ID`, `Name`, `Detail`, `Price_per_unit`, `Unit_Detail`, `Fee_ID`, `Update_Date`, `Update_By`, `Create_Date`, `Create_By`) VALUES
(1, 1, 'กระดาษขาว-ดำ', 'กระดาษขาวที่ใช้แล้ว', 6.5, 'kg', 15, '', 0, '1643274601', 0),
(2, 1, 'หนังสือเก่า', 'หนังสือเรียน นิตยสาร', 3.5, 'kg', 15, '', 0, '1643274620', 0),
(3, 1, 'เศษกระดาษ', 'เศษกระดาษ', 2.5, 'kg', 15, '', 0, '1643274639', 0),
(4, 1, 'กล่องกระดาษ', 'กล่องกระดาษ  ลังกระดาษ', 4, 'kg', 15, '', 0, '1643274652', 0),
(5, 1, 'กระดาษหนังสือพิมพ์', 'กระดาษหนังสือพิมพ์', 9, 'kg', 15, '', 0, '1643274673', 0),
(6, 3, 'ขวดพลาสติกใส(แกะสติกเกอร์/แยกฝา)', 'ขวดน้ำพลาสติกใส เช่น ขวดน้ำมทส.', 8, 'kg', 15, '', 0, '1643274697', 0),
(7, 3, 'ขวดพลาสติกใส(ไม่แกะสติกเกอร์/ไม่แยกฝา)', 'ขวดน้ำพลาสติกใส เช่น ขวดน้ำมทส.', 7, 'kg', 15, '', 0, '1643274711', 0),
(8, 3, 'ขวดพลาสติกขุ่น', 'ขวดน้ำสีขาวขุ่น', 13, 'kg', 15, '', 0, '1643274722', 0),
(9, 2, 'ขวดแก้วสี', 'ขวดแก้วสีต่างๆ', 1.25, 'kg', 15, '', 0, '1643274738', 0),
(10, 2, 'ขวดแก้วใส', 'ขวดแก้วใส', 1, 'kg', 15, '', 0, '1643274748', 0),
(11, 3, 'พลาสติกรวม(ใหญ่)', 'แกลลอนพลาสติกใส่น้ำยาต่างๆ', 7, 'kg', 15, '', 0, '1643274766', 0),
(12, 3, 'พลาสติกรวม(เล็ก)', 'ถ้วยมาม่า ถ้วยพลาสติก ขวดนม กล่องข้าวเซเว่น', 5, 'kg', 15, '', 0, '1643274779', 0),
(13, 4, 'กระป๋องอลูมิเนียม', 'กระป๋องน้ำอัดลม กระป๋องเบียร์', 30, 'kg', 15, '', 0, '1643274807', 0),
(14, 4, 'กระป๋องสังกะสี', 'กระป๋องกาแฟ กระป๋องนมข้น สังกะสี', 4, 'kg', 15, '', 0, '1643274844', 0),
(15, 6, 'แผ่นซีดี', 'แผ่นซีดี', 8, 'kg', 15, '', 0, '1643274858', 0),
(16, 6, 'กระสอบปุ๋ย', 'ถุงกระสอบปุ๋ย', 1, 'kg', 15, '', 0, '1643274874', 0),
(17, 3, 'ถุงขยะ', 'ถุงขยะสีต่างๆ', 1.8, 'kg', 15, '', 0, '1643274921', 0),
(18, 3, 'พลาสติกกรอบ', 'กล่องแผ่นซีดี  หมวกกันน็อค ชิ้นส่วนของเล่น', 1, 'kg', 15, '', 0, '1643274934', 0),
(19, 6, 'เบียร์ยกลัง', 'ลังเบียร์พร้อมขวด', 9, 'kg', 15, '', 0, '1643274949', 0),
(20, 5, 'เครื่องใช้ไฟฟ้า', 'เครื่องใช้ไฟฟ้า', 5.5, 'kg', 15, '', 0, '1643274974', 0),
(21, 4, 'เหล็ก', 'เศษเหล็ก', 7, 'kg', 15, '', 0, '1643274999', 0),
(22, 5, 'จอคอมพิวเตอร์', 'จอคอมพิวเตอร์', 6, 'kg', 15, '', 0, '1643275115', 0),
(23, 6, 'แบตเตอรี่เก่า', 'แบตเตอรี่รถยนต์เก่า', 18, 'kg', 15, '', 0, '1643275130', 0),
(24, 1, 'กล่องเครื่องดื่ม', 'แกะกล่องและทำความสะอาด', 1, 'kg', 15, '', 0, '1643275144', 0),
(25, 3, 'ขวดน้ำเกลือ', '', 8, 'kg', 15, '', 0, '1643275161', 0);

--
-- Triggers `product`
--
DELIMITER $$
CREATE TRIGGER `update_product` AFTER UPDATE ON `product` FOR EACH ROW BEGIN
    IF OLD.Update_Date != new.Update_Date THEN
        INSERT INTO product_log(Product_ID,Type_ID,Name,Detail,Price_per_unit,Unit_Detail,Fee_ID,Update_Date,Update_By,Create_Date,Create_By)
        VALUES(old.Product_ID,old.Type_ID,old.Name,old.Detail,old.Price_per_unit,old.Unit_Detail,old.Fee_ID,old.Update_Date,old.Update_By,old.Create_Date,old.Create_By);
    END IF;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`Product_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `Product_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
