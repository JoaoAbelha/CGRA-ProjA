/**
 * MyCubeMap
 * @constructor
 */

class MyCubeMap extends CGFobject {
    constructor(scene) {
        super(scene);
        this.landscape = new MyUnitCubeQuad(scene);
       

    };

    display() {

        this.landscape.display();
       

    };

    
}