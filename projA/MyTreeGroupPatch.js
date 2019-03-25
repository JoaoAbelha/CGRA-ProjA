/**
 * MyTreeGroupPatch
 * @constructor
 */

class MyTreeGroupPatch extends CGFobject {
    constructor(scene) {
        super(scene);
        this.tree = new MyTree(scene, 6, 1,1,1);

        this.displacementsOnX = [];
        for(let i = 0; i < 9; i++) {
            this.displacementsOnX.push(Math.floor(Math.random() * 2)).toFixed(4);
        }

        this.displacementsOnZ = [];
        for(let j = 0; j < 9; j++) {
            this.displacementsOnZ.push(Math.floor(Math.random() * 2)).toFixed(4);
        }

    };
    display() {
        const side = 3;

        let counter = 0;

        for(let i = 0; i< side; i++)
            for(let j = 0; j<  side; j++) {
                this.scene.pushMatrix();
                this.scene.translate(4*i + this.displacementsOnX[counter] ,0, 4*j + this.displacementsOnZ[counter]);
                this.tree.display();
                this.scene.popMatrix();
                counter++;
            }
    };
}
