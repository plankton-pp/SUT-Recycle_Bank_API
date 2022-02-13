-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 12, 2022 at 07:29 AM
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
-- Table structure for table `placedetail`
--

CREATE TABLE `placedetail` (
  `Place_Detail_ID` int(11) NOT NULL,
  `Member_ID` int(11) NOT NULL,
  `Place_ID` int(11) NOT NULL,
  `Type_ID` int(11) NOT NULL,
  `Type_Name` varchar(45) NOT NULL,
  `Product_ID` int(11) NOT NULL,
  `Product_Name` varchar(45) NOT NULL,
  `Price_per_Unit` float NOT NULL,
  `Unit_detail` varchar(45) NOT NULL,
  `Fee` float NOT NULL,
  `Unit` float NOT NULL,
  `Total_Price` float NOT NULL,
  `Bank_Price` float NOT NULL,
  `Member_Price` float NOT NULL,
  `Create_Date` varchar(45) NOT NULL,
  `Update_Date` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `placedetail`
--

INSERT INTO `placedetail` (`Place_Detail_ID`, `Member_ID`, `Place_ID`, `Type_ID`, `Type_Name`, `Product_ID`, `Product_Name`, `Price_per_Unit`, `Unit_detail`, `Fee`, `Unit`, `Total_Price`, `Bank_Price`, `Member_Price`, `Create_Date`, `Update_Date`) VALUES
(25, 1, 14, 1, 'meen', 1, 'meen', 15, 'kg', 10, 10, 150, 15, 135, '1644611890', ''),
(26, 1, 14, 1, 'meen', 2, 'meen', 15, 'kg', 10, 10, 150, 15, 135, '1644611890', ''),
(27, 1, 15, 1, 'meen', 3, 'meen', 15, 'kg', 10, 10, 150, 15, 135, '1644611940', ''),
(28, 1, 15, 1, 'meen', 4, 'meen', 15, 'kg', 10, 10, 150, 15, 135, '1644611940', ''),
(29, 1, 15, 1, 'meen', 1, 'meen', 15, 'kg', 10, 10, 150, 15, 135, '1644611940', ''),
(30, 1, 15, 1, 'meen', 5, 'meen', 15, 'kg', 10, 10, 150, 15, 135, '1644611940', ''),
(31, 1, 15, 1, 'meen', 6, 'meen', 15, 'kg', 10, 10, 150, 15, 135, '1644611940', ''),
(32, 1, 15, 1, 'meen', 2, 'meen', 15, 'kg', 10, 10, 150, 15, 135, '1644611940', ''),
(33, 1, 15, 1, 'meen', 7, 'meen', 15, 'kg', 10, 10, 150, 15, 135, '1644611940', ''),
(34, 1, 15, 1, 'meen', 10, 'meen', 15, 'kg', 10, 10, 150, 15, 135, '1644611940', ''),
(35, 1, 15, 1, 'meen', 8, 'meen', 15, 'kg', 10, 10, 150, 15, 135, '1644611940', ''),
(36, 1, 15, 1, 'meen', 9, 'meen', 15, 'kg', 10, 10, 150, 15, 135, '1644611940', ''),
(37, 3, 16, 1, 'meen', 1, 'meen', 15, 'kg', 10, 10, 150, 15, 135, '1644612083', ''),
(38, 3, 16, 1, 'meen', 7, 'meen', 15, 'kg', 10, 10, 150, 15, 135, '1644612083', ''),
(39, 3, 16, 1, 'meen', 2, 'meen', 15, 'kg', 10, 10, 150, 15, 135, '1644612083', ''),
(40, 3, 16, 1, 'meen', 3, 'meen', 15, 'kg', 10, 10, 150, 15, 135, '1644612083', ''),
(41, 3, 16, 1, 'meen', 4, 'meen', 15, 'kg', 10, 10, 150, 15, 135, '1644612083', ''),
(42, 3, 16, 1, 'meen', 5, 'meen', 15, 'kg', 10, 10, 150, 15, 135, '1644612083', ''),
(43, 3, 16, 1, 'meen', 8, 'meen', 15, 'kg', 10, 10, 150, 15, 135, '1644612083', ''),
(44, 3, 16, 1, 'meen', 6, 'meen', 15, 'kg', 10, 10, 150, 15, 135, '1644612083', ''),
(45, 3, 16, 1, 'meen', 10, 'meen', 15, 'kg', 10, 10, 150, 15, 135, '1644612083', ''),
(46, 3, 16, 1, 'meen', 9, 'meen', 15, 'kg', 10, 10, 150, 15, 135, '1644612083', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `placedetail`
--
ALTER TABLE `placedetail`
  ADD PRIMARY KEY (`Place_Detail_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `placedetail`
--
ALTER TABLE `placedetail`
  MODIFY `Place_Detail_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
