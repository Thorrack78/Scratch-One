var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
 
var startFrameMillis = Date.now();
var endFrameMillis = Date.now();
 
 
function getDeltaTime()
{
        endFrameMillis = startFrameMillis;
        startFrameMillis = Date.now();
 
        var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
       
               
        if(deltaTime > 1)
                deltaTime = 1;
               
        return deltaTime;
}
 
//-------------------- Don't modify anything above here
 
var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;
var fps = 0;
var fpsCount = 0;
var fpsTime = 0;
var LAYER_COUNT = 2;
var LAYER_PLATFORMS = 0;
var LAYER_LADDERS = 1;
var MAP = { tw: 60, th: 15 };
var TILE = 35;
var TILESET_TILE = TILE * 2;
var TILESET_PADDING = 2;
var TILESET_SPACING = 2;
var TILESET_COUNT_X = 14;
var TILESET_COUNT_Y = 14;
 
 
 
 
 
var chuckNorris = document.createElement("img");
chuckNorris.src = "assets/hero.png";
 
//var zombie = document.createElement("img");
//zombie.src = "zombie.png";
 
var tileset = document.createElement("img");
tileset.src = "assets/tileset.png";
 
 
var player = new Player();
//var enemy = new Enemy();
var keyboard = new Keyboard();
 
function cellAtPixelCoord(layer, x, y)
{
        if(x<0 || x>SCREEN_WIDTH || y<0)
                return 1;
        if(y>SCREEN_HEIGHT)
                return 0;
        return cellAtTileCoord(layer, p2t(x), p2t(y));
};
 
function cellAtTileCoord(layer, tx, ty)
{
        if(tx<0 || tx>MAP.tw || ty<0)
                return 1;
        if(ty>=MAP.th)
                return 0;
        return cells[layer][ty][tx];
};
function tileToPixel(tile)
{
        return tile * TILE;
};
 
function pixelToTile(pixel)
{
        return Math.floor(pixel/TILE);
};
 
function bound(value, min, max)
{
        if(value < min)
                return min;
        if(value > max)
                return max;
        return value;
}
 
 
function drawMap()
 
{
 for(var layerIdx=0; layerIdx<LAYER_COUNT; layerIdx++)
 {
 var idx = 0;
 for( var y = 0; y < level1.layers[layerIdx].height; y++ )
 {
 for( var x = 0; x < level1.layers[layerIdx].width; x++ )
 {
 if( level1.layers[layerIdx].data[idx] != 0 )
 {
 // the tiles in the Tiled map are base 1 (meaning a value of 0 means no tile), so subtract one from the tileset id to get the
 // correct tile
 var tileIndex = level1.layers[layerIdx].data[idx] - 1;
 var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X) * (TILESET_TILE + TILESET_SPACING);
 var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_Y)) * (TILESET_TILE + TILESET_SPACING);
 context.drawImage(tileset, sx, sy, TILESET_TILE, TILESET_TILE, x*TILE, (y-1)*TILE, TILESET_TILE, TILESET_TILE);
 }
 idx++;
 }
 }
 }
}
 
var cells = [];
function initialize() {
        for(var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++) {
                cells[layerIdx] = [];
                var idx = 0;
                for(var y = 0; y < level1.layers[layerIdx].height; y++) {
                cells[layerIdx][y] = [];
                        for(var x = 0; x < level1.layers[layerIdx].width; x++){
                                if(level1.layers[layerIdx].data[idx] !=0) {
                                       
                                        cells[layerIdx][y][x] = 1;
                                        cells[layerIdx][y-1][x] = 1;
                                        cells[layerIdx][y-1][x+1] = 1;
                                        cells[layerIdx][y][x+1] = 1;
                                }
                                else if(cells[layerIdx][y][x] != 1){
                                        cells[layerIdx][y][x]= 0;
                                }
                                idx++;
                                }
                        }
                }
        }
 
 
       
 
 
function run()
{
        context.fillStyle = "#ccc";            
        context.fillRect(0, 0, canvas.width, canvas.height);
       
        var deltaTime = getDeltaTime();
        var map = drawMap();
       
        player.update(deltaTime);
        player.draw();
 
       
       
        //enemy.draw();
       
               
        // update the frame counter
        fpsTime += deltaTime;
        fpsCount++;
        if(fpsTime >= 1)
        {
                fpsTime -= 1;
                fps = fpsCount;
                fpsCount = 0;
        }              
               
        // draw the FPS
        context.fillStyle = "#f00";
        context.font="14px Arial";
        context.fillText("FPS: " + fps, 5, 20, 100);
}
initialize();
 
//-------------------- Don't modify anything below here
 
 
// This code will set up the framework so that the 'run' function is called 60 times per second.
// We have a some options to fall back on in case the browser doesn't support our preferred method.
(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
 
  window.onEachFrame = onEachFrame;
})();
 
window.onEachFrame(run);