


var NS = "http://www.w3.org/2000/svg"


var ElemG
var CaveG

var CoverRect
var ActiveElemG
var ActiveElem = null
var GPSX
var Wrapper //---svg wrapper---
var DrawX
var DragDot //---used for circles/rects/ellipse---
var MySVG
var ZoomRect
var BoundsRect
var CaveX
function setGeoloc()
{
	MyMap.locate({setView: true, maxZoom: 16});

}
var GeoMarker
function onLocationFound(e)
{
	var radius = e.accuracy / 2;
	GeoMarker=L.marker(e.latlng)
	GeoMarker.addTo(MyMap)
		.bindPopup("Your internet connection.").openPopup();
    MapZoom=MyMap.getZoom()
    zoomLevelSpan.innerHTML=MapZoom

}





var MyMap
function initD3Svg()
{
   //---called via onload---
L.mapbox.accessToken = 'pk.eyJ1IjoiZmhlbXNoZXIiLCJhIjoiODQ5MW9WayJ9.px2P6wVMFucfXHE1zmDA1A';
MyMap = L.mapbox.map('MyMap', 'mapbox.streets', {doubleClickZoom: false, zoomControl:false,center: new L.latLng(20,10),zoom:2,minZoom:1});
MyMap.on("viewreset", zoomUpdate);



MyMap.on("dragstart", function (e) {

  MyMap.on("drag", dragEvent);
});

MyMap.on("dragend", function (e) {



  MyMap.off("drag", dragEvent);
});

var dragEvent = function(e) {
  translateCoverRect()
}
   window.name = 'parentWindow'; //---required for add Path---

	MyMap._initPathRoot()
    MySVG =d3.select("#MyMap").select("svg")


    MySVG.attr("id","mySVG")
    MySVG.style("cursor","default")


    var defs = MySVG.append("defs")
    .attr("id", "endArrowDefs")
    .append("marker")
    .attr("id", "endArrow")
    .attr("viewBox", "0 0 8000 8000")
    .attr("vector-effect", "non-scaling-stroke")
    .attr("refX", "250")
    .attr("refY", "150")
    .attr("markerUnits", "strokeWidth")
    .attr("markerWidth", "300")
    .attr("markerHeight", "300")
    .attr("orient", "auto")
    .attr("fill", "violet")
    .attr("stroke-linejoin", "bevel")
    .append("path")
    .attr("d", "M2 59,293 148,1 243,121 151,Z")
    .attr("stroke", "RGB(0,0,0)")
    defs.append("marker")
    .attr("id", "cloneArrow")
    .attr("viewBox", "0 0 8000 8000")
    .attr("vector-effect", "non-scaling-stroke")
    .attr("refX", "250")
    .attr("refY", "150")
    .attr("markerUnits", "strokeWidth")
    .attr("markerWidth", "300")
    .attr("markerHeight", "300")
    .attr("orient", "auto")
    .attr("fill", "RGB(0,0,0)")
    .attr("stroke-linejoin", "bevel")
    .append("path")
    .attr("d", "M2 59,293 148,1 243,121 151,Z")
    .attr("stroke", "RGB(0,0,0)")


    //--holds all path end arrows---
    MySVG.append("defs")
    .attr("id", "arrowDefs")


    var defsPattern=MySVG.append("defs")
    .attr("id","defsPattern")

    var defsGradient=MySVG.append("defs")
    .attr("id","defsGradient")
    var defsShadow=MySVG.append("defs")
    .attr("id","defsShadow")
 var filter = defsShadow.append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "150%") 
    .attr("width", "150%");
filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 5)
    .attr("result", "blur");
filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 5)
    .attr("dy", 5)
    .attr("result", "offsetBlur");
