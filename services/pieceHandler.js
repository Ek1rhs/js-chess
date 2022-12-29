import { $  , $$} from '../utils/utils.js'
import { generalMovement } from '../services/pieceMovement/general.js'
import { gameHandler } from './gameHandler.js';

export const pieceHandle = {
   
    handlePieceClick(handleParams){
        console.log('handlePieceClick(handleParams)', handleParams);
        console.log( 'oki:',$('.potential-square' ));
        if(!gameHandler.pieceTurn(handleParams.pieceColor)){
            console.log('1');
            return ;
        }else if(!this.isThereASelectedPiece()){
            console.log('2');
            this.setSelected(handleParams);
            generalMovement.markPotentialSquares(handleParams);
            generalMovement.setEventsOnPotentialSquares(handleParams);
            return this;
        }
        else if(this.ownPieceSelected(handleParams)){
            console.log('3');
            this.removeSelected(handleParams);
            generalMovement.clearPotentialSquares(handleParams);
            return this;
        }

    },
    handlePieceMouseleave(handleParams){
        if(gameHandler.pieceTurn(handleParams.pieceColor))this.setHoverOnExit(handleParams);
    },

    handlePieceMouseenter(handleParams){
        if(gameHandler.pieceTurn(handleParams.pieceColor))this.setHoverOnEnter(handleParams);
    },

    isThereASelectedPiece(){
        return $('.piece-selected');
    },

    setSelected(handleParams){ 
        handleParams.piece.parentElement.classList.remove( 'yellow' );
        handleParams.piece.parentElement.classList.add( 'piece-selected' );
    }, 

    setHoverOnEnter(handleParams){
       
        return handleParams.piece.parentElement.classList.add( 'yellow' );
    },

    setHoverOnExit(handleParams){
        return handleParams.piece.parentElement.classList.remove( 'yellow' );
    },
    
    removeSelected(handleParams){
        return handleParams.piece.parentElement.classList.remove( 'piece-selected' );
    },

    ownPieceSelected(handleParams){
        return $('.piece-selected > .piece' ) === handleParams.piece;
    },
    clearAll(){
        $$('div').forEach(pieceBox => {
            pieceBox.classList.remove( 'piece-selected' );
            pieceBox.classList.remove( 'yellow' );
            pieceBox.classList.remove( 'potential-square' );
            pieceBox.classList.remove( 'green' );
            pieceBox.classList.remove( 'potential-enemy' );
        })
    }

}
