var Player = function() {
        this.image = document.createElement("img");
        this.position = new Vector2();
        this.position.set = (9*TILE, 0*TILE );
       
        this.width = 159;
        this.height =163;
       
        this.offset = new Vector2();
        this.offset.set(-55, -87);
       
        this.velocity = new Vector2();
       
        this.falling = true;
        this.jumping = false;
       
        this.image.src = "assets/hero.png";
       
};
 
Player.prototype.update = function(deltaTime)
{
var METER = TILE;
var GRAVITY = METER * 9.8 * 6;
var MAXDX = METER * 10;
var MAXDY = METER * 15;
var ACCEL = MAXDX * 2;
var FRICTION = MAXDX * 6;
var JUMP = METER * 1500;
               
        var left = false;
        var right = false;
        var jump = false;
       
        if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true) {
                left = true;
        }
        if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true) {
                right = true;
        }
        if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true) {
                jump = true;
        }
       
        var wasleft = this.velocity.x < 0;
        var wasright = this.velocity. x > 0;
        var falling = this.falling;
        var ddx = 0;
        var ddy = GRAVITY;
       
        if (left)
                ddx = ddx - ACCEL;
        else if (wasleft)
                ddx = ddx + FRICTION;
       
        if (right)
                ddx = ddx + ACCEL;
        else if (wasright)
                ddx = ddx - FRICTION;
       
        if (jump && !this.jumping && !falling)
        {
                ddy = ddy - JUMP;
                this.jumping = true;
        }
       
this.position.y = Math.floor(this.position.y + (deltaTime * this.velocity.y));
this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
this.velocity.x = bound(this.velocity.x + (deltaTime * ddx), -MAXDX, MAXDX);
this.velocity.y = bound(this.velocity.y + (deltaTime * ddy), -MAXDY, MAXDY);
 
if ((wasleft && (this.velocity.x > 0)) ||
        (wasright && (this.velocity.x < 0)))
 
{
        this.velocity.x = 0;
}
 
//collision detection
var tx = pixelToTile(this.position.x);
var ty = pixelToTile(this.position.y);
var nx =(this.position.x)%TILE;
var ny =(this.position.y)%TILE;
var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
var cellright = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
var celldown = cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);
var celldiag = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);
 
if (this.velocity.y > 0) {
        if ((celldown && !cell)||(celldiag && !cellright && nx)){
        this.position.y = tileToPixel(ty);
        this.velocity.y = 0;
        this.falling = false;
        this.jumping = false;
        ny = 0;
        }
}
else if (this.velocity.y < 0) {
        if ((cell && !celldown) || (cellright && !celldiag && nx)) {
                this.position.y = tileToPixel(ty + 1);
                this.velocity.y = 0;
               
                cell = celldown;
                cellright = celldiag;
                ny = 0;
                }
        }
        if (this.velocity.x > 0) {
                if ((cellright && !cell) || (celldiag && !celldown && ny)) {
                        this.position.x = tileToPixel(tx);
                        this.velocity.x = 0;
                       
                }
        }
        else if (this.velocity.x < 0) {
                if ((cell && !cellright) || (celldown && !celldiag && ny)) {
                        this.position.x = tileToPixel(tx + 1);
                        this.velocity.x = 0;
                }
        }
        //player.falling = !(celldown || (nx&&celldiag));
}
  
Player.prototype.draw = function()
{
        context.save();
                context.translate(this.position.x, this.position.y);
                context.drawImage(this.image, - this.width/2, - this.height/2);
        context.restore();
       
}