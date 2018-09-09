var LoadedMapArray =[] //---hide edit send div---
//---'send' button---
var AddArrowDefs
function sendMap()
{
    var cw = addElemMapCw

    var email = cw.myMapEmailValue.value
    var title = cw.myMapTitleValue.value
   setCookie("email",email,720)
var saveMap=domElemG.cloneNode(true)


     saveMap.setAttribute("email", email)
    saveMap.setAttribute("title", title)
    saveMap.setAttribute("MyMapZoom", MyMapZoom)
    saveMap.setAttribute("MyMapCenterLat",MyMapCenterLat)
    saveMap.setAttribute("MyMapCenterLng",MyMapCenterLng)
    saveMap.setAttribute("MyMapLatUL",MyMapLatUL)
    saveMap.setAttribute("MyMapLngUL",MyMapLngUL)
    saveMap.setAttribute("MyMapLatLR",MyMapLatLR )
    saveMap.setAttribute("MyMapLngLR",MyMapLngLR)

    saveMap.setAttribute("boundsRect-InitZoom",BoundsRect.attr("InitZoom"))
    saveMap.setAttribute("boundsRect-rectX",BoundsRect.attr("rectX"))
    saveMap.setAttribute("boundsRect-rectY",BoundsRect.attr("rectY"))
    saveMap.setAttribute("boundsRect-lat",BoundsRect.attr("lat"))
    saveMap.setAttribute("boundsRect-lng",BoundsRect.attr("lng"))
    saveMap.setAttribute("boundsRect-width",BoundsRect.attr("width"))
    saveMap.setAttribute("boundsRect-height",BoundsRect.attr("height"))

    //---clear all elements---
    for(var k=saveMap.childNodes.length-1;k>=0;k--)
        saveMap.removeChild(saveMap.childNodes.item(k))



    var bb=boundsRect.getBBox()

    var r = mySVG.createSVGRect();
    r.x = bb.x;
    r.y = bb.y;
    r.width = bb.width;
    r.height = bb.height;
    var nodeList = mySVG.getIntersectionList(r, null);
    var arr = Array.from(nodeList);
    for(var k=0;k<arr.length;k++)
    {
        var elem=arr[k]
        var myParent=elem.parentNode

        if(myParent.id=="domElemG")
        {
            var clone=elem.cloneNode(true)
            clone.removeAttribute("onmousedown")
            clone.removeAttribute("onmouseover")
            clone.removeAttribute("onmouseout")
            clone.setAttribute("pointer-events","none")


            if(EditMapId)
            {
                 var utcMS = new Date().getTime()
                saveMap.setAttribute("editTimeUtcMS", utcMS)
             }


            saveMap.appendChild(clone)

        }

        if(elem.parentNode.getAttribute("class")=="caveElem")
        {
            var clone=elem.parentNode.cloneNode(true)

            clone.removeAttribute("onmousedown")
            saveMap.appendChild(clone)

        }



    }



    saveMap.insertBefore(defsGradient.cloneNode("true"),saveMap.firstChild)
    saveMap.insertBefore(defsPattern.cloneNode("true"),saveMap.firstChild)
    saveMap.insertBefore(arrowDefs.cloneNode("true"),saveMap.firstChild)
    //---hide not in map---
    for(var k=0;k<domElemG.childNodes.length;k++)
     domElemG.childNodes.item(k).setAttribute("display","none")
    for(var k=0;k<domCaveG.childNodes.length;k++)
     domCaveG.childNodes.item(k).setAttribute("display","none")


    for(var k=0;k<saveMap.childNodes.length;k++)
    {
        var elem=saveMap.childNodes.item(k)
        var saveId=elem.id
        var savedElem=document.getElementById(saveId)
        savedElem.removeAttribute("display")
            savedElem.removeAttribute("onmousedown")
            savedElem.removeAttribute("onmouseover")
            savedElem.removeAttribute("onmouseout")


    }



        var utcMS = new Date().getTime()
        saveMap.setAttribute("utcMS", utcMS)
        var myId = "map"+utcMS
        saveMap.setAttribute("id", myId)


        var svgString = new XMLSerializer().serializeToString(saveMap)

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "_ASP/sendMap.asp", true);
        xhr.onload = function()
        {
            if (this.status == 200)
            {

                cw.sendMapMessageSpan.innerHTML = "Thanks, your map has been received and placed in the library."
               zoomRect.style.display="none"
                cw.sendButton.disabled = true
               
                     MapDoc=null

            }
           if (this.status == 500)
            { //---Error---
                console.log(this.responseText) //---HTML-formatted error description---

            }
        };

        xhr.send(svgString);




}
//--remove existing map, replace with edited---
function sendEditMap()
{
    var cw = addElemMapCw

    var email = cw.myMapEmailValue.value
    var title = cw.myMapTitleValue.value
   setCookie("email",email,720)

     var saveEditMap=domElemG.cloneNode(true)




         saveEditMap.setAttribute("title", title)
         saveEditMap.setAttribute("email", email)
    saveEditMap.setAttribute("MyMapZoom", MyMapZoom)
    saveEditMap.setAttribute("MyMapCenterLat",MyMapCenterLat)
    saveEditMap.setAttribute("MyMapCenterLng",MyMapCenterLng)
    saveEditMap.setAttribute("MyMapLatUL",MyMapLatUL)
    saveEditMap.setAttribute("MyMapLngUL",MyMapLngUL)
    saveEditMap.setAttribute("MyMapLatLR",MyMapLatLR )
    saveEditMap.setAttribute("MyMapLngLR",MyMapLngLR)

    saveEditMap.setAttribute("boundsRect-InitZoom",BoundsRect.attr("InitZoom"))
    saveEditMap.setAttribute("boundsRect-rectX",BoundsRect.attr("rectX"))
    saveEditMap.setAttribute("boundsRect-rectY",BoundsRect.attr("rectY"))
    saveEditMap.setAttribute("boundsRect-lat",BoundsRect.attr("lat"))
    saveEditMap.setAttribute("boundsRect-lng",BoundsRect.attr("lng"))
    saveEditMap.setAttribute("boundsRect-width",BoundsRect.attr("width"))
    saveEditMap.setAttribute("boundsRect-height",BoundsRect.attr("height"))

 //---clear all elements---
    for(var k=saveEditMap.childNodes.length-1;k>=0;k--)
        saveEditMap.removeChild(saveEditMap.childNodes.item(k))

      var bb=boundsRect.getBBox()

    var r = mySVG.createSVGRect();
    r.x = bb.x;
    r.y = bb.y;
    r.width = bb.width;
    r.height = bb.height;
    var nodeList = mySVG.getIntersectionList(r, null);
    var arr = Array.from(nodeList);
    for(var k=0;k<arr.length;k++)
    {
        var elem=arr[k]
        var myParent=elem.parentNode

        if(myParent.id=="domElemG")
        {
            var clone=elem.cloneNode(true)

            clone.removeAttribute("onmousedown")
            clone.removeAttribute("onmouseover")
            clone.removeAttribute("onmouseout")
            clone.setAttribute("pointer-events","none")


                 var utcMS = new Date().getTime()
                saveEditMap.setAttribute("editTimeUtcMS", utcMS)



            saveEditMap.appendChild(clone)

        }

     if(elem.parentNode.getAttribute("class")=="caveElem")
        {
            var clone=elem.parentNode.cloneNode(true)

            clone.removeAttribute("onmousedown")
            saveEditMap.appendChild(clone)

        }



    }


    saveEditMap.insertBefore(defsGradient.cloneNode("true"),saveEditMap.firstChild)
    saveEditMap.insertBefore(defsPattern.cloneNode("true"),saveEditMap.firstChild)
    saveEditMap.insertBefore(arrowDefs.cloneNode("true"),saveEditMap.firstChild)

         saveEditMap.setAttribute("id", EditMapId)
 
    var svgRemoveString = "<remove myId='"+EditMapId+"' />"

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "_ASP/removeMap.asp", true);
    xhr.onload = function()
    {
        if (this.status == 200)    //---insert replacement(edited) map
        {

           var svgEditString = new XMLSerializer().serializeToString(saveEditMap)

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "_ASP/sendMap.asp", true);
            xhr.onload = function()
            {
                if (this.status == 200)
                {

                    cw.sendMapMessageSpan.innerHTML = "Your map has been edited in the library."
                      cw.sendButton.disabled = true


                    EditButton.disabled=false
                    openAddMapButton.disabled=false
                    PublishButton=null
                    EditButton=null

                       openAddMapButton.style.background="#C3E6D3"
                       openAddMapButton.innerHTML="Save Map"
                     BoundsRect.style("visibility","visible")
                     var createdBy="<br><span style=font-size:90%;font-weight:normal >Created By: "+email+"</span>"


                        var utcMs=+saveEditMap.getAttribute("editTimeUtcMS")


                    var utc= new Date(utcMs).toUTCString()
                    var atDate="<span style=font-size:80%;font-weight:normal > <i>("+utc+")</i></span>"

                    myMapTitleDiv.innerHTML=title+createdBy+atDate
                       myMapTitleDiv.style.visibility="visible"
                       //update table---
                     MapDoc=null

                     EditMapId=null

                }
               if (this.status == 500)
                { //---Error---
                    console.log(this.responseText) //---HTML-formatted error description---

                }
            };

            xhr.send(svgEditString);
        }

    };

    xhr.send(svgRemoveString);

}
function deleteMap(myId)
{
    if(boundsRect.style.visibility=="visible")
    {
        for(var j=domElemG.childNodes.length-1;j>=0;j--)
            domElemG.removeChild(domElemG.childNodes.item(j))
        boundsRect.style.visibility="hidden"
    }
    var svgString = "<remove myId='"+myId+"' />"

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "_ASP/removeMap.asp", true);
    xhr.onload = function()
    {
        if (this.status == 200)
        {

            document.getElementById("deleteMapButton"+myId).disabled=true
            document.getElementById("deleteMapButton"+myId).innerHTML="..deleted.."
            MapDoc=null
            setTimeout(getMapLibrary(),1500)
            elemLevelSpan.innerHTML=""
        }

    };

    xhr.send(svgString);

}


