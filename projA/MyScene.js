/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.initializeTextures();

        this.initializeObjects();

        this.enableTextures(true);
    }

    initializeTextures() {
        this.initializePoolTextures();
        this.initializeTreeTextures();
        this.initializeVoxeHillTextures();
        this.initializeDayCubeMapTextures();
        this.initializeNightCubeMapTextures();
        this.initializeHouseTextures();
        this.initializeFlashLightTextures();
    }

    initializeObjects() {
        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.scaleFactor = 1;

        this.selectedObject = 0;
        this.selectedEnvironment = 0;
        this.displayNormals = false;
        this.texturesEnabled = true;
        this.ambientLight = 0.8;

        this.customMaterialValues = {
            'Ambient': '#0000ff',
            'Diffuse': '#ff0000',
            'Specular': '#000000',
            'Shininess': 10
        }

        this.customMaterial = new CGFappearance(this);
        this.updateCustomMaterial();

        let slices = 100;
        let stack = 100;
        this.prism = new MyPrism(this, 10, 100);
        this.cylinder = new MyCylinder(this, 100, 100);
        this.cone = new MyCone(this, 100, 100, true);
        this.tree = new MyTree(this, slices, stack, 1.5, 0.5, 2, 1, this.trunk, this.treetop);
        this.groupPatch = new MyTreeGroupPatch(this, this.trunk, this.treetop);
        this.rowPatch = new MyTreeRowPatch(this, this.trunk, this.treetop);
        this.house = new MyHouse(this);
        this.hill = new MyVoxelHill(this, 8);
        this.image = new MyCubeMap(this);
        this.flashlight = new MyFlashlight(this);
        this.pyramid = new MyPyramid(this, 10, stack);
        this.swimmingPool = new MySwimmingPool(this, 1, 1, 12, 8);

        this.objects = [this.prism, this.cylinder, this.cone, this.tree, this.groupPatch, this.rowPatch, this.house, this.hill, this.image, this.flashlight, this.pyramid, this.swimmingPool];
        this.objectIDs = { 'Prism': 0, 'Cylinder': 1, 'Cone': 2, 'Tree': 3, 'Groupesquare': 4, 'RowPatch': 5, 'House': 6, "Hill": 7, "Image": 8, "Flashlight": 9, "pyramid": 10, "pool": 11 };
        this.environmentIDs = { 'Day': 0, 'Night 1': 1, 'Night 2': 2 };
    }


    initializePoolTextures() {
        this.water = new CGFappearance(this);
        this.water.setAmbient(0.6, 0.6, 0.9, 1);
        this.water.setDiffuse(0.8, 0.8, 0.9, 1);
        this.water.setSpecular(0.9, 0.9, 0.9, 1);
        this.water.setShininess(200.0);
        this.water.loadTexture('images/water.jpg');
        this.water.setTextureWrap('REPEAT', 'REPEAT');

        this.pool = new CGFappearance(this);
        this.pool.setAmbient(1, 1, 1, 1);
        this.pool.setDiffuse(0.9, 0.9, 0.9, 1);
        this.pool.setSpecular(0.4, 0.4, 0.4, 1);
        this.pool.setShininess(10.0);
        this.pool.loadTexture('images/poolfloor.jpg');
        this.pool.setTextureWrap('REPEAT', 'REPEAT');

        this.woodPool = new CGFappearance(this);
        this.woodPool.setAmbient(0.85, 0.8, 0.6, 1);
        this.woodPool.setDiffuse(0.85, 0.8, 0.6, 1);
        this.woodPool.setSpecular(0.1, 0.1, 0.1, 1);
        this.woodPool.setShininess(1.0);
        this.woodPool.loadTexture('images/woodPool2.jpg');
        this.woodPool.setTextureWrap('REPEAT', 'REPEAT');
    }

    initializeTreeTextures() {
        this.trunk = new CGFappearance(this);
        this.trunk.setAmbient(0.85, 0.8, 0.55, 1);
        this.trunk.setDiffuse(0.85, 0.8, 0.55, 1);
        this.trunk.setSpecular(0.01, 0.01, 0.01, 1);
        this.trunk.setShininess(1.0);
        this.trunk.loadTexture('images/trunk.jpg');
        this.trunk.setTextureWrap('REPEAT', 'REPEAT');

        this.treetop = new CGFappearance(this);
        this.treetop.setAmbient(0.55, 0.95, 0.55, 1);
        this.treetop.setDiffuse(0.55, 0.95, 0.55, 1);
        this.treetop.setSpecular(0.01, 0.01, 0.01, 1);
        this.treetop.setShininess(1.0);
        this.treetop.loadTexture('images/treetop.jpg');
        this.treetop.setTextureWrap('REPEAT', 'REPEAT');
    }

    initializeVoxeHillTextures() {
        this.side = new CGFappearance(this);
        this.side.setAmbient(0.1, 0.1, 0.1, 1);
        this.side.setDiffuse(0.9, 0.9, 0.9, 1);
        this.side.setSpecular(0.1, 0.1, 0.1, 1);
        this.side.setShininess(10.0);
        this.side.loadTexture('images/mineSide.png');
        this.side.setTextureWrap('REPEAT', 'REPEAT');

        this.top = new CGFappearance(this);
        this.top.setAmbient(0.1, 0.1, 0.1, 1);
        this.top.setDiffuse(0.9, 0.9, 0.9, 1);
        this.top.setSpecular(0.1, 0.1, 0.1, 1);
        this.top.setShininess(10.0);
        this.top.loadTexture('images/mineTop.png');
        this.top.setTextureWrap('REPEAT', 'REPEAT');

        this.bottom = new CGFappearance(this);
        this.bottom.setAmbient(0.1, 0.1, 0.1, 1);
        this.bottom.setDiffuse(0.9, 0.9, 0.9, 1);
        this.bottom.setSpecular(0.1, 0.1, 0.1, 1);
        this.bottom.setShininess(10.0);
        this.bottom.loadTexture('images/mineBottom.png');
        this.bottom.setTextureWrap('REPEAT', 'REPEAT');
    }

    initializeDayCubeMapTextures() {
        this.hillsBK = new CGFappearance(this);
        this.hillsBK.setAmbient(1, 1, 1, 1);
        this.hillsBK.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsBK.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsBK.setShininess(10.0);
        this.hillsBK.loadTexture('images/sor_hills/hills_bk_day.JPG');
        this.hillsBK.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsDN = new CGFappearance(this);
        this.hillsDN.setAmbient(1, 1, 1, 1);
        this.hillsDN.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsDN.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsDN.setShininess(10.0);
        this.hillsDN.loadTexture('images/sor_hills/hills_dn.JPG');
        this.hillsDN.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsLF = new CGFappearance(this);
        this.hillsLF.setAmbient(1, 1, 1, 1);
        this.hillsLF.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsLF.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsLF.setShininess(10.0);
        this.hillsLF.loadTexture('images/sor_hills/hills_lf_day.JPG');
        this.hillsLF.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsRT = new CGFappearance(this);
        this.hillsRT.setAmbient(1, 1, 1, 1);
        this.hillsRT.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsRT.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsRT.setShininess(10.0);
        this.hillsRT.loadTexture('images/sor_hills/hills_rt_day.JPG');
        this.hillsRT.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsFT = new CGFappearance(this);
        this.hillsFT.setAmbient(1, 1, 1, 1);
        this.hillsFT.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsFT.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsFT.setShininess(10.0);
        this.hillsFT.loadTexture('images/sor_hills/hills_ft_day.JPG');
        this.hillsFT.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsUP = new CGFappearance(this);
        this.hillsUP.setAmbient(1, 1, 1, 1);
        this.hillsUP.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsUP.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsUP.setShininess(10.0);
        this.hillsUP.loadTexture('images/sor_hills/hills_up_day.JPG');
        this.hillsUP.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }

    initializeNightCubeMapTextures() {
        this.hillsBKNight = new CGFappearance(this);
        this.hillsBKNight.setAmbient(1, 1, 1, 1);
        this.hillsBKNight.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsBKNight.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsBKNight.setShininess(10.0);
        this.hillsBKNight.loadTexture('images/sor_hills/hills_bk.JPG');
        this.hillsBKNight.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsDNNight = new CGFappearance(this);
        this.hillsDNNight.setAmbient(1, 1, 1, 1);
        this.hillsDNNight.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsDNNight.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsDNNight.setShininess(10.0);
        this.hillsDNNight.loadTexture('images/sor_hills/hills_dn.JPG');
        this.hillsDNNight.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsLFNight = new CGFappearance(this);
        this.hillsLFNight.setAmbient(1, 1, 1, 1);
        this.hillsLFNight.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsLFNight.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsLFNight.setShininess(10.0);
        this.hillsLFNight.loadTexture('images/sor_hills/hills_lf.JPG');
        this.hillsLFNight.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsRTNight = new CGFappearance(this);
        this.hillsRTNight.setAmbient(1, 1, 1, 1);
        this.hillsRTNight.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsRTNight.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsRTNight.setShininess(10.0);
        this.hillsRTNight.loadTexture('images/sor_hills/hills_rt.JPG');
        this.hillsRTNight.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsFTNight = new CGFappearance(this);
        this.hillsFTNight.setAmbient(1, 1, 1, 1);
        this.hillsFTNight.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsFTNight.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsFTNight.setShininess(10.0);
        this.hillsFTNight.loadTexture('images/sor_hills/hills_ft.JPG');
        this.hillsFTNight.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsUPNight = new CGFappearance(this);
        this.hillsUPNight.setAmbient(1, 1, 1, 1);
        this.hillsUPNight.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsUPNight.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsUPNight.setShininess(10.0);
        this.hillsUPNight.loadTexture('images/sor_hills/hills_up.JPG');
        this.hillsUPNight.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }


    initializeHouseTextures() {
        this.roofTop = new CGFappearance(this);
        this.roofTop.setAmbient(0.5, 0.5, 0.5, 1);
        this.roofTop.setDiffuse(0.5, 0.5, 0.5, 1);
        this.roofTop.setSpecular(0.01, 0.01, 0.01, 1);
        this.roofTop.setShininess(1.0);
        this.roofTop.loadTexture('images/rooftop1.jpg');
        this.roofTop.setTextureWrap('REPEAT', 'REPEAT');

        this.column = new CGFappearance(this);
        this.column.setAmbient(0.5, 0.5, 0.5, 1);
        this.column.setDiffuse(0.5, 0.5, 0.5, 1);
        this.column.setSpecular(0.1, 0.1, 0.1, 1);
        this.column.setShininess(1.0);
        this.column.loadTexture('images/column.jpg');
        this.column.setTextureWrap('REPEAT', 'REPEAT');

        this.tatchedRoofTop = new CGFappearance(this);
        this.tatchedRoofTop.setAmbient(0.9, 0.85, 0.45, 1);
        this.tatchedRoofTop.setDiffuse(0.9, 0.85, 0.45, 1);
        this.tatchedRoofTop.setSpecular(0.01, 0.01, 0.01, 1);
        this.tatchedRoofTop.setShininess(1.0);
        this.tatchedRoofTop.loadTexture('images/tatchedroof.jpg');
        this.tatchedRoofTop.setTextureWrap('REPEAT', 'REPEAT');

        this.woodenFloor = new CGFappearance(this);
        this.woodenFloor.setAmbient(0.6, .25, 0.05, 1);
        this.woodenFloor.setDiffuse(0.6, 0.25, 0.05, 1);
        this.woodenFloor.setSpecular(0.01, 0.01, 0.01, 1);
        this.woodenFloor.setShininess(1.0);
        this.woodenFloor.loadTexture('images/woodenfloor.jpg');
        this.woodenFloor.setTextureWrap('REPEAT', 'REPEAT');

        this.balcony = new CGFappearance(this);
        this.balcony.setAmbient(0.6, .25, 0.05, 1);
        this.balcony.setDiffuse(0.6, .25, 0.05, 1);
        this.balcony.setSpecular(0.01, 0.01, 0.01, 1);
        this.balcony.setShininess(1.0);
        this.balcony.loadTexture('images/balcony.jpg');
        this.balcony.setTextureWrap('REPEAT', 'REPEAT');

        this.brickwall = new CGFappearance(this);
        this.brickwall.setAmbient(1, 1, 0.6, 1);
        this.brickwall.setDiffuse(0.9, 0.9, 0.9, 1);
        this.brickwall.setSpecular(0.01, 0.01, 0.01, 1);
        this.brickwall.setShininess(10.0);
        this.brickwall.loadTexture('images/wall2.jpg');
        this.brickwall.setTextureWrap('REPEAT', 'REPEAT');

        this.whitewall = new CGFappearance(this);
        this.whitewall.setAmbient(1, 1, 1, 1);
        this.whitewall.setDiffuse(0.9, 0.9, 0.9, 1);
        this.whitewall.setSpecular(0.01, 0.01, 0.01, 1);
        this.whitewall.setShininess(1.0);
        this.whitewall.loadTexture('images/whitewall.jpg');
        this.whitewall.setTextureWrap('REPEAT', 'REPEAT');

        this.door = new CGFappearance(this);
        this.door.setAmbient(0.75, 0.85, 0.85, 1);
        this.door.setDiffuse(0.2, 0.7, 0.45, 1);
        this.door.setSpecular(0.01, 0.01, 0.01, 1);
        this.door.setShininess(1.0);
        this.door.loadTexture('images/door2.jpg');
        this.door.setTextureWrap('REPEAT', 'REPEAT');

        this.window = new CGFappearance(this);
        this.window.setAmbient(0.9, 0.95, 1, 1);
        this.window.setDiffuse(0.9, 0.95, 1, 1);
        this.window.setSpecular(0.01, 0.01, 0.01, 1);
        this.window.setShininess(1.0);
        this.window.loadTexture('images/window.jpg');
        this.window.setTextureWrap('REPEAT', 'REPEAT');
    }

    initializeFlashLightTextures() {
        this.sidelight = new CGFappearance(this);
        this.sidelight.setAmbient(1, 1, 1, 1);
        this.sidelight.setDiffuse(0.9, 0.9, 0.9, 1);
        this.sidelight.setSpecular(0.4, 0.4, 0.4, 1);
        this.sidelight.setShininess(10.0);
        this.sidelight.loadTexture('images/sideFlash.jpg');
        this.sidelight.setTextureWrap('REPEAT', 'REPEAT');

        this.toplight = new CGFappearance(this);
        this.toplight.setAmbient(1, 1, 1, 1);
        this.toplight.setDiffuse(0.9, 0.9, 0.9, 1);
        this.toplight.setSpecular(0.4, 0.4, 0.4, 1);
        this.toplight.setShininess(10.0);
        this.toplight.loadTexture('images/topflashlight.jpg');
        this.toplight.setTextureWrap('REPEAT', 'REPEAT');
    }

    updateCustomMaterial() {
        var rgba;

        this.customMaterial.setAmbient(...this.hexToRgbA(this.customMaterialValues['Ambient']));
        this.customMaterial.setDiffuse(...this.hexToRgbA(this.customMaterialValues['Diffuse']));
        this.customMaterial.setSpecular(...this.hexToRgbA(this.customMaterialValues['Specular']));

        this.customMaterial.setShininess(this.customMaterialValues['Shininess']);

    };

    hexToRgbA(hex) {
        var ret;
        //either we receive a html/css color or a RGB vector
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            ret = [
                parseInt(hex.substring(1, 3), 16).toPrecision() / 255.0,
                parseInt(hex.substring(3, 5), 16).toPrecision() / 255.0,
                parseInt(hex.substring(5, 7), 16).toPrecision() / 255.0,
                1.0
            ];
        }
        else
            ret = [
                hex[0].toPrecision() / 255.0,
                hex[1].toPrecision() / 255.0,
                hex[2].toPrecision() / 255.0,
                1.0
            ];
        return ret;

    }


    initLights() {
        this.setGlobalAmbientLight(0.8, 0.8, 0.8, 1.0);

        //luz dia- sol
        this.lights[0].setPosition(0, 20, 0, 1);
        this.lights[0].setDiffuse(0.945, 0.855, 0.643, 1.0);
        this.lights[0].setConstantAttenuation(1);
        this.lights[0].setLinearAttenuation(0.0);
        this.lights[0].setQuadraticAttenuation(0.0);
        this.lights[0].enable();
        this.lights[0].setVisible(true);
        this.lights[0].update();
        //luz noite 
        this.lights[1].setPosition(0, 15, 0, 1);
        this.lights[1].setDiffuse(0.133, 0.247, 0.349, 1.0);
        this.lights[1].setConstantAttenuation(1);
        this.lights[1].setLinearAttenuation(0.05);
        this.lights[1].setQuadraticAttenuation(0.0);
        this.lights[1].enable();
        this.lights[1].setVisible(true);
        this.lights[1].update();
        //another luz noite
        this.lights[2].setPosition(0, 0.5, 0, 1);
        this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[2].setConstantAttenuation(1);
        this.lights[2].setLinearAttenuation(0.0);
        this.lights[2].setQuadraticAttenuation(0.05);
        this.lights[2].enable();
        this.lights[2].setVisible(true);
        this.lights[2].update();



    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }

    updateAmbientLight() {
        this.setGlobalAmbientLight(this.ambientLight, this.ambientLight, this.ambientLight, 1.0);
    }


    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        if (this.selectedEnvironment == 0) {
            this.lights[0].update();
        }
        else if (this.selectedEnvironment == 1) {
            this.lights[1].update();
        }
        else {
            this.lights[2].update();
        }

        // Draw axis
        this.axis.display();



        //Apply default appearance
        this.setDefaultAppearance();

        var sca = [this.scaleFactor, 0.0, 0.0, 0.0,
            0.0, this.scaleFactor, 0.0, 0.0,
            0.0, 0.0, this.scaleFactor, 0.0,
            0.0, 0.0, 0.0, 1.0];


        this.multMatrix(sca);

        // ---- BEGIN Primitive drawing section

        // apply materials


        if (this.texturesEnabled)
            this.enableTextures(true);
        else
            this.enableTextures(false);

        if (this.displayNormals)
            this.objects[this.selectedObject].enableNormalViz();
        else
            this.objects[this.selectedObject].disableNormalViz();

        this.objects[this.selectedObject].display();

        // ---- END Primitive drawing section
    }
}