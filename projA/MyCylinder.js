/**
* MyCylinder
* @constructor
* @param scene Reference to MyScene object
* @param slices Number of sides
* @param stacks Number of normals throughout the edges
* @param visibleBase - Flag to manipulate the base visibility of the cone (default is false)
* @param visibleTop - Flag to manipulate the higher base visibility of the cone (default is false)
*/
class MyCylinder extends CGFobject {
  constructor(scene, slices, stacks, visibleBase, visibleTop) {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    if (visibleBase == undefined) {
      this.base = false;
    } else {
      this.base = true;
    }
    if (visibleTop == undefined) {
      this.top= false;
    } else {
      this.top = true;
    }
    this.initBuffers();
  }

  addBaseCoords() {
    this.vertices.push(0, 0, 0);
    this.texCoords.push(0.5, 0.5);
    this.normals.push(0, 0 ,-1);
  }

  addTopCoords() {
    this.vertices.push(0, 0, 1);  
    this.texCoords.push(0.5, 0.5);
    this.normals.push(0, 0 , 1);
  }

  drawBase() {
    for (let i = 1; i < this.slices * 2; i++) {
      this.indices.push(i + 1, i, 0);
    }
  }

  drawTop(nPontos) {
   for (let i = 0; i <= this.slices + 1; i++) {
       this.indices.push(nPontos + this.slices - i, nPontos + this.slices + 1 - i, nPontos + this.slices + 1);
    }
 }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    if (this.base || this.top) { //why top
      this.addBaseCoords();
    }

    var ang = 2 * Math.PI / this.slices;
    for (let j = 0; j <= this.stacks; j++) {
      for (let i = 0; i < this.slices; i++) {

        this.vertices.push(Math.cos(ang * i), Math.sin(ang * i), j * 1 / this.stacks);
        //this.vertices.push(Math.cos((i+1)*ang),Math.sin((i+1)*ang),j*1/this.stacks);

        this.texCoords.push(i * 1 / this.slices, j * 1 / this.stacks);

        this.normals.push(Math.cos(ang * i), Math.sin(ang * i), 0);
        //this.normals.push(Math.cos(ang*(i+1)),Math.sin(ang*(i+1)),0);
      }
    }

    if (this.top) {
      this.addTopCoords();
    }

    var nPontos = this.slices * this.stacks;

    for (let i = 1; i < nPontos; i++) {
      if ((i + 1) % this.slices == 0) {
        this.indices.push(i, i + 1, i + this.slices);
        this.indices.push(i, i + 1 - this.slices, i + 1);
      }
      else {
        this.indices.push(i, i + 1, i + 1 + this.slices);
        this.indices.push(i, i + 1 + this.slices, i + this.slices);
      }
    }

    if (this.base && !this.top) {
      this.drawBase();
    } 
    else if (!this.base && this.top) {
      this.drawTop(nPontos);
    }
    else if (this.base && this.top) {
      this.drawBase();
      this.drawTop(nPontos);
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  };
};