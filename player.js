
function Player(layer) {
    face = loadImage('assets/face.png');
    drawFunc = function(head) {
        return function() {
            fill(237, 205, 0);
            stroke(207, 199, 0)
            push();
            rotate(radians(this.getDirection()));
            ellipse(0, 0, 100, 100);
            pop();
            if(head){
                image(face, this.deltaX*1.5, this.deltaY*1.5);
            }
        }
    };


    // properties
    this.maxWalkSpeed = 15;
    this.visible = true;
    this.shouldUpdate = true;
    this.position = createVector(0,0);

    // states
    this.walkSpeed = 0;
    this.dashActive = false;
    this.size = 30;

    //sprite
    this.sprite = createSprite(camera.position.x, camera.position.y);
    this.sprite.debug = DEBUG;
    this.sprite.setCollider("circle");
    this.sprite.draw = drawFunc(true);
    this.segments = [this.sprite];
    
    this.createSegments = function(){
        if(this.size > this.segments.length){
            let last = this.segments[this.segments.length - 1];
            let toPush = this.size - this.segments.length;
            for(let i = 0; i < toPush; i++){
                let tail = createSprite(0, 0);
                tail.debug = DEBUG;
                tail.setCollider("circle");
                tail.depth = this.segments.length * -1;
                tail.draw = drawFunc(false);
                this.segments.push(tail);
                layer.spriteGroup.add(tail);
            }
        }
    }

    this.draw = function () {
        if(!this.visible) {
            this.sprite.visible = false;
        }
    };

    this.update = function () {
        this.createSegments();
        if (this.shouldUpdate) {
            this.aplyControlls();
        }
    };

    this.aplyControlls = function(){
        this.walk();
    };

    this.walk = function () {
        this.sprite.maxSpeed = this.maxWalkSpeed;
        for(let i = 1; i < this.segments.length; i++){
            let last = this.segments[i-1]
            let current = this.segments[i];
            current.maxSpeed = 100;
            current.position.x = last.previousPosition.x; 
            current.position.y = last.previousPosition.y;
        }
        
        this.sprite.attractionPoint(0.1, control.pointing.x, control.pointing.y);
        this.sprite.setVelocity(control.pointing.x, control.pointing.y);
        
        this.position.x = this.sprite.position.x;
        this.position.y = this.sprite.position.y;
        // head.velocity.x = (camera.mouseX-head.position.x)/10;
        // head.velocity.y = (camera.mouseY-head.position.y)/10;
    };

    layer.addElement(this);

}