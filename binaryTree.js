import { Node } from "./nodeClass.js";

export class Tree { 
    constructor(array) {
        this.array = array;
        this.root = this.buildTree(array, 0, array.length -1)
    }

    buildTree(array, start, end) {
        
        if ( start > end) return null;
        let mid = Math.floor((start + end) / 2);
        // console.log("mid value*** " , mid);
        let root = new Node(array[mid].data);
        // console.log("****before the left subtree is recurse**** ")
        root.left = this.buildTree(array, start, mid - 1);
        // console.log("****before the right subtree is recurse**** ")

        root.right = this.buildTree(array, mid + 1, end);
        
        return root;
    }

    insert(value, currentNode = this.root) {

        // check if the current node is null
        if(!currentNode) return new Node(value);
        // check if the value is already present 
        if(value === currentNode.data) return currentNode;
        // recuvrsviely run insert to the left / right subTree
        if( value < currentNode.data) {
            currentNode.left = this.insert(value, currentNode.left);
                
        }else if (value > currentNode.data) { 
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

    delete(value) { 
        this.root = this.deleteNode(this.root, value.data);
    }

    deleteNode(root, value) {
        if(!root) return null; 
        console.log("VALUE BEFORE" ,value )
        console.log("ROOT DATA BEFORE****" , root.data); 
        if(value < root.data) {
            console.log("Entering the left traversal ROOT LEFT****" , root.left)
            root.left = this.deleteNode(root.left, value);
            console.log("left traversal is finished ROOT LEFT: ****", root.left)
        }else if( value > root.data) {
            console.log("entering the right traversal ROOT right: ****", root.right)
            root.right = this.deleteNode(root.right, value); 
            console.log("right traversal is finished ROOT right: ****", root.right)

        }else {
            if(!root.left) { 
                console.log("RIGHT ROOT HERE***" , root.right)
                console.log("****End of left null run*****  ");
                return root.right;
            } else if(!root.right) {
                console.log("LEFT ROOT HERE ****" , root.left);
                console.log("****End of right null run*****  ");
                return root.left;
            }
            console.log("ROOT IF VALUE AND ROOT VALUE ARE THE SAME***" , root)
            //replacing the deleted the node with right
            root.data = this.min(root.right)
            root.right = this.deleteNode(root.right , root.data)
            console.log("****End of traversal run*****  ");
            console.log("ROOT DATA AFTER****" , root); 
        }


        return root;
        
    }
}