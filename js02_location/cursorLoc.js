var SVGx
var SVGy
var SVGLat
var SVGLng

function startCursorLoc()
{

    MySVG.on("mousemove", function()
        {
            SVGx = d3.mouse(this)[0]
            SVGy = d3.mouse(this)[1]

            if(addElemCircleViz==true)trackDrawCircle()
                if(addElemArcViz==true)trackDrawArc()
                if(addElemEllipseViz==true)trackDrawEllipse()
                if(addElemRectViz==true)trackDrawRect()
                
                if(DrawTextStarted==true)trackDrawText()
                if(DrawPath==true||DrawPathStart==true)trackDrawPath()
                if(DrawPathEdit==true)trackDrawPathEdit()
                if(addElemSymbolViz==true)trackDrawSymbol()

                if(addElemIconViz==true)trackDrawIcon()
                if(addElemPolygonViz==true)trackDrawPolygon()
            //    if(addElemMapViz==true)trackDrawMap()

                if(addElemImageViz==true)trackDrawImage()
                if(addElemBGImageViz==true)trackDrawBGImage()

               //----GPS---
                var svgPnt=L.point(SVGx,SVGy)
                SVGLatLng=MyMap.layerPointToLatLng(svgPnt)
                SVGLat=SVGLatLng.lat
                SVGLng=SVGLatLng.lng
                if(!SetGPS)
                gpsValue.value="GPS: "+SVGLat+", "+SVGLng
                if(gpsCheck.checked && !SetGPS)
                     gpsX.setAttribute("transform","translate("+SVGx+" "+SVGy+")")


        }
    );



}
