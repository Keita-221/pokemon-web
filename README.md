Manuel d'utilisation – Interface "Apprendre" :
1. Accueil et chargement des données
À l’ouverture de la page, l’interface charge automatiquement toutes les questions depuis une base XML.
Chaque ligne du tableau contient :
    • ID de la question
    • Image associée
    • Contenu de la question
    • Thématique
    • Bonne réponse
    • Points attribués
    • Lien "Détails"
2. Pagination
    • 5 questions par page
    • Boutons numérotés pour naviguer entre les pages
3. Filtrer les questions par thématique
    • Menu déroulant des thématiques
    • Choisir "Tout" pour toutes les questions
    • Le tableau se met à jour automatiquement
4. Rechercher une question
    • Champ de recherche pour mot-clé
    • Recherche dans contenu, thématique, ou bonne réponse
    • Compatible avec le filtre thématique
5. Trier les questions
    • Tri par nombre de points croissants
    • Fonctionne sur les questions filtrées ou recherchées
6. Consulter le détail d’une question
    • Bouton "Détails" redirige vers page complète
    • Affiche image, thématique, contenu, réponse, points et ID

Manuel d’utilisation – Interface de jeu Pokémon
    1. Accès au jeu
        ◦ theme : choisir le thème des questions. Exemple : theme=electrik
        ◦ count : définir le nombre de questions. Exemple : count=15
    2. Écran de démarrage (start-screen)
    • Bouton “Démarrer” : lance le jeu et charge les questions.
    • L’écran de démarrage disparaît et l’écran du jeu apparaît.
    3. Écran du jeu (game-screen)
3.1 Affichage des questions
    • Texte de la question : situé en haut au centre.
    • Image du Pokémon (si disponible) : sous la question.
    • Numéro de question / total : en bas, sous forme “Question 3/15”.
3.2 Choix des réponses
    • Quatre boutons correspondent aux réponses possibles.
    • Pour sélectionner une réponse : cliquez sur le bouton correspondant.
    • La réponse sélectionnée devient bleue (btn-primary).
    • Vous pouvez changer de choix avant de valider.
3.3 Validation et feed-back
    • Bouton “Valider” : devient actif une fois qu’une réponse est choisie.
    • Après validation :
        ◦ La bonne réponse devient verte (btn-success).
        ◦ La mauvaise réponse sélectionnée devient rouge (btn-danger).
        ◦ Les autres réponses deviennent grises (btn-secondary).
    • Un message s’affiche indiquant si la réponse est correcte ou non et le nombre de points obtenus.
3.4 Passage à la question suivante
    • Bouton “Suivant” : visible après validation.
    • Cliquez pour passer à la question suivante.
    • Si toutes les questions sont terminées, l’écran de résultat apparaît.
    4. Écran de résultats (result-screen)
    • Score final : affiché en points.
    • Message de performance :
        ◦ ≥ 80 % : “Excellent ! Maître Pokémon !”
        ◦ 60–79 % : “Bien joué ! Continue !”
        ◦ 40–59 % : “Pas mal ! Entraîne-toi !”
        ◦ < 40 % : “Courage ! Tu peux !”
    • Les scores sont automatiquement sauvegardés dans le localStorage du navigateur avec la date, le score, le score maximum et le thème.
4.1 Rejouer
    • Bouton “Rejouer” : recommence le jeu avec les mêmes paramètres.
    5. Fonctionnalités supplémentaires
    • Mélange aléatoire des réponses pour chaque question.
    • Possibilité de filtrer les questions par thème.
    • Nombre de questions personnalisable via URL .
    • Sauvegarde des scores pour suivre les performances au fil du temps

Manuel d’Utilisation de l’Interface Statistique
1. Présentation
Cette interface permet de visualiser et gérer les scores d’une application ou d’un quiz. Les données sont stockées dans le localStorage du navigateur et sont affichées sous forme d’histogrammes colorés représentant les performances.
Chaque barre de l’histogramme indique :
    • Le nombre de bonnes réponses sur le nombre total des points (20) de questions.
    • La date et l’heure de l’enregistrement du score.
    • Le thème ou une information complémentaire associée au score.
Les couleurs des barres permettent de visualiser rapidement la performance :
    • Vert : ≥ 80 % de bonnes réponses
    • Jaune : entre 50 % et 79 %
    • Rouge : < 50 %
2. Chargement de l’Interface
    1. Ouvrez la page contenant le canvas HTML avec l’ID monHistogramme.
    2. Les scores seront automatiquement lus depuis le localStorage et affichés dès le chargement de la page grâce à la fonction dessinerHistogramme().
