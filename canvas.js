const canvas = document.getElementById('canvas');
canvas.width = 600;
canvas.height = 600;
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext('2d');
let quadSettings = {
    MaxDepth: 6,
    MaxObjects: 3
}

setQuadSettings(quadSettings);
let quadTree = new QuadSector(new Rect(0, 0, canvas.width, canvas.height),0);








// for(let i = 0; i < 100; i++) {
//     quadRoots.length = 0;

//     let block = new Block(Math.random()*canvas.width, Math.random()*canvas.height, 5, 5);
//     quadTree.getRoots(quadTree, quadRoots);
//     quadTree.insert(block);
//     block.draw();
// }



function setQuadSettings(settings) {
    QuadSector.MaxDepth = settings.MaxDepth;
    QuadSector.MaxObjects = settings.MaxObjects;
}
canvas.addEventListener('mousedown', function(e) {
    quadRoots.length = 0;

    let block = new Block(e.offsetX, e.offsetY, 100, 100);
    squares.push(block);
    quadTree.getRoots(quadTree, quadRoots);
    quadTree.insert(block);
    block.draw();

})