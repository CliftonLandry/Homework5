Link to github webpage:https://cliftonlandry.github.io/Homework5/
Repository link: https://cliftonlandry.github.io/


Currently working: 
-tiles start in rack, and are randomly selected from the data strucure
-tiles can be dragged and dropped onto scrabble squares
-program identifies which letter tile is dropped into which square 
-board has two bonus squares
-score is tallied correctly, this includes correct calculation of the bonus squares
-any number of words can be played until the player quits or runs out of tiles
-board is cleared after each round so player can play more
-after playing a word, any leftover tiles on the rack remain, and new tiles fill the rack to replace the tiles spent so that there are 7 tiles on the rack
-score is kept in between rounds
-a restart button does exist to restart the game with an empty score and have all tiles back
-once a tile has been placed on the board, it can be moved back to the rack
-user can always restart the game
-blank tile works as inteded (you can choose what letter the blank tile will be, and moving the blank tile back to the rack makes it a blank tile again)

Partially working:
-tiles can only be dragged to the rack or the tile board, dragging and dropping the tile anywhere else will bounce the tile back to either the board or the rack. However, if you drag a tile that is on the board to a random location and have it bounce back to the board, errors will occur. That tile will not be calculated when you press the "Enter word" button and other tiles can now be dragged and dropped to the same space that the tiles resides. For my program to function properly, do not drag a tile to white space once it has been placed on the board, and if you do, drag the tile to a droppable location then drag it right back to its location on the board previously
-you can place tiles a distance apart from each other with empty tile spaces in between them. However if you press "Enter word" with space inbetween tiles then an error message will appear, your tiles will not be replaced and your score will not be incremented

Not working: