// Création d'un objet XMLHttpRequest pour effectuer des requêtes HTTP
let xmlhttp = new XMLHttpRequest();

// Tableau pour stocker toutes les questions chargées depuis le XML
let toutesQuestions = [];

// Tableau pour stocker les questions après application des filtres
let questionsFiltrees = [];

// Configuration de la pagination : nombre d'éléments par page
let pageSize = 5;

// Page actuellement affichée
let pageCourante = 1;

/**
 * Charge le fichier XML distant via une requête HTTP GET
 */
function loadXMLDoc() {
    // Définition du gestionnaire d'événement pour les changements d'état de la requête
    xmlhttp.onreadystatechange = function () {
        // Vérifie si la requête est terminée (readyState = 4) et réussie (status = 200)
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            // Appelle la fonction pour parser le XML et charger les questions
            chargerToutesQuestions(); 
        }
    };
    
    // Initialise la requête GET vers l'URL du fichier XML
    xmlhttp.open("GET", "data/bdd.xml", true);
    
    // Envoie la requête
    xmlhttp.send();
}

/**
 * Affiche une page spécifique des questions filtrées
 * - Le numéro de la page à afficher
 */
function afficherPage(page) {
    // Met à jour la page courante
    pageCourante = page;

    // Calcule l'index de début et de fin pour la pagination
    let debut = (page - 1) * pageSize;
    let fin = Math.min(debut + pageSize, questionsFiltrees.length);

    // Construction du HTML pour le tableau
    let tbodyHTML = '';
    
    // Boucle sur les éléments de la page courante
    for (let i = debut; i < fin; i++) {
        let q = questionsFiltrees[i];

        // Construction d'une ligne de tableau pour chaque question
        tbodyHTML +=
            '<tr>' +
            '<td>' + q[0] + '</td>' + // ID de la question
            '<td><img src="' + q[1] + '" width="80" alt="Pokémon" class="img-thumbnail" loading="lazy"></td>' + // Image avec optimisation
            '<td>' + q[3] + '</td>' + // Contenu de la question
            '<td>' + q[2] + '</td>' + // Thématique
            '<td>' + q[4] + '</td>' + // Bonne réponse
            '<td>' + q[5] + '</td>' + // Points
            '<td><a href="detail.html?id=' + q[0] + '" class="btn btn-info btn-sm">Détails</a></td>' + // Lien vers page détail
            '</tr>';
    }

    // Injection du HTML dans le tableau
    document.getElementById("table-body").innerHTML = tbodyHTML;
    
    // Met à jour la pagination
    afficherPagination();
}

/**
 * Génère et affiche les boutons de pagination
 */
function afficherPagination() {
    // Calcule le nombre total de pages
    let totalPages = Math.ceil(questionsFiltrees.length / pageSize);
    let paginationHTML = '';
    
    // Crée un bouton pour chaque page seulement s'il y a plus d'une page
    if (totalPages > 1) {
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML +=
                '<input type="button" class="btn btn-primary mx-1" onclick="afficherPage(' + i + ')" value="' + i + '">';
        }
    }

    // Injection du HTML de pagination
    document.getElementById("pagination").innerHTML = paginationHTML;
}

/**
 * Parse le XML et charge toutes les questions dans le tableau
 */
function chargerToutesQuestions() {
    // Récupère le document XML parsé
    let xmlDoc = xmlhttp.responseXML;
    
    // Récupère tous les éléments "question"
    let x = xmlDoc.getElementsByTagName("question");

    // Réinitialise le tableau
    toutesQuestions = [];

    // Parcourt toutes les questions du XML
    for (let i = 0; i < x.length; i++) {
        // Crée un tableau avec les données de la question
        let question = [
            x[i].getElementsByTagName("id")[0].textContent,            // ID
            x[i].getElementsByTagName("image")[0].textContent,         // URL de l'image
            x[i].getElementsByTagName("thematique")[0].textContent,    // Thématique
            x[i].getElementsByTagName("contenu")[0].textContent,       // Contenu texte
            x[i].getElementsByTagName("bonne_reponse")[0].textContent, // Bonne réponse
            parseInt(x[i].getElementsByTagName("point")[0].textContent) // Points (converti en nombre)
        ];

        // Ajoute la question au tableau
        toutesQuestions.push(question);
    }
    
    // Initialise les questions filtrées avec toutes les questions
    questionsFiltrees = toutesQuestions.slice();
    
    // Affiche la première page
    afficherPage(1);
}

/**
 * Filtre les questions par thématique sélectionnée
 */
function filtrerData() {
    // Récupère la valeur du select de thématique
    let select = document.getElementById("thematique");
    let theme = select.value;
    
    // Applique le filtre
    if (theme === "Tout") {
        // Si "Tout" est sélectionné, affiche toutes les questions
        questionsFiltrees = toutesQuestions.slice();
    } else {
        // Sinon, filtre par thématique
        questionsFiltrees = [];
        for (let i = 0; i < toutesQuestions.length; i++) {
            if (toutesQuestions[i][2] === theme) {
                questionsFiltrees.push(toutesQuestions[i]);
            }
        }
    }

    // Réinitialise à la première page et affiche
    pageCourante = 1;
    afficherPage(pageCourante);
}

/**
 * Fonction de comparaison pour le tri par points
 * a - Première question à comparer
 *  b - Deuxième question à comparer
 *  - Résultat de comparaison (-1, 0, 1)
 */
function comparePoints(a, b) {
    return a[5] - b[5]; // Compare les points (index 5)
}

/**
 * Trie les questions par points (ordre croissant)
 */
function sortData() {
    questionsFiltrees.sort(comparePoints);
    afficherPage(1);
}

/**
 * Recherche des questions par mot-clé et thématique
 */
function rechercher() {
    // Récupère et normalise le terme de recherche
    let mot = document.getElementById("searchInput").value.trim().toLowerCase();
    let type = document.getElementById("thematique").value;
    
    let trouve = [];
    
    // Parcourt toutes les questions
    for (let i = 0; i < toutesQuestions.length; i++) {
        let question = toutesQuestions[i];
        
        // Combine le contenu, thématique et bonne réponse pour la recherche
        let texteComplet = (question[3] + question[2] + question[4]).toLowerCase();
        
        // Vérifie si le mot est trouvé (ou si la recherche est vide)
        let motTrouve = (mot === "" || texteComplet.includes(mot));
        
        // Vérifie la correspondance de thématique
        let themeTrouve = (type === "Tout" || question[2] === type);
        
        // Si les deux conditions sont remplies, ajoute aux résultats
        if (motTrouve && themeTrouve) {
            trouve.push(question);
        }
    }

    // Met à jour les questions filtrées et affiche
    questionsFiltrees = trouve;
    pageCourante = 1;
    afficherPage(pageCourante);
}

// Démarrage initial : charge le XML
loadXMLDoc();