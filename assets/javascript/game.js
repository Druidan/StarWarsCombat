$(document).ready(function(){


    const startButton = $(".start-button"); //Capture the Start Button.
    const lossPlayAgainButton = $(".loss-playAgainButton") //Capture the Play Again button for a loss condition.
    const winPlayAgainButton = $(".win-playAgainButton") //Capture the Play Again button for a win condition.
    const waitingRoom = $("#waiting-room"); //Capture the location of the "Waiting Room" section.
    const characters = $(".card"); //Capture the card elements.
    const clashButton = $(".attack-button"); //Capture the "Clash!" button.

    let characterTotal = 0;    //Set the base value of the number of characters.
    let defeatedEnemies = 1;    //This is the counter with which I determine if the player wins the game. It starts at 1 because you can't defeat yourself. Or can you?
    let powerMultiplier = 1;    //Starting value of the attack multiplier
    let winCounter = 0;      //Starting value for Wins.

    var gameOn = false; //turns most game functions on or off.
    var opponentSelected = false; //Combat Start Condition
    var playerDefeated = false; //Loss Condition
    var audioPlaying = false; //audio on setting

    var opponentDeath; //capturing death sound for use in combat.
    var playerLoss; //capturing loss sound for use on player loss.
    var playerWin; //capturing win sound for use in player win.

    const cards = {
        1: $(".card1"),
        2: $(".card2"),
        3: $(".card3"),
        4: $(".card4"),
        5: $(".card5"),
        6: $(".card6"),
        7: $(".card7"),
        8: $(".card8"),
    };

    const starWarsCharacters = {
        1: {
            name: "Anakin Skywalker",
            attack: 7,
            counterAttack: 7,
            hp: 11,
            id: "anakinCard",
            selected: "assets/sounds/anakin_intro.mp3",
            death: "assets/sounds/anakin_death.mp3",
            lose: "assets/sounds/anakin_lose.mp3",
            win: "assets/sounds/anakin_win.mp3"},
        2: {
            name: "Darth Maul",
            attack: 5,
            counterAttack: 5,
            hp: 1,
            id: "maulCard",
            selected: "assets/sounds/maul_intro.mp3",
            death: "assets/sounds/maul_death.mp3",
            lose: "assets/sounds/maul_lose.mp3",
            win: "assets/sounds/maul_win.mp3"},
        3: {
            name: "Darth Vader",
            attack: 8,
            counterAttack: 8,
            hp: 31,
            id: "vaderCard",
            selected: "assets/sounds/vader_intro.mp3",
            death: "assets/sounds/vader_death.mp3",
            lose: "assets/sounds/vader_lose.mp3",
            win: "assets/sounds/vader_win.mp3"},
        4: {
            name: "Emperor Palpatine",
            attack: 10,
            counterAttack: 10,
            hp: 135,
            id: "emperorCard",
            selected: "assets/sounds/emperor_selected.mp3",
            opponentIntro: "assets/sounds/emperor_intro.mp3",
            death: "assets/sounds/emperor_death.mp3",
            lose: "assets/sounds/emperor_lose.mp3",
            win: "assets/sounds/emperor_win.mp3"},
        5: {
            name: "Luke Skywalker",
            attack: 7,
            counterAttack: 7,
            hp: 5,
            id: "lukeCard",
            selected: "assets/sounds/luke_intro.mp3",
            death: "assets/sounds/luke_death.mp3",
            lose: "assets/sounds/luke_lose.mp3",
            win: "assets/sounds/luke_win.mp3"},
        6: {
            name: "Mace Windu",
            attack: 8,
            counterAttack: 8,
            hp: 18,
            id: "winduCard",
            selected: "assets/sounds/windu_intro.mp3",
            death: "assets/sounds/windu_death.mp3",
            lose: "assets/sounds/windu_lose.mp3",
            win: "assets/sounds/windu_win.mp3"},
        7: {
            name: "Yoda",
            attack: 9,
            counterAttack: 9,
            hp: 57,
            id: "yodaCard",
            selected: "assets/sounds/yoda_selected.mp3",
            death: "assets/sounds/yoda_death.mp3",
            lose: "assets/sounds/yoda_lose.mp3",
            win: "assets/sounds/yoda_win.mp3"},
        8: {
            name: "Obi Wan Kenobi",
            attack: 6,
            counterAttack: 6,
            hp: 2,
            id: "obiWanCard",
            selected: "assets/sounds/obi_intro.mp3",
            death: "assets/sounds/obi_death.mp3",
            altDeath: "assets/sounds/obi_death_v_vader.mp3",
            lose: "assets/sounds/obi_lose.mp3",
            win: "assets/sounds/obi_win.mp3"},
    };



//Use some For Loops to populate the character cards with their relevant statistics.
    //The engine that increases the number of characters at the start of the game. This will make it easier to add future characters.
    for (var property1 in starWarsCharacters) {
        if(starWarsCharacters[property1] !== null) {
            ++characterTotal
        }
    }
// For Loop that connects to each card's values and populates them with the relevant values from the starWarsCharacters Object.
    for (i=1; i <= characterTotal; i++) {
        //establish interior values that connect with aspects of the HTML and objects
        let currentCard = cards[i];
        let cycledCharacter = starWarsCharacters[i];
        let cardName = $('.card'+i+'Name');
        let cardHP = $(".card"+i+"HP");
        let cardPower = $(".card"+i+"Power");
        //If statement that checks the id in the card vs the object containing the statistics, then returns those statistics to the correct places in the HTML if true.
        if (currentCard.attr("id") === cycledCharacter.id) {
            cardName.text(cycledCharacter.name);
            cardHP.text(cycledCharacter.hp);
            cardPower.text(cycledCharacter.attack);
        }
    }

//On click formula for selecting the player's character and opponent characters.
    characters.on("click", function(){
        if (gameOn === false || opponentSelected === true || audioPlaying === true){
            return false;
        }
        const startFight = new sound("assets/sounds/ignite_saber.mp3");
        $(".command-text").text("Choose Your First Opponent!");
        $(".challengers").removeClass("buryIt");
        let clickedCharacter = $(this);
        let characterID = $(this).attr("id");
        if (clickedCharacter.hasClass("characterCard")){
            $(".characterCard").each(function() {
                $("#mainGameColumn").removeClass("col-12").addClass("col-md-9 col-xl-8");
                $("#waiting-room").removeClass("col-0").addClass("col-md-3 col-xl-4");
                if ($(this).attr("id") !== characterID) {
                    waitingRoom.append(this);
                    $(this).removeClass("characterCard").addClass("opponentCard");
                    $("#character-zone").removeClass("col-12").addClass("col-6");
                    $(".card-title").addClass("buryIt");
                    $(".card-text").addClass("buryIt");
                    $(".value-hook").removeClass("inner-value");
                } else {
                    $(this).removeClass("characterCard").addClass("playerCard");
                }
            });
        for (var property1 in starWarsCharacters) {
            if (starWarsCharacters[property1].id === characterID) {
                playerHP = starWarsCharacters[property1].hp;
                playerPower = starWarsCharacters[property1].attack;
                playerSelected = new sound(starWarsCharacters[property1].selected);
                playerLoss = new sound(starWarsCharacters[property1].lose);
                playerWin = new sound(starWarsCharacters[property1].win);
            };
        };
        var playerHP;
        var playerPower;
        var playerSelected;
        playerSelected.play();
            $(".challengers").text("Your Enemies"); 
            $("#my-hp").removeClass("col-0").addClass("col-3").append("<h3 class='myHP'>My HP</h3>");
            $(".myHP").append("<p class='HP'></p>");
            $(".HP").text(playerHP + (playerHP * (115 / playerHP)));
            $("#my-power").removeClass("col-0");
            $("#my-power").addClass("col-3");
            $("#my-power").append("<h3 class='myPower'>My Power</h3>");
            $(".myPower").append("<p class='power'></p>");
            $(".power").text(playerPower);
        } else { 
            if (clickedCharacter.hasClass("opponentCard")) {
                if (playerDefeated === true || opponentSelected === true || audioPlaying === true){
                    return false;
                }
                opponentSelected = true;
                let selectedOpponent = $(this);
                let opponentID = $(this).attr("id");
                let combatZone = $(".combatant-zone");
                let powerAdapter;
                startFight.play();
                for (var property1 in starWarsCharacters) {
                    if (starWarsCharacters[property1].id === $(".playerCard").attr("id")) {
                        powerAdapter = starWarsCharacters[property1].hp;
                    };
                };
                selectedOpponent.removeClass("opponentCard");
                selectedOpponent.addClass("currentCombatant");
                combatZone.append(clickedCharacter);
                $(".current-opponent-title").removeClass("buryIt");
                $(".attack-button").removeClass("buryIt").addClass("d-flex flex-row");
                //$(".challengers").text("Your Enemies") 
                for (let property1 in starWarsCharacters) {
                    if (starWarsCharacters[property1].id === opponentID) {
                        opponentHP = starWarsCharacters[property1].hp;
                        opponentPower = starWarsCharacters[property1].attack;
                        opponentCounterAttack = starWarsCharacters[property1].counterAttack;
                        if (characterID === "obiWanCard" && starWarsCharacters[property1].id === "vaderCard"){
                            opponentDeath = new sound(starWarsCharacters[property1].altDeath);
                        } else {
                            opponentDeath = new sound(starWarsCharacters[property1].death);
                        }
                        if (starWarsCharacters[property1].id === "emperorCard"){
                            opponentIntro = new sound(starWarsCharacters[property1].opponentIntro);
                            console.log(starWarsCharacters[property1].opponentIntro);
                        } else {
                            opponentIntro = new sound(starWarsCharacters[property1].selected);
                        }
                    };
                };
                var opponentHP;
                var opponentPower;
                var opponentCounterAttack;
                var opponentIntro;
                opponentIntro.play();
                $("#opponent-hp").append("<h3 class='opponentHP'>Their HP</h3>");
                $(".opponentHP").append("<p class='oHP'></p>");
                $(".oHP").text(opponentHP * (characterTotal - defeatedEnemies));
                $("#opponent-power").append("<h3 class='opponentPower'>Their Power</h3>");
                $(".opponentPower").append("<p class='opower'></p>");
                $(".opower").text(Math.round(opponentPower + (powerAdapter/(3+(characterTotal-defeatedEnemies)))));
                $(".command-text").text("Clash with Your Enemy!");
                console.log(gameOn);
                if ($("#my-power").hasClass("hasMultiplier") === false) {
                    $("#my-power").addClass("hasMultiplier").append("<h3 class='myMultiplier'>Multiplier</h3>");
                    //$("#my-power");
                    $(".myMultiplier").append("<p class='multiplier'></p>");
                    $(".multiplier").text(powerMultiplier);
                    } 
                $("#my-power").append("<p class='opponentCounterAttack buryIt'></p>");
                $(".opponentCounterAttack").text(opponentCounterAttack);
            }
        }   
    })

//Now we set up combat through the Clash Button.
    clashButton.click(function(){
        if (gameOn === false || opponentSelected === false || audioPlaying === true){
            return false;
        }
        const clashSounds = ["assets/sounds/clash1.mp3", "assets/sounds/clash2.mp3", "assets/sounds/clash3.mp3", "assets/sounds/clash4.mp3", "assets/sounds/clash5.mp3", "assets/sounds/clash6.mp3", "assets/sounds/clash7.mp3",];
        const fightSound = new sound(clashSounds[Math.floor(Math.random()*clashSounds.length)]);
        fightSound.play();
        playerAttack = $(".power").text() * powerMultiplier;
        opponentHP = $(".oHP").text()-playerAttack;
        $(".oHP").text(opponentHP);
        ++powerMultiplier;
        $(".multiplier").text(powerMultiplier);
        opponentCounterAttack = $(".opower").text();
        PlayerHP = ($(".HP").text()-opponentCounterAttack);
        $(".HP").text(PlayerHP);
        if ($(".HP").text() <= 0){
            gameOn = false;
            playerLoss.play();
            const menuZone = $(".menuContent");
            const lossMenu = $("#lossMenu");
            const gameHead = $("#gameHeader");
            $("#menu-zone").removeClass("menuAdjust");
            gameHead.removeClass("gameHeader").addClass("buryIt");
            $("#my-power").remove(".opponentCounterAttack");
            menuZone.append(lossMenu);
            const winsInLossBox = $("#winsInLoss");
            winsInLossBox.append("<h3 class='wins'>Before Losing You Got To " + winCounter + " Wins.</h3>");
            opponentSelected = false;
            return
        }
        if (opponentHP <= 0) {
            let defeatedOpponent = $(".currentCombatant");
            let defeatedID = defeatedOpponent.attr("id");
            let stopDeath = false;
            setTimeout(function(){opponentDeath.play()}, 1500);
            defeatedOpponent.removeClass("currentCombatant").addClass("defeatedOpponent");
            waitingRoom.append(defeatedOpponent);
            $(".current-opponent-title").addClass("buryIt");
            $(".attack-button").addClass("buryIt").removeClass("d-flex flex-row");
            $(".challengers").text("Choose Your Next Opponent!") 
            $(".opponentHP").remove();
            $(".opponentPower").remove();
            $(".opponentCounterAttack").remove();
            ++defeatedEnemies
            opponentSelected = false;
            if (defeatedEnemies === characterTotal) {
                gameOn = false;
                playerWin.play();
                ++winCounter;
                const menuZone = $(".menuContent");
                const winMenu = $("#winMenu");
                const gameHead = $("#gameHeader");
                $("#menu-zone").removeClass("menuAdjust");
                gameHead.removeClass("gameHeader").addClass("buryIt");
                menuZone.append(winMenu);
                const currentWinsBox = $("#currentWins");
                currentWinsBox.append("<h3 class='wins'>Your Current Win Count is " + winCounter + "!</h3>");
            };
        }
    });

    startButton.click(function(){
        if (gameOn === true || audioPlaying === true || audioPlaying === true) {
            return false;
        };
        gameOn = true;
        const hiddenMenuZone = $("#hiddenMenu");
        const mainMenu = $("#mainMenu");
        hiddenMenuZone.append(mainMenu);
        const gameHead = $("#gameHeader");
        gameHead.removeClass("buryIt").addClass("gameHeader");
        $("#menu-zone").addClass("menuAdjust");
    });

    lossPlayAgainButton.click(function(){
        if (gameOn === true || audioPlaying === true) {
            return false;
        };
        const hiddenMenuZone = $("#hiddenMenu");
        const lossMenu = $("#lossMenu");
        hiddenMenuZone.append(lossMenu);
        winCounter = 0;
        resetSWGame();
    });

    winPlayAgainButton.click(function(){
        if (gameOn === true || audioPlaying === true) {
            return false;
        };
        const hiddenMenuZone = $("#hiddenMenu");
        const winMenu = $("#winMenu");
        hiddenMenuZone.append(winMenu);
        resetSWGame();
    });

    function resetSWGame() {
        gameOn = true;
        const gameHead = $("#gameHeader");
        gameHead.removeClass("buryIt");
        gameHead.addClass("gameHeader");
        powerAdapter = 0;
        $(".current-opponent-title").addClass("buryIt");
        $(".attack-button").addClass("buryIt").removeClass("d-flex flex-row");
        $(".challengers").addClass("buryIt");
        $(".command-text").text("Choose Your Character!");
        $("#mainGameColumn").removeClass("col-md-9 col-xl-8").addClass("col-12");
        $("#waiting-room").removeClass("col-md-3 col-xl-4").addClass("col-0");
        $("#character-zone").removeClass("col-6").addClass("col-12");
        $(".card-title").removeClass("buryIt");
        $(".card-text").removeClass("buryIt");
        $(".value-hook").addClass("inner-value");
        $("#my-hp").removeClass("col-3").addClass("col-0");
        $(".myHP").remove();
        $("#my-power").removeClass("col-3").addClass("col-0").removeClass("hasMultiplier");
        $(".myPower").remove();
        $(".opponentHP").remove();
        $(".opponentPower").remove();
        $(".myMultiplier").remove();
        $(".opponentCounterAttack").empty();
        $(".wins").remove();
        for (var i = 1; i <= characterTotal; i++) {
            let characterZone = $("#character-zone");
            let currentCard = cards[i];
            if (currentCard.hasClass("opponentCard") === true) {
                currentCard.removeClass("opponentCard").addClass("characterCard");
                characterZone.append(currentCard);
            } else {
                if (currentCard.hasClass("playerCard") === true) {
                    currentCard.removeClass("playerCard").addClass("characterCard");
                    characterZone.append(currentCard);
                } else {
                    if (currentCard.hasClass("defeatedOpponent") === true) {
                        currentCard.removeClass("defeatedOpponent").addClass("characterCard");
                        characterZone.append(currentCard);
                    } else {
                        if (currentCard.hasClass("currentCombatant") === true) {
                            currentCard.removeClass("currentCombatant").addClass("characterCard");
                            characterZone.append(currentCard);
                        }
                    }
                }
            }
        };
        characterTotal = 0;
        defeatedEnemies = 1;
        powerMultiplier = 1; 
    //The engine that increases the number of characters at the start of the game. This will make it easier to add future characters.
        for (var property1 in starWarsCharacters) {
            if(starWarsCharacters[property1] !== null) {
                ++characterTotal
            }
        }
    };

    //object constructor to handle sound objects. This came directly from w3school's sudio example for HTML5 audio element creation using a function. Source: "https://www.w3schools.com/graphics/game_sound.asp"
    function sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function(){
            this.sound.play();
        }
        this.stop = function(){
            this.sound.pause();
        }
    } 

    //this event capturing bit of code comes from the Webshim Library at "http://afarkas.github.io/webshim/demos/index.html" through saml's answer to a question on stackoverflow at "https://stackoverflow.com/questions/11291651/why-dont-audio-and-video-events-bubble"
    $.createEventCapturing = (function () {
        var special = $.event.special;
        return function (names) {
            if (!document.addEventListener) {
                return;
            }
            if (typeof names == 'string') {
                names = [names];
            }
            $.each(names, function (i, name) {
                var handler = function (e) {
                    e = $.event.fix(e);

                    return $.event.dispatch.call(this, e);
                };
                special[name] = special[name] || {};
                if (special[name].setup || special[name].teardown) {
                    return;
                }
                $.extend(special[name], {
                    setup: function () {
                        this.addEventListener(name, handler, true);
                    },
                    teardown: function () {
                        this.removeEventListener(name, handler, true);
                    }
                });
            });
        };
    })();

//function to change audio playing state to true, which will be used to prevent button presses during audio.
    $.createEventCapturing(['play']);  
    jQuery('body').on('play', 'audio', function(){
        audioPlaying = true;
    });

//function to change audio playing state to false, which will be used to allow button presses again.
    $.createEventCapturing(['ended']);  
    jQuery('body').on('ended', 'audio', function(){
        audioPlaying = false;
    });
});

