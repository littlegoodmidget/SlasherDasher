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
    let point = new Point(e.offsetX, e.offsetY);
    quadTree.insert(point);
    point.draw();
})