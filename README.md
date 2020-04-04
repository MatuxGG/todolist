GROUPE 6 - PROJET MOBILE IONIC
Adrien Michaud
Matthieu Artaud

Comment compiler l'application ?
- Il faut avoir NodeJS dans la dernière version
- Il faut aussi avoir le SDK Android/Java 8 et Android Studio d'installé
- Ne pas oublier de mettre les variables d'environnements dans le path
- Il suffit ensuite d'aller à la racine du projet et de faire un "npm install"
- Puis ensuite pour lancer sur Web "ionic serve" ou sur mobile "ionic cordova android run"

Si vous voulez lancer l'application sur Android, un apk du nom de "todolist.apk" est présent à la racine du projet Github.

Comment utiliser l'application ?
- Connectez vous par Google ou Email/Mot de passe
- Une fois dans votre profil, vous pouvez acceder à vos listes de Todo et/ou changer la langue
- Vos listes s'affichent ainsi que les listes que les autres utilisateurs vous ont partagés
- En cliquant sur les noms de listes, vous accèder à son contenu
- Si vous en avez le droit, vous pouvez modifier le contenu des différents Todo

Fonctionnalités de base implémentées :
- Login par email/mot de passe avec vérification d'email
- Login par Google
- Création de listes de Todo
- Création de Todo au sein de ces listes
- Partage de liste de Todo avec d'autres utilisateurs

Fonctionnalités supplémentaires implémentées :
- Internationalisation (Français et Anglais, changeable dans le menu)
- Photo sur le Todo
- Reconnaissance vocale sur tous les champs textes (en cours, pas encore finie)
- Localisation du lieu du Todo