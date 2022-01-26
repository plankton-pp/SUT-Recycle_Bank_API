-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 26, 2022 at 06:37 PM
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
  `Price_per_unit` float NOT NULL,
  `Update_Date` varchar(45) NOT NULL,
  `Update_By` varchar(45) NOT NULL,
  `Create_Date` varchar(45) NOT NULL,
  `Create_By` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`Material_ID`, `Type_ID`, `Name`, `Price_per_unit`, `Update_Date`, `Update_By`, `Create_Date`, `Create_By`) VALUES
(1, 1, 'กระดาษขาวที่ใช้แล้ว', 7, '', '', '1643124440', 'Deverloper'),
(2, 2, 'หนังสือเรียน นิตยสาร ', 3, '', '', '1643124440', 'Deverloper'),
(3, 3, 'เศษกระดาษ ', 3, '', '', '1643124440', 'Deverloper'),
(4, 4, 'กล่องกระดาษ  ลังกระดาษ', 4.5, '', '', '1643124440', 'Deverloper'),
(5, 5, 'กระดาษหนังสือพิมพ์', 7.3, '', '', '1643124440', 'Deverloper'),
(6, 6, 'ขวดน้ำพลาสติกใส เช่น ขวดน้ำมทส.', 8.5, '', '', '1643124440', 'Deverloper'),
(7, 7, 'ขวดน้ำพลาสติกใส เช่น ขวดน้ำมทส.', 7, '', '', '1643124440', 'Deverloper'),
(8, 8, 'ขวดน้ำสีขาวขุ่น', 13, '', '', '1643124440', 'Deverloper'),
(9, 9, 'ขวดแก้วสีต่างๆ', 1.15, '', '', '1643124440', 'Deverloper'),
(10, 10, 'ขวดแก้วใส', 1.1, '', '', '1643124440', 'Deverloper'),
(11, 11, 'แกลลอนพลาสติกใส่น้ำยาต่างๆ', 7.5, '', '', '1643124440', 'Deverloper'),
(12, 12, 'ถ้วยมาม่า ถ้วยพลาสติก ขวดนม กล่องข้าวเซเว่น', 5, '', '', '1643124440', 'Deverloper'),
(13, 13, 'กระป๋องน้ำอัดลม กระป๋องเบียร์', 30.5, '', '', '1643124440', 'Deverloper'),
(14, 14, 'กระป๋องกาแฟ กระป๋องนมข้น สังกะสี', 4.5, '', '', '1643124440', 'Deverloper'),
(15, 15, 'แผ่นซีดี', 6, '', '', '1643124440', 'Deverloper'),
(16, 16, 'ถุงกระสอบปุ๋ย', 2, '', '', '1643124440', 'Deverloper'),
(17, 17, 'ถุงขยะสีต่างๆ', 2, '', '', '1643124440', 'Deverloper'),
(18, 18, 'กล่องแผ่นซีดี  หมวกกันน็อค ชิ้นส่วนของเล่น', 1.5, '', '', '1643124440', 'Deverloper'),
(19, 19, 'ลังเบียร์พร้อมขวด', 10, '', '', '1643124440', 'Deverloper'),
(20, 20, 'เครื่องใช้ไฟฟ้า', 5.5, '', '', '1643124440', 'Deverloper'),
(21, 21, 'เศษเหล็ก', 7, '', '', '1643124440', 'Deverloper'),
(22, 22, 'จอคอมพิวเตอร์', 5.5, '', '', '1643124440', 'Deverloper'),
(23, 23, 'แบตเตอรี่รถยนต์เก่า', 15, '', '', '1643124440', 'Deverloper'),
(24, 24, 'แกะกล่องและทำความสะอาด', 1, '', '', '1643124440', 'Deverloper');

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
  MODIFY `Material_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
