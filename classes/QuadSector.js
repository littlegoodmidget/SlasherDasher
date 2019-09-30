class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
}

class QuadSector {
    static MaxDepth = 6;
    static MaxObjects = 3;
    constructor(dimensions, depth = 0) {
        this.depth = depth;
        this.dimensions = dimensions;

        this.subDivided = false;
        this.objects = [];

        this.TL = undefined;
        this.TR = undefined;
        this.BL = undefined;
        this.BR = undefined;


        this.draw();
    }
    insert(obj) {
        if(this.objects.length < QuadSector.MaxObjects) {
            this.objects.push(obj);
        }   else {
            
        }
    }
    draw() {
        c.strokeRect(this.dimensions.x, this.dimensions.y, this.dimensions.width, this.dimensions.height);
    }
}