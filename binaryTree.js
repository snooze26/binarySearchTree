import { Node } from "./nodeClass.js";

export class Tree { 
    constructor(array) {
        this.array = array;
        this.root = this.buildTree(array, 0, array.length -1)
    }

    buildTree(array, start, end) { 
        if ( start > end) return null;
        let mid = Math.floor((start + end) / 2);
        let root = array[mid];
        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);
        
        return root;
    }

    insert(value, currentNode = this.root) {

        // check if the current node is null
        if(!currentNode) return new Node(value.data);
        // check if the value is already present 
        if(value.data === currentNode.data) return currentNode;
        // recuvrsviely run insert to the left / right subTree
        if( value.data < currentNode.data) {
            console.log("Inserting left: " , value.data);    
            currentNode.left = this.insert(value, currentNode.left);
                
        }else if (value.data > currentNode.data) { 
            console.log("inserting right: " , value.data)
                currentNode.right = this.insert(value, currentNode.right);
        }
        // return the node 
        return currentNode;
    }

    min(root) {
        if(!root.left) return root.data;    
        return this.min(root.left);
    }

    max(root) {
        if(!root.right) return root.data;    
        return this.max(root.right);
    }
}