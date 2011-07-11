Raphael.fn.radar = function (radius, x, y, data) {
	this.radius=radius;
	this.x=x;
	this.y;
	this.d=data;
	this.c={}
	this.st=this.set();
	
	
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
				["M",this.radius, this.radius],
				["L",p.x+this.radius,p.y+this.radius]
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
					["M",this.radius, this.radius],
					["L",p1.x+this.radius, p1.y+this.radius],
					["L",p2.x+this.radius, p2.y+this.radius],
					["L",this.radius, this.radius]
				]).attr({fill:this.d.data[i].items[j].colour, stroke:this.d.data[i].items[j].colour });
				angle+=segmentAngle;				
			}
			var tPos=this.getPositionOnCircle(this.radius +10, i*this.c.segmentSectionAngle+this.c.segmentSectionAngle/2);
			this.text(this.radius + tPos.x,this.radius + tPos.y, "some text, but why is it repeated").attr({"text-anchor":"center",fill:"#666666", "font-size":11});
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