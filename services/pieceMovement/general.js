import { $, $$, $$$ } from '../../utils/utils.js'
import { pieceHandle } from '../pieceHandler.js';
import { rookMovement } from '../pieceMovement/rook.js'
import { gameHandler } from '../gameHandler.js';

export const generalMovement = {
    
    markPotentialSquares(handleParams){
        if(handleParams.pieceType === 'rook'){
          rookMovement.setPotentialSquares(handleParams);
        }
    },

    clearPotentialSquares(){
        $$('.potential-square , .potential-enemy').forEach(pieceBox => {
            pieceBox.classList.remove( 'potential-enemy' );
            pieceBox.classList.remove( 'potential-square' );;
            pieceBox.removeEventListener( 'click', this.movePiece)
        });
      
    },
    
    setEventsOnPotentialSquares(handleParams){
        console.log('handleParams:',handleParams);
        $$('.potential-square , .potential-enemy').forEach(pieceBox => {
            pieceBox.addEventListener( 'click', this.movePiece)
        });
    },

    movePiece : function(event) {
        const piece = pieceHandle.pieceSelected();
        let newSqaureValue ;
        if(pieceHandle.isTargetEnemyPiece(event.target)){
            const targetDiv = event.target.parentNode;
            targetDiv.removeChild(event.target);
            targetDiv.append(piece);
            newSqaureValue = targetDiv.getAttribute('id');
        }else{
            newSqaureValue = event.target.getAttribute('id');
            event.target.append(piece);
        }
        piece.setAttribute('new-piece-square', newSqaureValue);
        pieceHandle.removeSelected();
        gameHandler.endTurn();
    }, 
    
}