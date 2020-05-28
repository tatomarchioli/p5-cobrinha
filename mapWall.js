function MapWall(layer, x, y) {

    this.collision = "collide";
    this.x = x;
    this.y = y;
    this.size = BLOCK_SIZE;
    this.sprite = createSprite(this.x, this.y, this.size, this.size);
    this.sprite.debug = DEBUG;
    this.sprite.setCollider("rectangle",0, 0,this.size,this.size);
    this.sprite.immovable = true;
    this.visible = true;
    this.shouldUpdate = true;

    this.draw = function () {
        if(!this.visible) {
            this.sprite.visible = false;
        }
    };

    this.update = function () {
        if ( this.shouldUpdate) {
        }
    };

    layer.addElement(this);
}