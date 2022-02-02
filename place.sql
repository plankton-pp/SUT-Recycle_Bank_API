-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 31, 2022 at 07:15 PM
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
-- Table structure for table `place`
--

CREATE TABLE `place` (
  `Place_ID` int(11) NOT NULL,
  `Member_ID` int(11) NOT NULL,
  `Place_By` varchar(45) NOT NULL,
  `Net_Price` float NOT NULL,
  `Status` varchar(45) NOT NULL,
  `Create_Date` varchar(45) NOT NULL,
  `Update_Date` varchar(45) NOT NULL,
  `Employee_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `place`
--

INSERT INTO `place` (`Place_ID`, `Member_ID`, `Place_By`, `Net_Price`, `Status`, `Create_Date`, `Update_Date`, `Employee_ID`) VALUES
(6, 3, 'developer', 0, '50', '1643355361', '1643651169', 3),
(7, 0, 'test', 0, 'test', '1643355799', '', 2147483647),
(8, 0, 'test', 0, 'test', '1643355977', '', 2022),
(9, 0, 'test', 0, 'test', '1643356214', '', 2147483647),
(10, 0, 'test', 0, 'test', '1643356596', '', 2147483647),
(11, 0, 'test', 0, 'test', '1643359395', '1643359395060', 0),
(12, 0, 'test', 0, 'test', '1643362648', '', 0),
(13, 0, 'test', 0, 'test', '1643364047', '', 0),
(14, 0, 'test', 0, 'test', '1643364119', '', 0),
(15, 0, 'test', 0, 'test', '1643364827', '', 0),
(16, 0, 'test', 0, 'test', '1643370845', '', 0),
(17, 0, 'test', 0, 'test', '1643371081', '', 0),
(18, 0, 'test', 0, 'test', '1643371203', '', 0),
(19, 0, 'test', 0, 'test', '1643377044', '', 0),
(20, 0, 'test', 0, 'test', '1643377215', '', 0),
(21, 0, 'test', 0, 'test', '1643377376', '', 0),
(22, 0, 'test', 0, 'test', '1643377441', '', 0),
(23, 0, 'test', 0, 'test', '1643377589', '', 0),
(24, 0, 'test', 0, 'test', '1643377951', '', 0),
(25, 0, 'test', 0, 'test', '1643377960', '', 0),
(26, 0, 'test', 0, 'test', '1643378145', '', 0),
(27, 0, 'test', 0, 'test', '1643378328', '', 0),
(28, 2, 'Dev', 0, 'unpaid', '1643437339', '', 1),
(29, 2, 'Dev', 50, 'unpaid', '1643649918', '', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `place`
--
ALTER TABLE `place`
  ADD PRIMARY KEY (`Place_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `place`
--
ALTER TABLE `place`
  MODIFY `Place_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
