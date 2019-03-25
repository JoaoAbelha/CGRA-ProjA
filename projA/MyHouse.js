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
        let roofWidth = 2;
        let roofLength = 2.5;
        let houseWidht = 4;
        let houseLenght = 5;
        let houseHeight = 3;
        //let garageside = 1.5;
        this.scene.pushMatrix();
        this.scene.scale(houseWidht, houseHeight, houseLenght);
        this.scene.translate(0 ,0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(houseWidht, houseHeight, houseLenght);
        this.scene.translate(0 ,0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        //this.scene.translate(0,houseSide/2, 0);
        //this.scene.scale(roofWidth,1,roofLength);
        this.scene.translate(0, 0.1, 0);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.pyramid.display();
        this.scene.popMatrix();

        
        
    };
}