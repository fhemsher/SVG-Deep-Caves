var MapDoc
function getMapLibrary()
{
      hideAllHelps()
    if(!MapDoc)
    {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "Library/Map.svg", true);
        xhr.onload = function()
        {
            var xmlString = this.responseText
            console.log(xmlString)
 //---DOMParser---
            var parser = new DOMParser();
            MapDoc = parser.parseFromString(xmlString, "text/xml").documentElement;
            //---clear previous table----
            var rows = mapTable.rows
            for(var k = rows.length-1; k>=0; k--)
                mapTable.deleteRow(rows[k])

                var rowCnt = 0

                //----write table---
                var groups = MapDoc.childNodes
                if(groups.length>0)
                mapEmptyDiv.style.display = "none"
                else
                    mapEmptyDiv.style.display = ""
                for(var k = 0; k<groups.length; k++)
                {
                    var group = groups.item(k)
                    if(group.nodeName!="#text")
                    {
                        var id = group.getAttribute("id")

                        var title = group.getAttribute("title")
                        var email = group.getAttribute("email")

                        var row = mapTable.insertRow(rowCnt++)

                        var cntr = (rowCnt)/2+""
                        if(cntr.indexOf('.')!=-1)
                            var bg = "#aadc82"
                            else
                                var bg = "#f0e99c"
                                row.style.background = bg

                        var titleCell = row.insertCell(0)
                        titleCell.style.width="77%"
                        titleCell.innerHTML = "<a href=javascript:loadMyMap('"+id+"')>"+title +"</a>"
                     var publishCell= row.insertCell(1).innerHTML = "<button disabled id=publishMapButton"+id+"  title='Publish this map into a web page' onClick=publishMap('"+id+"')  >publish</button>"
                        if(email==CookieEmail)
                            var deleteCell= row.insertCell(2).innerHTML = "<button id=deleteMapButton"+id+" onClick=deleteMap('"+id+"') style=background:red >delete</button>"

                    }

                }
                mapTableCloseButton.style.visibility = "visible"
                LoadedMapArray =[]
                mapTableDiv.style.top = "60px"
                mapTableDiv.style.visibility = "visible"
               var height = 540
                d3.select("#mapTableDiv").transition().duration(800).style("height", height+"px")
                mapTableDiv.style.visibility = "visible"

                getMapLibraryButton.style.borderStyle = "inset"


        }
        xhr.send()

    }
    else
    {
        mapTableCloseButton.style.visibility = "visible"
        LoadedMapArray =[]
                mapTableDiv.style.top = "60px"
                mapTableDiv.style.visibility = "visible"
               var height = 540
                d3.select("#mapTableDiv").transition().duration(800).style("height", height+"px")
                mapTableDiv.style.visibility = "visible"


        disableAllButtons()
    }


}

function refreshMapLibrary()
{
    var cw = addElemMapCw
    MapDoc = null
    closeDrawMap()
    getMapLibrary()
    cw.refreshMapLibraryButton.disabled = true
}

function placeMapInDrawing(id)
{

    var map = id.cloneNode("true")
     console.log(map)
    map.setAttribute("parentid", map.id)

    map.removeAttribute("title")
    map.removeAttribute("description")

    var utcms = new Date().getTime()
    var id = "map"+utcms
    map.setAttribute("id", id)
    var myScale=map.getAttribute("myscale")
        map.setAttribute("transform", "scale("+myScale+")")
    map.setAttribute("class", "dragTargetObj")
    var rects = map.getElementsByTagName("rect")
    var coverRect = rects[rects.length-1]
    coverRect.style.cursor = "move"

    var rects = map.getElementsByTagName("rect")
    var coverRect = rects[rects.length-1]
    coverRect.setAttribute('onmousedown', "editDrawMap("+id+",evt)")

    LoadedMapArray.push(map)

    domElemG.appendChild(map)

    //---reduce scale of large custom maps----
    var bb = map.getBBox()
    if(bb.width>150 || bb.height>150)
    {
        addScale(map, 1) //---transformAdd.js---

    }

}

function closeMapTable()
{
    for(var k = 0; k<LoadedMapArray.length; k++)
    {
        var map = LoadedMapArray[k]
        var rects = map.getElementsByTagName("rect")
        var coverRect = rects[rects.length-1]
        coverRect.setAttribute('onmousedown', "editDrawMap("+map.id+",evt)")
        map.setAttribute("class", "mapElem")
        coverRect.style.cursor = "default"
    }
    mySVG.removeAttribute("onmousedown")
    mySVG.removeAttribute("onmousemove")
    mySVG.removeAttribute("onmouseup")

    LoadedMapArray =[]
    showSourceSVG()

    var height = 1
    d3.select("#mapTableDiv").transition().duration(800).style("height", height+"px")
    setTimeout('mapTableDiv.style.visibility = "hidden"',900)


    mapTableCloseButton.style.visibility = "hidden"
    getMapLibraryButton.style.borderStyle = ""
    enableAllButtons()
}

