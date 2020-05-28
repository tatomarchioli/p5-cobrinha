function Control(layer) {
    this.pos = createVector(camera.position.x, camera.position.y);
    this.dir = createVector(1, 0);
    this.pointing = createVector(0, 0)

    this.lookAt = function(x, y) {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize();
        this.pointing.x = this.dir.x * 100; 
        this.pointing.y = this.dir.y * 100;
    }

    this.draw = function () {
        stroke(255, 0, 0);
        push();
        
        translate(this.pos.x, this.pos.y);
        ellipse(this.pointing.x, this.pointing.y, 5, 5);
        line(0, 0, this.pointing.x, this.pointing.y)

        pop();
    };

    this.update = function () {
        this.pos.x = camera.position.x;
        this.pos.y = camera.position.y;
        this.lookAt(camera.mouseX, camera.mouseY);
    };

    layer.addElement(this);
}