3. Visualisation des Scores
    • Chaque barre correspond à un score enregistré.
    • Les informations affichées :
        ◦ Score : X/Y où X = bonnes réponses, Y = total des points du theme 
        ◦ Date et heure : moment où le score a été enregistré
        ◦ Thème ou info : texte supplémentaire lié au score
    • Positionnement :
        ◦ Les barres sont espacées horizontalement avec une largeur et un espace constants.
        ◦ L’axe vertical représente le pourcentage de réussite.
4. Supprimer les Statistiques
Pour effacer toutes les statistiques enregistrées :
    1. Cliquez sur le bouton ou lancez la fonction supprimerStatistiques().
    2. Les données seront supprimées du localStorage.
    3. L’histogramme se rafraîchira automatiquement et apparaîtra vide.
5. Fonctionnalités Techniques
    • Lecture des scores : lireScores()
        ◦ Récupère les scores stockés
        ◦ Transforme les données en tableau exploitable pour l’affichage
    • Affichage graphique : dessinerHistogramme()
        ◦ Dessine les barres et ajoute les informations textuelles sur le canvas
    • Suppression des données : supprimerStatistiques()
        ◦ Vide le localStorage et redessine l’histogramme


document.getElementsByTagName(tagName)
Description

C’est une méthode du DOM qui retourne une liste de tous les éléments du document (ou d’un élément) qui ont le nom de balise spécifié.
trim() : Supprime les espaces en début et fin de chaîne.

toLowerCase() : Convertit une chaîne en minuscules (utile pour recherche insensible à la casse).

includes(substring) : Vérifie si une chaîne contient une sous-chaîne, retourne true ou false.

Objet XMLHttpRequest : Permet de faire des requêtes HTTP (GET, POST, etc.) depuis JavaScript.

Propriétés utilisées :

xmlhttp.onreadystatechange : Fonction appelée à chaque changement d'état de la requête.

xmlhttp.readyState : Retourne l’état actuel de la requête (0 à 4).

0 = non initialisé

1 = connexion établie

2 = requête reçue

3 = traitement en cours

4 = terminé

xmlhttp.status : Code HTTP de la réponse (200 = OK, 404 = non trouvé, etc.)

xmlhttp.responseXML : Contenu de la réponse sous forme de document XML.

Méthodes utilisées :

xmlhttp.open(method, url, async) : Initialise la requête.

method = "GET" ici

url = chemin du fichier XML

async = true = asynchrone

xmlhttp.send() : Envoie la requête au serveur.

push(element) : Ajoute un élément à la fin du tableau.

slice(start, end) : Retourne une copie d’une partie du tableau.

Ici questionsFiltrees = toutesQuestions.slice() : crée une copie pour pouvoir filtrer/trier sans modifier l’original.
Math.min(a, b) : Retourne le plus petit des deux nombres.

Math.ceil(number) : Retourne le plus petit entier supérieur ou égal au nombre.

Math.ceil() est une méthode JavaScript qui arrondit un nombre à l’entier supérieur le plus proche.

Math.floor() est une méthode JavaScript qui arrondit un nombre à l’entier inférieur le plus proche.

Autrement dit, elle retourne le plus grand entier qui est inférieur ou égal au nombre donné.

includes() est une méthode des chaînes de caractères en JavaScript.

Elle vérifie si une chaîne contient une sous-chaîne spécifique.

Retourne toujours un booléen :

true si la sous-chaîne est trouvée

false si elle n’est pas trouvée

toutesQuestions est ton tableau d’objets question.

.find() cherche le premier élément du tableau qui satisfait une condition donnée.

window.location.search renvoie la partie de l’URL après le ?
ors window.location.search = "?id=5&theme=html"

new URLSearchParams(...) crée un objet pratique pour lire les paramètres de l’URL.0

ransformer un tableau en chaîne de caractères, en concaténant tous ses éléments avec un séparateur choisi.
Math.random() retourne un nombre entre 0 et 1, par Exemple
localStorage.getItem("scores")

Lit un élément stocké.

Transformer une valeur venant de l’URL (toujours du TEXTE)

en un nombre utilisable pour faire des calculs.

localStorage.setItem(nomClé, valeurClé)
 Ajouter ou modifier la valeur d'une clé
• localStorage.getItem(nomClé)
 Renvoie la valeur associée à la clé passée en paramètre
• localStorage.removeItem()
Supprimer la ressource avec le nom de clé correspondant du
storage

 getElementById("objet_id")
 Cherche l'objet (un nœud DOM) avec l'identifiant donné et
renvoie cet objet