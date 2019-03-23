/**
 * MyTreeRowPatch
 * @constructor
 */

class MyTreeRowPatch extends CGFobject {
    constructor(scene) {
        super(scene);
        this.tree = new MyTree(scene, 6, 1,1,1);

    };

    display() {
        const side = 6;

        for(let i = 0; i < side; i++) {
            this.scene.pushMatrix();
            this.scene.translate(4*i ,0, 0);
            this.tree.display();
            this.scene.popMatrix();
        }
            

    };
}
