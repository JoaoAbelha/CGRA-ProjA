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
 
       for(let i = 0 ; i < this.niveis; i++) {
            this.draw(this.niveis - i, i);
       }

       this.scene.popMatrix();
    };

    draw (lado, nivel) {

        for(let i = 0; i < lado ; i++) {
            for(let j = 0 ; j < lado ; j++) {
                this.scene.pushMatrix();
                this.scene.translate(i,nivel,j);
                this.cube.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.translate(-i,nivel,j);
                this.cube.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.translate(i,nivel,-j);
                this.cube.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.translate(-i,nivel,-j);
                this.cube.display();
                this.scene.popMatrix();
            }
        }
    };

   
}