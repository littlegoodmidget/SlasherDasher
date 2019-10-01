// LOAD this AFTER math.js


// This is the enemy agent
function Slasher(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.dir = Math.random()*Math.PI;
	// this.inputs;	// 1D list eg: [1,2,3,4,5]
	// this.outputs;	// 1D list eg: [5,2]
}

Slasher.prototype.createNN = function(){

}



// What do this critters do?
// Create critter (has AT LEAST 1 connection)
// Reproduce (create children)
// Mutate critter
// Attack others
