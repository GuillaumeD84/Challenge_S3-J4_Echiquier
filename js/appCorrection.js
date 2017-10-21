var app = {
  init: function() {
    chess = document.getElementById("chess");

    var alpha = "ABCDEFGH";

    var rowHTML = "<tr>";

    for (var lines = 0; lines < 8; lines++) {
      for (var columns = 0; columns < 8; columns++) {

        // var index = (columns+1) + 8*(lines);
        var isWhite = (lines % 2 === columns % 2)

        // La syntaxe suivante est équivalente à un if else
        rowHTML += (isWhite) ? "<td class='whiteSquare'>" + alpha[columns] + (8 - lines) + "</td>":"<td class='blackSquare'>" + alpha[columns] + (8 - lines) + "</td>";
      }
      rowHTML += "</tr>";
    }

    var tableHTML = "<table>" + rowHTML + "</table>";
    console.log(tableHTML);

    chess.innerHTML = tableHTML;
  }
}

app.init();