var InsertMap
function addMap(myId)
{
    for(var k = 0; k<MapDoc.childNodes.length; k++)
    {
        var map = MapDoc.childNodes.item(k)
        var mapId = map.getAttribute("id")
        {
            if(mapId==myId)
            {
                InsertMap = map.cloneNode(true)
                previewTitleDiv.innerHTML = map.getAttribute("title")
                var width = +map.getAttribute("width")
                var height = +map.getAttribute("height")
                previewMapFrameDiv.style.width = (width+10)+"px"
                // previewMapFrameDiv.style.height = (height+60) +"px"

                previewMapFrame.style.width = width+"px"
                previewMapFrame.style.height = height+"px"
                previewMapFrame.contentWindow.document.body.innerHTML += new XMLSerializer().serializeToString(map)
                previewMapFrameDiv.style.display = "block"

                var pos = getPosition(openLibraryButton)
                previewMapFrameDiv.style.top = (pos.y+10)+"px"
                d3.select("#previewMapFrameDiv").transition(900).style("height", (height+60)+"px")
                // d3.select("#previewMapFrameDiv").transition(900).style("width",(width+10)+"px" )

                break
            }

        }

    }
}

function listMyMapIDs()
{

    //---clear previous table----
    var rows = mapListTable.rows
    for(var k = rows.length-1; k>=0; k--)
        mapListTable.deleteRow(rows[k])

        var myEmail = CookieEmail

        //----write table---
        var groups = MapDoc.childNodes
        var cnt = 0
        for(var k = 0; k<groups.length; k++)
    {
        var group = groups.item(k)
        if(group.nodeName!="#text")
        {
            var id = group.getAttribute("id")
            var title = group.getAttribute("title")
            var description = group.getAttribute("description")
            var email = group.getAttribute("email")

            if(email==myEmail)
            {
                var row = mapListTable.insertRow(cnt++)
                row.id = "row"+id
                // var idCell = row.insertCell(0).innerHTML = id
                var titleCell = row.insertCell(0).innerHTML = title
                var descriptionCell = row.insertCell(1).innerHTML = description
                var removeCell = row.insertCell(2).innerHTML = "<button style=background:red onClick=this.disabled=true;removeMyMap('"+id+"')>remove</button>"
            }
        }

    }
    mapListTable.style.display = "block"

}

function removeMyMap(id)
{

    var svgString = "<remove myId='"+id+"' myEmail='"+CookieEmail+"' />"

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "_ASP/removeMap.asp", true);
    xhr.onload = function()
    {
        if (this.status == 200)
        {

            document.getElementById("row"+id).style.background = "gainsboro"

        }

    };

    xhr.send(svgString);

}

function scrollToTop(scrollDuration)
{
    var scrollStep = -window.scrollY / (scrollDuration / 15),
    scrollInterval = setInterval(function()
        {
            if (window.scrollY != 0)
            {
                window.scrollBy(0, scrollStep);
            }
            else clearInterval(scrollInterval);
        }
        , 15);
}

//=============================Retrieve(Edit)/Remove==============================
function mapRetrieveButtonClicked()
{

    coverRect.style.display = "none"
    sendMapUpdateMessageSpan.innerHTML = ""

    var myId = retrieveMapIdValue.value
    var myEmail = retrieveMapEmailValue.value
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "LIBRARY/Map.svg", true);
    xhr.onload = function()
    {
        var xmlString = this.responseText

        //---DOMParser---
        var parser = new DOMParser();
        MapDoc = parser.parseFromString(xmlString, "text/xml").documentElement;
        var maps = MapDoc.childNodes

        for(var k = 0; k<maps.length; k++)
        {
            var map = maps.item(k)
            if(map.nodeName!="#text")
            {
                var id = map.getAttribute("id")
                var email = map.getAttribute("email")

                if(id==myId&&myEmail==email)
                {

                    //---split map()----
                    splitMap(map)
                    var category = map.getAttribute("category")
                    for(j = 0; j<myMapCategoryUpdateSelect.length; j++)
                    {
                        var cat = myMapCategoryUpdateSelect.options[j].text
                        if(cat==category)
                        {
                            myMapCategoryUpdateSelect.selectedIndex = j
                            break
                        }
                    }

                    myMapTitleUpdateValue.value = map.getAttribute("title")
                    myMapDescriptionUpdateValue.value = map.getAttribute("description")
                    myMapNameUpdateValue.value = map.getAttribute("name")
                    myMapEmailUpdateValue.value = email
                    retrieveMapUpdateDiv.style.display = "block"
                    scrollToTop(600)
                    break;
                }
            }
        }

    }
    xhr.send()
}