var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");


    var defs3DPipe=MySVG.append("defs")
    .attr("id", "pipe3dDefs")
    var pipeFilter=defs3DPipe.append("filter")
    .attr("id","pipe3D")
    pipeFilter.append("feFlood").attr("flood-color","black")
    pipeFilter.append("feComposite").attr("operator","out").attr("in2","SourceGraphic")
    pipeFilter.append("feGaussianBlur").attr("stdDeviation","6")

    var bgImageG=MySVG.append("g")
        .attr("id", "bgImageG")



    ElemG = MySVG.append("g")
   .attr("id", "domElemG")
    .attr("shape-rendering","geometricPrecision")
     .attr("text-rendering", "geometricPrecision")
     .attr("class", "noselect")



    CaveG = MySVG.append("g")
   .attr("id", "domCaveG")
    .attr("shape-rendering","geometricPrecision")
     .attr("text-rendering", "geometricPrecision")
     .attr("class", "noselect")


    Wrapper = MySVG.append("svg")
    .attr("pointer-events", "none")
    .attr("id", "domWrapper")


    //---text/icon/path drag protect---
    CoverRect = MySVG.append("rect")
    .style("display", "none")
    .attr("id", "coverRect")
    .attr("pointer-events", "none")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "white")
    .attr("opacity",0)

    GPSX = MySVG.append("g") //---place in mysvg so zoom works---
    .style("display", "none")
    .attr("id", "gpsX")
    .attr("stroke", "lime")
    .attr("stroke-width", "2")
    .attr("pointer-events", "none")
    GPSX.append("line")
    .attr("vector-effect", "non-scaling-stroke")
    .attr("x1", "0")
    .attr("y1", "-15%")
    .attr("x2", "0")
    .attr("y2", "15%")
    GPSX.append("line")
    .attr("vector-effect", "non-scaling-stroke")
    .attr("x1", "-10%")
    .attr("y1", "0")
    .attr("x2", "10%")
    .attr("y2", "0")

    CaveX = MySVG.append("g") //---place in mysvg so zoom works---
    .style("display", "none")
    .attr("id", "caveX")
    .attr("stroke", "#7df9ff")
    .attr("stroke-width", "2")
    .attr("pointer-events", "none")
    CaveX.append("line")
    .attr("vector-effect", "non-scaling-stroke")
    .attr("x1", "0")
    .attr("y1", "-15%")
    .attr("x2", "0")
    .attr("y2", "15%")
    CaveX.append("line")
    .attr("vector-effect", "non-scaling-stroke")
    .attr("x1", "-10%")
    .attr("y1", "0")
    .attr("x2", "10%")
    .attr("y2", "0")




    //---holds on the single Active Elem under construction---
    //---top of svg ---
    ActiveElemG = MySVG.append("g")
   .attr("id", "domActiveElemG")
   .attr("shape-rendering","geometricPrecision")
    .attr("text-rendering","geometricPrecision")

    DrawX = MySVG.append("g") //---place in mysvg so zoom works---
    .style("display", "none")
    .attr("id", "domDrawX")
    .attr("stroke", "violet")
    .attr("stroke-width", "2")
    .attr("pointer-events", "none")
    DrawX.append("circle")
    .attr("vector-effect", "non-scaling-stroke")
    .attr("cx", "0")
    .attr("cy", "0")
    .attr("r", "3")
    .attr("fill", "black")
    DrawX.append("line")
    .attr("vector-effect", "non-scaling-stroke")
    .attr("x1", "0")
    .attr("y1", "-30")
    .attr("x2", "0")
    .attr("y2", "30")
    DrawX.append("line")
    .attr("vector-effect", "non-scaling-stroke")
    .attr("x1", "-20")
    .attr("y1", "0")
    .attr("x2", "20")
    .attr("y2", "0")



    DragDot = ActiveElemG.append("circle")
    .attr("id", "dragDot")
    .attr("class", "dragTargetObj")
    .attr("cx", "0")
    .attr("cy", "0")
    .attr("r", "12")
    .attr("fill", "white")
    .attr("fill-opacity", ".5")
    .attr("stroke", "black")
    .attr("stroke-width", "1")
    .attr("vector-effect", "non-scaling-stroke")
    .style("visibility", "hidden")
    .style("cursor", "default")


   var svgText=MySVG.append("text")
   .attr("id","textSVG")
   .attr("text-anchor","middle")
   .attr("x","40%")
   .attr("y","35%")
   .attr("dy",".33em")
   .attr("font-size","350")
   .attr("font-family","times new roman")
   .attr("font-weight","bold")
   .attr("fill","red")
   .attr("stroke-width","5")
   .attr("stroke","black")
   .attr("opacity","1")
   .attr("filter","url(#drop-shadow)")
   .text("SVG")

    ZoomRect = MySVG.append("rect")
    .attr("display", "none")
    .attr("id", "zoomRect")
    .attr("fill", "none")
    .attr("stroke-width",1)
    .attr("stroke","black")
    .attr("fill", "none")
   .attr("pointer-events","none")


	BoundsRect=MySVG.append("rect")
    .attr("id","boundsRect")
    .attr("pointer-events","none")
    .attr("rx","12")
    .attr("ry","12")
    .attr("x","0")
    .attr("y","0")
    .style("visibility","hidden")
    .attr("stroke","#004953")
    .attr("fill-opacity","0.2")
    .attr("fill","none")
    .attr("stroke-width","2")
    .attr("stroke-dasharray","15 3")

     MySVG.append("circle")
     .attr("id","tracker")
    .attr("pointer-events","none")
    .attr("r","1")
    .attr("cx","0")
    .attr("cy","0")
    .style("visibility","hidden")



}
function getGeoLoc()
{

  setGeoloc()
     MyMap.on('locationfound', onLocationFound);

}