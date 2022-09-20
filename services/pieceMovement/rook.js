
export const rookMovement = {

    checkPositionAndColor(piece){
        let color = piece.getAttribute('piece-type').includes('white') ? 'white' : 'black' ;
        return  {
            position : piece.parentElement.id,
            color : color
        }
    },

    checkAvailableSquares(piece){
        let col = this.checkPositionAndColor(piece).position[0];
        let row = this.checkPositionAndColor(piece).position[1];
        this.highlightAvailabeColSqaures(col, row);
        console.log(col , row);
        //console.log()
    },

    setMovement(piece){
        this.checkAvailableSquares(piece);
    },

   highlightAvailabeColSqaures(col , row){
        let colElements = document.querySelectorAll(`[id^="${col}"]`);
        let rowSquares = this.checkRowSquares(row);
        let forwardRows = rowSquares.forwardRows;
    //    let backwardRows = rowSquares.backwardRows;
        forwardRows.forEach(e => {
            
        });
        console.log('cols',cols);
   },
   checkRowSquares(row){
        return {
            forwardRows  : Array(8 - Number(row) ).fill().map((_,idx) => Number(row)+1 + idx),
            backwardRows : Array( Number(row) -1 ).fill().map((_,idx) => Number(row) -  idx)
        }
        return Array(end - start + 1).fill().map((_, idx) => start + 1)
   }
}