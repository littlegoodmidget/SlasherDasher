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
    getRoots(quad, arr) {
        if(quad.subDivided) {
            this.getRoots(quad.TL, arr);
            this.getRoots(quad.TR, arr);
            this.getRoots(quad.BL, arr);
            this.getRoots(quad.BR, arr);
        }   else {
            // if(quad.objects.length>0) {
                arr.push(quad);
            // }
        }
    }
    insertToChild(obj) {
        // let percentX = ((obj.x - this.dimensions.x) / this.dimensions.width) * 2;
        // let percentY = ((obj.y - this.dimensions.y) / this.dimensions.height) * 2;
        
        let pos = [
            ~~(((obj.x-obj.width/2) - this.dimensions.x) / this.dimensions.width * 2),
            ~~(((obj.y-obj.height/2) - this.dimensions.y) / this.dimensions.height * 2),
            ~~(((obj.x+obj.width/2) - this.dimensions.x) / this.dimensions.width * 2),
            ~~(((obj.y+obj.height/2) - this.dimensions.y) / this.dimensions.height * 2),
            // ~~percentY
        ];
        // debugger
        // TESTING(pos);
        if(pos[0]==pos[2]&&pos[1]==pos[3]) {
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
            // console.log('directly in block')
        }   else {
            // console.log('in multiple blocks')
            // console.log(quadRoots)
            // debugger
            // debugger
            quadRoots.length = 0;
            this.getRoots(quadTree, quadRoots);
            for(let i = 0; i < quadRoots.length; i++) {
                let quad = quadRoots[i]
                let dim = quad.dimensions;
                if(obj.x + obj.width/2 > dim.x && obj.x - obj.width/2 < dim.x + dim.width && obj.y + obj.height/2 > dim.y && obj.y - obj.height/2 < dim.y + dim.height) {
                    // console.log('overlap with quad')
                    // c.fillStyle = 'rgba(0.5, 0.5, 0.5, 0.2)';
                    // c.fillRect(dim.x, dim.y, dim.width, dim.height);
                    quad.insert(obj)
                    // c.fillStyle = 'black'
                }
                // console.log(i)
            }
        }
        // else if() {

        // }
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
                quadRoots.length = 0;
                this.getRoots(quadTree, quadRoots);
                
            }   else if(this.depth<QuadSector.MaxDepth) {
                //If Small Enough
                quadRoots.length = 0;
                this.getRoots(quadTree, quadRoots);

                this.insertToChild(obj);
            }

        }
    }
    draw() {
        c.strokeRect(this.dimensions.x, this.dimensions.y, this.dimensions.width, this.dimensions.height);
    }
}




function TESTING(d) {
    console.log(d)
}




//TESTING CLASSES
let quadRoots = [];
class Block {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw() {
        c.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height)
    }
}
