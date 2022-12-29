import { $ } from '../../utils/utils.js'
import { gameHandler } from '../gameHandler.js'
import { chessConfig }  from '../../config/chessConfig.config.js'

export const rookMovement = {
    
    potentialSquares : {},
  
    setPotentialSquares(rookPiece){
        console.log('rookPiece',rookPiece);
        this.potentialSquares = {};
        if(gameHandler.pieceTurn(rookPiece.pieceColor)){
            this.potentialSquares = this.getAvaliableSquares(rookPiece);
            this.setSquares(this.potentialSquares);
            console.log('halihó',this.potentialSquares);
            return this;
        }
    },

    getAvaliableSquares(param){
        let allPossibleSquares = this.checkAllPossibleSquares(param.piecePosition[0], param.piecePosition[1]);
        return {
            forwardRows : {
                collisionFreeSquares : this.checkCollision(allPossibleSquares.forwardRows).collisionFreeSquares, 
                possibleCollision    : this.checkCollision(allPossibleSquares.forwardRows).possibleCollision
            },
            backwardRows : {
                collisionFreeSquares : this.checkCollision(allPossibleSquares.backwardRows).collisionFreeSquares, 
                possibleCollision    : this.checkCollision(allPossibleSquares.backwardRows).possibleCollision
            },
            leftColumns  : {
                collisionFreeSquares : this.checkCollision(allPossibleSquares.leftColumns).collisionFreeSquares, 
                possibleCollision    : this.checkCollision(allPossibleSquares.leftColumns).possibleCollision
            },
            rightColumns : {
                collisionFreeSquares : this.checkCollision(allPossibleSquares.rightColumns).collisionFreeSquares, 
                possibleCollision    : this.checkCollision(allPossibleSquares.rightColumns).possibleCollision
            },
        };

    },

    setSquares(verifiedSquares){
        
        Object.values(verifiedSquares).forEach(val => {
            val.collisionFreeSquares.forEach(freeSquareId => {
                $(`[id^="${freeSquareId}"]`).classList.add( 'potential-square');
              //  console.log('ok', freeSquare); 
            })                   
            if(val.possibleCollision){
                  this.checkPossibleEnemy(val.possibleCollision);
            }
        });        
    },

    clearSquares(rookPiece){
        Object.values(this.potentialSquares ).forEach(val => {
            val.collisionFreeSquares.forEach(freeSquare => {
                $(`[id^="${freeSquare}"]`).classList.remove( 'potential-square' )
            })                   
            if(val.possibleCollision){
                $(`[id^="${val.possibleCollision }"]`).classList.remove( 'potential-enemy' );
            }
        });
        $(`[id^="${rookPiece.piecePosition}"]`).classList.remove( 'piece-selected' );
        $(`[id^="${rookPiece.piecePosition}"]`).classList.remove( 'potential-square' );
    },

   checkAllPossibleSquares(col, row){
        let colIdx = chessConfig.columns.indexOf(col);
        return {
            forwardRows  : Array(8 - Number(row) ).fill().map((_,idx) => Number(row)+1 + idx).map( e => col + e),
            backwardRows : Array( Number(row-1)  ).fill().map((_,idx) => Number(row)-1 - idx).map( e => col + e),
            leftColumns  : chessConfig.columns.slice(0, colIdx).map( e => e + row).reverse(), 
            rightColumns : chessConfig.columns.slice(colIdx + 1, 8).map( e => e + row)
        }
   },

   checkCollision(arr){         
        let collisionArray = arr.filter( e => $(`[id^="${e}"]`).hasChildNodes());
        let possibleCollision = collisionArray.length === 0 ? undefined  : collisionArray[0];
        let collisionFreeSquares = possibleCollision === undefined ? arr : arr.slice(0 , (arr.indexOf(possibleCollision)) );
        return {
            collisionFreeSquares , 
            possibleCollision
        }  
    },

    checkPossibleEnemy(square){
        let PosEn = $(`[id^="${square}"]`);
        let PosEnColor = PosEn.firstChild.getAttribute('piece-type').includes('white') ? 'white' : 'black';
        if(PosEnColor !== this.color){ 
            PosEn.classList.add( 'potential-enemy' ); 
            return true;
        }
        return undefined;
    },

}

