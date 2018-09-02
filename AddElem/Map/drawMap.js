function saveMyMap()
{

   setMapBounds()
   cw=addElemMapCw
   var title=cw.myMapTitleValue.value
   myMapTitleDiv.innerHTML=title
   myMapTitleDiv.style.visibility="visible"

    MyMap.scrollWheelZoom.enable();
    MyMap.dragging.enable()
    sendMap()

}

function closeDrawMap()
{
    closeIframe("addElemMap")

           MyMap.scrollWheelZoom.enable();
    MyMap.dragging.enable()



}
var PublishButton
function loadMyMap(id)
{

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "Library/Map.svg", true);
    xhr.onload = function()
    {

        var xmlString = this.responseText
        //---DOMParser---
        var parser = new DOMParser();
        MapDoc = parser.parseFromString(xmlString, "text/xml").documentElement;

        var groups = MapDoc.childNodes

        for(var k = 0; k<groups.length; k++)
        {
            var group = groups.item(k)
            if(group.nodeName!="#text")
            {
                var mapId = group.getAttribute("id")

                if(mapId==id)
                {

                    mySVG.removeChild(domElemG)
                    var elemG=group.cloneNode(true)

                    mySVG.removeChild(defsGradient)
                    mySVG.removeChild(defsPattern)
                    mySVG.removeChild(arrowDefs)
                    mySVG.insertBefore(elemG.firstChild,mySVG.firstChild)
                    mySVG.insertBefore(elemG.firstChild,mySVG.firstChild)
                    mySVG.insertBefore(elemG.firstChild,mySVG.firstChild)


                    elemG.id="domElemG"
                    mySVG.insertBefore(elemG,domWrapper)

                    myMapTitleDiv.innerHTML=elemG.getAttribute("title")
                    myMapTitleDiv.style.visibility="visible"
                    var ulLat=+elemG.getAttribute("MyMapLatUL")
                    var ulLng=+elemG.getAttribute("MyMapLngUL")
                    var lrLat=+elemG.getAttribute("MyMapLatLR")
                    var lrLng=+elemG.getAttribute("MyMapLngLR")

                    MyMap.fitBounds([[ulLat, ulLng],[lrLat, lrLng]]);

                    BoundsRect.attr("InitZoom",elemG.getAttribute("boundsRect-InitZoom"))
                    BoundsRect.attr("rectX",elemG.getAttribute("boundsRect-rectX"))
                    BoundsRect.attr("rectY",elemG.getAttribute("boundsRect-rectY"))
                    BoundsRect.attr("lat",elemG.getAttribute("boundsRect-lat"))
                    BoundsRect.attr("lng",elemG.getAttribute("boundsRect-lng"))
                    BoundsRect.attr("width",elemG.getAttribute("boundsRect-width")  )
                    BoundsRect.attr("height",elemG.getAttribute("boundsRect-height"))
                    BoundsRect.style("visibility","visible")



                    zoomUpdate()
                   
                    if(PublishButton)
                     PublishButton.disabled=true

                     PublishButton=document.getElementById("publishMapButton"+id)
                     PublishButton.disabled=false
                    closeMapTable()

                    break
                }
            }

        }

    }
    xhr.send()
}