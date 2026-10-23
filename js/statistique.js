/**
 * Lit les scores stockés dans le localStorage et les transforme en tableau structuré
 */
function lireScores() {
    // Récupère les scores depuis le localStorage ou une chaîne vide si aucun score n'existe
    let scoresText = localStorage.getItem('scores') || "";
    let scores = []; // Tableau qui contiendra les scores formatés
    
    // Vérifie si des scores existent dans le localStorage
    if (scoresText !== "") {
        // Sépare la chaîne de caractères en tableau de scores individuels
        // Chaque score est séparé par un point-virgule
        let scoresTab = scoresText.split(";");
        
        // Parcourt chaque score individuel dans le tableau
        for (let i = 0; i < scoresTab.length; i++) {
            // Sépare les données du score en utilisant le pipe comme séparateur
            // Format attendu: "date|bonnesReponses|totalPoints|theme"
            let scoreData = scoresTab[i].split("|");
            
            // Vérifie que le score contient bien toutes les données nécessaires (4 éléments)
            if (scoreData.length >= 4) {
                // Ajoute un nouveau score formaté au tableau des scores
                // Conversion des nombres de string vers integer
                scores.push([
                    scoreData[0],           // Date et heure (string)
                    parseInt(scoreData[1]), // Nombre de bonnes réponses (number)
                    parseInt(scoreData[2]), // Nombre total de points (number)
                    scoreData[3]            // Thème du quiz (string)
                ]);
            }
        }
    }
    return scores; // Retourne le tableau des scores formatés
}

/**
 * Dessine un histogramme des scores dans un canvas HTML
 * Affiche les performances de l'utilisateur sous forme de barres colorées
 */
function dessinerHistogramme() {
    // Récupère les scores depuis le localStorage
    let scores = lireScores();
    console.log("Scores (Tableaux) :", scores); // Debug: affiche les scores dans la console

    // Récupère l'élément canvas du DOM
    let canvas = document.getElementById('monHistogramme');

    // Si le canvas n'existe pas, arrête l'exécution de la fonction
    if (!canvas) return;

    // Obtient le contexte 2D pour dessiner sur le canvas
    let ctx = canvas.getContext('2d');

    // Efface tout le canvas avant de redessiner
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Configuration de l'apparence des barres
    let largeurBarre = 40;   // Largeur en pixels de chaque barre
    let espace = 15;         // Espace entre les barres
    let hauteurMax = canvas.height - 80; // Hauteur maximale des barres (avec marge)

    // Parcourt tous les scores pour dessiner les barres correspondantes
    for (let i = 0; i < scores.length; i++) {
        let score = scores[i]; // Récupère le score courant

        // Sépare la date et l'heure (format: "YYYY-MM-DD HH:MM:SS")
        let [datePart, timePart] = score[0].split(" ");

        // Calcule le pourcentage de bonnes réponses
        let pourcentage = 0;
        // Évite la division par zéro
        if (score[2] > 0) {
            pourcentage = (score[1] / score[2]) * 100;
        }

        // Calcule la hauteur de la barre proportionnelle au pourcentage
        // Le facteur 0.70 permet de ne pas utiliser toute la hauteur disponible
        let hauteurBarre = (pourcentage / 100) * hauteurMax * 0.70;

        // Calcule la position horizontale de la barre
        let x = i * (largeurBarre + espace) + 30; // Position X avec marge gauche
        let y = canvas.height - hauteurBarre - 60; // Position Y (bas du canvas - hauteur barre - marge)

        // Détermine la couleur de la barre en fonction du pourcentage
        if (pourcentage >= 80) {
            ctx.fillStyle = "#28a745"; // Vert pour excellente performance
        } else if (pourcentage >= 50) {
            ctx.fillStyle = "#ffc107"; // Jaune pour performance moyenne
        } else {
            ctx.fillStyle = "#dc3545"; // Rouge pour faible performance
        }

        // Dessine la barre de l'histogramme
        ctx.fillRect(x, y, largeurBarre, hauteurBarre);
        
        // Configure le style du texte
        ctx.textAlign = "center";
        ctx.fillStyle = "black";

        // Affiche le score (bonnes réponses / total) au-dessus de la barre
        ctx.font = "13px Arial";
        ctx.fillText(score[1] + "/" + score[2], x + largeurBarre / 2, y - 5);

        // Affiche les informations sous la barre
        ctx.font = "10px Arial";
        ctx.fillText(datePart, x + largeurBarre / 2, canvas.height - 35); // Date
        ctx.fillText(timePart, x + largeurBarre / 2, canvas.height - 23); // Heure
        ctx.fillText(score[3], x + largeurBarre / 2, canvas.height - 11); // Thème
    }
}

/**
 * Supprime toutes les statistiques du localStorage et met à jour l'histogramme
 */
function supprimerStatistiques() {
    localStorage.removeItem("scores"); // Supprime l'élément 'scores' du localStorage
    dessinerHistogramme();            // Redessine l'histogramme (qui sera vide)
}

// Dessine l'histogramme au chargement de la page
dessinerHistogramme();