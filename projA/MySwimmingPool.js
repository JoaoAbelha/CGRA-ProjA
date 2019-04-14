/**
 * MyHouse
 * @constructor
 */

class MySwimmingPool extends CGFobject {
    constructor(scene) {
        super(scene);
        this.pool = new MyQuad(scene);
        this.cube = new MyUnitCubeQuad(scene);
    };
    display() {
        const length = 12;
        const width = 8;
        const x=0 , z=0; // centro da piscina no plano xz
        const extra_scale = 1.1; // 

        this.scene.pool.apply();
        this.scene.pushMatrix();
        this.scene.translate(x, 0,z-length/2);
        let scale = (length+width)/10;
        this.scene.scale(width*extra_scale,scale/2,scale );
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(x, 0, z+length/2);
        this.scene.scale(width*extra_scale, scale/2, scale);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(x-width/2, 0, z);
        this.scene.scale(scale, scale/2, length*extra_scale);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(x+width/2, 0, z);
        this.scene.scale(scale, scale/2, length*extra_scale);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(x, 0, z);
        this.scene.scale(width, 1, length);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.water.apply();
        this.pool.display();
        this.scene.popMatrix();
    }

}