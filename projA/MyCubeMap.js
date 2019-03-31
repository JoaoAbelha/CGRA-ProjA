/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
    constructor(scene) {
        super(scene);

        this.side = new MyQuadMap(scene);
        this.top = new MyQuadMap(scene);
        this.bottom = new MyQuadMap(scene);
    }

    updateBuffers() {

    }

    display() {
        // save transformation matrix 
        this.scene.pushMatrix();

        const pi = Math.PI;
        this.scene.scale(50, 50, 50);
        this.scene.translate(0, 0.5,0);
        this.scene.pushMatrix();
        

        this.scene.top.apply();
        this.scene.rotate(-pi / 2, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.top.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.bottom.apply();
        this.scene.rotate(pi / 2, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.bottom.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.side.apply();
        this.scene.rotate(pi / 2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.side.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.rotate(pi, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.side.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.rotate(3 * pi / 2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.side.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0, 0.5);
        this.side.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}