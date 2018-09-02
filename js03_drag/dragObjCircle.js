//----mouse down---
var DraggingObj = false
var objTransformRequestObj
var objTransList
var objDragTarget = null;
var ObjStartX
var ObjStartY

//---mouse down over element---
function startDragCircle(evt)
{

    if(ActiveElem&&!DraggingObj||ActiveCircleCopy==true) //---prevents dragging conflicts on other draggable elements---
    {
        if(evt.target.getAttribute("id")=="activeElem" || evt.target.getAttribute("id")=="dragDot"||ActiveCircleCopy==true)
        {

            if(evt.target.getAttribute("class")=="dragTargetObj")//---all other elems--
                objDragTarget = evt.target
        }
        if(objDragTarget)
        {
             MyMap.dragging.disable()
            addNoSelectAtText()

            var pnt = objDragTarget.ownerSVGElement.createSVGPoint();
            pnt.x = evt.clientX;
            pnt.y = evt.clientY;
            //---elements in different(svg) viewports, and/or transformed ---
            var sCTM = objDragTarget.getScreenCTM();
            var Pnt = pnt.matrixTransform(sCTM.inverse());

            objTransformRequestObj = objDragTarget.ownerSVGElement.createSVGTransform()

            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = objDragTarget.transform
            objTransList = myTransListAnim.baseVal

            ObjStartX = Pnt.x
            ObjStartY = Pnt.y

                DraggingObj = true

        }
    }
    else
        DraggingObj = false

}
//---mouse move---
function dragCircle(evt)
{
    if(DraggingObj)
    {

        var pnt = objDragTarget.ownerSVGElement.createSVGPoint();
        pnt.x = evt.clientX;
        pnt.y = evt.clientY;
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = objDragTarget.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        Pnt.x -= ObjStartX;
        Pnt.y -= ObjStartY;

        if(objDragTarget.getAttribute("id")=="dragDot" &&(DrawCircle==true||EditCircle==true))
        {
            var radius = parseFloat(ActiveElem.attr("r"))
            radius = (Pnt.x+radius)

            if(radius>0)
            {

                ActiveElem.attr("r", radius)

                objTransformRequestObj.setTranslate(Pnt.x, 0)
                objTransList.appendItem(objTransformRequestObj)
                objTransList.consolidate()

    
                var matrix = dragDot.transform.baseVal.consolidate().matrix;

                var transX = matrix.e
                var transY = matrix.f
                dragDot.setAttribute("transform", "translate("+(transX)+" "+transY+")")





            }

        }
        else if(DrawCircle==true||EditCircle==true)
        {

            var transformRequest = mySVG.createSVGTransform()
            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = objDragTarget.transform
            var transList = myTransListAnim.baseVal

            transformRequest.setTranslate(Pnt.x, Pnt.y)
            transList.appendItem(transformRequest)
            transList.consolidate()

            var transformRequest = mySVG.createSVGTransform()
            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = dragDot.transform
            var transList = myTransListAnim.baseVal

            transformRequest.setTranslate(Pnt.x, Pnt.y)
            transList.appendItem(transformRequest)
            transList.consolidate()



        }
        else if(ActiveCircleCopy==true)
        {
            var transformRequest = CopyCircle.ownerSVGElement.createSVGTransform()
            //---attach new or existing transform to element, init its transform list---
            var myTransListAnim = CopyCircle.transform
            var transList = myTransListAnim.baseVal

            transformRequest.setTranslate(Pnt.x, Pnt.y)
            transList.appendItem(transformRequest)
            transList.consolidate()
        }
        if(ActiveElem)
            DrawX.attr("transform", ActiveElem.attr("transform"))

    }
}
//--mouse up---
var transObjX
var transObjY
function endDragCircle(evt)
{
    if(DraggingObj)
    {

        DraggingObj = false;


        if(objDragTarget.getAttribute("id")=="dragDot")
        {

            var radius = parseFloat(ActiveElem.attr("r"))
            //dragDot.setAttribute("transform","translate("+(transX)+" "+transY+")")
            // dragDot.setAttribute("cx",radius)

        }
        else
        {

          var ctm=objDragTarget.getCTM()
    console.log(ctm )
        var tfm=objDragTarget.getAttribute("transform")
           console.log(tfm )


        /*
        var svgPnt = L.point(SVGx, SVGy)
        var latLng=MyMap.layerPointToLatLng(svgPnt)
        var lat=latLng.lat
        var lng=latLng.lng

    ActiveElem.attr("lat",lat)
    ActiveElem.attr("lng",lng)
      */

        }

    var mapZoom=MyMap.getZoom()
      //  MyMap.dragging.enable()
        removeNoSelectAtText()

        objDragTarget = null
        DraggingObj = false

       
    }

}
