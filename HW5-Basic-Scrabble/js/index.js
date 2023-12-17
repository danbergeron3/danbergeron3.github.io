// Daniel Bergeron
// COMP 4610 GUI I
// daniel_bergeron1@student.uml.edu
const  TILE_TOTAL = 93;
const HOLDER_TILES = 7;
// scrabble data strucuture added paths to make image display easier
var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9,  "path" : "graphics_data/tiles/A.jpg"} ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2,  "path" : "graphics_data/tiles/B.jpg"} ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2,  "path" : "graphics_data/tiles/C.jpg"} ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4,  "path" : "graphics_data/tiles/D.jpg"} ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12, "path" : "graphics_data/tiles/E.jpg"} ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2,  "path" : "graphics_data/tiles/F.jpg"} ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3,  "path" : "graphics_data/tiles/G.jpg"} ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2,  "path" : "graphics_data/tiles/H.jpg"} ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9,  "path" : "graphics_data/tiles/I.jpg"} ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1,  "path" : "graphics_data/tiles/J.jpg"} ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1,  "path" : "graphics_data/tiles/K.jpg"} ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4,  "path" : "graphics_data/tiles/L.jpg"} ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2,  "path" : "graphics_data/tiles/M.jpg"} ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6,  "path" : "graphics_data/tiles/N.jpg"} ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8,  "path" : "graphics_data/tiles/O.jpg"} ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2,  "path" : "graphics_data/tiles/P.jpg"} ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1,  "path" : "graphics_data/tiles/Q.jpg"} ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6,  "path" : "graphics_data/tiles/R.jpg"} ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4,  "path" : "graphics_data/tiles/S.jpg"} ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6,  "path" : "graphics_data/tiles/T.jpg"} ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4,  "path" : "graphics_data/tiles/U.jpg"} ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2,  "path" : "graphics_data/tiles/V.jpg"} ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2,  "path" : "graphics_data/tiles/D.jpg"} ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1,  "path" : "graphics_data/tiles/X.jpg"} ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2,  "path" : "graphics_data/tiles/Y.jpg"} ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1,  "path" : "graphics_data/tiles/Z.jpg"} ;
ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2,  "path" : "graphics_data/tiles/Blank.jpg"} ;

// gets letter from ScrabbleTiles[]
// reduces number of tiles left 
function getRandomTile() {
    const letters = Object.keys(ScrabbleTiles);
    var indexOfRandomLetter = Math.floor(Math.random() * letters.length);
    var key = letters[indexOfRandomLetter];

    while (ScrabbleTiles[key]["number-remaining"] === 0) {
        var randomLetter = Math.floor(Math.random() * letters.length);
        var key = letters[randomLetter];
    }
    ScrabbleTiles[key]["number-remaining"]--;
    return key;
}

 // given a key returns the object
 function getTileData(key) {
    return ScrabbleTiles[key];
}

// playe class used to organize the game and keep track of live data
class Player {
        
    constructor(totalTiles, tilesInHolder) {
        this.tilesInHolder = tilesInHolder;
        this.totalTiles = totalTiles;
        this.charTiles = [];
        this.tileObjects = [];
        this.score = 0;
        this.highScore = 0;
        for (var i = 0; i < tilesInHolder; i++){
            var randLetter = getRandomTile();
            this.totalTiles--;
            // fills an array of chars
            this.charTiles.push(randLetter);
            var tile = this.createTileObjct(randLetter);
            this.tileObjects.push(tile);
          //  console.log("New Tile letter: " + randLetter);
        }
        $("#tiles-left").text("Remaining Tiles: " + this.totalTiles);
    }

    // returns letter
    findLetterObject(letter) {
        return this.charTiles.find(letter);    
    }

    // creates instance of tile class 
    createTileObjct(letter) {
        var newTileObject = new Tile(letter);
        return newTileObject;
    }

    // looks for tile based on tile
    // tile id must be intilized
    findTileById(id) {
        for (const element of this.tileObjects) {
            console.log(element);
            console.log("comparing id: " + element.id + " with " + id);
            if(String(element.id) === String(id)) {
                console.log("Found tile" + element);
                return element;
            } 
        }
        
        return null;
    }
}

// tile class holds information about the displayed tiles 
class Tile {
    constructor(letter) {
        this.letter = letter;
        var letterObject = ScrabbleTiles[letter];  
        const value = ScrabbleTiles[letter].value;
        this.value = value;
        this.path = letterObject.path;
        this.placed = false;
        this.double = false;
        this.special = false;    
    }

    setId(id) {
        this.id = id;
        console.log("id = " + this.id);
    }

    printTile() {
        console.log("This is a tile");
    }

}

// sthis function fills the html containers with their display
function fillContainers(player) {
    var iterator = 0;
    $(".drops > div > div").each(function(index, element) {
        // Your code here for each child element
        var currentID = $(element).parent().attr("id");
        //console.log("Element ID: " + currentID); 
        var tile = player.tileObjects[iterator];
        tile.setId(currentID);
        //console.log("Test " + tile);
        var path = tile.path;
        // console.log("raw path: " + path);
        var url = "url(" + path + ")" 
        // console.log("URL: " + url);
        $(element).css({"background-image": url,
                        "background-size": "cover",
                        "background-position": "center center",
                        "background-repeat": "no-repeat"
        }).draggable();
        iterator++;
    });
}
// creates a new instance of the game
function setUp() {
    var player = new Player(TILE_TOTAL, HOLDER_TILES); 
    fillContainers(player);
    return player;
}

