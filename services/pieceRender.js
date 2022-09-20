import { $, $$, $$$ } from '../utils/utils.js'
import { normalGame }  from '../config/normalGameInit.config.js'
import { chessConfig }  from '../config/chessConfig.config.js'
import { pieceHandle } from '../services/pieceHandler.js'
import { editedGame } from '../config/editedGameInit.config.js'

export const piecesRender = {

    createPieces(){

        const gameStart = chessConfig.useNormalGame ? normalGame : editedGame;

        for(let postion in gameStart){
            const imgPiece = document.createElement( 'img' );
            imgPiece.classList.add( 'piece' );
            imgPiece.setAttribute( 'piece-type', gameStart[postion] );
            imgPiece.setAttribute('src', 'pieces/'+gameStart[postion]+'.png');
            $('#'+postion).append(imgPiece);
        }

        this.setEventListeners();
    },

    setEventListeners(){
        $$(chessConfig.chessPieceSelector).forEach(piece => {
            piece.onmouseover = () => {  
                pieceHandle.setPieceHoverable(piece);
                console.log('piece',piece.parentElement.id);
                console.log('piece',piece.parentElement.id);
            }
            piece.onmouseleave = () => {  
                pieceHandle.setPieceHoverable(piece);
            }
            piece.onclick = () => {  
                
                pieceHandle.setPieceMovement(piece);
            }
            
        })
    }

}
