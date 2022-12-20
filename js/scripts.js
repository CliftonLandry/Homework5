/*
    File: scripts.js
GUI Assignment: Creating scrabble board
Clifton Landry, UMass Lowell Computer Science, clifton_landry@student.uml.edu
What to submit: one zipped folder containing all of the neccessary files to run the project alongside a readme file with a link to my github page
Copyright(c) 2022 by Landry.All rights reserved.May be freely copied or
excerpted for educational purposes with credit to the author.
updated by CL on December 15, 2022 at 10:30 AM
*/

//I changed the initial gloabal array to have numbers save as the tile position and have a letter attribute for getting the letter of a specifc tile. This helped me a lot when creating my for loops and checking the values on the tiles. I did not understand how I was going to access the letters if they were the array indexes, so this seemed simpiler to me
var ScrabbleTiles = [];
ScrabbleTiles[0] = { "letter": "A", "value": 1, "original_distribution": 9, "number_remaining": 9 };
ScrabbleTiles[1] = { "letter": "B", "value": 3, "original_distribution": 2, "number_remaining": 2 };
ScrabbleTiles[2] = { "letter": "C", "value": 3, "original_distribution": 2, "number_remaining": 2 };
ScrabbleTiles[3] = { "letter": "D", "value": 2, "original_distribution": 4, "number_remaining": 4 };
ScrabbleTiles[4] = { "letter": "E", "value": 1, "original_distribution": 12, "number_remaining": 12 };
ScrabbleTiles[5] = { "letter": "F", "value": 4, "original_distribution": 2, "number_remaining": 2 };
ScrabbleTiles[6] = { "letter": "G", "value": 2, "original_distribution": 3, "number_remaining": 3 };
ScrabbleTiles[7] = { "letter": "H", "value": 4, "original_distribution": 2, "number_remaining": 2 };
ScrabbleTiles[8] = { "letter": "I", "value": 1, "original_distribution": 9, "number_remaining": 9 };
ScrabbleTiles[9] = { "letter": "J", "value": 8, "original_distribution": 1, "number_remaining": 1 };
ScrabbleTiles[10] = { "letter": "K", "value": 5, "original_distribution": 1, "number_remaining": 1 };
ScrabbleTiles[11] = { "letter": "L", "value": 1, "original_distribution": 4, "number_remaining": 4 };
ScrabbleTiles[12] = { "letter": "M", "value": 3, "original_distribution": 2, "number_remaining": 2 };
ScrabbleTiles[13] = { "letter": "N", "value": 1, "original_distribution": 6, "number_remaining": 6 };
ScrabbleTiles[14] = { "letter": "O", "value": 1, "original_distribution": 8, "number_remaining": 8 };
ScrabbleTiles[15] = { "letter": "P", "value": 3, "original_distribution": 2, "number_remaining": 2 };
ScrabbleTiles[16] = { "letter": "Q", "value": 10, "original_distribution": 1, "number_remaining": 1 };
ScrabbleTiles[17] = { "letter": "R", "value": 1, "original_distribution": 6, "number_remaining": 6 };
ScrabbleTiles[18] = { "letter": "S", "value": 1, "original_distribution": 4, "number_remaining": 4 };
ScrabbleTiles[19] = { "letter": "T", "value": 1, "original_distribution": 6, "number_remaining": 6 };
ScrabbleTiles[20] = { "letter": "U", "value": 1, "original_distribution": 4, "number_remaining": 4 };
ScrabbleTiles[21] = { "letter": "V", "value": 4, "original_distribution": 2, "number_remaining": 2 };
ScrabbleTiles[22] = { "letter": "W", "value": 4, "original_distribution": 2, "number_remaining": 2 };
ScrabbleTiles[23] = { "letter": "X", "value": 8, "original_distribution": 1, "number_remaining": 1 };
ScrabbleTiles[24] = { "letter": "Y", "value": 4, "original_distribution": 2, "number_remaining": 2 };
ScrabbleTiles[25] = { "letter": "Z", "value": 10, "original_distribution": 1, "number_remaining": 1 };
ScrabbleTiles[26] = { "letter": "_", "value": 0, "original_distribution": 2, "number_remaining": 2 };

