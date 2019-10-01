const canvas = document.getElementById('canvas');
canvas.width = 600;
canvas.height = 600;
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext('2d');
let quadSettings = {
    MaxDepth: 6,
    MaxObjects: 4
}

setQuadSettings(quadSettings);
const quadTree = new QuadSector(new Rect(0, 0, canvas.width, canvas.height));












function setQuadSettings(settings) {
    QuadSector.MaxDepth = settings.MaxDepth;
    QuadSector.MaxObjects = settings.MaxObjects;
}
canvas.addEventListener('mousedown', function(e) {
    quadRoots.length = 0;

    let block = new Block(e.offsetX, e.offsetY, 32, 32);
    quadTree.getRoots(quadTree, quadRoots);
    quadTree.insert(block);
    block.draw();

})