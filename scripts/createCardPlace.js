for (i=1; i<=3; i++) {
    var gameField = $("#game-field");
    gameField.append('<div class="cards-line" id="line-' + i + '">');
    var line = $("#line-" + i)
    for (j=1; j<=6; j++) {
        line.append('<div class="card" id="' + i + '-' + j + '" data-tid="Card">')
    }
}