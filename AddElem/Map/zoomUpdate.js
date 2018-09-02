
var ZoomEditId
function myZoomLevel(level,elem)
{

  if(document.getElementById(elem.id) )
  {
    ZoomEditId=elem.id



    var editElem=elem.cloneNode(true)
    domWrapper.appendChild(editElem)
    var bb=domWrapper.getBBox()
     domWrapper.removeChild(editElem)
     var bbx=bb.x
     var bby=bb.y
     var bbw=bb.width
     var bbh=bb.height
     zoomRect.setAttribute("x",bbx)
     zoomRect.setAttribute("y",bby)
     zoomRect.setAttribute("width",bbw)
     zoomRect.setAttribute("height",bbh)
     if(level==MapZoom)
     {
      elemLevelSpan.style.background="lime"
      zoomRect.setAttribute("stroke","lime")

     }
      else
      {
         elemLevelSpan.style.background="red"
         zoomRect.setAttribute("stroke","red")

      }
      zoomRect.setAttribute("display","block")
     elemLevelSpan.innerHTML=level
    }
    else ZoomEditId=null

}
function removeZoomLevel()
{
     elemLevelSpan.innerHTML=""
     zoomRect.setAttribute("display","none")
}
var MapZoom=2
function zoomUpdate()
{
   zoomUpdateAddElems()
    MapZoom=MyMap.getZoom()
    var elemZoomLevel=+elemLevelSpan.innerHTML
    zoomLevelSpan.innerHTML=MapZoom
    if(ZoomEditId&&document.getElementById(ZoomEditId))
    {
        var editElem=document.getElementById(ZoomEditId).cloneNode(true)
      var level=+editElem.getAttribute("InitZoom")
    domWrapper.appendChild(editElem)
    var bb=domWrapper.getBBox()
     domWrapper.removeChild(editElem)
     var bbx=bb.x
     var bby=bb.y
     var bbw=bb.width
     var bbh=bb.height
     zoomRect.setAttribute("x",bbx)
     zoomRect.setAttribute("y",bby)
     zoomRect.setAttribute("width",bbw)
     zoomRect.setAttribute("height",bbh)
     if(level==MapZoom)
     {
      elemLevelSpan.style.background="lime"
      zoomRect.setAttribute("stroke","lime")

     }
      else
      {
         elemLevelSpan.style.background="red"
         zoomRect.setAttribute("stroke","red")

      }
      zoomRect.setAttribute("display","block")
     }


   zoomUpdateCaves()


}

function zoomUpdateBoundsRect(mapZoom)
{
	boundsRect.setAttribute("transform","")

	var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=boundsRect.transform
	var transformList=animTransformList.baseVal

	var lat=parseFloat(boundsRect.getAttribute("lat"))
	var lng=parseFloat(boundsRect.getAttribute("lng"))
	var latLng= new  L.latLng(lat, lng)
	var transX=MyMap.latLngToLayerPoint(latLng).x
	var transY=MyMap.latLngToLayerPoint(latLng).y

	transformRequestObj.setTranslate(transX,transY)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()

	var initZoom=parseInt(boundsRect.getAttribute("InitZoom"),10)
	var scale = (Math.pow(2, mapZoom)/2)/(Math.pow(2, initZoom)/2);
	transformRequestObj.setScale(scale,scale)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()
    if(mapZoom<initZoom-2)
         boundsRect.setAttribute("fill","#A020F0")
    else
       boundsRect.setAttribute("fill","none")


}



//---map on drag---
function translateCoverRect()
{

    var bbRect = mapContainerDiv.getBoundingClientRect();
    var x = bbRect.left
    var y = bbRect.top
    var width=bbRect.width
    var height=bbRect.height
    var pnt = mySVG.createSVGPoint();
    pnt.x = x;
    pnt.y = y;
    var sCTM = mySVG.getScreenCTM();
    var PNT = pnt.matrixTransform(sCTM.inverse());
    var rectX=PNT.x
    var rectY=PNT.y


    CoverRect.attr("x",rectX)
    CoverRect.attr("y",rectY)


}



