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

    processInfoBreadthFirst(node, level, res) {
         if(!res[level]) res[level] = []; 
         res[level].push(node.data);
    }
    
    levelOrder(root, callback = this.processInfoBreadthFirst) {
        
        const res = []
        this.levelOrderRec(root, 0, callback, res); 
        return res; 
    }

    levelOrderRec(root, level, callback, res) { 
        if(!root) return null; 
        if(!callback) return console.error("invalid callback");

        callback(root, level, res); 
        
        this.levelOrderRec(root.left, level + 1, callback, res);
        this.levelOrderRec(root.right, level + 1, callback, res)
    }

    levelOrderIterative(root, callback=this.processInfoBreadthFirst){
        if(!root) return []; 
        if(!callback) return console.error("invalid callback");
        
        const q = [root]; 
        const res = []
        let level = 0;

        while(q.length > 0) { 
            const length = q.length; 

            res.push([]);

            for(let i = 0; i < length; i++) { 
                const front = q.shift();
                callback(front, level, res);

                if(front.left) q.push(front.left);
                if(front.right) q.push(front.right);
            }
            level++
        }
        return res;
    }

    processInfoDepth(root) { 
        if(root) console.log(root.data);
    }
    inOrderIterative(root, callback=this.processInfoDepth) { 
        if(!root) return; 
        if(!callback) return console.error("invalid callback");
        
        const stack = [];
        let current = root; 
        while(current || stack.length > 0) {
            while(current) { 
                stack.push(current);
                current = current.left;
            } 
            current = stack.pop();
            callback(current);
            current = current.right; 
        }
    }
    
    inOrderRecursive(root, callback= this.processInfoDepth) { 
        if(!root) return; 
        if(!callback) return console.error("invalid callback");

        root.left = this.inOrderRecursive(root.left , callback);
        callback(root); 
        root.right = this.inOrderRecursive(root.right , callback);

    }

    preOrderIter(root, callback=this.processInfoDepth) { 
        if(!root) return
        if(!callback) return console.error("invalid callback function")

        const q = [root]; 
        
        while(q.length > 0) { 
            const node = q.pop(); 
            callback(node);

            if(node.right) q.push(node.right);            
            if(node.left) q.push(node.left);            
        }
    }

    preOrderRecurs(root, callback= this.processInfoDepth) { 
        if(!root) return; 
        if(!callback) return console.error("invalid callback function");

        callback(root);
        root.left = this.preOrderRecurs(root.left , callback);
        root.right = this.preOrderRecurs(root.right , callback);
    }

    postOrderIter(root, callback= this.processInfoDepth) {
        if(!root) return;
        if(!callback) return console.error("invalid callback function"); 

        const stack1 = [root]; 
        const stack2 = []; 
        const result = []; 

        while(stack1.length) { 
            const node = stack1.pop();
            stack2.push(node); 
    
            if(node.left) stack1.push(node.left);            
            if(node.right) stack1.push(node.right); 

        }
        while(stack2.length) {
            const value = stack2.pop().data
            callback(value)
            result.push(value);
        }
        return result;
    }
}
