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


    



    // // possivelmente melhorar ciclo
    // display() {
    //   let side = 1; // se mudar fazer scalling

    //     this.scene.pushMatrix();
    //     this.scene.translate(0,-0.5,0);

    //    for(let i = 0 ; i < this.niveis; i++) {
    //         this.draw(i+1, i);
    //    }

    //    this.scene.popMatrix();

    // };

    // draw (lado, nivel) {
    //     for(let i = 0; i < lado ; i++) {
    //         for(let j = 0 ; j < lado ; j++) {
    //             this.scene.pushMatrix();
    //             this.scene.translate(i,nivel,j);
    //             this.cube.display();
    //             this.scene.popMatrix();
    //         }
    //     }
    // };

   
}