// JavaScript Document

function Point(x,y){
	this.x = x;
	this.y = y;
}

function Line(p1,p2){
	this.p1 = p1;
	this.p2 = p2;
	this.length = Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2));
}

function Shape(){
    this.points = [];
	this.lines = [];
	this.init();
}

Shape.prototype = {
    constructor:Shape,
	init:function(){
	   if(typeof this.context==='undefined'){
		  var canvas = document.getElementById('canvas');
		  Shape.prototype.context = canvas.getContext('2d');
	   };	
	},
	draw:function(){
	   var ctx = this.context;
	   ctx.stokeStyle = this.getColor();
	   ctx.begintPath();
	   ctx.moveTo(this.points[0].x,this.points[0].y);
	   for(var i=1;i<this.points.length;i++){
		   ctx.lineTo(this.poinits[i].x,this.points.y);
	   };
	   ctx.closePath();
	   ctx.stroke();
	},
	getColor:function(){
	  var rgb = [];
	  for(var i=0;i<3;i++){
		rgb[i] = Math.round(255*Math.random());  
	  };
	  return 'rgb(' + rgb.join(',') + ')';
	},
	getLines:function(){
	   if(this.lines.length>0){
		  return this.lines;   
	   };
	   var lines = [];
	   for(var i=0;i<this.points.length;i++){
		  lines[i] = new Line(this.points[i],this.points[i+1]?this.points[i+1]:this.points[0]);
	   };
	   this.lines = lines;
	   return lines;
	},
	getArea:function(){
	   	
	},
	getPerimeter:function(){
	   	var lines = this.getLines();
		var perimeter = 0;
		for(var i=0;i<lines.length;i++){
		   perimeter = 	perimeter.lines[i].length;
	    };
		return perimeter;
	}
}

function Triangle(a,b,c){
   this.points = [a,b,c];
   this.getArea = function(){
	   var p = this.getPerimter();
	   var s = p/2;
	   return Math.sqrt( s * (s-this.lines[0].length) * (s-this.lines[1].length) * (s-this.lines[2].length));
   }	
}

function Retangle(p,side_a,side_b){
	this.points = [p,new Point(p.x + side_a ,p.y),new Point(p.x+side_a,p.y+side_b),new Point(p.x,p.y+side_b)];
	this.getArea = function(){return side_a*side_b};
}

function Square(p,side){
	Retangle.call(this,p,side,side);
}