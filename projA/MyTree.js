/**
 * MyTree
 * @constructor
 */

 class MyTree extends CGFobject {

    constructor (scene, slides, stack, trunkHeight, trunkRadius) {
        super(scene);
        this.cone = new MyCone(this.scene,slides,stack);
        this.trunk = new MyCylinder(this.scene,slides,stack);
        this.trunkRadius = trunkRadius;
        this.trunkHeight = trunkHeight;

        // a aplicar texturas acrescentar nos objetos
    };

    display() {

        const pi = Math.PI;

        this.scene.pushMatrix();
        this.scene.translate(0,1,0);
        this.cone.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.rotate(pi/2 ,0,0,1); // erro nao esta a rodar
        this.scene.scale(this.trunkRadius,this.trunkHeight , this.trunkRadius);
        this.trunk.display();
        this.scene.popMatrix();
    };
 }