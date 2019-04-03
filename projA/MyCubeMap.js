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
        this.scene.sky.apply();

        const pi = Math.PI;
        this.scene.scale(100, 50, 100);
        this.scene.translate(0, 0.5,0);
        this.scene.pushMatrix();
        this.scene.rotate(-pi / 2, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);

        let topCoords = [
			1/3, 0,
			2/3, 0,
			1/3, 0.5,
			2/3, 0.5
        ]
        this.top.updateTexCoords(topCoords);

        this.top.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.rotate(pi / 2, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);

        let bottomCoords = [
			0, 0,
			1/3, 0,
			0, 0.5,
			1/3, 0.5
        ]
        this.bottom.updateTexCoords(bottomCoords);

        this.bottom.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.rotate(pi / 2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);

        let rightCoords = [
            1, 1,
            2/3, 1,
            1, 0.5,
            2/3, 0.5
        ]
        this.side.updateTexCoords(rightCoords);

        this.side.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.rotate(pi, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);

        let frontCoords = [
            2/3, 1,
            1/3, 1,
            2/3, 0.5,
            1/3, 0.5
        ]
        this.side.updateTexCoords(frontCoords);

        this.side.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.rotate(3 * pi / 2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);

        let leftCoords = [
            1/3, 1,
            0, 1,
            1/3, 0.5,
            0, 0.5
        ]
        this.side.updateTexCoords(leftCoords);

        this.side.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0, 0.5);

        let backCoords = [
            1, 0.5,
            2/3, 0.5,
            1, 0,
            2/3, 0
        ]
        this.side.updateTexCoords(backCoords);

        this.side.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}