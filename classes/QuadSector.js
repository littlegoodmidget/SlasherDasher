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
    constructor(dimensions, depth = 0, parent) {
        this.depth = depth;
        this.dimensions = dimensions;

        this.subDivided = false;
        this.objects = [];

        this.parent = parent;

        this.TL = undefined;
        this.TR = undefined;
        this.BL = undefined;
        this.BR = undefined;

        this.draw();
    }
    fill() {
        c.fillStyle='red';
        c.fillRect(this.dimensions.x - this.dimensions.width/2, this.dimensions.y - this.dimensions.height/2, this.dimensions.width, this.dimensions.height);
        c.fillStyle='black'
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
                    quad.insert(obj);
                    
                    // c.fillRect(dim.x, dim.y, dim.width, dim.height);
                    // c.fillStyle = 'black'
                }

            }

            // c.fillStyle = 'purple';
            // obj.draw();
            // c.fillStyle = 'black';
            // debugger;

        }
    }
    deleteObj(obj) {
        for(let i = 0; i < this.objects.length; i++) {
            if(obj == this.objects[i]) {
                this.objects.splice(i, 1);
            }
        }
        if(this.parent) {
            this.parent.deleteObj(obj);
        }
    }
    insert(obj) {
        for(let i = 0; i < this.objects.length; i++) {
            if(obj === this.objects[i]) {
                // console.log('same')
                return;
            }
        }
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
                // debugger;

                this.subDivided = true;
                this.TL = new QuadSector(new Rect(this.dimensions.x, this.dimensions.y, this.dimensions.width/2, this.dimensions.height/2), this.depth+1, this);
                this.TR = new QuadSector(new Rect(this.dimensions.x + this.dimensions.width/2, this.dimensions.y, this.dimensions.width/2, this.dimensions.height/2), this.depth+1, this);
                this.BL = new QuadSector(new Rect(this.dimensions.x, this.dimensions.y + this.dimensions.height/2, this.dimensions.width/2, this.dimensions.height/2), this.depth+1, this);
                this.BR = new QuadSector(new Rect(this.dimensions.x + this.dimensions.width/2, this.dimensions.y + this.dimensions.height/2, this.dimensions.width/2, this.dimensions.height/2), this.depth+1, this);
                this.insertToChild(obj);
                for(let i = 0; i < this.objects.length; i++) {
                    this.insertToChild(this.objects[i]);
                    // quadRoots.length = 0;
                    // this.getRoots(quadTree, quadRoots);
                    quadRoots.length = 0;
                    this.getRoots(quadTree, quadRoots);
                }
                // debugger
                this.objects.length = 0;
            }   else if(this.depth<QuadSector.MaxDepth) {
                //If Shallow Enough
                // console.log(1)
                // for(let i = 0; i < this.objects.length; i++) {
                //     this.insertToChild(this.objects[i]);
                //     // quadRoots.length = 0;
                //     // this.getRoots(quadTree, quadRoots);
                // }
                
                this.objects.length = 0;
                
                // debugger
                this.insertToChild(obj);
                quadRoots.length = 0;
                this.getRoots(quadTree, quadRoots);
            }

        }
    }
    draw() {
        c.strokeRect(this.dimensions.x, this.dimensions.y, this.dimensions.width, this.dimensions.height);
    }
}


//TESTING
let squares = [];

function loop() {
    quadTree = new QuadSector(new Rect(0, 0, canvas.width, canvas.height),0);
    
    c.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < squares.length; i++) {
        squares[i].move();
        squares[i].draw();
        quadTree.insert(squares[i]);
        if(squares[i].isDead) {
            squares.splice(i, 1);
        }
    }
    // let s = 0;
    for(let i = 0; i < quadRoots.length; i++) {
        quadRoots[i].draw();
        // debugger
        if(quadRoots[i].objects.length>1) {
            // s++;
            // console.log(quadRoots[i].objects)
            for(let j = 0; j < quadRoots[i].objects.length; j++) {
                let obj = quadRoots[i].objects[j];
                for(let k = 0; k < quadRoots[i].objects.length; k++) {
                    let obj2 = quadRoots[i].objects[k];
                    if(j!=k) {
                        if(obj.x+obj.dx+obj.width/2 > obj2.x+obj2.dx - obj2.width/2 && obj.x-obj.width/2+obj.dx < obj2.x + obj2.width/2+obj2.dx && obj.y+obj.height/2+obj.dy > obj2.y+obj2.dy - obj2.height/2 &&obj.dy+ obj.y-obj.height/2 <obj2.dy+ obj2.y + obj2.height/2) {
                            // console.log('12')
                            if(obj.dx**2+obj.dy**2>obj2.dx**2+obj2.dy**2) {
                                obj2.isDead = true;
                            }   else {
                                obj.isDead = false;
                            }
                            c.fillStyle='red';
                            obj.draw();
                            
                            obj.dy*=-1;
                            obj2.dy*=-1;
                            obj.dx*=-1;
                            obj.dy*=-1;
                            // obj.move();
                            // obj2.move();
                            // obj.dx*=-1;
                            // obj2.dx*=-1;
                            // obj.dy*=-1;
                            // obj2.dy*=-1;
                            obj2.draw();
                            c.fillStyle='black'
                        }
                    }
                }
            }
        }
    }
    // console.log(s)


    setTimeout(loop, 1000/60);
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

        this.dx = Math.random()-0.5;
        this.dy = Math.random()-0.5;
        this.dx*=2;
        this.dy*=2;

        this.isDead = false;
    }
    draw() {
        c.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height)
    }
    move() {
        this.x += this.dx;
        this.y += this.dy;

        if(this.x-this.width/2+this.dx<0) {
            this.dx = Math.abs(this.dx)
            // this.dx*=-1;
        }   else if(this.x+this.width/2+this.dx>=canvas.width-1) {
            this.dx = -Math.abs(this.dx)
        }
        if(this.y-this.height/2+this.dy<0) {
            this.dy = Math.abs(this.dy)
            // this.dy*=-1;
        }   else if(this.y+this.height/2+this.dy>=canvas.height-1) {
            this.dy = -Math.abs(this.dy)
        }
        // if(this.y-this.height/2+this.dy<0||this.y+this.height/2+this.dy>=canvas.height-1) {
        //     this.dy*=-1;
        // }
    }
}