var MapEditArray =[]
function splitMap(map)
{

    var matrix = map.transform.baseVal.consolidate().matrix;

    var transX = matrix.e
    var transY = matrix.f
    console.log(transX)
    MapEditArray =[]
    //---place at center---
    var cx = +mySVG.getAttribute("width")/2
    var cy = +mySVG.getAttribute("height")/2
    clearButtonClicked()

    map.removeChild(map.lastChild) //--the cover rect---
    var elems = map.childNodes
    var utcMS = new Date().getTime()
    for(var k = 0; k<elems.length; k++)
    {

        var clone = elems.item(k).cloneNode(true)

        var cloneTfmRequest = mySVG.createSVGTransform()
        var myTransList = clone.transform
        var objTransList = myTransList.baseVal
        cloneTfmRequest.setTranslate(transX, transY)
        objTransList.appendItem(cloneTfmRequest)
        objTransList.consolidate()

        parent = clone.getAttribute('parent')
        if(parent=="domAddElemG")
        {
            if(clone.nodeName=="circle")
            {
                clone.id = "circle"+(utcMS+k)
                clone.setAttribute("onmousedown", "editCircleDraw("+clone.id+",evt)")
                clone.setAttribute("class", "addElem")
                domAddElemG.appendChild(clone)
            }
            if(clone.nodeName=="ellipse")
            {
                clone.id = "ellipse"+(utcMS+k)
                clone.setAttribute("onmousedown", "editEllipseDraw("+clone.id+",evt)")
                clone.setAttribute("class", "addElem")
                domAddElemG.appendChild(clone)
            }
            if(clone.nodeName=="text")
            {
                clone.id = "text"+(utcMS+k)
                clone.setAttribute("onmousedown", "editTextDraw("+clone.id+",evt)")
                clone.setAttribute("class", "addElem")
                domAddElemG.appendChild(clone)
            }
            if(clone.nodeName=="rect")
            {
                clone.id = "rect"+(utcMS+k)
                clone.setAttribute("onmousedown", "editRectDraw("+clone.id+",evt)")
                clone.setAttribute("class", "addElem")
                domAddElemG.appendChild(clone)
            }
            if(clone.nodeName=="polygon")
            {
                clone.id = "polygon"+(utcMS+k)
                clone.setAttribute("onmousedown", "editPolygonDraw("+clone.id+",evt)")
                clone.setAttribute("class", "addElem")
                domAddElemG.appendChild(clone)
            }
        }
        if(parent=="domAddPathG")
        {
            clone.id = "path"+(utcMS+k)
            clone.setAttribute("onmousedown", "editPathDraw("+clone.id+",evt)")
            clone.setAttribute("class", "addPath")
            domAddPathG.appendChild(clone)
        }
        if(parent=="domAddIconG")
        {
            clone.id = "icon"+(utcMS+k)
            clone.setAttribute("onmousedown", "editIconStart(evt)")

            domAddIconG.appendChild(clone)
        }
        if(parent=="domAddSymbolG")
        {
            clone.id = "symbol"+(utcMS+k)
            clone.setAttribute("onmousedown", "editSymbolDraw("+clone.id+",evt)")

            domAddSymbolG.appendChild(clone)
        }
        if(parent=="domAddHmiG")
        {
            for(var p = 0; p<elem.childNodes.length; p++)
            {
                var el = elem.childNodes.item(p)
                if(el.nodeName!="#text")
                {
                    var myNodeName = el.nodeName

                    el.setAttribute("class", "dragTargetObj")

                    if(myNodeName=="ellipse")
                    {
                        var myId = "control"+p
                        el.setAttribute("id", myId)
                        el.setAttribute("onmousedown", "editControlDraw("+myId+",evt)");

                    }
                    if(myNodeName=="g" && el.getAttribute("myStatus"))
                    {
                        var myId = "pilotLight"+p
                        el.setAttribute("id", myId)
                        el.setAttribute("onmousedown", "editPilotLightDraw("+myId+",evt)");

                    }
                    if(myNodeName=="g" && el.firstChild.nodeName=="ellipse")
                    {
                        var myId = "PID"+p
                        el.setAttribute("id", myId)
                        el.setAttribute("onmousedown", "editPIDDraw("+myId+",evt)");

                    }
                    if(myNodeName=="g" && el.getAttribute("max"))
                    {
                        var myId = "gauge"+p
                        el.setAttribute("id", myId)
                        el.setAttribute("onmousedown", "editGaugeDraw("+myId+",evt)");
                    }
                    domAddHmiG.appendChild(el.cloneNode(true))
                }
            }

        }
        if(parent=="domElemG")
        {
            clone.id = "map"+(utcMS+k)
            clone.setAttribute("onmousedown", "editMapDraw("+clone.id+",evt)")
            domElemG.appendChild(clone)
        }
        MapEditArray.push(clone)

    }

    showSourceSVG()
}