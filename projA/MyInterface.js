/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }
    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');
        
        this.gui.add(this.scene, 'selectedObject', this.scene.objectIDs).name('Selected Object');
        this.gui.add(this.scene, 'displayNormals').name("Display normals");
        this.gui.add(this.scene, 'texturesEnabled').name("Display textures");
        this.gui.add(this.scene, 'ambientLight', 0.01, 1.0).onChange(this.scene.updateAmbientLight.bind(this.scene));
        
        var f0 = this.gui.addFolder('Light 0 ');
        f0.add(this.scene.lights[0], 'enabled').name("Enabled");
        var f1 = this.gui.addFolder('Light 1 ');
        f1.add(this.scene.lights[1], 'enabled').name("Enabled");

        var f = this.gui.addFolder('Light 2 ');
        f.add(this.scene.lights[2], 'enabled').name("Enabled");

        var f2 = this.gui.addFolder('Custom Material');
        
        f2.addColor(this.scene.customMaterialValues,'Ambient').onChange(this.scene.updateCustomMaterial.bind(this.scene));
        f2.addColor(this.scene.customMaterialValues,'Diffuse').onChange(this.scene.updateCustomMaterial.bind(this.scene));
        f2.addColor(this.scene.customMaterialValues,'Specular').onChange(this.scene.updateCustomMaterial.bind(this.scene));
        f2.add(this.scene.customMaterialValues,'Shininess', 0, 100).onChange(this.scene.updateCustomMaterial.bind(this.scene));

        return true;
    }
}