/**
 * MyTreeRowPatch
 * @constructor
 */

class MyTreeRowPatch extends CGFobject {
    constructor(scene, trunkTexture, treeTopTexture) {
        super(scene);
        this.tree = new MyTree(scene, 100, 100,1.5,0.5,2,1, trunkTexture, treeTopTexture);
    
        this.displacementsOnX = [];
        for(let i = 0; i < 6; i++) {
            this.displacementsOnX.push(Math.floor(Math.random() * 2)).toFixed(4);
        }

        this.displacementsOnZ = [];
        for(let j = 0; j < 6; j++) {
            this.displacementsOnZ.push(Math.floor(Math.random() * 2)).toFixed(4);
        }

        this.scaling = [];
        for(let s = 0; s < 6; s++) {
            this.scaling.push(Math.floor(Math.random() * 2)).toFixed(4);
        }
    };
    display() {
        const side = 6;

        for(let i = 0; i < side; i++) {
            this.scene.pushMatrix();
            this.scene.translate(4*i + this.displacementsOnX[i],0, this.displacementsOnZ[i]);
            this.scene.scale(1 + this.scaling[i], 1 + this.scaling[i], 1 + this.scaling[i]);
            this.tree.display();
            this.scene.popMatrix();
        }
    };
}
