import { Node } from "./nodeClass.js";

export class Tree { 
    constructor(array) {
        this.array = array;
        this.root = null;
    }

    buildTree(array, start, end) { 
        if ( start > end) return null;
        let mid = Math.floor((start + end) / 2);
        let root = array[mid];
        console.log("Mid", mid);
        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);
        
        return root;
    }
}