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
    static MaxObjects = 2;
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
    insertToChild(obj) {
        let percentX = ((obj.x - this.dimensions.x) / this.dimensions.width) * 2;
        let percentY = ((obj.y - this.dimensions.y) / this.dimensions.height) * 2;
        
        let pos = [
            ~~percentX,
            ~~percentY
        ];
        // debugger

        if(pos[0]==0&&pos[1]==0) {
            this.TL.insert(obj);
        }
        if(pos[0]==1&&pos[1]==0) {
            this.TR.insert(obj);
        }
        if(pos[0]==0&&pos[1]==1) {
            this.BL.insert(obj);
        }
        if(pos[0]==1&&pos[1]==1) {
            this.BR.insert(obj);
        }
    }
    insert(obj) {
        if((!this.subDivided&&this.objects.length+1 < QuadSector.MaxObjects)||this.depth==QuadSector.MaxDepth) {
            //If Not Sub-Divided
            //If Length Will Be Small Enough

            //Or

            //If Depth Is Equal To Max Depth
            this.objects.push(obj);
        }   else {
            //If Alrady Subdivided
            //Or
            //If Length Is Too Big
            //Or
            //Depth Is Not Equal To Max Depth
            if(this.depth<QuadSector.MaxDepth&&!this.subDivided) {
                //If Small Enough
                //If Not Divided
                this.subDivided = true;
                this.TL = new QuadSector(new Rect(this.dimensions.x, this.dimensions.y, this.dimensions.width/2, this.dimensions.height/2), this.depth+1);
                this.TR = new QuadSector(new Rect(this.dimensions.x + this.dimensions.width/2, this.dimensions.y, this.dimensions.width/2, this.dimensions.height/2), this.depth+1);
                this.BL = new QuadSector(new Rect(this.dimensions.x, this.dimensions.y + this.dimensions.height/2, this.dimensions.width/2, this.dimensions.height/2), this.depth+1);
                this.BR = new QuadSector(new Rect(this.dimensions.x + this.dimensions.width/2, this.dimensions.y + this.dimensions.height/2, this.dimensions.width/2, this.dimensions.height/2), this.depth+1);
                this.insertToChild(obj);
                for(let i = 0; i < this.objects.length; i++) {
                    this.insertToChild(this.objects[i]);
                }
                this.objects.length = 0;
            }   else if(this.depth<QuadSector.MaxDepth) {
                //If Small Enough
                this.insertToChild(obj);
            }

        }
    }
    draw() {
        c.strokeRect(this.dimensions.x, this.dimensions.y, this.dimensions.width, this.dimensions.height);
    }
}




//TESTING CLASSES

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = 'point';
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, 1, 0, Math.PI*2, false);
        c.fill()
    }
}

class Square {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = 'square';
    }
}