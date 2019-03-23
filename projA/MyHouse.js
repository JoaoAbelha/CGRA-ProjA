/**
 * MyHouse
 * @constructor
 */

class MyHouse extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cube = new MyUnitCubeQuad(scene);
        this.pyramid = new MyPyramid(scene,4,1);
        

    };

    display() {
        let houseSide = 1;
        let roofSide = 1.5;
        //let garageside = 1.5;
        this.scene.pushMatrix();
        this.scene.translate(0, houseSide/2,0);
        this.scene.scale(houseSide,houseSide,houseSide);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,houseSide/2, 0);
        this.scene.scale(roofSide,1,roofSide);
        //this.scene.rotate(0,Math.pi/4,0,1);
        this.pyramid.display();
        this.scene.popMatrix();

        
        
    };
}