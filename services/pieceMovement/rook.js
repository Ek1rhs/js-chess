import { $ } from '../../utils/utils.js'
import { gameHandler } from '../gameHandler.js'
import { chessConfig }  from '../../config/chessConfig.config.js'

export const rookMovement = {
    
    potentialSquares : {},
  
    setPotentialSquares(rookPiece){
        this.potentialSquares = {};
        if(gameHandler.pieceTurn(rookPiece.pieceColor)){
            this.setSquares(this.getAvaliableSquares(rookPiece));
        }
    },

    getAvaliableSquares(rookPiece){
        let allPossibleSquares = this.checkAllPossibleSquares(rookPiece.piecePosition[0], rookPiece.piecePosition[1]);
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
            })                   
            if(val.possibleCollision)this.checkPossibleEnemy(val.possibleCollision);
        });        
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
        let collisionFreeSquares = possibleCollision === undefined ? arr : arr.slice(0,(arr.indexOf(possibleCollision)));
        return {
            collisionFreeSquares , 
            possibleCollision
        }  
    },

    checkPossibleEnemy(square){
        let pieceSquare = $(`[id^="${square}"]`);
        let pieceColor = pieceSquare.firstChild.getAttribute('piece-type').includes('white') ? 'white' : 'black';
        if(!gameHandler.pieceTurn(pieceColor)){ 
            pieceSquare.classList.add('potential-enemy'); 
            return true;
        }
        return undefined;
    },

}

