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
                    quad.insert(obj);
                }

            }

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
            if(obj.id === this.objects[i].id) {
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
                }
                quadRoots.length = 0;
                this.getRoots(quadTree, quadRoots);
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
                
                // this.objects.length = 0;
                
                // debugger
                this.insertToChild(obj);
                // quadRoots.length = 0;
                // this.getRoots(quadTree, quadRoots);
            }

        }
    }
    draw() {
        c.strokeRect(this.dimensions.x, this.dimensions.y, this.dimensions.width, this.dimensions.height);
    }
    checkObjectsStillInRange() {
        let changedObjects = [];
        let obj;
        for(let i = 0; i < this.objects.length; i++) {
            obj = this.objects[i];
            let pos = [
                ~~(((obj.x-obj.width/2) - this.dimensions.x) / this.dimensions.width * 2),
                ~~(((obj.y-obj.height/2) - this.dimensions.y) / this.dimensions.height * 2),
                ~~(((obj.x+obj.width/2) - this.dimensions.x) / this.dimensions.width * 2),
                ~~(((obj.y+obj.height/2) - this.dimensions.y) / this.dimensions.height * 2),
                // ~~percentY
            ];
            if(pos[0]<0||pos[1]<0||pos[2]<0||pos[3]<0||pos[0]>1||pos[1]>1||pos[2]>1||pos[3]>1) {
                changedObjects.push(obj);
                // console.log(changedObjects)
                this.objects.splice(i, 1);
                //go up tree to find if children have enough objects then insert objects at top
                //or could check if still have enough before removal
                // quadTree.insert(obj);
                
            }
        }

        if(this.depth!=0) {//deleting node if not needed??
            let sumOfChildrenObjects = changedObjects.length;
            let rRoots = [];
            let childrenObjects = [];
            quadTree.getRoots(this.parent, rRoots);
            for(let i = 0; i < rRoots.length; i++) {
                sumOfChildrenObjects += rRoots[i].objects.length;
                childrenObjects.push(...rRoots[i].objects);
            }
            // console.log(rRoots);
            // debugger
            // console.log(sumOfChildrenObjects)
            if(sumOfChildrenObjects < QuadSector.MaxObjects) {
            // if(this.parent.TL.objects.length+this.parent.TR.objects.length+this.parent.BL.objects.length+this.parent.BR.objects.length < QuadSector.MaxObjects) {
                this.parent.TL = undefined;
                this.parent.TR = undefined;
                this.parent.BL = undefined;
                this.parent.BR = undefined;
                this.parent.subDivided = false;
                quadRoots.length = 0;
                this.getRoots(quadTree, quadRoots);
                // console.log('1')

            }
            // console.log(changedObjects)
            for(let i = 0; i < changedObjects.length; i++) {
                this.parent.insert(changedObjects[i]);
                
            }
            for(let i = 0; i < childrenObjects.length; i++) {
                this.parent.insert(childrenObjects[i]);
                
            }
        }
        
        // console.log(changedObjects)
    }
    // checkObjectsStillInRange() {
    //     let obj;
    //     for(let i = 0; i < this.objects.length; i++) {
    //         obj = this.objects[i];
    //         let pos = [
    //             ~~(((obj.x-obj.width/2) - this.dimensions.x) / this.dimensions.width * 2),
    //             ~~(((obj.y-obj.height/2) - this.dimensions.y) / this.dimensions.height * 2),
    //             ~~(((obj.x+obj.width/2) - this.dimensions.x) / this.dimensions.width * 2),
    //             ~~(((obj.y+obj.height/2) - this.dimensions.y) / this.dimensions.height * 2),
    //             // ~~percentY
    //         ];
    //         if(pos[0]<0||pos[1]<0||pos[2]<0||pos[3]<0||pos[0]>1||pos[1]>1||pos[2]>1||pos[3]>1) {
    //             let currentQuad = this;
    //             while(currentQuad.depth!=0||pos[0]<0||pos[1]<0||pos[2]<0||pos[3]<0||pos[0]>1||pos[1]>1||pos[2]>1||pos[3]>1) {
    //                 currentQuad = currentQuad.parent;
    //                 pos = [
    //                     ~~(((obj.x-obj.width/2) - currentQuad.dimensions.x) / currentQuad.dimensions.width * 2),
    //                     ~~(((obj.y-obj.height/2) - currentQuad.dimensions.y) / currentQuad.dimensions.height * 2),
    //                     ~~(((obj.x+obj.width/2) - currentQuad.dimensions.x) / currentQuad.dimensions.width * 2),
    //                     ~~(((obj.y+obj.height/2) - currentQuad.dimensions.y) / currentQuad.dimensions.height * 2),
    //                 ];
    //             }

    //             // let roots = [];
    //             // let objects = [];
    //             // currentQuad.getRoots(currentQuad, roots);//rebuilds to top maybe find optimal spot where i don't have to rebuild as much
    //             // currentQuad.TL = undefined;
    //             // currentQuad.TR = undefined;
    //             // currentQuad.BL = undefined;
    //             // currentQuad.BR = undefined;
    //             // currentQuad.subDivided = false;
    //             // for(let i = 0; i < roots.length; i++) {
    //             //     objects.push(...roots[i].objects)
    //             // }
    //             // for(let i = 0; i < objects.length; i++) {
    //             //     currentQuad.insert(objects[i]);
                    
    //             // }
    //             let currentParent = this.parent;
    //             let sum = 0;
    //             while(currentParent.depth!=0&&sum<QuadSector.MaxObjects&&currentParent.TL.objects.length+currentParent.TR.objects.length+currentParent.BL.objects.length+currentParent.BR.objects.length < QuadSector.MaxObjects) {
    //                 sum = 0;
    //                 let objects = [];
    //                 let roots = [];
    //                 this.getRoots(currentParent, roots);
    //                 for(let i = 0; i < roots.length; i++) {
    //                     sum+=roots[i].objects.length;
    //                     console.log(sum)
    //                     if(sum > QuadSector.MaxObjects) {
    //                         objects.push(...roots[i].objects);
    //                         currentParent.TL = undefined;
    //                         currentParent.TR = undefined;
    //                         currentParent.BL = undefined;
    //                         currentParent.BR = undefined;
    //                         currentParent.subDivided = false;
    //                         for(let i = 0; i < objects.length; i++) {
    //                             currentParent.insert(objects[i]);
    //                         }
    //                         return;
    //                     }
    //                 }
    //                 currentParent = currentParent.parent;
    //             }
    //             // if(this.parent.TL.objects.length+this.parent.TR.objects.length+this.parent.BL.objects.length+this.parent.BR.objects.length < QuadSector.MaxObjects) {
    //             //     // if(this.parent.TL.objects.length+this.parent.TR.objects.length+this.parent.BL.objects.length+this.parent.BR.objects.length < QuadSector.MaxObjects) {

    //             //     //         // this.objects.length = 0;
    //             //     //     //     debugger
    //             //     //         // let insertedObjects = [...this.parent.TL.objects, ...this.parent.TR.objects, ...this.parent.BL.objects, ...this.parent.BR.objects]
    //             //     //         // // this.parent.objects = 
    //             //     //         // this.parent.TL = undefined;
    //             //     //         // this.parent.TR = undefined;
    //             //     //         // this.parent.BL = undefined;
    //             //     //         // this.parent.BR = undefined;
    //             //     //         // this.parent.subDivided = false;
    //             //     // }
    //             // }
    //             currentQuad.insert(obj)
    //             // for(let j = 0; j < this.objects.length; j++) {
    //                 // if(obj==this.objects[j]) {
    //                     // if()
    //                     // console.log(pos)
    //                     // if(this.parent.TL.objects.length+this.parent.TR.objects.length+this.parent.BL.objects.length+this.parent.BR.objects.length < QuadSector.MaxObjects) {
    //                     //     this.objects.length = 0;
    //                     //     debugger
    //                     //     let insertedObjects = [...this.parent.TL.objects, ...this.parent.TR.objects, ...this.parent.BL.objects, ...this.parent.BR.objects]
    //                     //     // this.parent.objects = 
    //                     //     this.parent.TL = undefined;
    //                     //     this.parent.TR = undefined;
    //                     //     this.parent.BL = undefined;
    //                     //     this.parent.BR = undefined;
    //                     //     this.parent.subDivided = false;
    //                     //     console.log(insertedObjects)
    //                     //     for(let i = 0; i < insertedObjects.length; i++) {
    //                     //         quadTree.insert(insertedObjects[i])
    //                     //     }
    //                     //     quadRoots.length = 0;
    //                     //     this.getRoots(quadTree, quadRoots);
    //                     //     return;
    //                     // }
    //                     // this.objects.splice(i,1)
    //                     // quadTree.insert(obj)
    //                     // console.log(pos);
    //                 // }
    //             // }
    //         }
        // }
    // }
}


//TESTING







function TESTING(d) {
    console.log(d)
}




//TESTING CLASSES
let quadRoots = [];
class Block {
    static Id = 0;
    constructor(x, y, width, height) {
        this.id = Block.Id;
        Block.Id++;
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

let squares = [];
function initalize() {
    while(squares.length<200) {
        let square = new Block(Math.random()*canvas.width, Math.random()*canvas.height, 5, 5)
        // squares.push(square)
        squares.push(square)
        quadTree.insert(square);
    
    }
    loop();
}
function loop() {
    quadTree = new QuadSector(new Rect(0, 0, canvas.width, canvas.height),0);
    quadRoots.length = 0;
    quadRoots[0] = quadTree
    // quadTree.getRoots(quadTree, quadRoots);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < squares.length; i++) {
        squares[i].move();
        squares[i].draw();
        quadTree.insert(squares[i])
    }

    for(let i = 0; i < quadRoots.length; i++) {
        quadRoots[i].draw();
    }
    // quadRoots.length = 0;
    // quadTree.getRoots(quadTree, quadRoots);

    window.requestAnimationFrame(loop);
    // setTimeout(loop, 1000/t);
}
let t = 60;