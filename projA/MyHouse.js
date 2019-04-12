/**
 * MyHouse
 * @constructor
 */

class MyHouse extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cube = new MyUnitCubeQuad(scene);
        this.quad = new MyQuad(scene);
        this.pyramid = new MyPyramid(scene, 4, 1);
        this.prism = new MyPrism(scene, 8, 1);
        this.pyramidRoof = new MyPyramid(scene, 8, 1);
        this.pool = new MyQuad(scene);
        this.prismRoof = new MyPrism(scene, 3, 1);




    };
    display() {
        //ver melhor texcoords do prisma e aplica-las às paredes da casa
        let houseSide = 1;
        let roofWidth = 5;
        let roofLength = 5;
        let houseWidht = 4.5;
        let houseLenght = 5;
        let houseHeight = 2.5;
        let garageside = 1.5;


        //prism house
        this.scene.pushMatrix();
        this.scene.translate(houseWidht + 1.4, 0, 0);
        this.scene.scale(houseLenght, houseHeight, houseLenght);
        this.scene.rotate(Math.PI / 8, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.brickwall.apply();
        this.prism.display();


        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(houseWidht + 1.4, houseHeight, 0);
        this.scene.scale(houseLenght, houseHeight / 1.5, houseLenght * 1.3);
        this.scene.rotate(Math.PI / 8, 0, 1, 0);
        this.scene.roofTop.apply();
        this.pyramidRoof.display();
        this.scene.popMatrix();



        this.scene.pushMatrix();
        this.scene.scale(houseWidht, houseHeight, houseLenght);
        this.scene.translate(0, 0.5, 0);
        this.scene.brickwall.apply();
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, houseHeight, 0);
        this.scene.scale(houseWidht, houseHeight * 1.6, houseLenght);
        this.scene.translate(0, 0.5, 0);
        this.scene.whitewall.apply();
        this.cube.display();
        this.scene.popMatrix();

        //porta
        this.scene.pushMatrix()
        this.scene.scale(1.5, 3, 1);
        this.scene.translate(0, 0.5, houseLenght/2 + 0.001);
        this.scene.door.apply();
        this.quad.display();
        this.scene.popMatrix();

        //janelas
        this.scene.pushMatrix()
        this.scene.translate(0, 4.2, houseLenght/2 + 0.001);
        this.scene.scale(2, 2, 1);
        this.scene.window.apply();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix()
        this.scene.translate(houseWidht/2 + 0.001, 4.2, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(2, 2, 1);
        this.scene.window.apply();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix()
        this.scene.translate(-houseWidht/2 - 0.001, 4.2, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.scale(2, 2, 1);
        this.scene.window.apply();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix()
        this.scene.translate(0, 4.2, -houseLenght/2 - 0.001);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(2, 2, 1);
        this.scene.window.apply();
        this.quad.display();
        this.scene.popMatrix();
        //telhado
        this.scene.pushMatrix();
        this.scene.translate(0, houseHeight * 2 + 0.3, 0);
        this.scene.scale(houseWidht, houseHeight, houseLenght);
        this.scene.translate(0, 0.1, 0);
        this.scene.rotate(Math.PI / 4, 0, 1, 0);
        this.scene.roofTop.apply();
        this.pyramid.display();
        this.scene.popMatrix();

        //colunas
        this.scene.pushMatrix();
        this.scene.translate(roofWidth / 2 + 0.3, 0, roofLength / 2 + 0.3);
        this.scene.scale(0.3, houseHeight * 2 + 0.6, 0.3);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        //this.prism.display();

        this.scene.translate(-houseLenght * 3.7, 0, 0);
        this.prism.display();
        this.scene.translate(0, houseLenght * 3.7, 0);
        this.prism.display();

        this.scene.translate(houseLenght * 3.7, 0, 0);
        //  this.prism.display();

        this.scene.popMatrix();

        //chaminé
        this.scene.pushMatrix();
        this.scene.translate(1, houseHeight * 2 + 2.5, 0);
        this.scene.scale(0.5, 1, 0.5);
        this.scene.brickwall.apply();
        this.cube.display();
        this.scene.popMatrix();



        // parte da direita da casa

        // this.scene.pushMatrix();
        // this.scene.translate(houseLenght * 2.6, 0, 0);
        // this.scene.scale(7, houseHeight, 3.9);
        // this.scene.translate(0, 0.5, 0);
        // this.scene.brickwall.apply();
        // this.cube.display();
        // this.scene.popMatrix();

        // this.scene.pushMatrix();
        // this.scene.translate(houseLenght * 2.6, 0, 0);
        // this.scene.scale(5, houseHeight * 1.5, 3.9);
        // this.scene.translate(0, 0.5, 0);
        // this.scene.brickwall.apply();
        // this.cube.display();
        // this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(houseLenght * 2.6 + 1, houseHeight * 1.5 - 0.1, 1);
        this.scene.scale(7, 0.1, 6);
        this.scene.translate(0, 0.5, 0);
        this.scene.woodenFloor.apply();
        this.cube.display();
        this.scene.popMatrix();

        // this.scene.pushMatrix();
        // this.scene.translate(houseLenght * 2.6 + 1, houseHeight * 1.5 - 0.1, -1.5);
        // this.scene.scale(7, 1.5, 1);
        // this.scene.translate(0, 0.5, 0);
        // this.scene.brickwall.apply();
        // this.cube.display();
        // this.scene.popMatrix();


        //varanda frente
        this.scene.pushMatrix();
        this.scene.translate(houseLenght * 2.6 + 1, houseHeight * 1.5 + 0.25, +4);
        this.scene.scale(7, 0.7, 0.1);
        this.scene.balcony.apply();
        this.cube.display();
        this.scene.popMatrix();

        //varandas laterais
        this.scene.pushMatrix();
        this.scene.translate(houseLenght * 2.1 + 0.05, houseHeight * 1.5 + 0.25, 1);
        this.scene.scale(0.1, 0.7, 6);
        this.scene.balcony.apply();        
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(houseLenght * 2.1 + 0.05 + 6.9, houseHeight * 1.5 + 0.25, 1);
        this.scene.scale(0.1, 0.7, 6);
        this.scene.balcony.apply();
        this.cube.display();
        this.scene.popMatrix();

        //colunas
        this.scene.pushMatrix();
        this.scene.translate(houseLenght * 2.1 + 0.3, 0, 3.5);
        this.scene.scale(0.3, houseHeight * 1.5 * 1.4, 0.3);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.prism.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(houseLenght * 2.1 + 0.5 + 6, 0, 3.5);
        this.scene.scale(0.3, houseHeight * 1.5 * 1.4, 0.3);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.prism.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(houseLenght * 2.1 + 0.3 + 6, 0, -1.7);
        this.scene.scale(0.3, houseHeight * 1.5, 0.3);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.prism.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(houseLenght * 2.1 + 0.3, 0, -1.7);
        this.scene.scale(0.3, houseHeight * 1.5, 0.3);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.prism.display();
        this.scene.popMatrix();

        //roof prism
        this.scene.pushMatrix();
        this.scene.translate(houseLenght * 2.1 + 3.5, 5.7, -1.7);
        this.scene.scale(4, 1, 5.5);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.tatchedRoofTop.apply();
        this.prismRoof.display();
        this.scene.popMatrix();

        //escadas xD
        this.scene.pushMatrix();
        this.scene.translate(houseLenght * 2.1 + 3, 0, -1.7);
        this.scene.scale(0.05, houseHeight * 1.5, 0.05);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.prism.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(houseLenght * 2.1 + 4, 0, -1.7);
        this.scene.scale(0.05, houseHeight * 1.5, 0.05);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.prism.display();
        this.scene.popMatrix();

        for (let i = 0; i < 7; i++) {
            this.scene.pushMatrix();
            this.scene.translate(houseLenght * 2.1 + 4, 0.5 + i*0.5, -1.7);
            this.scene.scale(1, 0.05, 0.05);
            this.scene.rotate(-Math.PI / 2, 0, 1, 0);
            this.prism.display();
            this.scene.popMatrix();
        }


        // the pool  
        this.scene.pool.apply();
        this.scene.pushMatrix();
        this.scene.translate(12, 0, 7.5);
        this.scene.scale(10, 1, 1);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(12, 0, 15.5);
        this.scene.scale(10, 1, 1);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(7.5, 0, 11);
        this.scene.scale(1, 1, 8);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(17.5, 0, 11.5);
        this.scene.scale(1, 1, 9);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(12, 0, 12);
        this.scene.scale(10, 10, 8);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.water.apply();
        this.pool.display();
        this.scene.popMatrix();
    };
}