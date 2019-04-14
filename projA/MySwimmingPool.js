/**
* MySwimmingPool- used to simulate a specular (water) and a diffuse (wooden floor) phenomenon
* @constructor
* @param scene Reference to MyScene object
* @param x coordenate x of the center of the pool
* @param z coodenate y of the center of the pool
* @param length - lenght of the pool
* @param width - width of the pool
*/
class MySwimmingPool extends CGFobject { // centro da piscina no plano xz (0,0)
    constructor(scene,x,z, length, width) {
        super(scene);
        this.pool = new MyQuad(scene);
        this.cube = new MyUnitCubeQuad(scene);
        this.floor = new MyQuad(scene);

        this.x=x;
        this.z = z;
        this.length = length;
        this.width = width;
    };

    displayFloor() {
        const extraDeviation = -0.001; // the water must be always visible
        this.scene.pushMatrix();
        let zi = this.z -this.length;
        let xscale = 2*this.width;
        this.scene.translate(this.x,extraDeviation,zi);
        this.scene.scale(xscale,1,1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.woodPool.apply();


        for(let i = 0; i < 2*this.length;i++) {

            this.scene.translate(0,-1,0);
            this.floor.display();

        }
        
        this.scene.popMatrix();
    }
    display() {
       
        const extra_scale = 1.1; 
        const scale = (this.length+this.width)/10;

        this.displayFloor();

        this.scene.pool.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.x, 0,this.z-this.length/2);
        this.scene.scale(this.width*extra_scale,scale/2,scale);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.x, 0, this.z+this.length/2);
        this.scene.scale(this.width*extra_scale, scale/2, scale);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.x-this.width/2, 0, this.z);
        this.scene.scale(scale, scale/2, this.length*extra_scale);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.x+this.width/2, 0, this.z);
        this.scene.scale(scale, scale/2, this.length*extra_scale);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.x, 0, this.z);
        this.scene.scale(this.width, 1, this.length);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.water.apply();
        this.pool.display();
        this.scene.popMatrix();
    }

}