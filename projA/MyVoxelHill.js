/**
 * MyVoxelHill
 * @constructor
 */

class MyVoxelHill extends CGFobject {
    constructor(scene, niveis) {
        super(scene);
        this.cube = new MyUnitCubeQuad(scene);
        this.niveis = niveis;

    };

    // possivelmente melhorar ciclo
    display() {
      let side = 1; // se mudar fazer scalling
        //DUVIDA: as translações estão a acumular-se
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.cube.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.cube.display();
        this.scene.popMatrix();
        this.scene.translate(0, 1, 0);
        this.cube.display();
        this.scene.pushMatrix();
        this.scene.popMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.popMatrix();

    //    for(let i = 0 ; i < this.niveis; i++) {
    //         this.draw(0, this.niveis-i);
    //    }

       //this.scene.popMatrix();

    };

    draw (lado, nivel) {
        //this.console.log(nivel);
        this.scene.translate(0, nivel, 0);
        this.cube.display();
        


        // for(let i = 0; i < lado ; i++) {
        //     for(let j = 0 ; j < lado ; j++) {
        //         this.scene.pushMatrix();
        //         this.scene.translate(0,nivel,0);
        //         this.cube.display();
        //         this.scene.popMatrix();
        //     }
        // }
    };

   
}