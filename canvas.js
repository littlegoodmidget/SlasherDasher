const canvas = document.getElementById('canvas');
canvas.width = 200;
canvas.height = 200;
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext('2d');
let quadSettings = {
    MaxDepth: 4,
    MaxObjects: 50
}
let testSettings = {
    MaxDepth: 3,
    MaxObjects: 15
}


setQuadSettings(quadSettings);
setQuadSettings(testSettings);
let quadTree = new QuadSector(new Rect(0, 0, canvas.width, canvas.height),0);

initalize();




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

    let block = new Block(e.offsetX, e.offsetY, 10, 10);
    squares.push(block);
    // quadTree.getRoots(quadTree, quadRoots);
    // quadTree.insert(block);
    // block.draw();

})