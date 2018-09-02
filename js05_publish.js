function publishMap(id)
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
                    publishG=group.cloneNode(true)
                     for(k=0;k<publishG.childNodes.length;k++)
                    {

           var elem=publishG.childNodes.item(k)
                elem.removeAttribute("onmouseover")
                elem.removeAttribute("onmouseout")
                elem.removeAttribute("onmousedown")

                    }
                    var svgString= new XMLSerializer().serializeToString(publishG)
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", "_ASP/publishMap.asp", true);
                    xhr.onload = function()
                    {
                        if (this.status == 200)
                        {
                            closeMapTable()
                          publishValue.value = "<!DOCTYPE HTML>\n"+
                          "<html>\n"+
                            "<script>\n"+
                                "  window.open('http://svg-deep-caves.com/PUBLISH/index.htm\\?id="+mapId+"','_self')\n"+
                            "</script>\n"+
                            "</html>"
                            publishMapDiv.style.visibility="visible"
                            publishCave(mapId)

                        }

                    };
                    xhr.send(svgString);

                    break
                }
            }

        }

    }
    xhr.send()

    }



    //---get all caves contained within border----
   function publishCave(mapId)
   {
       var MapDoc
           var xhr = new XMLHttpRequest();
        xhr.open("GET", "Library/Map.svg", true);
        xhr.onload = function()
        {
            var xmlString = this.responseText

 //---DOMParser---
            var parser = new DOMParser();
            MapDoc = parser.parseFromString(xmlString, "text/xml").documentElement;

            var gs=MapDoc.childNodes
            for(var k=0;k<gs.length;k++)
            {
                var elemG=gs.item(k)
                if(elemG.id==mapId)
                {
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

                   break
                }

            }







          var caveId="cavePublish"+mapId.split("map")[1]
           var cavePublishG=document.createElementNS(NS,"g")
           cavePublishG.id=caveId
        var bb=domWrapper.appendChild(boundsRect).getBBox()
        mySVG.appendChild(boundsRect)


         var r = mySVG.createSVGRect();
            r.x = bb.x;
            r.y = bb.y;
            r.width = bb.width;
            r.height = bb.height;
            var nodeList = mySVG.getIntersectionList(r, null);
            var arr = Array.from(nodeList);
          
            for(var k=0;k<arr.length;k++)
            {

               var elem=arr[k].parentNode


               var myClass=elem.getAttribute("class")

               if(myClass=="caveElem")
               {
                  elem.removeAttribute("onmousedown")
                  cavePublishG.appendChild(elem.cloneNode(true))
               }
               else if(myClass=="cavePublicElem")
               {
                  elem.removeAttribute("onmousedown")
                  cavePublishG.appendChild(elem.cloneNode(true))
                  k++
               }
            }


             var svgString= new XMLSerializer().serializeToString(cavePublishG)
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", "_ASP/publishCave.asp", true);
                    xhr.onload = function()
                    {
                        if (this.status == 500)
                        {
                            console.log(this.responseText)

                        }

                    };
                    xhr.send(svgString);


    }
    xhr.send();

}