function zoomUpdateAddElems()
{


    var elems=domElemG.childNodes

	for(var k=0;k<elems.length;k++)
	{
		var elem=elems.item(k)
        var myClass=elem.getAttribute("class")



        var ctm = elem.getCTM()
        RAD2DEG = 180 / Math.PI;
        var rotate = Math.atan2(ctm.b, ctm.a) * RAD2DEG;


		elem.setAttribute("transform","")
		//elem.removeAttribute("transform")

		var transformRequestObj=mySVG.createSVGTransform()

		var animTransformList=elem.transform

		var transformList=animTransformList.baseVal

		var lat=parseFloat(elem.getAttribute("lat"))
		var lng=parseFloat(elem.getAttribute("lng"))


		var latLng= new  L.latLng(lat, lng)
		var transX=MyMap.latLngToLayerPoint(latLng).x
		var transY=MyMap.latLngToLayerPoint(latLng).y

		transformRequestObj.setTranslate(transX,transY)
		transformList.appendItem(transformRequestObj)
		transformList.consolidate()
       if(rotate!=0)
		{
	      transformRequestObj.setRotate(rotate,0,0)
				transformList.appendItem(transformRequestObj)
				transformList.consolidate()
		}
        	var mapZoom=MyMap.getZoom()
    		var initZoom=parseInt(elem.getAttribute("InitZoom"),10)
             if(myClass!="iconElem"&&myClass!="pgonElem")
    		    var scale = (Math.pow(2, mapZoom)/2)/(Math.pow(2, initZoom)/2);
             else
             {
                if(mapZoom>=initZoom)
                    var scale = (Math.pow(2, initZoom))/(Math.pow(2, initZoom));
                else
                    var scale= (Math.pow(2, mapZoom)/2)/(Math.pow(2, initZoom)/2);
             }

    		transformRequestObj.setScale(scale,scale)
    		transformList.appendItem(transformRequestObj)
    		transformList.consolidate()

     }


    if(BoundsRect.style("visibility")=="visible")
    {

    	var mapZoom=MyMap.getZoom()
      zoomUpdateBoundsRect(mapZoom)
    }
    if(gpsX.style.display!="none")
    {         gpsX.setAttribute("transform","")
        var transformRequestObj=mySVG.createSVGTransform()

		var animTransformList=gpsX.transform

		var transformList=animTransformList.baseVal

        var latLng= new  L.latLng(SVGLatSet, SVGLngSet)
         var transX=MyMap.latLngToLayerPoint(latLng).x
		var transY=MyMap.latLngToLayerPoint(latLng).y

		transformRequestObj.setTranslate(transX,transY)
		transformList.appendItem(transformRequestObj)
		transformList.consolidate()

    }


}
function zoomUpdateCaves()
{

  //  setTimeout(resizeCoverRect,1200)
    var elems=domCaveG.childNodes

	for(var k=0;k<elems.length;k++)
	{
		var elem=elems.item(k)






		elem.setAttribute("transform","")
		//elem.removeAttribute("transform")

		var transformRequestObj=mySVG.createSVGTransform()

		var animTransformList=elem.transform

		var transformList=animTransformList.baseVal

		var lat=parseFloat(elem.getAttribute("lat"))
		var lng=parseFloat(elem.getAttribute("lng"))


		var latLng= new  L.latLng(lat, lng)
		var transX=MyMap.latLngToLayerPoint(latLng).x
		var transY=MyMap.latLngToLayerPoint(latLng).y

		transformRequestObj.setTranslate(transX,transY)
		transformList.appendItem(transformRequestObj)
		transformList.consolidate()
          /*
        	var mapZoom=MyMap.getZoom()
    		var initZoom=parseInt(elem.getAttribute("InitZoom"),10)
             if(myClass!="iconElem"&&myClass!="pgonElem")
    		    var scale = (Math.pow(2, mapZoom)/2)/(Math.pow(2, initZoom)/2);
             else
             {
                if(mapZoom>=initZoom)
                    var scale = (Math.pow(2, initZoom))/(Math.pow(2, initZoom));
                else
                    var scale= (Math.pow(2, mapZoom)/2)/(Math.pow(2, initZoom)/2);
             }

    		transformRequestObj.setScale(scale,scale)
    		transformList.appendItem(transformRequestObj)
    		transformList.consolidate()
         */
     }


    if(BoundsRect.style("visibility")=="visible")
    {

    	var mapZoom=MyMap.getZoom()
      zoomUpdateBoundsRect(mapZoom)
    }
    if(gpsX.style.display!="none")
    {         gpsX.setAttribute("transform","")
        var transformRequestObj=mySVG.createSVGTransform()

		var animTransformList=gpsX.transform

		var transformList=animTransformList.baseVal

        var latLng= new  L.latLng(SVGLatSet, SVGLngSet)
         var transX=MyMap.latLngToLayerPoint(latLng).x
		var transY=MyMap.latLngToLayerPoint(latLng).y

		transformRequestObj.setTranslate(transX,transY)
		transformList.appendItem(transformRequestObj)
		transformList.consolidate()

    }

    if(caveX.style.display!="none")
    {         caveX.setAttribute("transform","")
        var transformRequestObj=mySVG.createSVGTransform()

		var animTransformList=caveX.transform

		var transformList=animTransformList.baseVal

        var latLng= new  L.latLng(LatCave, LngCave)
         var transX=MyMap.latLngToLayerPoint(latLng).x
		var transY=MyMap.latLngToLayerPoint(latLng).y

		transformRequestObj.setTranslate(transX,transY)
		transformList.appendItem(transformRequestObj)
		transformList.consolidate()

    }

}


