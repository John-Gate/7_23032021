-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 02 juin 2021 à 17:23
-- Version du serveur :  10.4.18-MariaDB
-- Version de PHP : 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomaniabddmysql`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `status` varchar(45) NOT NULL DEFAULT '0',
  `PostId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `content`, `status`, `PostId`, `UserId`, `createdAt`, `updatedAt`) VALUES
(1, ' Et l\'amour n\'est pas sans rapport avec l\'humour, non ? Car pour aimer quelqu\'un,', '1', 2, 4, '2021-04-21', '2021-04-21'),
(11, 'Rencontre avec un « fiché S » Les archives de la Préfecture de police de Paris sont accessibles à tous. Il suffit de prendre la ligne 5 du métro, de descendre à la station Hoche, ', '1', 28, 1, '2021-05-05', '2021-05-05'),
(48, 'vous nous chatouillez, ne rions-nous pas ? si vous nous empoisonnez, ne mourons-nous pas ?', '0', 35, 1, '2021-05-08', '2021-05-08'),
(49, 'Si c\'est un homme ', '0', 35, 1, '2021-05-08', '2021-05-08'),
(50, 'Le Marchand de Venise', '0', 35, 1, '2021-05-08', '2021-05-08'),
(51, 'Les tout jeunes gens, lorsqu\'ils goûtent pour la première fois aux échanges d\'arguments, en font un usage pervers, comme d\'un jeu, ', '1', 34, 1, '2021-05-11', '2021-05-11'),
(52, 'Poiché tale è la natura umana, che le pene e i dolori simultaneamente sofferti non si sommano per intero nella nostra sensibilità, ma si nascondono', '1', 2, 1, '2021-05-12', '2021-05-12'),
(53, 'Vous feriez mieux d\'ouvrir la porte, espèce de... répondit-il en m\'appliquant une épithète', '1', 44, 1, '2021-05-22', '2021-05-22'),
(54, 'Aussi ne saura-t-il jamais comme je l\'aime ; et cela, non parce qu\'il est beau, ', '0', 46, 19, '2021-05-25', '2021-05-25');

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `PostId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id`, `createdAt`, `updatedAt`, `PostId`, `UserId`) VALUES
(1, '2021-05-12 15:21:44', '2021-05-12 15:21:44', 2, 1),
(2, '2021-05-12 15:23:04', '2021-05-12 15:23:04', 34, 1),
(21, '2021-05-17 15:40:32', '2021-05-17 15:40:32', 44, 19),
(32, '2021-05-18 14:47:36', '2021-05-18 14:47:36', 44, 1),
(33, '2021-05-21 21:10:44', '2021-05-21 21:10:44', 46, 20),
(34, '2021-05-22 21:25:23', '2021-05-22 21:25:23', 46, 1),
(35, '2021-05-25 20:46:23', '2021-05-25 20:46:23', 23, 19),
(36, '2021-05-25 20:50:03', '2021-05-25 20:50:03', 17, 19),
(38, '2021-05-25 23:02:53', '2021-05-25 23:02:53', 46, 19),
(39, '2021-05-28 16:20:43', '2021-05-28 16:20:43', 48, 1),
(40, '2021-05-28 16:21:02', '2021-05-28 16:21:02', 20, 1);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(45) NOT NULL,
  `content` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `UserId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `image`, `status`, `UserId`, `createdAt`, `updatedAt`) VALUES
(2, 'Exercice de Confiance', 'Vivre dans cette société, c’est au mieux y mourir d’ennui. Rien dans cette société ne concerne les femmes. Alors, à toutes celles qui ont un brin de civisme, le sens des responsabilités et celui de la rigolade,', NULL, 1, 1, '2021-04-16 00:00:00', '2021-04-21 00:00:00'),
(15, 'Moi, étoile filante', 'Le matin, après mon petit-déjeuner, je passe devant une petite plaque en marbre appuyée contre le haut mur de la rue. Je n’ai jamais rencontré le mort, et pourtant, depuis le temps, je connais son prénom et son nom.', NULL, 1, 4, '2021-04-28 00:00:00', '2021-05-05 20:28:22'),
(17, 'Les Ombres de la toile', 'Ouagadougou, 2016 Avec Hervé vous partez de l’aéroport de Newark le 12 janvier. Pendant l’escale à Bruxelles tu t’achètes un petit carnet noir, Shayna, et y inscris les mots burkina faso en lettres majuscules. ', NULL, 1, 19, '2021-04-28 00:00:00', '2021-04-28 00:00:00'),
(20, 'Le Grand', 'Ensemble, ils partageaient le même désir de combattre un adversaire sournois qui écrasait l’humanité depuis la nuit des temps et contre lequel l’humanité n’avait fait que baisser les yeux.', NULL, 1, 16, '2021-04-29 00:00:00', '2021-04-29 00:00:00'),
(22, 'La Costumière', 'Les oiseaux sont fous, qui traversent ma tête. Leurs ailes, un archipel de feu. Leur chant, une colline chargée de ciels turbulents. Messagers de lumière, certainement, qui font battre encore ', NULL, 1, 4, '2021-04-29 15:46:56', '2021-05-05 15:08:18'),
(23, 'Enieme1', 'LE DOSSIER “SANDRA” Avant mon départ précipité pour la plaine, je réponds au dernier message de Sandra et la préviens que je vais m’absenter. À sa demande et à l’invitation de son psychologue,1', 'http://localhost:3000/images/_112921315_gettyimages-876284806.jpg1621983810587.jpg', 0, 19, '2021-04-29 15:53:20', '2021-05-25 23:03:30'),
(28, 'L\'homme-frère', 'Nassim marchait vers la ville, seul, droit, courageux. Il rentrait chez les siens. La dernière nuit dans le désert avait été longue; il n’avait pas mangé depuis plusieurs jours et, pourtant, il ne sentait pas la faim.', 'http://localhost:3000/images/46456227_2504829799542273_7554593422053474304_o-700x525.jpg1621867576756.jpg', 0, 16, '2021-05-05 21:23:32', '2021-05-24 14:57:58'),
(34, 'Là où nous sommes chez nous!!@', 'Mon frère s’est marié par une chaude journée de septembre dans une maison de maître du Brandebourg. Toute la famille était invitée, y compris ses membres qui vivaient en Israël, en Angleterre, en France et en Autriche. On a fini par ne plus savoir où mett', 'http://localhost:3000/images/394230.jpg1621290650509.jpg', 1, 17, '2021-05-06 16:01:00', '2021-05-21 21:03:55'),
(35, 'Vanda', ' en l’an de grâce 814, au vingt-huitième jour du mois de Wintarmanoth. De mémoire d’homme, jamais hiver n’avait été aussi rude. Hrotrud, la sage-femme du village d’Ingelheim, avançait péniblement dans la neige ', NULL, 0, 16, '2021-05-06 16:04:44', '2021-05-06 16:04:44'),
(44, 'Compte Monte', '- Apprendre n\'est pas savoir ; il y a les sachant et les savants : c\'est la mémoire qui fait les uns, c\'est le philosophie qui fait les autres.\r\n- Mais ne peut-on apprendre la philosophie ?', 'http://localhost:3000/images/thesecretworldofarrietty.jpg1621262778765.jpg', 1, 17, '2021-05-17 14:46:18', '2021-05-17 14:46:38'),
(45, 'Joueur d echec', '\"À la bonne heure. (Il boit.) Écoute, maintenant. (Rêveur.) Il était une fois un pauvre empereur que personne n\'aimait. Lui, qui aimait Lepidus, fit tuer son plus jeune fils pour s\'enlever cet amour du cœur. ', 'http://localhost:3000/images/394230.jpg1621290650509.jpg', 0, 17, '2021-05-17 22:30:50', '2021-05-17 22:30:50'),
(46, 'La vie', 'Au temps des cantines, a la tv j etais fana , dans la rue c etait', 'http://localhost:3000/images/image-20150423-25578-10t7t3r.jpg1621631377870.jpg', 0, 20, '2021-05-21 21:09:37', '2021-05-21 21:09:37'),
(47, 'UPYLAB 3.17 ', 'Dans mon songe doré, je m\'en allais chantant', 'http://localhost:3000/images/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg1621632288828.jpg', 1, 16, '2021-05-21 21:24:48', '2021-05-25 23:05:06'),
(48, 'Le Passeur', 'Lorsqu\'il l\'eut sentie au point de la faner...', NULL, 1, 1, '2021-05-24 14:14:20', '2021-05-24 14:14:20'),
(49, 'Substance Mort', 'Je me donnerais volontiers au diable', NULL, 0, 16, '2021-05-24 14:15:23', '2021-05-24 14:15:23'),
(50, '27 Mai 2048 , le pays arrive a...', 'Je n\'aimais qu\'un seul être et je le perds deux fois !', 'http://localhost:3000/images/slider_puffin_before_mobile.jpg1621983728344.jpg', 0, 19, '2021-05-25 23:02:08', '2021-05-25 23:02:08');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `role` varchar(45) NOT NULL DEFAULT '0',
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstName`, `lastName`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'admin@theadmin.com', '$2b$10$Kavty52.OB/PLQRlabxBBuz7Sbih/jFBuuDW56W6DGgZxnfeesZYm', 'Jean-Paul', 'Cluzé', '2', '2021-04-13', '2021-04-13 15:11:47'),
(4, 'george@hotmail.com', '$2b$10$K9gwlNSTHCBYIoIfplnxLet7LMcrTQanYCzAd3BbkvmBnrFn5zP2e', 'George', 'Pompidou the 2nd', '1', '2021-04-21', '2021-05-11 21:04:38'),
(16, 'gustave@requery.com', '$2b$10$hbLn3FMKE.kqld6LSfP5o.S.GqgN.18/P9uc3AoRK1vWkVnmhdC0K', 'Gustave', 'Le Plancher', '1', '2021-05-06', '2021-05-11 21:04:46'),
(17, 'lucie45@gmail.com', '$2b$10$Ot/O8KoHZhWL0weyjHQbSO3HH.5duJ3grjuPuqZpOTMBHxd2IE2OK', 'Dontcry', 'Lucie', '0', '2021-05-07', '2021-05-07 22:52:20'),
(19, 'c.lancome@live.fr', '$2b$10$tcPPA6pCYn9ZfKtX3guomOttqH6fTLKMsi12zwPEGu70Du3TpBD/e', 'Claudia', 'Lacome', '1', '2021-05-07', '2021-05-11 21:04:44'),
(20, 'lorcafe@gmail.com', '$2b$10$skLIIITS0giF1kLY0xyXBOaPZkGNiJGsgE7X/Tl7N2QI0qgtYgLj2', 'L\'or', 'Manodoux', '1', '2021-05-19', '2021-05-19 15:08:10');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_commentaire_post1_idx` (`PostId`),
  ADD KEY `fk_commentaire_users1_idx` (`UserId`);

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Like_posts1_idx` (`PostId`),
  ADD KEY `fk_Like_users1_idx` (`UserId`);

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_post_users_idx` (`UserId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT pour la table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_commentaire_post1` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_commentaire_users1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `fk_Like_posts1` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Like_users1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_post_users` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
