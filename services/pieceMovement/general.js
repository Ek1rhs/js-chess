import { $, $$, $$$ } from '../../utils/utils.js'
import { gameHandler } from '../gameHandler.js';
import { rookMovement } from '../pieceMovement/rook.js'

export const generalMovement = {

    markPotentialSquares(handleParams){
        if(handleParams.pieceType === 'rook'){
          rookMovement.setPotentialSquares(handleParams);
        }
    },

    clearPotentialSquares(handleParams){
        if(handleParams.pieceType === 'rook'){
            rookMovement.clearSquares(handleParams);
        }
    },
    
    setEventsOnPotentialSquares(handleParams){
        $$('.potential-square').forEach(pieceBox => {
            pieceBox.addEventListener( 'click', function(){
                generalMovement.movePiece(handleParams, pieceBox);
            })
        });
    },
    
    movePiece(handleParams , pieceBox){
       
        console.log('hol?',  $(`#${handleParams.piecePosition}`));
        
        var element = handleParams.piece;
        var clone = element.cloneNode(true);
        
        element.parentNode.replaceChild(clone, element);
        $(`#${handleParams.piecePosition}`).removeChild(handleParams.piece);
        handleParams.piece = element;
        pieceBox.append(handleParams.piece);
        console.log('pieceBox',element);
        this.clearPotentialSquares(handleParams);
        gameHandler.endTurn(handleParams.pieceColor);
        return;
    },
}