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
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `Type_ID` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Update_Date` varchar(45) NOT NULL,
  `Create_Date` varchar(45) NOT NULL,
  `Update_By` varchar(45) NOT NULL,
  `Create_By` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`Type_ID`, `Name`, `Update_Date`, `Create_Date`, `Update_By`, `Create_By`) VALUES
(1, 'กระดาษขาว-ดำ', '', '1643124440', '', 'Developer'),
(2, 'หนังสือเก่า', '', '1643124440', '', 'Developer'),
(3, 'เศษกระดาษ', '', '1643124440', '', 'Developer'),
(4, 'กล่องกระดาษ', '', '1643124440', '', 'Developer'),
(5, 'กระดาษหนังสือพิมพ์', '', '1643124440', '', 'Developer'),
(6, 'ขวดพลาสติกใส(แกะสติกเกอร์/แยกฝา)', '', '1643124440', '', 'Developer'),
(7, 'ขวดพลาสติกใส(ไม่แกะสติกเกอร์/ไม่แยกฝา)', '', '1643124440', '', 'Developer'),
(8, 'ขวดพลาสติกขุ่น', '', '1643124440', '', 'Developer'),
(9, 'ขวดแก้วสี', '', '1643124440', '', 'Developer'),
(10, 'ขวดแก้วใส', '', '1643124440', '', 'Developer'),
(11, 'พลาสติกรวม(ใหญ่)', '', '1643124440', '', 'Developer'),
(12, 'พลาสติกรวม(เล็ก)', '', '1643124440', '', 'Developer'),
(13, 'กระป๋องอลูมิเนียม', '', '1643124440', '', 'Developer'),
(14, 'กระป๋องสังกะสี', '', '1643124440', '', 'Developer'),
(15, 'แผ่นซีดี', '', '1643124440', '', 'Developer'),
(16, 'กระสอบปุ๋ย', '', '1643124440', '', 'Developer'),
(17, 'ถุงขยะ', '', '1643124440', '', 'Developer'),
(18, 'พลาสติกกรอบ', '', '1643124440', '', 'Developer'),
(19, 'เบียร์ยกลัง', '', '1643124440', '', 'Developer'),
(20, 'เครื่องใช้ไฟฟ้า', '', '1643124440', '', 'Developer'),
(21, 'เหล็ก', '', '1643124440', '', 'Developer'),
(22, 'จอคอมพิวเตอร์', '', '1643124440', '', 'Developer'),
(23, 'แบตเตอรี่เก่า', '', '1643124440', '', 'Developer'),
(24, 'กล่องเครื่องดื่ม', '', '1643124440', '', 'Developer'),
(25, 'ขวดน้ำเกลือ', '', '1643124440', '', 'Developer'),
(27, 'sawa', '1643187386', '1643186097', 'test', '3'),
(28, 'meen', '', '1643186131', '', 'test');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`Type_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type`
  MODIFY `Type_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
