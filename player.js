function Player(layer) {

    face = loadImage('assets/face.png');

    // properties
    this.maxWalkSpeed = 15;

    // states
    this.walkSpeed = 0;
    this.dashActive = false;


    //sprite
    this.sprite = createSprite(map.spawnPoint.x, map.spawnPoint.y);
    this.sprite.debug = DEBUG;
    this.sprite.setCollider("circle");
    this.sprite.draw = function() {
        fill(237, 205, 0);
        push();
        rotate(radians(this.getDirection()));
        ellipse(0, 0, 100+(this.getSpeed()/2), 100-(this.getSpeed()/2));
        pop();
        image(face, this.deltaX*1.5, this.deltaY*1.5);
    };

    this.visible = true;
    this.shouldUpdate = true;

    this.draw = function () {
        if(!this.visible) {
            this.sprite.visible = false;
        }
    };

    this.update = function () {
        if (this.shouldUpdate) {
            this.aplyControlls();
        }
    };


    this.aplyControlls = function(){
        this.walk();
    };

    this.walk = function () {
        // this.sprite.attractionPoint(this.magnitude, camera.mouseX, camera.mouseY)
        this.sprite.maxSpeed = this.maxWalkSpeed;
        //camera.mouse trailer, the speed is inversely proportional to the camera.mouse distance
        this.sprite.velocity.x = (camera.mouseX-this.sprite.position.x)/10;
        this.sprite.velocity.y = (camera.mouseY-this.sprite.position.y)/10;
    };

    layer.addElement(this);

}