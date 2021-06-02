## Table des Matières
1. [Information Generale](#Information-Generale)
2. [Installation](#Installation)
3. [Éléments fournis](#Éléments-fournis)
4. [Cahier des charges](#Cahier-des-charges)
5. [Notes](#Notes)
6. [Évaluation](#Évaluation)
7. [Contact](#Contact)


### Information Generale
Création d’un réseau social d’entreprise pour améliorer la communication entre collègues : 
* Développer la première version de l'application.
* Implémenter un stockage de données sécurisées en utilisant SQL.
* Gérer un stockage de données l’aide de SQL.
* Authentifier un utilisateur et maintenir sa session.


### Groupomania

![Image text](https://github.com/John-Gate/7_23032021/blob/main/frontend/groupomania-app/src/assets/logos/icon-above-font-resize.png)
>Développer un reseau social d'entreprise
 

## Installation
- Apres avoir cloner le Repository:

- NODE PACKAGE MANAGER: 
    - lancer la commande: `npm install` dans le terminal pour chacun des dossiers frontend et backend:
    - Pour le frontend dans : cd .\7_23032021\frontend\groupomania-app  
    - Pourle backend: cd .\7_23032021\backend

- Pour la BASE DE DONNÉES MySQL:
    - Utilisation de [XAMP](https://www.apachefriends.org/fr/index.html)(*Lien pour effectuer l'installation*).
    - Démarrer XAMPP : `START` les modules Apache ET MySQL.
    - Se rendre sur [phpMyAdmin](http://localhost/phpmyadmin/index.php) dans le navigateur.
    - Créer une nouvelle base de données dont le nom sera:  **groupomaniabddmysql**  
    - Importer le fichier: groupomaniabddmysql (6).sql 

                                                                    :partying_face: Félicitation :partying_face:


**Démarrage:**  
*Pour le frontend:*  
  Lancez le frontend avec la commande ``npm run serve``.
  Se rendre sur: http://localhost:8080/

*Pour le backend:*  
  Lancez le backend avec la commande ``nodemon server``.
  
Les identifiants de l'admin sont :
- email : admin@theadmin.com
- mdp : 123456aA! (mdp valable pour tous les emails fournits dans la base de données)

 
## Éléments fournis
 * Dossier:
    - Frontend 
    - Backend
    - Database SQL


##  Cahier des charges
Construire un réseau social interne pour les employés de Groupomania sur le model de Reddit.
* Les employés pourront écrire et partager des articles avec leurs collègues sur des sujets qui les intéressent.
* Aucune maquette fournis, projet dont la conception est donc personnel: carte blanche sur la forme.
* Logos fournis pourl'habillage du site.
* Organisation "AGILE" adaptée.
* Bade de donnnées relationnelles utilisait par le client.
* Sécurié données de connexion.
* Présentation des fonctionnalités doit être simple.
* La création d’un compte doit être simple et possible depuis un téléphone mobile.
* Le profil doit contenir très peu d’informations pour que sa complétion soit rapide.
* l’accès à un forum où les salariés publient des contenus multimédias doit être présent.
* les utilisateurs doivent pouvoir facilement repérer les dernières participations des employés.
* la suppression du compte doit être possible.
* le ou la chargé-e de communication Groupomania doit pouvoir modérer les interactions entre salariés.
* Projet codé en JAVASCRIPT.
* Personnaliser le contenu a envoyer à un client web.


## Notes
**Backend:**
 * Framework : **Express**
 * Serveur : **NodeJS**
 * Base de données : **MySQL**
 * ORM : **Sequelize**
 * Serveur Web Local: **XAMP**
  
**Frontend:**
 * Framwework: **Vuejs**, **Vue CLI**


## Évaluation
:heavy_check_mark: Ce projet est en cours de validation.


## Contact
* [Email](mailto:barrierejc@live.fr?subject=[GitHub]%20Source%20Han%20Sans)
* [LinkedIn](https://linkedin.com/in/jean-christian-barriere)






