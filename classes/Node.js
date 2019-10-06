console.log('loaded Node.js');

// Neural network node
function Node(isInput){
	this.val = 0;	// for all nodes. Set to 0 after this individual node is finished being used

	this.nextNodes = [];	// only for non-output
	this.weights = [];	// only for non-output. corresponding weight values
	
	this.numOfDependents = 0;	// Number of parents

	if(!isInput){
		this.bias = 0;	// only for non-input
		this.countedDependents = 0;	// Number of parents that have currently been counted
	}

}

// Creates 2 connections between two nodes. Pruning step will reduce connections to one
Node.prototype.createSynapse = function(nextNode){
	this.nextNodes.push(nextNode);	
	nextNode.nextNodes.push(this);

	nextNode.numOfDependents++;
	this.numOfDependents++;
}

// Adds/connects 
Node.prototype.addNode = function(beforeNode,afterNode){
	beforeNode.nextNodes[beforeNode.nextNodes.indexOf(afterNode)]=this;
	this.nextNodes.push(afterNode);
	this.numOfDependents++;
}

// Returns true if current node as nextNode
Node.prototype.alreadyConnected = function(nextNode){
	return this.nextNodes.indexOf(nextNode)===-1 ? 0:1;
}
