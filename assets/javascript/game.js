$(document).ready(function(){

    const waitingRoom = $("#waiting-room");

    const characters = $(".card");

    const starWarsCharacters = {
        anakinSkywalker: {
            attack: 7,
            counterAttack: 7,
            hp: 60,
            id: "anakinCard"},
        darthMaul: {
            attack: 5,
            counterAttack: 5,
            hp: 50,
            id: "maulCard"},
        darthVader: {
            attack: 8,
            counterAttack: 8,
            hp: 70,
            id: "vaderCard"},
        emperorPalpatine: {
            attack: 10,
            counterAttack: 10,
            hp: 80,
            id: "emperorCard"},
        lukeSkywalker: {
            attack: 7,
            counterAttack: 7,
            hp: 60,
            id: "lukeCard"},
        maceWindu: {
            attack: 8,
            counterAttack: 8,
            hp: 70,
            id: "winduCard"},
        masterYoda: {
            attack: 9,
            counterAttack: 9,
            hp: 70,
            id: "yodaCard"},
        obiWan: {
            attack: 6,
            counterAttack: 6,
            hp: 60,
            id: "obiWanCard"},
    };

    characters.on("click", function(){
        let clickedCharacter = $(this);
        let characterID = $(this).attr("id");
        if (clickedCharacter.hasClass("characterCard")){
            $(".characterCard").each(function() {
                if ($(this).attr("id") !== characterID) {
                    waitingRoom.append(this);
                    $(this).removeClass("characterCard");
                    $(this).addClass("opponentCard");
                }
            });
        for (var property1 in starWarsCharacters) {
            if (starWarsCharacters[property1].id === characterID) {
                characterHP = starWarsCharacters[property1].hp;
            };
        };
            /*
            getHP();
            function getHP(starWarsCharacters) {
                var result = null;
                if(starWarsCharacters instanceof Array) {
                    for(var i = 0; i < starWarsCharacters.length; i++) {
                        result = getHP(starWarsCharacters[i]);
                        if (result) {
                            break;
                        }   
                    }
                } else {
                    for(var property1 in starWarsCharacters) {
                        console.log(property1 + ': ' + starWarsCharacters[property1]);
                        if(property1 == 'hp') {
                                return starWarsCharacters[property1];
                        }
                        if(starWarsCharacters[property1] instanceof Object || starWarsCharacters[property1] instanceof Array) {
                            result = getObject(starWarsCharacters[property1]);
                            if (result) {
                                break;
                            }
                        } 
                    }
                }
                characterHP = result;
                */

            console.log(characterHP);
            var characterHP;
            $(".challengers").text("Choose Your First Opponent!"); 
            $("#character-zone").addClass("col-6");
            $("#my-hp").removeClass("col-0");
            $("#my-hp").addClass("col-3");
            $("#my-hp").append("<h3 class='myHP'>My HP</h3>");
            $(".myHP").append("<p class='HP'></p>");
            $(".HP").text(characterHP);
            $("#my-power").removeClass("col-0");
            $("#my-power").addClass("col-3");
            $("#my-power").append("<h3 class='myPower'>My Power</h3>");
        } else { 
            if (clickedCharacter.hasClass("opponentCard")) {
                let selectedOpponent = $(this);
                let combatZone = $(".combatant-zone");
                selectedOpponent.removeClass("opponentCard");
                selectedOpponent.addClass("currentCombatant");
                combatZone.append(clickedCharacter);
                $(".challengers").text("Your Enemies") 
            }
        }   
    })
});

