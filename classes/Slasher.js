// LOAD this AFTER math.js
console.log('Slasher.js loaded')

// This is the enemy agent
function Slasher(x,y,width,height){
	this.x = x;
	this.y = y;
	this.xVel = 0;
	this.yVel = 0;
	this.dir = Math.random()*2*Math.PI;		// Points in random direction

	// Character dimensions
	this.width = width;
	this.height = height;
}

// Creates a NN with AT LEAST ONE synapse and AT LEAST ONE bias
Slasher.prototype.createNN = function(numOfInputs,numOfOutputs){
	// check
	if(numOfInputs<1 || numOfOutputs<1){
		console.error('error numOfInputs<1 || numOfOutputs<1');
	}


	// DECLARATION & INITIALISATION
	this.numOfInputs = numOfInputs;
	this.numOfOutputs = numOfOutputs;

	// Neural network nodes
	this.inputNodes = [];
	this.outputNodes = [];
	this.hiddenNodes = [];

	this.nodeQueue = [];	// 1D list, stores all nodes to be processed
	/* NEED TWO? */


	// ADD NODES TO INPUT & OUTPUT
	for(let i=0;i<this.numOfInputs;i++){	//inputs
		this.inputNodes[i] = new Node(1);
	}
	for(let i=0;i<this.numOfOutputs;i++){	//outputs
		this.outputNodes[i] = new Node(0);
	}


	// // MUTATIONS
	// // Create AT LEAST ONE synapse
	// const startNode = this.inputNodes[m.randomIndexFromList(this.inputNodes)];
	// let endNode = this.outputNodes[m.randomIndexFromList(this.outputNodes)];
	// // Connect startNode to endNode (create synapse)
	// startNode.createSynapse(endNode);

	// // Create AT LEAST ONE bias
	// endNode = m.randomIndexFromList(this.outputNodes);
	// endNode.bias = m.random(1);
}


Slasher.prototype.mutateStructure = function(){
	// Creates mutations in the structure of the neural network of the agent
	/* 	Types of mutation:
		add synapse
		remove synapse
		add node
		remove node
		"add" bias (bias = math(1))
		"remove" bias (bias = 0)
	*/


	// Select which type of structure mutation (add/remove synapse&node or bias)
	const synNodeMutation = 1// Math.random()>0.666 ? 0 : 1; 	// 0=>bias mutation, 1=>synapse&node mutation
	console.log(synNodeMutation);

	for(let i=0;i<1;i++){

		if(synNodeMutation){
			// synapse/node Mutation

			// Selecting start and end node to mutate
			// Select start node
			const startNodeIndex = m.randomIndexFromList(this.inputNodes)+m.randomIndexFromList(this.hiddenNodes);	//any non-output
			let startNode;
			if(startNodeIndex<this.inputNodes.length)
				startNode = this.inputNodes[startNodeIndex];
			else
				startNode = this.hiddenNodes[startNodeIndex];
			
			console.log('startNodeIndex',startNodeIndex)
			
			// Select end node
			const endNodeIndex = m.randomIndexFromList(this.hiddenNodes)+m.randomIndexFromList(this.outputNodes);	//any non-input
			let endNodeIsOutput = 0;
			let endNode;
			if(endNodeIndex<this.hiddenNodes.length)
				endNode = this.hiddenNodes[endNodeIndex];
			else{
				endNode = this.outputNodes[endNodeIndex];
				endNodeIsOutput = 1;
			}
			console.log(startNodeIndex,endNodeIndex,startNode,endNode)
			// // Connect startNode to endNode (create synapse)
			// startNode.createSynapse(endNode);
			console.log('startNode.alreadyConnected(endNode)',startNode.alreadyConnected(endNode))
			
			if(startNode.alreadyConnected(endNode)){
				// already connected.
				// Now either create new node or remove synapse

				if(Math.random()<0.5){
					// create new node
					const newNode = new Node(0);
					this.hiddenNodes.push(newNode);
					newNode.addNode(startNode,endNode);
				}else{
					// remove synapse
					endNode.numOfDependents--;
					startNode.nextNodes.splice(startNode.nextNodes.indexOf(endNode),1);
				}
			}else{
				// not already connected.
				// either create new synapse or remove end node(if not output node)

				if(Math.random()<0.5){
					// Add synapse
					// 
					startNode.createSynapse(endNode);
				}else{
					// Remove end node
					// (remove startNode)
					
				}


			}
			// find if connection already exists
			// if connection already exists => remove syn or add node
			// if not exists => add syn or remove last node(if not output)

		

		}else{
			// bias Mutation
			const biasEndNode = m.randomIndexFromList(this.hiddenNodes)+m.randomIndexFromList(this.outputNodes);
			biasEndNode.bias = m.random(1);
		}
		
	}
	// Choose whether to add or remove (can add synapse to A->B even if one already exists, it just resets it)

}


Slasher.prototype.mutateValues = function(){
	/* 	Types of mutation:
		add synapse
		remove synapse
		add node
		remove node
		"add" bias (bias * 1)
		"remove" bias (bias * 0)
	*/


}



// Prunes connections so they only go in one direction
Slasher.prototype.prune = function(){

}



Slasher.prototype.feedforward = function(input){
	// input: [input1,input2,...,inputn]
	// Condition:
	//	input.length === this.numOfInputs
	if(input.length !== this.numOfInputs){
		console.error('input length !== this.numOfInputs');
	}

}








// What do this critters do?
// Create critter (has AT LEAST 1 connection)
// Reproduce (create children)
// Mutate critter
// Attack others


// Object containing all Slasher helper functions
const helper = {
	createMutationStructure: function(){

	},

	createMutationValue: function(){

	}
};