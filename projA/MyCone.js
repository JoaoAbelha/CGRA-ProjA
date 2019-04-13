/**
* MyCone
* @constructor
*/
class MyCone extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    addBase() {
        this.vertices.push(0, 0, 0);
        this.texCoords.push(0.5, 0.5);
        this.normals.push(0, 0, -1);

        for(var i = 0; i <= this.slices; i++) {
            this.indices.push((i + 1) % this.slices, i, this.slices + 1);
        }
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        this.base = true;

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){

            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.indices.push(i, (i+1) % this.slices, this.slices);
            this.texCoords.push(Math.cos(ang), -Math.sin(ang));
            this.normals.push(Math.cos(ang), Math.cos(Math.PI/4.0), -Math.sin(ang));
            ang+=alphaAng;
        }
        this.vertices.push(0,1,0);
        this.texCoords.push(0,0,0);
        this.normals.push(0,1,0);

        if(this.base) {
            this.addBase();
        }
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


