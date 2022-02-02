-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 02, 2022 at 11:01 AM
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
  `Material_ID` int(11) NOT NULL,
  `Type_ID` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Detail` varchar(45) NOT NULL,
  `Price_per_unit` float NOT NULL,
  `Unit_Detail` varchar(45) NOT NULL,
  `Operation_Fee` varchar(45) NOT NULL,
  `Update_Date` varchar(45) NOT NULL,
  `Update_By` varchar(45) NOT NULL,
  `Create_Date` varchar(45) NOT NULL,
  `Create_By` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`Material_ID`, `Type_ID`, `Name`, `Detail`, `Price_per_unit`, `Unit_Detail`, `Operation_Fee`, `Update_Date`, `Update_By`, `Create_Date`, `Create_By`) VALUES
(1, 1, 'กระดาษขาว-ดำ', 'กระดาษขาวที่ใช้แล้ว', 6.5, '', '15', '', '', '1643274601', 'Devloper'),
(2, 1, 'หนังสือเก่า', 'หนังสือเรียน นิตยสาร', 3.5, '', '15', '', '', '1643274620', 'Devloper'),
(3, 1, 'เศษกระดาษ', 'เศษกระดาษ', 2.5, '', '15', '', '', '1643274639', 'Devloper'),
(4, 1, 'กล่องกระดาษ', 'กล่องกระดาษ  ลังกระดาษ', 4, '', '15', '', '', '1643274652', 'Devloper'),
(5, 1, 'กระดาษหนังสือพิมพ์', 'กระดาษหนังสือพิมพ์', 9, '', '15', '', '', '1643274673', 'Devloper'),
(6, 3, 'ขวดพลาสติกใส(แกะสติกเกอร์/แยกฝา)', 'ขวดน้ำพลาสติกใส เช่น ขวดน้ำมทส.', 8, '', '15', '', '', '1643274697', 'Devloper'),
(7, 3, 'ขวดพลาสติกใส(ไม่แกะสติกเกอร์/ไม่แยกฝา)', 'ขวดน้ำพลาสติกใส เช่น ขวดน้ำมทส.', 7, '', '15', '', '', '1643274711', 'Devloper'),
(8, 3, 'ขวดพลาสติกขุ่น', 'ขวดน้ำสีขาวขุ่น', 13, '', '15', '', '', '1643274722', 'Devloper'),
(9, 2, 'ขวดแก้วสี', 'ขวดแก้วสีต่างๆ', 1.25, '', '15', '', '', '1643274738', 'Devloper'),
(10, 2, 'ขวดแก้วใส', 'ขวดแก้วใส', 1, '', '15', '', '', '1643274748', 'Devloper'),
(11, 3, 'พลาสติกรวม(ใหญ่)', 'แกลลอนพลาสติกใส่น้ำยาต่างๆ', 7, '', '15', '', '', '1643274766', 'Devloper'),
(12, 3, 'พลาสติกรวม(เล็ก)', 'ถ้วยมาม่า ถ้วยพลาสติก ขวดนม กล่องข้าวเซเว่น', 5, '', '15', '', '', '1643274779', 'Devloper'),
(13, 4, 'กระป๋องอลูมิเนียม', 'กระป๋องน้ำอัดลม กระป๋องเบียร์', 30, '', '15', '', '', '1643274807', 'Devloper'),
(14, 4, 'กระป๋องสังกะสี', 'กระป๋องกาแฟ กระป๋องนมข้น สังกะสี', 4, '', '15', '', '', '1643274844', 'Devloper'),
(15, 6, 'แผ่นซีดี', 'แผ่นซีดี', 8, '', '15', '', '', '1643274858', 'Devloper'),
(16, 6, 'กระสอบปุ๋ย', 'ถุงกระสอบปุ๋ย', 1, '', '15', '', '', '1643274874', 'Devloper'),
(17, 3, 'ถุงขยะ', 'ถุงขยะสีต่างๆ', 1.8, '', '15', '', '', '1643274921', 'Devloper'),
(18, 3, 'พลาสติกกรอบ', 'กล่องแผ่นซีดี  หมวกกันน็อค ชิ้นส่วนของเล่น', 1, '', '15', '', '', '1643274934', 'Devloper'),
(19, 6, 'เบียร์ยกลัง', 'ลังเบียร์พร้อมขวด', 9, '', '15', '', '', '1643274949', 'Devloper'),
(20, 5, 'เครื่องใช้ไฟฟ้า', 'เครื่องใช้ไฟฟ้า', 5.5, '', '15', '', '', '1643274974', 'Devloper'),
(21, 4, 'เหล็ก', 'เศษเหล็ก', 7, '', '15', '', '', '1643274999', 'Devloper'),
(22, 5, 'จอคอมพิวเตอร์', 'จอคอมพิวเตอร์', 6, '', '15', '', '', '1643275115', 'Devloper'),
(23, 6, 'แบตเตอรี่เก่า', 'แบตเตอรี่รถยนต์เก่า', 18, '', '15', '', '', '1643275130', 'Devloper'),
(24, 1, 'กล่องเครื่องดื่ม', 'แกะกล่องและทำความสะอาด', 1, '', '15', '', '', '1643275144', 'Devloper'),
(25, 3, 'ขวดน้ำเกลือ', '', 8, '', '15', '', '', '1643275161', 'Devloper'),
(26, 2, 'กาละแมงมุง', '', 3, '', '15', '1643275604', 'developer', '1643275594', 'Devloper'),
(27, 1, '1', '1', 1, '', '15', '', '', '', '1'),
(28, 2, 'กาละแมงมุง', '', 3, 'KG', '15', '1643795452', 'developer', '1643567687', '1'),
(29, 1, '1', '1', 1, 'kg', '15', '', '', '1643795231', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`Material_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `Material_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
