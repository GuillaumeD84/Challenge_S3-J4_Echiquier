var gameChess = {
  // Nombre de case de l'échiquier
  squareAmount: 64,
  // Taille en px de chaques cases
  squareSize: 80,
  init: function() {
    gameChess.drawSquares();
    gameChess.stylizeSquares();
    gameChess.nameSquares();
    gameChess.createEvents();
    gameChess.selectableSquares();
  },
  // Créé un event sur la div principale pour la gestion des cases sélectionnables
  createEvents: function() {
    // Récupère la liste de toutes les cases dans un tableau via leur nom de class
    var gameBoard = document.getElementById("chess");
    gameBoard.addEventListener("click", gameChess.selectableSquares);
  },
  // Créé les 64 divs avec leurs classes, autrement dit nos 64 cases
  drawSquares: function() {
    // On récupère la div principale qui contiendra toutes les cases
    var gameBoard = document.getElementById("chess");
    // Les objets DocumentFragments sont analogues à des nœuds du DOM, mais ne font pas partie de l´arbre DOM. Le cas d´usage le plus courant consiste à créer un fragment pour y stocker des éléments, puis à ajouter en une seule opération le fragment à l'arbre DOM, ce qui a pour effet de le remplacer par tous ses éléments enfants.
    // Le principal avantage de cette méthode de mise à jour du DOM vient du fait que le fragment est stocké en mémoire, et pas dans l'arbre DOM lui-même, de sorte que le modifier ne déclenche pas de reflow (le calcul des positions et de la géométrie de chacun des éléments de la page affichée). Par conséquent, l´utilisation de fragments pour effectuer des mises à jour du DOM donne souvent lieu à une amélioration des performances.
    var fragment = document.createDocumentFragment();

    var whiteSquareDiv;
    var blackSquareDiv;

    // Ce premier for execute 4 fois ce qu'il contient
    for (var i = 0; i < 8; i++) {
      // Dans celui ci on créé des 'cases' que l'on ajoute à notre 'fragment'
      for (var j = 0; j < 4; j++) {

        // On créé un élément 'div'
        whiteSquareDiv = document.createElement("div");
        // On lui ajoute la classe 'whiteSquare'
        whiteSquareDiv.className = "whiteSquare";
        // Cette fois-ci on utilise classList.add pour ajouter une classe à la suite de la première sinon si on avait utilisé whiteSquareDiv.className += "square"; on aurait obtenu une seule classe 'whiteSquaresquare'
        whiteSquareDiv.classList.add("square");

        blackSquareDiv = document.createElement("div");
        blackSquareDiv.className = "blackSquare";
        blackSquareDiv.classList.add("square");

        // Si les lignes sont paires on commence par une case blanche
        if (i%2 != 1) {
          fragment.appendChild(whiteSquareDiv);
          fragment.appendChild(blackSquareDiv);
        }
        // Sinon on commence par une case noire
        else {
          fragment.appendChild(blackSquareDiv);
          fragment.appendChild(whiteSquareDiv);
        }
      }
    }
    // Comme indiqué dans le pavet plus haut concernant les fragments, on l'ajoute désormais à notre arbre DOM
    gameBoard.appendChild(fragment);
  },
  // On applique le style à notre plateau de jeu et aux 64 cases
  stylizeSquares: function() {
    // Style du plateau
    document.getElementById("chess").style.border = "5px solid #50312b";
    document.getElementById("chess").style.width = "650px";
    document.getElementById("chess").style.height = "650px";
    // Petite astuce pour supprimer les espaces entre les divs
    document.getElementById("chess").style.fontSize = "0";

    // Style des cases
    var whiteSquares = document.getElementsByClassName("whiteSquare");
    var nbrWhiteSquares = gameChess.squareAmount / 2;

    var blackSquares = document.getElementsByClassName("blackSquare");
    var nbrblackSquares = gameChess.squareAmount / 2;

    for (var i = 0; i < nbrWhiteSquares; i++) {
      whiteSquares[i].style.display = "inline-block";
      whiteSquares[i].style.backgroundColor = "#efe0d1";
      whiteSquares[i].style.width = "80px";
      whiteSquares[i].style.height = "80px";
    }

    for (var i = 0; i < nbrWhiteSquares; i++) {
      blackSquares[i].style.display = "inline-block";
      blackSquares[i].style.backgroundColor = "#70433c";
      blackSquares[i].style.width = "80px";
      blackSquares[i].style.height = "80px";
    }
  },
  // Insère dans chaques cases leur postion avec du texte "LettreChiffre" ("ColonneLigne")
  nameSquares: function() {
    var gameBoard = document.getElementById("chess");
    var fragment = document.createDocumentFragment();

    var squares = document.getElementsByClassName("square");

    // On prépare un tableau contenant les lettres de nos colonnes
    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H"];

    var squareColumn;
    var squareRow;

    // On ajoute les lettres
    for (var i = 0; i < 8; i++) {
      for (var j = i; j < squares.length; j = j + 8) {
        squareColumn = document.createElement("p");
        squareColumn.textContent = alphabet[i];
        squares[j].appendChild(squareColumn);
      }
    }

    squareRow = document.getElementsByTagName("p");
    var actualLine = 8;

    // Et on ajoute les chiffres
    for (var row = 0; row < squares.length; row = row + 8) {
      for (var column = 0; column < 8; column++) {
        squareRow[row + column].textContent += actualLine;
        gameChess.addSquarePositionStyle(squareRow[row + column]);
      }
      actualLine--;
    }
  },
  // Permet de styliser le texte dans les cases (cette fonction est appelée dans la fonction nameSquares)
  addSquarePositionStyle: function(actualSquare) {
    actualSquare.style.height = "100%";
    actualSquare.style.fontSize = "24px";
    actualSquare.style.fontWeight = "bold";
    actualSquare.style.display = "flex";
    actualSquare.style.justifyContent = "center";
    actualSquare.style.alignItems = "center";
  },
  // Stylise les cases où l'on a cliqué
  selectableSquares: function(evt) {
    // Cette première ligne permet d'ajouter la classe 'selected' à la case qui a déclenchée l'event. Ici on ne s'en sert pas vraiment car on appliquera juste après du style à cette case directement, et non pas en se référant à sa classe.
    // Evité d'utiliser event.target car il s'agit en fait de window.event.target, c'est à dire que c'est le dernier élément enregistré par window et si en cliquant sur notre case il y a plusieurs events cela risque de poser problème
    evt.target.classList.add("selected");
    evt.target.style.color = "red";
    evt.target.style.border = "1px solid red";
  }
}

gameChess.init();
