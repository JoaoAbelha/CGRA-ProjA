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
        let side = 1;
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.cube.displayHillCube();

        for (let i = 0; i < this.niveis; i++) {
            this.draw(this.niveis - i, i);
        }

        this.scene.popMatrix();
    };

    draw(lado, nivel) {

        for (let i = 0; i < lado; i++) {
            for (let j = 0; j < lado; j++) {
                if (i == lado - 1 || j == lado - 1) {
                    this.scene.pushMatrix();
                    this.scene.translate(i, nivel, j);
                    this.cube.displayHillCube();
                    this.scene.popMatrix();

                    this.scene.pushMatrix();
                    this.scene.translate(-i, nivel, j);
                    this.cube.displayHillCube();
                    this.scene.popMatrix();

                    this.scene.pushMatrix();
                    this.scene.translate(i, nivel, -j);
                    this.cube.displayHillCube();
                    this.scene.popMatrix();

                    this.scene.pushMatrix();
                    this.scene.translate(-i, nivel, -j);
                    this.cube.displayHillCube();
                    this.scene.popMatrix();
                }
            }
        }
    };


}