// Tableau qui contiendra toutes les questions chargées depuis le fichier XML
let questions = [];

// Index de la question actuelle affichée
let questionActuelle = 0;

// Score total du joueur
let score = 0;

// Index du choix sélectionné par le joueur (-1 signifie aucun choix)
let choixIndex = -1;

// Thème du quiz, par défaut "all" pour toutes les questions
let theme = 'all';

// Nombre de questions à afficher
let nombreQuestions = 0;

// Objet XMLHttpRequest pour charger le fichier XML avec les questions
let xmlRequest = new XMLHttpRequest();

// Fonction pour lire les paramètres de l'URL (theme et nombre de questions)
//Window.location
//  La propriété en lecture seule Window.location renvoie un objet
//Location qui contient des informations à propos de l'emplacement courant du document
function lireUrl() {
  let parametres = new URLSearchParams(window.location.search);
  let themeUrl = parametres.get("theme"); // récupère le paramètre "theme"
  let nombreUrl = parametres.get("count"); // récupère le paramètre "count"

  if (themeUrl) {
    theme = themeUrl; // applique le thème si présent dans l'URL
  }
  if (nombreUrl && parseInt(nombreUrl) > 0) {
    nombreQuestions = parseInt(nombreUrl); // applique le nombre de questions si valide
  }
}

// Fonction pour démarrer le jeu
function demarrerJeu() {
  chargerXml(); // charge le fichier XML contenant les questions
}

// Fonction pour charger le fichier XML via XMLHttpRequest
function chargerXml() {
  xmlRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      lireQuestions();
    }
  };
  xmlRequest.open("GET", "data/bdd.xml", true);
  xmlRequest.send();
}
// Fonction pour lire les questions depuis le XML
function lireQuestions() {
  let xmlDoc = xmlRequest.responseXML; // récupère le document XML
  let toutesQuestions = xmlDoc.getElementsByTagName('question'); // récupère tous les éléments <question>
  questions = [];

  for (let i = 0; i < toutesQuestions.length; i++) {
    let id = toutesQuestions[i].getElementsByTagName('id')[0].textContent;
    let texte = toutesQuestions[i].getElementsByTagName('contenu')[0].textContent;
    let bonneReponse = toutesQuestions[i].getElementsByTagName('bonne_reponse')[0].textContent;
    let points = parseInt(toutesQuestions[i].getElementsByTagName('point')[0].textContent);
    let image = toutesQuestions[i].getElementsByTagName('image')[0].textContent;
    let themeQuestion = toutesQuestions[i].getElementsByTagName('thematique')[0].textContent;
    let reponse1 = toutesQuestions[i].getElementsByTagName('reponse1')[0].textContent;
    let reponse2 = toutesQuestions[i].getElementsByTagName('reponse2')[0].textContent;
    let reponse3 = toutesQuestions[i].getElementsByTagName('reponse3')[0].textContent;

    // Mélange les réponses pour qu'elles ne soient pas toujours dans le même ordre
    let reponses = [bonneReponse, reponse1, reponse2, reponse3];
    let reponsesMelangees = melanger(reponses);
    let indexBonne = reponsesMelangees.indexOf(bonneReponse); // index de la bonne réponse après mélange

    // Ajoute la question au tableau sous forme d'un tableau [id, texte, bonneReponse, points, image, theme, réponses, indexBonne]
    questions.push([id, texte, bonneReponse, points, image, themeQuestion, reponsesMelangees, indexBonne]);
  }

  preparerQuestions(); // prépare les questions pour le jeu
}

// Fonction pour filtrer et limiter les questions selon le thème et le nombre
function preparerQuestions() {
  // Filtrage par thème si nécessaire
  if (theme && theme !== 'all') {
    let questionsFiltrees = [];
    for (let i = 0; i < questions.length; i++) {
      if (questions[i][5] === theme) {
        questionsFiltrees.push(questions[i]);
      }
    }
    questions = questionsFiltrees;
  }

  // Détermine le nombre de questions à afficher
  let nombre = nombreQuestions;
  if (!nombre) {
    nombre = Math.floor(Math.random() * 6) + 10; // nombre aléatoire entre 10 et 15
  }

  // Si plus de questions que le nombre souhaité, on mélange et on coupe
  if (questions.length > nombre) {
    questions = melanger(questions).slice(0, nombre);
  }

  afficherJeu(); // passe à l'affichage du jeu
}

// Fonction pour afficher le jeu et cacher l'écran de démarrage
function afficherJeu() {
  document.getElementById('start-screen').classList.add('hidden'); // cache l'écran de départ
  document.getElementById('game-screen').classList.remove('hidden'); // affiche l'écran du jeu
  afficherQuestion(); // affiche la première question
}

// Fonction pour mélanger un tableau (algorithme Fisher-Yates)
function melanger(tableau) {
  for (let i = tableau.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = tableau[i];
    tableau[i] = tableau[j];
    tableau[j] = temp;
  }
  return tableau;
}

