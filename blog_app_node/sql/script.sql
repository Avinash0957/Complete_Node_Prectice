/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.5.5-10.11.10-MariaDB : Database - blog_app
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`blog_app` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;

USE `blog_app`;

/*Table structure for table `tblblog` */

DROP TABLE IF EXISTS `tblblog`;

CREATE TABLE `tblblog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `blogcat_id` int(11) NOT NULL,
  `blog_title` longtext DEFAULT NULL,
  `blog_content` longtext DEFAULT NULL,
  `blog_tags` longtext DEFAULT NULL,
  `blog_created` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `blogcat_id` (`blogcat_id`),
  KEY `userid` (`userid`),
  CONSTRAINT `tblblog_ibfk_1` FOREIGN KEY (`blogcat_id`) REFERENCES `tblcategory` (`id`),
  CONSTRAINT `tblblog_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `tbllogin` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `tblblog` */

/*Table structure for table `tblcategory` */

DROP TABLE IF EXISTS `tblcategory`;

CREATE TABLE `tblcategory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryname` varchar(50) NOT NULL,
  `create_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `tblcategory` */

insert  into `tblcategory`(`id`,`categoryname`,`create_at`) values (1,'Technology','2025-08-08 14:34:43'),(2,'Design','2025-08-08 14:34:43'),(3,'Programming','2025-08-08 14:34:43'),(4,'Business','2025-08-08 14:34:43'),(5,'Lifestyle','2025-08-08 14:34:43');

/*Table structure for table `tbllogin` */

DROP TABLE IF EXISTS `tbllogin`;

CREATE TABLE `tbllogin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `access_token` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `token_expired` datetime DEFAULT NULL,
  `create_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `tbllogin` */

insert  into `tbllogin`(`id`,`name`,`email`,`password`,`access_token`,`token_expired`,`create_at`) values (1,'Avinash','avinashsingh0957@gmail.com','$2b$10$JgGxZDuQMJBMr1lsMOeZdOuMqla14QXVNEtaForVXVRPyajiywvgO','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkF2aW5hc2giLCJlbWFpbCI6ImF2aW5hc2hzaW5naDA5NTdAZ21haWwuY29tIiwiaWF0IjoxNzU0NjU2NjQ5LCJleHAiOjE3NTQ2NTg0NDl9.SNHzdrhbhW7alNU9tK-vt-OtNzyufixeDX_8cSnWPhs','2025-08-08 18:37:29','2025-08-08 17:04:33');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
