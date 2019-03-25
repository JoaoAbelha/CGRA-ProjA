/**
 * MyTreeRowPatch
 * @constructor
 */

class MyTreeRowPatch extends CGFobject {
    constructor(scene) {
        super(scene);
        this.tree = new MyTree(scene, 6, 1,1.5,0.5,2,1);
    
        this.displacementsOnX = [];
        for(let i = 0; i < 6; i++) {
            this.displacementsOnX.push(Math.floor(Math.random() * 2)).toFixed(4);
        }

        this.displacementsOnZ = [];
        for(let j = 0; j < 6; j++) {
            this.displacementsOnZ.push(Math.floor(Math.random() * 2)).toFixed(4);
        }
    };
    display() {
        const side = 6;

        for(let i = 0; i < side; i++) {
            this.scene.pushMatrix();
            this.scene.translate(4*i + this.displacementsOnX[i],0, this.displacementsOnZ[i]);
            this.tree.display();
            this.scene.popMatrix();
        }
    };
}
