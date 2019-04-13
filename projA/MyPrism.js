/**
* MyPrism
* @constructor
* @param scene Reference to MyScene object
* @param slices Number of sides
* @param stacks Number of normals throughout the edges
* @param visibleBase - Flag to manipulate the base visibility of the cone (default is false)
* @param visibleTop - Flag to manipulate the higher base visibility of the cone (default is false)
*/
class MyPrism extends CGFobject {
  constructor(scene, slices, stacks, visibleBase, visibleTop) {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    if (visibleBase == undefined) {
      this.base = false;
    } else {
      this.base = visibleBase;
    }
    if (visibleTop == undefined) {
      this.top= false;
    } else {
      this.top = visibleTop;
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

  drawTop(indexNumber) {
     for (let i = 1; i < this.slices * 2; i++) {
       this.indices.push(indexNumber + this.slices * 2 - i, indexNumber + this.slices * 2 + 1 - i, indexNumber + this.slices * 2 + 1);
    }
  }

  addIndices(start,end ) {
    for ( let i = start ; i < end; i += 2) {
      this.indices.push(i, i + 1, i + 1 + this.slices * 2);
      this.indices.push(i, i + 1 + this.slices * 2, i + this.slices * 2);
    }
  }
  
  initBuffers() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    let alphaAng = 2 * Math.PI / this.slices;
    let stack = 1 / this.stacks;

    if (this.base || this.top) { //why top
      this.addBaseCoords();
    }

    for (let k = 0; k <= this.stacks; k++) {
      for (let i = 0; i < this.slices; i++) {

        this.vertices.push(Math.cos(alphaAng * i), Math.sin(alphaAng * i), k * stack);
        this.vertices.push(Math.cos((i + 1) * alphaAng), Math.sin((i + 1) * alphaAng), k * stack);

        this.normals.push(Math.cos(alphaAng * i + alphaAng / 2), Math.sin(alphaAng * i + alphaAng / 2), 0);
        this.normals.push(Math.cos(alphaAng * i + alphaAng / 2), Math.sin(alphaAng * i + alphaAng / 2), 0);

        this.texCoords.push(
          0, k * 1 / this.stacks,
          1, k * 1 / this.stacks,
        );

      }
    }

    if (this.top) {

      this.addTopCoords();
    }

    var indexNumber = 2 * this.slices * this.stacks;

    if (this.base && !this.top) {
      this.drawBase();
      this.addIndices(1, indexNumber);
    } 
    else if (!this.base && this.top) {
      this.drawTop(indexNumber);
      this.addIndices(1, indexNumber);
    }
    else if (this.base && this.top) {
      this.drawBase();
      this.drawTop(indexNumber);
      this.addIndices(1, indexNumber + 1);
    }
    else {
      this.addIndices(0, indexNumber);
    }
    
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  };


};

