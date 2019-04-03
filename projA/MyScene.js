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

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.scaleFactor = 1;
        
        let slices = 6;
        let stack = 1;
        this.prism = new MyPrism(this,slices,1);
        this.cylinder = new MyCylinder(this, 100, 100);
        this.cone = new MyCone(this,100, 100);
        this.tree = new MyTree(this, 100, 100,1.5,0.5,2,1);
        this.groupPatch = new MyTreeGroupPatch(this);
        this.rowPatch = new MyTreeRowPatch(this);
        this.house = new MyHouse(this);
        this.hill = new MyVoxelHill(this,8);
        this.image = new MyCubeMap(this);
        

        this.displayNormals = false;
        this.objects = [this.prism, this.cylinder, this.cone, this.tree, this.groupPatch, this.rowPatch, this.house, this.hill, this.image] ;
        this.objectIDs = {'Prism' : 0, 'Cylinder' : 1, 'Cone':2, 'Tree' : 3 , 'Groupesquare':4, 'RowPatch':5, 'House':6 ,"Hill":7, "Image": 8};

        this.selectedObject = 0;
        this.displayNormals = false;
        this.ambientLight = 0.3;



        // Applied Materials - ver valores

        this.water = new CGFappearance(this);
        this.water.setAmbient(0.6, 0.6, 0.6, 1);
        this.water.setDiffuse(0.8, 0.8, 0.8, 1);
        this.water.setSpecular(0.8, 0.9, 0.8, 1);
        this.water.setShininess(200.0);
        this.water.loadTexture('images/water.png');
        this.water.setTextureWrap('REPEAT', 'REPEAT');
     
        this.trunk = new CGFappearance(this);
        this.trunk.setAmbient(0.6, 0.6, 0.6, 1);
        this.trunk.setDiffuse(0.8, 0.8, 0.8, 1);
        this.trunk.setSpecular(0.8, 0.9, 0.8, 1);
        this.trunk.setShininess(200.0);
        this.trunk.loadTexture('images/trunk.jpg');
        this.trunk.setTextureWrap('REPEAT', 'REPEAT');

        this.treetop = new CGFappearance(this);
        this.treetop.setAmbient(0.6, 0.6, 0.6, 1);
        this.treetop.setDiffuse(0.8, 0.8, 0.8, 1);
        this.treetop.setSpecular(0.8, 0.9, 0.8, 1);
        this.treetop.setShininess(200.0);
        this.treetop.loadTexture('images/treetop.jpg');
        this.treetop.setTextureWrap('REPEAT', 'REPEAT');

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

        this.sky = new CGFappearance(this);
        this.sky.setAmbient(1, 1, 1, 1);
        this.sky.setDiffuse(0.9, 0.9, 0.9, 1);
        this.sky.setSpecular(0.4, 0.4, 0.4, 1);
        this.sky.setShininess(10.0);
        this.sky.loadTexture('images/cloud1.png');
        this.sky.setTextureWrap('REPEAT', 'REPEAT');

        this.hillsBK = new CGFappearance(this);
        this.hillsBK.setAmbient(1, 1, 1, 1);
        this.hillsBK.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsBK.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsBK.setShininess(10.0);
        this.hillsBK.loadTexture('images/sor_hills/hills_bk.JPG');
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
        this.hillsLF.loadTexture('images/sor_hills/hills_lf.JPG');
        this.hillsLF.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsRT = new CGFappearance(this);
        this.hillsRT.setAmbient(1, 1, 1, 1);
        this.hillsRT.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsRT.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsRT.setShininess(10.0);
        this.hillsRT.loadTexture('images/sor_hills/hills_rt.JPG');
        this.hillsRT.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsFT = new CGFappearance(this);
        this.hillsFT.setAmbient(1, 1, 1, 1);
        this.hillsFT.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsFT.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsFT.setShininess(10.0);
        this.hillsFT.loadTexture('images/sor_hills/hills_ft.JPG');
        this.hillsFT.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsUP = new CGFappearance(this);
        this.hillsUP.setAmbient(1, 1, 1, 1);
        this.hillsUP.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsUP.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsUP.setShininess(10.0);
        this.hillsUP.loadTexture('images/sor_hills/hills_up.JPG');
        this.hillsUP.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.enableTextures(true);


        //Objects connected to MyInterface
    }
    initLights() {
        this.setGlobalAmbientLight(0.8, 0.8, 0.8, 1.0);
        
        //luz dia
        this.lights[0].setPosition(0, 10, 0, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setConstantAttenuation(1);
		this.lights[0].setLinearAttenuation(0.0);
        this.lights[0].setQuadraticAttenuation(0.05);
        this.lights[0].enable();
        this.lights[0].setVisible(true);
        this.lights[0].update();
        //luz noite 
        this.lights[1].setPosition(0, 5, 0, 1);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].setConstantAttenuation(1);
		this.lights[1].setLinearAttenuation(0.0);
		this.lights[1].setQuadraticAttenuation(0.05);
        this.lights[1].enable();
        this.lights[1].setVisible(true);
        this.lights[1].update();
        //another luz noite
        this.lights[2].setPosition(0, 3, 0, 1);
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

    updateAmbientLight(){
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

        this.lights[0].update();
        this.lights[1].update();
        this.lights[2].update();

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
            


        if (this.displayNormals)
            this.objects[this.selectedObject].enableNormalViz();
        else
            this.objects[this.selectedObject].disableNormalViz();
        
        this.objects[this.selectedObject].display();
        
        // ---- END Primitive drawing section
    }
}