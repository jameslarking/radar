Raphael.fn.radar = function (radius, x, y, data) {
	this.radius=radius;
	this.d=data;
	this.c={}
	this.st=this.set();
	this.c.x=x;
	this.c.y=y;
	
	
	this.calculations=function(){
		var n=0;		
		var max=0;
		for(i in this.d.data) {
			n++;
			itemcount=0;
			for(var j in this.d.data[i].items){
				if(this.d.data[i].items[j].value>max) max=this.d.data[i].items[j].value;	
				itemcount++;
			}
			this.d.data[i].itemCount=itemcount;
		}
		this.c.numberSections=n;
		this.c.maxValue=max;
		this.c.scale=this.radius/this.c.maxValue;
		this.c.segmentSectionAngle=360/n;
	}
	
	this.drawSegmentEdges=function(){
		var angle=0;
		for(var i in this.d.data){
			var p=this.getPositionOnCircle(this.radius,angle);
			this.path([
				["M",this.radius + this.c.x, this.radius+this.c.y],
				["L",p.x+this.radius + this.c.x,p.y+this.radius + this.c.y]
			]);
			angle+=this.c.segmentSectionAngle;
		}
	}
	
	this.drawSegments=function(){
		var angle=0;
		for(var i in this.d.data){
			var segmentAngle=this.c.segmentSectionAngle/this.d.data[i].itemCount;
			for(var j in this.d.data[i].items){
				var scaledValue=this.d.data[i].items[j].value*this.c.scale;
				var p1=this.getPositionOnCircle(scaledValue, angle);
				var p2=this.getPositionOnCircle(scaledValue, angle+segmentAngle);
				var p3=this.getPositionOnCircle(scaledValue+10, angle+segmentAngle/2);
				this.path([
					["M",this.radius + this.c.x, this.radius + this.c.y],
					["L",p1.x+this.radius+this.c.x, p1.y+this.radius+this.c.y],
					["L",p2.x+this.radius + this.c.x, p2.y+this.radius+this.c.y],
					["L",this.radius+this.c.x, this.radius+this.c.y]
				]).attr({fill:this.d.data[i].items[j].colour, stroke:this.d.data[i].items[j].colour });
				angle+=segmentAngle;				
			}
			var textAngle=i*this.c.segmentSectionAngle+this.c.segmentSectionAngle/2;
			if( (textAngle>=265 && textAngle<=275) || (textAngle>=85 && textAngle<=95)) textAlign="center";
			else if(textAngle>275 || textAngle<90) textAlign="start";
			else if(textAngle>90 && textAngle<275) textAlign="end";
			var tPos=this.getPositionOnCircle(this.radius +10, textAngle);
			this.text(this.radius + tPos.x + this.c.x,this.radius + tPos.y + this.c.y, this.d.data[i].name).attr({"text-anchor":textAlign,fill:"#666666", "font-size":11});
		}
	}
	
	this.getPositionOnCircle=function(r,angle){
		return {
			x : r * Math.cos(Raphael.rad(angle)),
			y : r * Math.sin(Raphael.rad(angle))
		}
	}
	
	
	this.calculations();
	this.drawSegmentEdges();
	this.drawSegments();
	return this.st;
}