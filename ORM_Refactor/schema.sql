CREATE DATABASE chat;

USE chat;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'messages'
--
-- ---

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` INTEGER(10) NULL AUTO_INCREMENT DEFAULT NULL,
  `userid` INTEGER(10) NULL DEFAULT NULL,
  `message` VARCHAR(300) NULL DEFAULT NULL,
  `roomname` VARCHAR(20) NULL DEFAULT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER(10) NULL AUTO_INCREMENT DEFAULT NULL,
  `username` VARCHAR(100) NULL DEFAULT NULL,
  `password` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'friends'
--
-- ---

DROP TABLE IF EXISTS `friends`;

CREATE TABLE `friends` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user1` INTEGER(10) NULL DEFAULT NULL,
  `user2` INTEGER(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `messages` ADD FOREIGN KEY (userid) REFERENCES `users` (`id`);
ALTER TABLE `friends` ADD FOREIGN KEY (user1) REFERENCES `users` (`id`);
ALTER TABLE `friends` ADD FOREIGN KEY (user2) REFERENCES `users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `friends` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


