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
        var elem=arr[k]
        var myParent=elem.parentNode
        if(myParent.id=="domElemG")
        {
            var clone=elem.cloneNode(true)
            clone.removeAttribute("onmouseover")
            clone.removeAttribute("onmouseout")
            clone.removeAttribute("onmousedown")
            saveMap.appendChild(clone)

        }

    }



    saveMap.insertBefore(defsGradient.cloneNode("true"),saveMap.firstChild)
    saveMap.insertBefore(defsPattern.cloneNode("true"),saveMap.firstChild)
    saveMap.insertBefore(arrowDefs.cloneNode("true"),saveMap.firstChild)


    if(!EditMapId)
    {
        var utcMS = new Date().getTime()
        saveMap.setAttribute("utcMS", utcMS)
        var myId = "map"+utcMS
        saveMap.setAttribute("id", myId)

        LoadedMapArray.push(saveMap)
        var svgString = new XMLSerializer().serializeToString(saveMap)

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "_ASP/sendMap.asp", true);
        xhr.onload = function()
        {
            if (this.status == 200)
            {
                setTimeout("publishCaveInit('"+title+"','"+myId+"')",2000)
                cw.sendMapMessageSpan.innerHTML = "Thanks, your map has been received and placed in the library."
                //cw.refreshMapLibraryButton.disabled = false
                cw.sendButton.disabled = true
            }
           if (this.status == 500)
            { //---Error---
                console.log(this.responseText) //---HTML-formatted error description---

            }
        };

        xhr.send(svgString);
     }
     else
     {
       saveMap.setAttribute("id", EditMapId)
       deleteEditMap(EditMapId,saveMap)


     }

}

function deleteMap(myId)
{



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
        }

    };

    xhr.send(svgString);

}

//--remove existing map, replace with edited---
function deleteEditMap(myId,saveMap)
{
    var svgRemoveString = "<remove myId='"+myId+"' />"

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "_ASP/removeMap.asp", true);
    xhr.onload = function()
    {
        if (this.status == 200)    //---insert replacement(edited) map
        {
           var svgEditString = new XMLSerializer().serializeToString(saveMap)

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "_ASP/sendMap.asp", true);
            xhr.onload = function()
            {
                if (this.status == 200)
                {  var title = cw.myMapTitleValue.value
                    setTimeout("publishCaveInit('"+title+"','"+myId+"')",2000)
                    cw.sendMapMessageSpan.innerHTML = "Your map has been edited in the library."
                      cw.sendButton.disabled = true


                    EditButton.disabled=false
                    openAddMapButton.disabled=false
                    PublishButton=null
                    EditButton=null

                       openAddMapButton.style.background="#C3E6D3"
                       openAddMapButton.innerHTML="Save Map"
                     BoundsRect.style("visibility","visible")
                       myMapTitleDiv.style.visibility="visible"
                       //update table---
                     MapDoc=null
                     getMapLibrary()
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


function sendUpdateMap()
{
    sendMapUpdateMessageSpan.innerHTML = ''
    var myId = retrieveMapIdValue.value
    var title = myMapTitleUpdateValue.value
    var description = myMapDescriptionUpdateValue.value
    var name = myMapNameUpdateValue.value
    var email = myMapEmailUpdateValue.value
    if(myMapCategoryUpdateSelect.selelectedIndex!=0)
        var category = myMapCategoryUpdateSelect.options[myMapCategoryUpdateSelect.selelectedIndex].text
        else
            var category = "Other"

            var mapG = document.createElementNS(NS, "g")

            //---get all elements in the drawing and build the map---
            var paths = domAddPathG.childNodes
            var elems = domAddElemG.childNodes
            var HMIs = domAddHmiG.childNodes
            var symbols = domAddSymbolG.childNodes
            var icons = domAddIconG.childNodes
            var maps = domAddMapG.childNodes

            mapG.setAttribute("id", myId)
            mapG.setAttribute("category", category)
            mapG.setAttribute("title", title)
            mapG.setAttribute("description", description)
            mapG.setAttribute("name", name)
            mapG.setAttribute("email", email)

            for(k = 0; k<paths.length; k++)
        {
            var el = paths.item(k).cloneNode(true)
            el.removeAttribute("onmousedown")
            el.removeAttribute("class")
            el.removeAttribute("id")
            el.removeAttribute("style")
            mapG.appendChild(el)
        }
        for(k = 0; k<elems.length; k++)
    {
        var el = elems.item(k).cloneNode(true)
        el.removeAttribute("onmousedown")
        el.removeAttribute("class")
        el.removeAttribute("id")
        el.removeAttribute("style")
        mapG.appendChild(el)
    }
    for(k = 0; k<HMIs.length; k++)
    {
        var el = HMIs.item(k).cloneNode(true)
        el.removeAttribute("onmousedown")
        el.removeAttribute("class")
        el.removeAttribute("id")
        el.removeAttribute("style")
        mapG.appendChild(el)
    }
    for(k = 0; k<symbols.length; k++)
    {
        var el = symbols.item(k).cloneNode(true)
        el.removeAttribute("onmousedown")
        el.removeAttribute("class")
        el.removeAttribute("id")
        el.removeAttribute("style")
        mapG.appendChild(el)
    }
    for(k = 0; k<icons.length; k++)
    {
        var el = icons.item(k).cloneNode(true)
        el.removeAttribute("onmousedown")
        el.removeAttribute("class")
        el.removeAttribute("id")
        el.removeAttribute("style")
        mapG.appendChild(el)
    }
    for(k = 0; k<maps.length; k++)
    {
        var el = maps.item(k).cloneNode(true)
        el.removeAttribute("onmousedown")
        el.removeAttribute("class")
        el.removeAttribute("id")
        el.removeAttribute("style")
        mapG.appendChild(el)
    }
    domWrapper.style.display = "block"
    domWrapper.appendChild(mapG)
    var bbW = domWrapper.getBBox()
    var cxW = bbW.x+.5*bbW.width
    var cyW = bbW.y+.5*bbW.height

    var rect = document.createElementNS(NS, "rect")
    rect.setAttribute("width", bbW.width)
    rect.setAttribute("height", bbW.height)
    rect.setAttribute("stroke", "none")
    rect.setAttribute("fill", "orange")
    rect.setAttribute("fill-opacity", ".4")
    // rect.setAttribute("onmousedown","editMap("+myId+",evt)")
    rect.setAttribute("transform", "translate("+(bbW.x)+","+(bbW.y)+")")
    mapG.appendChild(rect)

    mapG.setAttribute("transform", "translate(0,0)")

    // mapG.setAttribute("transform","translate("+(cxW)+","+(cyW)+")")
    mapG.setAttribute("nativeWidth", bbW.width)
    mapG.setAttribute("nativeHeight", bbW.height)

    domAddMapG.appendChild(mapG)

    mapG.lastChild.setAttribute("fill", "white")
    mapG.lastChild.setAttribute("fill-opacity", "0")

    MapEditArray =[]
    var svgString = new XMLSerializer().serializeToString(mapG)

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "_ASP/sendUpdateMap.asp", true);
    xhr.onload = function()
    {
        if (this.status == 200)
        {
            retrieveMapUpdateDiv.style.display = "none"
            sendMapUpdateMessageSpan.innerHTML = "Your edited map (<b>"+myId+"</b>) has been received and updated in the library."

        }

    };

    xhr.send(svgString);
}