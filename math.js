console.log('Loaded matrix.js');

const m = {
	random: function(amplitude){
		return Math.random()*2*amplitude-amplitude;
	},

	randomIndexFromList: function(list){
		return list[Math.floor(Math.random()*list.length)];
	}
};