//debug
let DEBUG = false;

//Gv
let layers = [];
let player;

let map = {
    mapWidth: 1000,
    mapHeight: 1000,
    spawnPoint: {
        x: 0,
        y: 0
    }
};
let mapLayer;
let playerLayer;

function setup() {
    //layers
    //noCursor();
    frameRate(30);

    let bgLayer = new BackgroundLayer();
    layers.push(bgLayer);

    mapLayer = new MapLayer();
    layers.push(mapLayer);
    
    playerLayer = new PlayerLayer();
    layers.push(playerLayer);

    //bg
    for(let i=0; i<180; i++){
        new Rock(bgLayer, i);
    }
    //objects
    control = new Control(playerLayer);
    player = new Player(playerLayer);
    player.visible = true;

    createCanvas(windowWidth, windowHeight);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}



/*Metodos de update*/
function draw() {
    update();
    staticRender();
    render();
}

function update() {
    for(let i = 0; i < layers.length; i++){
        layers[i].update();
    }

    playerLayer.spriteGroup.collide(mapLayer.collideGroup);
}

function staticRender() {
    background(240);
}

function render() {
    camera.zoom = 1;
    camera.position.x = player.position.x;
    camera.position.y = player.position.y;
    for(let i = 0; i < layers.length; i++){
        layers[i].draw();
        drawSprites(layers[i].spriteGroup);
    }

}