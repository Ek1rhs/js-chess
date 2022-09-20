import { chessConfig }  from '../config/chessConfig.config.js'
import { $, $$, $$$ } from '../utils/utils.js'
import { rookMovement } from '../services/pieceMovement/rook.js'

export const pieceHandle = {

    setPieceHoverable(piece){
        if(piece.getAttribute('piece-type').includes('black') && !chessConfig.whiteTurn){
            piece.parentElement.classList.toggle( 'yellow' )
        } else if (piece.getAttribute('piece-type').includes('white') && chessConfig.whiteTurn){
                piece.parentElement.classList.toggle( 'yellow' )
        }
    },

    setPieceMovement(piece){
        let type = piece.getAttribute('piece-type');
        if(type.includes('rook')){
            rookMovement.setMovement(piece);
        }
    }

}
