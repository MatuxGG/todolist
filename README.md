GROUPE 6 - PROJET MOBILE IONIC
Adrien Michaud
Matthieu Artaud

Comment compiler l'application ?
- Il faut avoir NodeJS dans la dernière version
- Il faut aussi avoir le SDK Android/Java 8 et Android Studio d'installé
- Ne pas oublier de mettre les variables d'environnements dans le path
- Il suffit ensuite d'aller à la racine du projet et de faire un "npm install"
- Puis ensuite pour lancer sur Web "ionic serve" ou sur mobile "ionic cordova android run"

Comment deployer l'application ?
Une fois la configuration firebase faite via les différents fichier de configuration firebase, il suffit de faire "firebase deploy".
Cette commande va déployer l'application, ses dépendances nottament les regles et functions utilisées par l'application directement dans firebase.

Si vous voulez lancer l'application sur Android, un apk du nom de "todolist.apk" est présent à la racine du projet Github.
La version web est disponible à l'url : https://todolist-8b030.web.app

Des captures d'écran du rendu de l'application sur mon smartphone sont disponibles dans le dossier screenshots à la racine de ce git.

Comment utiliser l'application ?
- Connectez vous par Google ou Email/Mot de passe
- Une fois dans votre profil, vous pouvez acceder à vos listes de Todo et/ou changer la langue
- Vos listes s'affichent ainsi que les listes que les autres utilisateurs vous ont partagés
- En cliquant sur les noms de listes, vous accèder à son contenu
- Si vous en avez le droit, vous pouvez modifier le contenu des différents Todo

Actions non évidentes :
- Pour supprimer un Todo, il faut faire glisser le nom sur la gauche pour faire apparaitre la poubelle

Fonctionnalités de base implémentées :
- Login par email/mot de passe sans vérification d'email
- Login par Google
- Création de listes de Todo
- Création de Todo au sein de ces listes
- Partage de liste de Todo avec d'autres utilisateurs

Fonctionnalités supplémentaires implémentées :
- Internationalisation (Français et Anglais, changeable dans le menu)
- Une photo sur le Todo
- Localisation du lieu du Todo avec les coordonnées GPS (mais pas l'adresse)

Fonctionnalités supplémentaires en cours mais qui ne marchent pas :
- Reconnaissance vocale sur tous les champs textes : le moteur dit que la reconnaissance n'est pas disponible sur mon smartphone alors qu'il a les permissions...
