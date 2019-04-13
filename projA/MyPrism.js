/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPrism extends CGFobject
{
  constructor(scene, slices, stacks)
  {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.initBuffers();
  }

	initBuffers()
	{

	this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];
    
    let alphaAng = 2*Math.PI/this.slices;
    let stack = 1 / this.stacks;
    
    for(let k =0; k <= this.stacks; k++){
     for(let i=0; i < this.slices; i++){

      this.vertices.push(Math.cos(alphaAng *i),Math.sin(alphaAng*i),k*stack);
      this.vertices.push(Math.cos((i+1)*alphaAng),Math.sin((i+1)*alphaAng),k*stack);
      
      this.normals.push(Math.cos(alphaAng*i+alphaAng/2),Math.sin(alphaAng*i+alphaAng/2),0);
      this.normals.push(Math.cos(alphaAng*i+alphaAng/2),Math.sin(alphaAng*i+alphaAng/2),0);
    
      this.texCoords.push(
        0, k*1/this.stacks,
        1, k*1/this.stacks,
      );
      
    }

    
  }

  var indexNumber = 2 * this.slices * this.stacks;

  for(let i = 0; i < indexNumber; i+=2){
    this.indices.push(i, i + 1, i + 1 + this.slices * 2);
    this.indices.push(i, i + 1 + this.slices * 2, i + this.slices * 2);
  }


		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};