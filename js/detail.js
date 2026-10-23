// Déclaration d'un objet XMLHttpRequest pour effectuer des requêtes HTTP
let xmlhttp = new XMLHttpRequest();

// Tableau qui stockera toutes les questions chargées depuis le XML
let toutesQuestions = [];

// Fonction principale pour charger les questions depuis le fichier XML
function chargerQuestions() {
    // Définition de la fonction callback appelée à chaque changement d'état de la requête
    xmlhttp.onreadystatechange = function () {
        // Vérifie si la requête est terminée (readyState = 4) et réussie (status = 200)
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            
            // Récupère la réponse sous forme de document XML
            let xmlDoc = xmlhttp.responseXML;
            
            // Récupère tous les éléments <question> du document XML
            let x = xmlDoc.getElementsByTagName("question");
            
            // Parcourt chaque élément question trouvé dans le XML
            for (let i = 0; i < x.length; i++) {
                // Crée un tableau avec toutes les données de la question
                let question = [
                    x[i].getElementsByTagName("id")[0].textContent,           // ID de la question
                    x[i].getElementsByTagName("image")[0].textContent,        // URL de l'image
                    x[i].getElementsByTagName("thematique")[0].textContent,   // Thématique
                    x[i].getElementsByTagName("contenu")[0].textContent,      // Contenu texte
                    x[i].getElementsByTagName("bonne_reponse")[0].textContent, // Bonne réponse
                    x[i].getElementsByTagName("point")[0].textContent,        // Points attribués
                    x[i].getElementsByTagName("explication")[0].textContent   // Explication
                ];
                
                // Ajoute la question complète au tableau principal
                toutesQuestions.push(question);
            }
            
            // Une fois toutes les questions chargées, affiche la question demandée
            afficherQuestion();
        }
    };
    
    // Initialise la requête HTTP GET asynchrone (true) vers l'URL du fichier XML
   xmlhttp.open("GET", "data/bdd.xml", true);
    
    // Envoie la requête HTTP
    xmlhttp.send();
}

// Fonction pour afficher une question spécifique basée sur l'ID dans l'URL
function afficherQuestion() {
    // Récupère les paramètres de l'URL (après le '?')
    let urlParams = new URLSearchParams(window.location.search);
    
    // Récupère la valeur du paramètre 'id' dans l'URL
    let questionId = urlParams.get('id');
    
    // Recherche la question correspondant à l'ID dans le tableau
    let question = toutesQuestions.find(rechercheID);
    
    // Fonction de callback pour la méthode find() - recherche par ID
    function rechercheID(q) {
        // Compare l'ID de la question (premier élément du tableau) avec l'ID recherché
        return q[0] === questionId;
    }
    
    // Si une question a été trouvée
    if (question) {
        // Extrait toutes les données de la question dans des variables
        let id = question[0];           // ID
        let image = question[1];        // Image
        let type = question[2];         // Type/thématique
        let texte = question[3];        // Texte de la question
        let reponse = question[4];      // Bonne réponse
        let points = question[5];       // Points
        let explication = question[6];  // Explication
        
        // Met à jour le contenu HTML avec les données de la question
        document.getElementById('question-id').textContent = id;
        document.getElementById('question-image').src = image;
        document.getElementById('question-text').textContent = texte;
        document.getElementById('question-type').textContent = type;
        document.getElementById('question-points').textContent = points;
        document.getElementById('question-reponse').textContent = reponse;
        document.getElementById('question-explication').textContent = explication;
    } else {
        // Si la question n'est pas trouvée, affiche un message d'erreur
        document.getElementById('question-text').textContent = "Question non trouvée";
    }
}

// Démarrage du processus : appel de la fonction pour charger les questions
chargerQuestions();