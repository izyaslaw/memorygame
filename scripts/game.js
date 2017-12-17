arrRatings = ["0", "A", "2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K"];
arrSuits = ["C", "D", "H", "S"];
$(new Image()).attr('src', 'images/Cards/rubashka.png')
arrRatings.forEach(function (rating) {
    arrSuits.forEach(function (suit) {
        $(new Image()).attr('src', 'images/Cards/'+ rating + suit +'.png')
    })
})

gameArray = [];
for (i=0; i<3; i++) {
    var line = [];
    for (j=0; j<6; j++) {
        line.push([[0,0], false])
    }
    gameArray.push(line)
}

var score = 0;
var numOpenPairs = 0;
var idxOpenedCards = [];
var openedCards = [];

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createGameArray() {
    var arrOfUsedCards = [];
    var placesArr = [];
    var arrOfAllCards = []
    for (i=0; i<3; i++) {
        for (j=0; j<6; j++) {
            placesArr.push([i,j]);
        }
    }
    for (i=1; i<=13; i++) {
        for (j=1; j<=4; j++) {
            arrOfAllCards.push([i,j])
        }
    }
    for (i=0; i<9; i++) {
        var l = arrOfAllCards.length;
        var idxCard = random(0, l - 1);
        var card = arrOfAllCards[idxCard];
        arrOfAllCards.splice(idxCard, 1);
        arrOfUsedCards.push(card);
        arrOfUsedCards.push(card);
    }
    for (i=0; i<18; i++) {
        var crd = arrOfUsedCards[i];
        var len = placesArr.length;
        var l = random(0, len - 1);
        gameArray[placesArr[l][0]][placesArr[l][1]] = crd;
        for (j=0; j<len; j++) {
            var elem = placesArr.shift();
            if (j !== l) placesArr.push(elem);
        }
    }
    for (i=0; i<3; i++) {
        for (j=0; j<6; j++) {
            gameArray[i][j] = [gameArray[i][j], false];
        }
    }
}

function printGameArray() {
        for (i = 1; i <= 3; i++) {
            for (j = 1; j <= 6; j++) {
                var changeDataTid = false;
                var rating = "";
                var suit = "";
                var crd = gameArray[i - 1][j - 1];
                if (crd[1]) {
                    changeDataTid = true;
                    switch (crd[0][0]) {
                        case 1:
                            rating = "A";
                            break;
                        case 10:
                            rating = "0";
                            break;
                        case 11:
                            rating = "J";
                            break;
                        case 12:
                            rating = "Q";
                            break;
                        case 13:
                            rating = "K";
                            break;
                        default:
                            rating = crd[0][0]
                    }
                    switch (crd[0][1]) {
                        case 1:
                            suit = "D";
                            break;
                        case 2:
                            suit = "H";
                            break;
                        case 3:
                            suit = "C";
                            break;
                        case 4:
                            suit = "S";
                            break;
                    }
                    cardPictName = "url(\"images/Cards/" + rating + suit + ".png\")";
                }
                else cardPictName = "url(\"images/Cards/rubashka.png\")";

                $(document).ready(function () {
                    var card = $("#" + i + "-" + j);
                    if (changeDataTid) card.attr("data-tid", "Card-flipped");
                    else card.attr("data-tid", "Card");

                    var prevBkgrImg = card.css("background-image");
                    if (prevBkgrImg !== cardPictName) {
                        card.css({"background-image": cardPictName})
                    }
                })
            }
        }
}

function checkEndGame() {
    if (numOpenPairs === 9) {
        canPressEnter = true;
        $("#resultScore").text("Ваш итоговый счёт: " + score);
        $("#game").animate({opacity : "0"}, 1000, function () {
            $("#game").css({display : "none"});
            $("#end-game")
                .css({display : "table-cell"})
                .animate({opacity : "1"}, 1000);
        })
    }
}

function changeScore() {
    $("#score").text("Очки: " + score);
    $("#realScore").text(score);
}

function checkArray() {
        if ((openedCards[0][0] === openedCards[1][0]) && (openedCards[0][1] === openedCards[1][1])) {
            score += (9 - numOpenPairs)*42;
            changeScore();
            var crd1 = $("#" + idxOpenedCards[0][0] + "-" + idxOpenedCards[0][1]);
            var crd2 = $("#" + idxOpenedCards[1][0] + "-" + idxOpenedCards[1][1]);
            $("#yeah")[0].play();
            crd1.animate({opacity : "0"}, 500);
            crd1.css({"pointer-events" : "none"});
            crd2.animate({opacity : "0"}, 500);
            crd2.css({"pointer-events" : "none"});
            numOpenPairs++;
        }
        else {
            score += numOpenPairs*(-42);
            changeScore();
            $("#" + idxOpenedCards[0][0] + "-" + idxOpenedCards[0][1]).css({"pointer-events" : "auto"});
            gameArray[idxOpenedCards[0][0] - 1][idxOpenedCards[0][1] - 1][1] = !(gameArray[idxOpenedCards[0][0] - 1][idxOpenedCards[0][1] - 1][1]);
            gameArray[idxOpenedCards[1][0] - 1][idxOpenedCards[1][1] - 1][1] = !(gameArray[idxOpenedCards[1][0] - 1][idxOpenedCards[1][1] - 1][1]);
        }
        idxOpenedCards.shift();
        idxOpenedCards.shift();
        openedCards.shift();
        openedCards.shift();
}

$(document).ready(function () {
    $("#restart").click(function () {
        $(".card").css({opacity : "0"});
        $("#game").css({opacity : "0"});
        $(".new-game-button").trigger("click");
    })
});


$(document).ready(function() {
    $(".card").click(function() {
        if (youCanPlay) {
            youCanPlay = false;
            var cardId = this.id;
            $("#take")[0].play();
            var x = parseInt(cardId.charAt(0)) - 1;
            var y = parseInt(cardId.charAt(2)) - 1;
            gameArray[x][y][1] = !(gameArray[x][y][1]);
            idxOpenedCards.push([x + 1, y + 1]);
            openedCards.push(gameArray[x][y][0]);
            if (idxOpenedCards.length === 1) {$("#" + (x+1) + "-" + (y+1)).css({"pointer-events" : "none"}); youCanPlay = true;}
            printGameArray();
            if (idxOpenedCards.length > 1) {
                setTimeout(function () {
                    checkArray();
                    printGameArray();
                    checkEndGame();
                    youCanPlay = true;
                }, 500);
            }
        }
    });
});

