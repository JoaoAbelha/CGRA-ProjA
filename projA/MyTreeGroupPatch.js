/**
 * MyTree
 * @constructor
 */

class MyTreeGroupPatch extends CGFobject {
    constructor(scene) {
        super(scene);
        this.tree = new MyTree(scene, 6, 1,1,1);

    };

    display() {
        const side = 3;

        for(let i = 0; i< side; i++)
            for(let j = 0; j<  side; j++) {

                this.scene.pushMatrix();
                this.scene.translate(4*i ,0, 4*j);
                this.tree.display();
                this.scene.popMatrix();
            }

    };
}
