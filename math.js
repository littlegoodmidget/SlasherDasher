console.log('Loaded matrix.js');

const m = {
	random: function(amplitude){
		return Math.random()*2*amplitude-amplitude;
	},

	randomIndexFromList: function(list){
		return Math.floor(Math.random()*list.length);
	}
};