$(document).ready(function () {

    var player = setUp();

    // on click will give player new tiles 
    $("#new-word").click(function () {
        
        var score = player.score;
        var highScore = player.highScore;
        var tiles = player.totalTiles;

        player = setUp();
        player.score = score;
        player.highScore = highScore;
        player.totalTiles = tiles - 7;
        if(player.totalTiles <= 0) {
            player = restart(player);   
        } else {
            $("#tiles-left").text("Remaining Tiles: " + player.totalTiles);
            $("#word").text("Word: ");
            $(".drops > div > div").each(function(index, element) {
                $(element).css({
                    top: "0",
                    left: "0"
                });
            });
    
        }
    });
    // restarts the game
    $("#restart").click(function () {
       player = restart(player);
    });

    // jquery functions that control the drag and drop features of the game.
    $( function() {
        $( ".drag" ).draggable({
            revert: "invalid",
            start: function(event, ui) {
                // Apply highlighting effect on drag start
                var startPosition = ui.position;

                $(this).addClass("highlight");
                $('.drop1').addClass("highlight2");
                $('.drop2').addClass("highlight2");
                
            },
            stop: function() {
                // Remove highlighting effect on drag stop
                $(this).removeClass("highlight");
                $('.drop1').removeClass("highlight2");
                $('.drop2').removeClass("highlight2");
                $(this).removeClass("frozen");
            }
            
    });
    $( ".drop1" ).droppable({
      accept: ".drag",
      drop: function( event, ui ) {
        // validates that a tile can be droped 
        // locks tile position 
        // reverts if it can't be dropped 
        if($(this).children(".drag").length === 0) {
            ui.helper.addClass("frozen");
            var target = $(this);
            ui.helper.position({
                of: target,
                my: "left top",
                at: "left top",
                collision: "none"
            });
            //console.log("Is placed: " + ui.helper.placed);
            var tile = player.findTileById(ui.helper.parent().attr("id")); 
            /////////////////////////////
            tile.placed = true;
            tile.double = false;
            console.log("Tile: " + tile);
            addScore(player, tile);
        } else {
            //console.log("Setting revert option");
            ui.helper.draggable("option", "revert", true);
        }
            displayWord(player);
      }
    });
    // this space does has all the features of a normal drop but
    // but instead doubles the tile value
    $( ".drop2" ).droppable({
        accept: ".drag",
        drop: function ( event, ui ) {
            if($(this).children(".drag").length === 0) {
                // freeze container
                ui.helper.addClass("frozen");

                var target = $(this);
                ui.helper.position({
                    of: target,
                    my: "left top",
                    at: "left top",
                    collision: "none"
                });
                var tile = player.findTileById(ui.helper.parent().attr("id"));
                tile.placed = true;
                tile.double = true;
                
                doubleScore(player, tile);           
            } else {
                ui.helper.draggable("option", "revert", true);
            }
            displayWord(player);
        }
    });
    // This drop section is for the tile holders allows pieaces to be removed
    $("#drop3").droppable({
        accept: ".drag",
        drop: function (event, ui) {
            var tile = player.findTileById(ui.helper.parent().attr("id"));
            if(tile.placed !== false) {
                if(tile.double === true) {
                    console.log("double true parent " + ui.helper.parent().attr("id") );
                    console.log("Tile: " + tile);
                    halfScore(player, tile);
                    tile.double = false;                    
                } else {
                    console.log("parent " + ui.helper.parent().attr("id") );
                    console.log("Tile: " + tile);
                    subtractScore(player, tile);       
                }
                tile.placed = false;
            }
            ui.helper.addClass("frozen");
            displayWord(player);
        }
    });
  });
  
});

// functions used to calculate score
function addScore(player, tile) {
    console.log("Player score: " + player.score + " Value to add: " + parseInt(tile.value, 10));
    player.score += tile.value;
    $('#score').text("Score: " + player.score);
}

function doubleScore(player, tile) {
    console.log("Player score: " + player.score);
    player.score += tile.value * 2;
    $('#score').text("Score: " + player.score);
}

function subtractScore(player, tile) {
    console.log("Player score: " + player.score + " Value to add: " + parseInt(tile.value, 10));
    player.score -= tile.value;
    $('#score').text("Score: " + player.score);
}

function halfScore(player, tile) {
    console.log("Player score: " + player.score);
    player.score -= (tile.value * 2);
    $('#score').text("Score: " + player.score);
}
// will called to create new display for a word.
function displayWord(player) {
    var word = "";
    for(let i = 0; i < player.tileObjects.length; i++) {
        if((player.tileObjects[i]).placed === true) {
            word += (player.tileObjects[i]).letter;
        }
    }
    $("#word").text("Word: " + word);
}

// called when a game restart is needed
function restart(player) {
    var highScore;
    if(player.score > player.highScore) {
        highScore = player.score; 
    } else {
        highScore = player.highScore;
    }
    $("#score").text("Score: 0");
    $("#tiles-left").text("Remaining Tiles: " + TILE_TOTAL);
    $("#word").text("Word: ");
    player = setUp();
    console.log("player object" + player.tileObjects[0].letter);
    player.highScore = highScore;
    $("#high-score").text("Highest Score: " + player.highScore);
    $(".drops > div > div").each(function(index, element) {
        $(element).css({
            top: "0",
            left: "0"
        });
    });
    const letters = Object.keys(ScrabbleTiles);
    for(let i = 0; i < letters.length; i++) {
        ScrabbleTiles[letters[i]]["number-remaining"] = ScrabbleTiles[letters[i]]["original-distribution"];
    }
    return player;
}