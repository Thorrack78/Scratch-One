var Vector2 = function()
{
	this.x = canvas.width/2;
	this.y = canvas.height/2;
}
 
var set = function() 
{
	this.x = x;
	this.y = y;
}
 
var normalize = function()
{
	this.normalX = x / length;
	this.normalY = y / length;
}
 
var add = function()
{
	this.x += v2.x;
	this.y += v2.y;
}
 
var subtract = function() 
{
	this.x -= v2.x;
	this.y -= v2.y;
}
 
var multiplyScalar = function ()
{
	this.x = x * 0;
	this.y = y * 0;
}