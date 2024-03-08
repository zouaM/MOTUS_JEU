# MOTUS_JEU

 #1. Présentation de l'application

L'application MOTUS est un jeu inspiré du concept de Motus, où le joueur doit deviner le mot du jour en le saisissant lettre par lettre. Le jeu offre un indice initial : la première lettre du mot. MOTUS est structuré autour de trois composants serveur clés :


Serveur d'authentification : Il gère l'authentification des utilisateurs, assurant que seul un public autorisé puisse accéder au jeu.

Serveur Motus : C'est le cœur du jeu où les utilisateurs entrent leurs tentatives pour deviner le mot du jour.

Serveur Score : Ce serveur conserve le nombre de réussites de chaque joueur, permettant ainsi de suivre les progrès.

#2. Démarrage de l'application

Pour lancer l'application, une commande Docker Compose est utilisée :


sudo docker-compose up --build


L'architecture de l'application repose sur trois dossiers distincts, chacun correspondant à un microservice spécifique (MotusServeur, AuthServeur, et ScoreServeur). Chacun de ces dossiers contient un Dockerfile qui configure l'environnement d'exécution du serveur associé. Le fichier docker-compose.yml centralise la configuration et permet de démarrer simultanément les trois serveurs.


Interaction avec l'application

Après le lancement des serveurs, accédez à l'application via un navigateur en visitant localhost:3000, qui correspond au serveur Motus. Si l'utilisateur n'est pas déjà connecté, une redirection automatique vers le serveur d'authentification (localhost:4000) se produit. Une interface de connexion s'affichera, invitant l'utilisateur à s'identifier avec ses identifiants.

Avec pour identifiant pour le prof: simon mdp: simon


Une fois authentifié, l'utilisateur est redirigé vers le serveur Motus où il peut entrer ses tentatives pour deviner le mot du jour. Le système vérifie si les identifiants saisis correspondent à un utilisateur existant dans une base de données JSON. En cas de succès, le score de l'utilisateur est incrémenté sur le serveur Score.


Note importante : La saisie du mot se fait lettre par lettre dans des cases dédiées. La navigation automatique d'une case à l'autre n'est pas implémentée, nécessitant une action manuelle pour chaque lettre saisie.



#3. Diagramme


    ![sequence](https://github.com/zouaM/MOTUS_JEU/assets/162748024/21286bd2-3732-49ff-a215-bea3538e1716)

    ![Texte alternatif pour l'image](https://github.com/zouaM/MOTUS_JEU/assets/162748024/21286bd2-3732-49ff-a215-bea3538e1716)





#4. Étapes suivantes


Les étapes futures consisteront à perfectionner l'interface du jeu afin de permettre une transition automatique d'une case à la suivante lors de la saisie des lettres du mot, améliorant ainsi l'expérience utilisateur.
