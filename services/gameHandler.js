import { chessConfig }  from '../config/chessConfig.config.js'
import { piecesRender } from '../services/pieceRender.js'
import { pieceHandle } from '../services/pieceHandler.js'

export const gameHandler = {

    endTurn(pieceColor){
        console.log('chessConfig.currentTurn : ' ,chessConfig.currentTurn);
        console.log('end turn for : ' , pieceColor);
        chessConfig.whiteTurn = chessConfig.whiteTurn === true ?  false : true;
        chessConfig.currentTurn = chessConfig.currentTurn  === 'white' ? 'black' : 'white';
        console.log('chessConfig.whiteTurn: ' ,chessConfig.whiteTurn);
        console.log('chessConfig.currentTurn : ' ,chessConfig.currentTurn);
        pieceHandle.clearAll();
        piecesRender.resetEventListeners();
    },

    pieceTurn(color){
        return chessConfig.currentTurn === color ? true : false;
    },



}
