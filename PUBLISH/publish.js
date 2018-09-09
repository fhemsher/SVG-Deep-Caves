function loadPublishSVG(publishID)
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../Library/Publish.svg", true);
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

                if(mapId==publishID)
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
                    mySVG.insertBefore(elemG,domCaveG)
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



                    BoundsRect.attr("InitZoom",elemG.getAttribute("boundsRect-InitZoom"))
                    BoundsRect.attr("rectX",elemG.getAttribute("boundsRect-rectX"))
                    BoundsRect.attr("rectY",elemG.getAttribute("boundsRect-rectY"))
                    BoundsRect.attr("lat",elemG.getAttribute("boundsRect-lat"))
                    BoundsRect.attr("lng",elemG.getAttribute("boundsRect-lng"))
                    BoundsRect.attr("width",elemG.getAttribute("boundsRect-width")  )
                    BoundsRect.attr("height",elemG.getAttribute("boundsRect-height"))
                    BoundsRect.style("visibility","visible")
                    MyMap.fitBounds([[ulLat, ulLng],[lrLat, lrLng]]);

                    loadCavesSVG(publishID)




                    break
                }
            }

        }

    }
    xhr.send()





}

function loadCavesSVG(publishID)
{
        var caveID="cavePublish"+publishID.split("map")[1]


        var xhr = new XMLHttpRequest();
        xhr.open("GET", "../Library/CavePublish.svg", true);
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
                                var caveId = group.getAttribute("id")

                                if(caveId==caveID)
                                {
                                        mySVG.removeChild(domCaveG)
                                        var elemG=group.cloneNode(true)
                                        elemG.id="domCaveG"
                                        mySVG.insertBefore(elemG,boundsRect)
                                        zoomUpdate()
                                        break
                                }
                        }

                }

        }
        xhr.send()
 }
