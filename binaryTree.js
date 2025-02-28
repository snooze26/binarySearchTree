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

        if(value < root.data) {
            root.left = this.deleteNode(root.left, value);
        }else if( value > root.data) {
            root.right = this.deleteNode(root.right, value); 
        }else {
            if(!root.left) { 
                return root.right;
            } else if(!root.right) {
                return root.left;
            }
            root.data = this.min(root.right)
            root.right = this.deleteNode(root.right , root.data)
        }
        return root;  
    }

    find(value, currentNode = this.root) {  
        if(!currentNode) return null; 
        
        if(value === currentNode.data){
            console.log("HERE IS CURRENT NODE," , currentNode.data)
            return currentNode;
        }

        if(value < currentNode.data) { 
            return currentNode.left = this.find(value, currentNode.left);
        } else { 
            return currentNode.right = this.find(value , currentNode.right )
        } 
    }

    levelOrder(root) {
        const res = []; 
        this.levelOrderRec(root, 0, res); 
        return res; 
    }

    levelOrderRec(root, level, res) { 
        if(!root) return null; 

        if(res.length <= level) { 
            res.push([]);
        }
        
        res[level].push(root.data); 
        this.levelOrderRec(root.left, level + 1, res);
        this.levelOrderRec(root.right, level + 1, res)
    }

    levelOrderIterative(root){
        if(!root) return []; 
        const q = [];
        const res = []; 

        q.push(root);
        let level = 0; 

        while(q.length > 0) { 
            const len = q.length;
            res.push([]);

            for(let i = 0; i < len; i++) { 
                const front = q.shift(); 
                res[level].push(front.data); 

                if(front.left) q.push(front.left);
                if(front.right) q.push(front.right)
            }
        level++
        }
         return res;  
    }
}
