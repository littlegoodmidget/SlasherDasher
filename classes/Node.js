console.log('loaded Node.js');

// Neural network node
function Node(isInput){
	this.val = 0;	// for all nodes. Set to 0 after this individual node is finished being used

	this.nextNodes = [];	// only for non-output
	this.weights = [];	// only for non-output. corresponding weight values

	if(!isInput){
		this.bias = 0;	// only for non-input
		this.numOfParents = 0;	// Number of parents
		this.countedParents = 0;	// Number of parents that have currently been counted
	}

}

// Adds/connects two nodes together. Pruning step will resolve this issue
Node.prototype.addNode = function(nextNode){
	this.nextNodes.push(nextNode);	
	nextNode.nextNodes.push(this);

	nextNode.numOfParents++;
	this.numOfParents++;
}

// Returns true if current node as nextNode
Node.prototype.alreadyConnected = function(nextNode){
	return this.nextNodes.indexOf(nextNode)===-1 ? 0:1;
}
