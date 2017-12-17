var youCanPlay = false;

function showAllCardsFiveSec() {
    var crds = $(".card");
    youCanPlay = false;
    createGameArray();
    printGameArray();
    showCard();
    crds.css({opacity : "1"});
    printGameArray();
    var timerId = setTimeout(function () {
        hideCard();
        printGameArray();
        youCanPlay = true;
    }, 5000);


    $(document).ready(function () {
        $("#restart").click(function () {
            clearTimeout(timerId);
        })
    })
}

function showCard() {
    for (i=0; i<3; i++) {
        for (j=0; j<6; j++) {
            gameArray[i][j][1] = true;
        }
    }
}

function hideCard() {
    for (i=0; i<3; i++) {
        for (j=0; j<6; j++) {
            gameArray[i][j][1] = false;
        }
    }
}

$(document).ready(function() {
    $(".new-game-button").click(function () {
        $("#shuffle")[0].play();
        canPressEnter = false;
        score = 0;
        changeScore();
        numOpenPairs = 0;
        idxOpenedCards = [];
        openedCards = [];
        $(".card").css({"pointer-events" : "auto"});

        var startMenu = $("#start-menu");
        var endMenu = $("#end-game");
        startMenu.animate({ opacity: 0 }, 1000);
        endMenu.animate({ opacity: 0 }, 1000);
        setTimeout(function () {startMenu.css({display : "none"}); endMenu.css({display : "none"}); showGameField()}, 1000);
        function showGameField() {
            var gameField = $("#game");
            gameField.css({opacity: 0, display: "table-cell"});
            youCanPlay = false;
            gameField.animate({opacity: 1}, 1000);
            setTimeout(function () {showAllCardsFiveSec()}, 1000)
        }
    });
});

var canPressEnter = true;
$(document).keyup(function(){
    but = $("#start-game");
    if ((event.keyCode==13) && (canPressEnter))
    {
        but.trigger("click");
        return false;
    }
})