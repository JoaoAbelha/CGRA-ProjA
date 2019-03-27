/**
 * MyHouse
 * @constructor
 */

class MyHouse extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cube = new MyUnitCubeQuad(scene);
        this.pyramid = new MyPyramid(scene,4,1);
        this.prism = new MyPrism(scene,8,1);
        

    };
    display() {
        let houseSide = 1;
        let roofWidth = 5;
        let roofLength = 5;
        let houseWidht = 4.5;
        let houseLenght = 5;
        let houseHeight = 2.5;
        let garageside = 1.5;
        this.scene.pushMatrix();
        this.scene.scale(houseWidht, houseHeight, houseLenght);
        this.scene.translate(0 ,0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(houseWidht, houseHeight, houseLenght);
        this.scene.translate(0 ,houseHeight -1.7, 0);
        this.cube.display();





        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,houseHeight , 0);
        this.scene.scale(roofWidth,1.5,roofLength);
        this.scene.translate(0, 0.1, 0);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.pyramid.display();
        this.scene.popMatrix();

        //colunas
            this.scene.pushMatrix();
        this.scene.translate(roofWidth/2 +0.3,0,roofLength/2 +0.3) ; 
       this.scene.scale(0.3,houseHeight + 0.3,0.3);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.prism.display();

        this.scene.translate(-houseLenght * 3.7,0,0);

        

        this.prism.display();
        this.scene.translate(0,houseLenght * 3.7,0);
        this.prism.display();

        this.scene.translate(houseLenght *3.7 ,0,0);
        this.prism.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1,houseHeight + 1.5,0);
        this.scene.scale(0.5,0.5,0.5);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(10,0,7);
        this.scene.scale(10,0.1,8);
        
        this.cube.display();
        this.scene.popMatrix();
        

        
        
    };
}