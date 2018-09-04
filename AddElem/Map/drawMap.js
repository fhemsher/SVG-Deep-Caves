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
    sendMap()

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
                    myMapTitleDiv.innerHTML=elemG.getAttribute("title")+createdBy
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

                      EditButton=document.getElementById("editMapButton"+id)
                      EditButton.disabled=false

                      startNewMapButton.style.visibility="visible"
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
function startNewMap()
{

 for(var k=domElemG.childNodes.length-1;k>=0;k--)
     domElemG.removeChild(domElemG.childNodes.item(k))
  BoundsRect.style("visibility","hidden")
 openAddMapButton.disabled=true
 PublishButton.disabled=true
 EditButton.disabled=true
  startNewMapButton.style.visibility="hidden"
  myMapTitleDiv.style.visibility="hidden"
 PublishButton=null
 EditButton=null
  closeMapTable()
}

var EditMapId
function editMap(id)
{
    EditMapId=id
    EditButton.disabled=true
    openAddMapButton.disabled=false
      closeMapTable()
        openAddMapButton.disabled=false
       openAddMapButton.style.background="orange"
       openAddMapButton.innerHTML="Save Edit"
     BoundsRect.style("visibility","hidden")
       myMapTitleDiv.style.visibility="hidden"
}