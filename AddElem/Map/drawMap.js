function saveMyMap()
{

   setMapBounds()
   cw=addElemMapCw
   var title=cw.myMapTitleValue.value
   var createdBy="<br><span style=font-size:90%;font-weight:normal >Created By: "+cw.myMapEmailValue.value+"</span>"

   myMapTitleDiv.innerHTML=title+createdBy
   myMapTitleDiv.style.visibility="visible"

    MyMap.scrollWheelZoom.enable();
    MyMap.dragging.enable()
    if(!EditMapId)
        sendMap()
    else
        sendEditMap()


}
function cancelDrawMap()
{
  if(EditMapId)
  {
    EditMapId=null
    EditButton.disabled=false
    openAddMapButton.disabled=false


       openAddMapButton.style.background="#C3E6D3"
       openAddMapButton.innerHTML="Save Map"
     BoundsRect.style("visibility","visible")
       myMapTitleDiv.style.visibility="visible"

  }

closeIframe("addElemMap")

           MyMap.scrollWheelZoom.enable();
    MyMap.dragging.enable()



}




function closeDrawMap()
{
    closeIframe("addElemMap")

           MyMap.scrollWheelZoom.enable();
    MyMap.dragging.enable()



}
var PublishButton
var EditButton

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
                     var createdBy="<br><span style=font-size:90%;font-weight:normal >Created By: "+elemG.getAttribute("email")+"</span>"

                    if(elemG.getAttribute("editTimeUtcMS"))
                        var utcMs=+elemG.getAttribute("editTimeUtcMS")
                    else
                        var utcMs=+mapId.split("map")[1]

                    var utc= new Date(utcMs).toUTCString()
                    var atDate="<span style=font-size:80%;font-weight:normal > <i>("+utc+")</i></span>"

                    myMapTitleDiv.innerHTML=elemG.getAttribute("title")+createdBy+atDate

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

                     zoomRect.style.display="none"

                    zoomUpdate()

                    if(PublishButton)
                     PublishButton.disabled=true
                    HideMapButton=document.getElementById("hideMapButton"+id)

                      HideMapButton.disabled=false
                     PublishButton=document.getElementById("publishMapButton"+id)
                     PublishButton.disabled=false

                      EditButton=document.getElementById("editMapButton"+id)
                      EditButton.disabled=false


                      openAddMapButton.disabled=true
                    //closeMapTable()

                    break
                }
            }

        }

    }
    xhr.send()
}
 //---clear all add elems---
 var HideMapButton
function hideMap(id)
{

 for(var k=domElemG.childNodes.length-1;k>=0;k--)
     domElemG.removeChild(domElemG.childNodes.item(k))
  BoundsRect.style("visibility","hidden")
 openAddMapButton.disabled=true
 if(PublishButton)
 {
     PublishButton.disabled=true
     EditButton.disabled=true
 }
  openAddMapButton.disabled=false
  myMapTitleDiv.style.visibility="hidden"
 HideMapButton=document.getElementById("hideMapButton"+id)
 HideMapButton.disabled=true
 PublishButton=null
 EditButton=null
  closeMapTable()
  elemLevelSpan.innerHTML=""
}

var EditMapId
var EditMapTitle
var SaveElemG
function editMap(id)
{

    EditMapId=id
     HideMapButton.disabled=true
      var groups = MapDoc.childNodes
     for(k=0;k<groups.length;k++)
     {
         var group=groups.item(k)
         var groupId=group.id
         if(groupId==id)
         {
               EditMapTitle=group.getAttribute("title")
              break
         }
    }

    SaveElemG=domElemG.cloneNode(true)
               var els=domElemG.childNodes
               for(var j=0;j<els.length;j++)
               {
                    var el=els.item(j)
                    var id=el.id
                    el.removeAttribute("pointer-events")
                    var myClass = el.getAttribute("class")
                    var initZoom= el.getAttribute("InitZoom")
                    if(myClass!="caveElem")
                    {
                        el.setAttribute("onmouseover", "myZoomLevel("+initZoom+","+id+")")
                        el.setAttribute("onmouseout", "removeZoomLevel()")
                    }
                    if(myClass=="iconElem")el.setAttribute("onmousedown", "editIconStart("+id+",evt)")
                    if(myClass=="pathElem")el.setAttribute("onmousedown", "startPathDrawEdit("+id+",evt)")
                    if(myClass=="circleElem")el.setAttribute("onmousedown", "editCircleDraw("+id+",evt)")
                    if(myClass=="arcElem")el.setAttribute("onmousedown", "editArcDraw("+id+",evt)")
                    if(myClass=="ellipseElem")el.setAttribute("onmousedown", "editEllipseDraw("+id+",evt)")
                    if(myClass=="rectElem")el.setAttribute("onmousedown", "editRectDraw("+id+",evt)")
                    if(myClass=="textElem")el.setAttribute("onmousedown", "editTextDraw("+id+",evt)")
                    if(myClass=="graphElem")el.setAttribute("onmousedown", "editGraphDraw("+id+",evt)")
                    if(myClass=="chartElem")el.setAttribute("onmousedown", "editChartDraw("+id+",evt)")
                    if(myClass=="imageElem")el.setAttribute("onmousedown", "editImageDraw("+id+",evt)")
                    if(myClass=="polygonElem")el.setAttribute("onmousedown", "editPolygonDraw("+id+",evt)")
                    if(myClass=="pgonElem")el.setAttribute("onmousedown", "editPgonStart("+id+",evt)")


               }


    EditButton.disabled=true
    openAddMapButton.disabled=false
    closeMapTable()
    openAddMapButton.disabled=false
    openAddMapButton.style.background="orange"
    openAddMapButton.innerHTML="Save Edit"
    BoundsRect.attr("stroke","orange")
    myMapTitleDiv.style.background="orange"
   cancelEditA.style.visibility="visible"


}

function cancelEdit()
{
    EditMapId=null
   EditButton.disabled=false
    openAddMapButton.disabled=true
    HideMapButton.disabled=false

    openAddMapButton.style.background="#C3E6D3"
    openAddMapButton.innerHTML="Save Map"
    BoundsRect.attr("stroke","#004953")
    myMapTitleDiv.style.background="#e0b0ff"
   cancelEditA.style.visibility="hidden"
    mySVG.removeChild(domElemG)
    mySVG.insertBefore(SaveElemG,domCaveG)

}