var word = []; //when the player drops tiles onto the board, they get stored into this array
var points = 0; 



// This function use to check the input is letter or not
function CheckAlpha(word) {
    // cast word to string, this just for make sure it it string
    var check = String(word);
    // regex groups
    var result = check.match(/([a-zA-Z])+$/);
    if (result == null)
        return true;
    else
        return false;

}


$(function () {
  
    $("#rackDiv").droppable({
        accept: '.tile',
        drop: function (event, ui) {        
            $(this).append(ui.draggable); 

            var dropped = ui.draggable;
            var droppedOn = $(this);

            if (dropped.hasClass("blank")) { //if you drop a blank tile back into the rack it becomes blank again
                
                dropped.attr('id', '_'); //id was changed when the blank tile left the rack and was placed on the board
                dropped.attr('src', 'graphics_data/Scrabble_Tiles/Scrabble_Tile_Blank.jpg'); //img was changed when the tile left the rack as well
            }

            $(dropped).detach().css({ top: 0, left: 0, right: 'auto' }).appendTo(droppedOn); //append the tile to the board so that everything looks nice and even
          
           
        }
    });

  




    function fillRack(toBeFilled) { //toBeFilled is the number of tiles to be filled on the rack, this is important in the enterWord function
        
        var remainingTiles = [];
        var pickedLetter;

        //generate the number of remaining tiles, this makes a proper percent for each tile ex. e is 12 times more likely to show up on the first run than z 
        for (i = 0; i < ScrabbleTiles.length; i++) {              
            for (j = 0; j < ScrabbleTiles[i].number_remaining; j++) { //fill remainingTiles array with the remaining tiles by iterating thru the ScrabbleTiles list and pushing each letter into the array a number_remaining amount of times. ex on the first run 'A' will be pushed onto the array 9 times
                remainingTiles.push(ScrabbleTiles[i].letter) //save letters into remaining tiles               
            }
        }
        var x;
        for (k = 0; k < toBeFilled; k++) { //pick toBeFilled number of tiles, we save their letters again into pickedTiles
            x = Math.floor(Math.random() * remainingTiles.length);      //x is a random number from 0 to remainingTiles.length    
            pickedLetter = remainingTiles[x];           //pick a random letter from the remainingTiles array 
            if (pickedLetter != '_') { //condition runs in most scenarios, if blank was not picked enter this loop
                $("#rackDiv").append("<img src = 'graphics_data/Scrabble_Tiles/Scrabble_Tile_" + pickedLetter + ".jpg' class = 'tile' id='" + pickedLetter + "'>"); //create the tile img and append to rack
                for (h = 0; h < ScrabbleTiles.length; h++) { 
                    if (pickedLetter == ScrabbleTiles[h].letter) { //iterate thru ScrabbleTiles until you find the letter you are looking for, then decrement number_remaining
                        ScrabbleTiles[h].number_remaining--;
                    }
                }
            }
            else {
                $("#rackDiv").append("<img src = 'graphics_data/Scrabble_Tiles/Scrabble_Tile_Blank.jpg' class = 'tile blank' id='_'>"); //same as above but simplier because we know that this is the blank piece that resides at postion 26 in ScrabbleTiles
                ScrabbleTiles[26].number_remaining--;
            }
        }   
        $(".tile").draggable({ //makes the tiles created in fillRack draggable 
            revert: 'invalid'
        });

    }
    fillRack(7); //call fillRack(7) immidiately to get our default starting rack

   

    $(".board").droppable({ //this is the board pieces 
        accept: '.tile',
        drop: function (event, ui) {
            $(this).droppable('option', 'accept', ui.draggable);   //once you drop a tile on a board piece lock the board to let in only that tile
            $(this).append(ui.draggable);

            var dropped = ui.draggable;
            var droppedOn = $(this);

            if (dropped.hasClass("blank")) { //check to see if you dropped a blank piece on the board

                var newLetter = prompt("Please enter a single letter", "A");

                // check if the new input it more than 1 character or not alphabet
                while (String(newLetter).length > 1 || CheckAlpha(newLetter)) {
                    newLetter = prompt("Please enter a single letter", "A");
                }

                // make the letter be a Upper Case
                newLetter = newLetter.toUpperCase();

                dropped.attr('id', newLetter); //turn the id of blank into the id of the letter for calculations
                dropped.attr('src', "graphics_data/Scrabble_Tiles/Scrabble_Tile_" + newLetter + ".jpg"); //change the img of blank to letter
            }


            $(dropped).detach().css({ top: '5px', left: '5px', right: 'auto' }).appendTo(droppedOn);
          
            
            if ($(this).attr('id') == 'board1') { //structure here is to check each board piece to see if the tile was dropped inside it, if it was then add the letter to the corresponding position in the word array
                word[0] = dropped.attr('id');
            }
            else if ($(this).attr('id') == 'board2') {
                word[1] = dropped.attr('id');
            }
            else if ($(this).attr('id') == 'board3') {
                word[2] = dropped.attr('id');
            }
            else if ($(this).attr('id') == 'board4') {
                word[3] = dropped.attr('id');
            }
            else if ($(this).attr('id') == 'board5') {
                word[4] = dropped.attr('id');
            }
            else if ($(this).attr('id') == 'board6') {
                word[5] = dropped.attr('id');
            }
            else if ($(this).attr('id') == 'board7') {
                word[6] = dropped.attr('id');
            }
        },
        out: function (event, ui) {
            $(this).droppable('option', 'accept', '.tile'); //if the tile leaves the board, have the board piece accept all tiles again
            if ($(this).attr('id') == 'board1') { //structure here is to check which board piece lost its tile and to empty the word array at the corresponding position
                word[0] = '';
            }
            else if ($(this).attr('id') == 'board2') {
                word[1] = '';
            }
            else if ($(this).attr('id') == 'board3') {
                word[2] = '';
            }
            else if ($(this).attr('id') == 'board4') {
                word[3] = '';
            }
            else if ($(this).attr('id') == 'board5') {
                word[4] = '';
            }
            else if ($(this).attr('id') == 'board6') {
                word[5] = '';
            }
            else if ($(this).attr('id') == 'board7') {
                word[6] = '';
            }
        }
    });

    $('#restart').click(function () { //basic restart function, just refreshes the tab
        location.reload();
    });


    $('#enterWord').click(function () {
        var emptyCheck = false;
        var letterCount = 0;
        $('#errorText').html(""); //clear error text on the user pressing enter word
        //check for blank spaces in between characters
        for( i = 0; i< 7; i++){ //first step, find first character in word array 
            if (word[i] != '' && word[i] != undefined) {
                for (j = i; j < 7; j++) {  //character has been found, keep iterating thru word
                    if (word[j] == '' || word[j] == undefined) { //blank has been found after characters, so word cannot have another character after this
                        emptyCheck = true;
                    }
                    if (word[j] != '' && word[j] != undefined && emptyCheck) { //a character has been detected, if emptyCheck is true then this means that there was a character, some space, and then another character. This causes an error so we leave the enterWord function before we count the points
                        $('#errorText').html("Invalid input: space between two characters");
                        return;
                    }
                }
                i = 8;
            }
        }
        var t;
        for (i = 0; i < 7; i++) { //if we are here then the input was valid, now we count the points
            var temp;
            if (word[i] != '' && word[i] != undefined) { //iterate thru word until we find characters
                temp = word[i]; //temp saves the single character as a string, this is important 3 lines down 
                if (i == 1 || i == 5) { //positions 1 and 5 are my double letter score tiles, so we double the points of the individual tiles
                    points += (ScrabbleTiles[temp.codePointAt(0) - 65].value) * 2;
                    letterCount++; //increment letter count so we know how many pieces to add once we are done
                }
                else {
                    points += ScrabbleTiles[temp.codePointAt(0) - 65].value;
                    letterCount++;
                }
            }
            t = i + 1; //my naming was slightly off for the board, the first board was board1 when i should have made it board0, this is my bandaid fix 
            $('#board' + t).html(''); //empty the board 
            $('#board' + t).droppable('option', 'accept', '.tile'); //have the board accept all tiles again  
        }
        $('#score').html(points); //update score
        fillRack(letterCount); //fill rack with the amount of letters needed, this is why we incremented letter count above
        word = []; //empty word
       
        
    });

    
});