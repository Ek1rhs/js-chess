import { $, $$, $$$ } from '../utils/utils.js'
import { normalGame }  from '../config/normalGameInit.config.js'
import { chessConfig }  from '../config/chessConfig.config.js'
import { pieceHandle } from '../services/pieceHandler.js'
import { editedGame } from '../config/editedGameInit.config.js'


export const piecesRender = {

    piecesEventListeners : {},

    createPieces(){
        const gameStart = chessConfig.useNormalGame ? normalGame : editedGame;
        for(let postion in gameStart){
            const imgPiece = document.createElement( 'img' );
            imgPiece.classList.add( 'piece' );
            imgPiece.setAttribute( 'piece-type', gameStart[postion]);
            imgPiece.setAttribute( 'piece-square', postion);
            imgPiece.setAttribute('src', 'pieces/'+gameStart[postion]+'.png');
            $('#'+postion).append(imgPiece);
        }
    },

    setEventListeners(){
        console.log('piecesRender');
        $$(chessConfig.chessPieceSelector).forEach(piece => {
          //  console.log('piece : ' , piece);
    
            const piecePosition = piece.getAttribute( 'piece-square' );
            const pieceColor = piece.getAttribute('piece-type').split('_')[0];
            const pieceType = piece.getAttribute('piece-type').split('_')[1];

            const handleParams = {
                piece,
                pieceType, 
                piecePosition,
                pieceColor,
            }
            console.log('handleParams : ', handleParams);
   
            this.piecesEventListeners[ piece ] = {
               
                'mouseenter': _ => {
                    pieceHandle.handlePieceMouseenter( handleParams )
                },
                'mouseleave': _ => {
                    pieceHandle.handlePieceMouseleave( handleParams )
                },
                'click': _ => {
                    pieceHandle.handlePieceClick( handleParams )
                }
            }


            piece.addEventListener( 'mouseleave', this.piecesEventListeners[ piece ][ 'mouseleave' ])
            piece.addEventListener( 'click', this.piecesEventListeners[ piece ][ 'click' ])
            piece.addEventListener( 'mouseenter', this.piecesEventListeners[ piece ][ 'mouseenter' ])
        })
    },

    resetEventListeners() {
        $$( chessConfig.chessPieceSelector ).forEach( piece => {
            console.log('17',this.piecesEventListeners[ piece ][ 'click' ]);
            piece.removeEventListener( 'mouseenter', this.piecesEventListeners[ piece ][ 'mouseenter' ])
            piece.removeEventListener( 'mouseleave', this.piecesEventListeners[ piece ][ 'mouseleave' ])
            piece.removeEventListener( 'click', this.piecesEventListeners[ piece ][ 'click' ])

        })
    },

    startGame(){
        this.createPieces();
        this.setEventListeners();
    },

    resetRound(){
        this.resetEventListeners();
        this.setEventListeners();
    }
 
}
