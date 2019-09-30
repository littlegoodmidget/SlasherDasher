const canvas = document.getElementById('canvas');
canvas.width = 600;
canvas.height = 600;
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext('2d');
const quadTree = new QuadSector(new Rect(0, 0, canvas.width, canvas.height));












canvas.addEventListener('mousedown', function(e) {
    let point = new Point(e.offsetX, e.offsetY);
    quadTree.insert(point);
    point.draw();
})