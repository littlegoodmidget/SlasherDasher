const canvas = document.getElementById('canvas');
canvas.width = 600;
canvas.height = 600;
const c = canvas.getContext('2d');
const quadTree = new QuadSector(new Rect(0, 0, canvas.width, canvas.height));





