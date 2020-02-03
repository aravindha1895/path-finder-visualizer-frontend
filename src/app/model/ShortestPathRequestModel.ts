export class ShortestPathRequest{
    inputMatrix: Array<Array<number>>;
    rows : number;
    cols : number;
	source: Array<number>;
    dest: Array<number>;
    
    constructor(inputMatrix,noRows,noCols,i,j, x,y){
        this.inputMatrix=inputMatrix;
        this.rows=noRows;
        this.cols=noCols;
        this.source = [];
        this.source.push(i);
        this.source.push(j);
        this.dest = [];
        this.dest.push(x);
        this.dest.push(y);
    }
}