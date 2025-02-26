import { Node } from "./nodeClass.js";
import { Tree } from "./binaryTree.js"; 
const node0 = new Node(0);
const node1 = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
const node4 = new Node(4);
const node5 = new Node(5);
const node6 = new Node(6);
const node7 = new Node(7);
const node8 = new Node(8);
const node9 = new Node(9);
const node10 = new Node(10);
const node11 = new Node(11);
const nodeArray = [node0, node1, node2, node3, node4, node5, node6, node7, node8, node9, node10, node11];

let testTree = new Tree();
testTree = testTree.buildTree(nodeArray, 0, nodeArray.length-1)
console.log("Built Tree: " , testTree);