//  ---active element in process---
function zoomUpdateActiveElem(mapZoom)
{


	var lat=parseFloat(activeElem.getAttribute("lat"))
	var lng=parseFloat(activeElem.getAttribute("lng"))
	var latLng= new  L.latLng(lat, lng)
	var transX=MyMap.latLngToLayerPoint(latLng).x
	var transY=MyMap.latLngToLayerPoint(latLng).y


     var ctm = activeElem.getCTM()
    RAD2DEG = 180 / Math.PI;
    var rotate = Math.atan2(ctm.b, ctm.a) * RAD2DEG;


	activeElem.setAttribute("transform","")
   //	activeElem.removeAttribute("transform")

	var transformRequestObj=mySVG.createSVGTransform()
	var animTransformList=activeElem.transform
	var transformList=animTransformList.baseVal


	transformRequestObj.setTranslate(transX,transY)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()



       /*
		if(activeElem.getAttribute("overlayScaleX"))//---overlay image---
		{
			var scaleX=parseFloat(activeElem.getAttribute("overlayScaleX"))
			var scaleY=parseFloat(activeElem.getAttribute("overlayScaleY"))
			transformRequestObj.setScale(scaleX,scaleY)
			transformList.appendItem(transformRequestObj)
			transformList.consolidate()
		}
        */
    if(rotate!=0)
	{
      transformRequestObj.setRotate(rotate,0,0)
			transformList.appendItem(transformRequestObj)
			transformList.consolidate()
	}

  DrawX.attr("transform",activeElem.getAttribute("transform"))

    if(SymbolPlantStart==false&&!EditPlanted)
	{
	var initZoom=parseInt(activeElem.getAttribute("InitZoom"),10)
	var scale = (Math.pow(2, mapZoom)/2)/(Math.pow(2, initZoom)/2);
	transformRequestObj.setScale(scale,scale)
	transformList.appendItem(transformRequestObj)
	transformList.consolidate()
    }




}