// Fonction pour afficher une question
function afficherQuestion() {
  if (questionActuelle >= questions.length) {
    finJeu(); // si plus de questions, termine le jeu
    return;
  }

  let question = questions[questionActuelle];
  document.getElementById('question-text').textContent = question[1]; // affiche le texte de la question

  let imageElement = document.getElementById('question-image');
  let containerImage = document.getElementById('image-container');

  // Affiche l'image si elle existe
  if (question[4]) {
    imageElement.src = question[4];
    imageElement.alt = "Image Pokémon";
    containerImage.style.display = 'block';
  } else {
    containerImage.style.display = 'none';
  }

  let containerReponses = document.getElementById('answers-container');
  containerReponses.innerHTML = ''; // vide les anciennes réponses
  choixIndex = -1; // aucun choix sélectionné

  // Crée les boutons pour chaque réponse
  for (let i = 0; i < question[6].length; i++) {
    let reponse = question[6][i];
    let bouton = document.createElement('button');
    bouton.className = 'btn btn-outline-primary answer-btn'; // classe Bootstrap pour bouton primaire avec contour
    bouton.textContent = reponse;
    bouton.value = i; // index de la réponse
    bouton.onclick = gererClicReponse; // événement au clic
    containerReponses.appendChild(bouton);
  }

  // Affiche la pagination des questions
  let pagination = document.getElementById('pagination-jeu');
  pagination.innerHTML = "<span class='fw-bold'>Question " + (questionActuelle + 1) + "/" + questions.length + "</span>";

  // Désactive le bouton valider et cache le bouton suivant
  document.getElementById('validate-btn').disabled = true;
  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('result-message').textContent = '';
  document.getElementById('result-message').className = 'alert'; // supprime styles précédents
}

// Gestion du clic sur une réponse
function gererClicReponse(event) {
    let boutonClique = event.target; 
    let index = parseInt(boutonClique.value);
    choisirReponse(index, boutonClique);
}

// Fonction pour sélectionner une réponse
function choisirReponse(index, bouton) {
  choixIndex = index;
  let tousBoutons = document.querySelectorAll('.answer-btn');

  // Réinitialise le style de tous les boutons
  for (let i = 0; i < tousBoutons.length; i++) {
    tousBoutons[i].classList.remove('selected', 'btn-primary');
    tousBoutons[i].classList.add('btn-outline-primary');
  }

  // Applique le style sélectionné au bouton cliqué
  bouton.classList.remove('btn-outline-primary');
  bouton.classList.add('btn-primary', 'selected');
  document.getElementById('validate-btn').disabled = false; // active le bouton valider
}

// Fonction pour vérifier si la réponse est correcte
function verifierReponse() {
  if (choixIndex === -1) return;
  let question = questions[questionActuelle];
  let estCorrect = (choixIndex === question[7]); // compare avec l'index de la bonne réponse
  let boutons = document.querySelectorAll('.answer-btn');
  let message = document.getElementById('result-message');

  // Change le style des boutons pour indiquer correct / incorrect
  for (let i = 0; i < boutons.length; i++) {
    boutons[i].disabled = true;
    if (i === question[7]) {
      boutons[i].classList.remove('btn-outline-primary', 'btn-primary');
      boutons[i].classList.add('btn-success'); // vert pour correct
    } else if (i === choixIndex && i !== question[7]) {
      boutons[i].classList.remove('btn-outline-primary', 'btn-primary');
      boutons[i].classList.add('btn-danger'); // rouge pour incorrect
    } else {
      boutons[i].classList.remove('btn-outline-primary', 'btn-primary');
      boutons[i].classList.add('btn-secondary'); // gris pour les autres
    }
  }

  // Affiche le message de résultat
  if (estCorrect) {
    score += question[3];
    message.textContent = "Bonne réponse ! +" + question[3] + " points";
    message.className = 'alert alert-success'; // alerte verte
  } else {
    message.textContent = "Mauvaise réponse ! La bonne était : " + question[2];
    message.className = 'alert alert-danger'; // alerte rouge
  }

  document.getElementById('validate-btn').disabled = true;
  document.getElementById('next-btn').style.display = 'inline-block'; // affiche bouton suivant
}

// Fonction pour passer à la question suivante
function questionSuivante() {
  questionActuelle++;
  if (questionActuelle < questions.length) {
    afficherQuestion();
  } else {
    finJeu();
  }
}

// Fonction pour terminer le jeu et afficher le score
function finJeu() {
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('result-screen').classList.remove('hidden');
  document.getElementById('score-final').textContent = 'Score : ' + score + ' points';

  let scoreMax = 0;
  for (let i = 0; i < questions.length; i++){
     scoreMax += questions[i][3]; // somme des points possibles
  }
  let pourcentage = (score / scoreMax) * 100;
  let message = document.getElementById('message-final');

  // Affiche un message selon la performance
  if (pourcentage >= 80) {
    message.textContent = 'Excellent ! Maître Pokémon !';
  }
  else if (pourcentage >= 60) {
    message.textContent = 'Bien joué ! Continue !';
  }
  else if (pourcentage >= 40) {
    message.textContent = 'Pas mal ! Entraîne-toi !';
  }
  else{
    message.textContent = 'Courage ! Tu peux !';
  }

  sauvegarderScore(score, scoreMax, theme); // sauvegarde le score dans le localStorage
}

// Fonction pour sauvegarder le score localement
function sauvegarderScore(scoreActuel, scoreMax, theme) {
    let dateHeure = new Date().toLocaleString('fr-FR'); 
    let nouveauScore = dateHeure + "|" + scoreActuel + "|" + scoreMax + "|" + theme;
    let scoresText = localStorage.getItem('scores') || "";
    if (scoresText === "") {
        scoresText = nouveauScore;
    } else {
        scoresText = scoresText + ";" + nouveauScore;
    }
    localStorage.setItem('scores', scoresText); // stocke le score
}

// Fonction pour rejouer au quiz
function rejouer() {
  questionActuelle = 0;
  score = 0;
  document.getElementById('result-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  afficherQuestion();
}

// Lecture des paramètres d'URL au chargement de la page
lireUrl();
