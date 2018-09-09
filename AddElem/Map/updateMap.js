var MapDoc
var LoadedMapArray=[]
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
                         var hideCell=row.insertCell(1).innerHTML = "<button disabled id=hideMapButton"+id+"  title='Hide this map ' onClick=hideMap('"+id+"')  >hide</button>"
                         if(email==CookieEmail)
                          var editCell= row.insertCell(2).innerHTML = "<button disabled style='background:orange' id=editMapButton"+id+"  title='Edit this Map' onClick=editMap()  >edit</button>"
                        var publishCell= row.insertCell(3).innerHTML = "<button disabled id=publishMapButton"+id+"  title='Publish this map into a web page' onClick=publishMap('"+id+"')  >publish</button>"
                        if(email==CookieEmail)
                            var deleteCell= row.insertCell(4).innerHTML = "<button title='Remove this map from the Library' id=deleteMapButton"+id+" onClick=deleteMap('"+id+"') style=background:red >delete</button>"

                    }

                }

                if(!EditMapId)
                {
                    mapTableCloseButton.style.visibility = "visible"
                    LoadedMapArray =[]
                    mapTableDiv.style.top = "60px"
                    mapTableDiv.style.visibility = "visible"
                   var height = 540
                    d3.select("#mapTableDiv").transition().duration(800).style("height", height+"px")
                    mapTableDiv.style.visibility = "visible"

                    getMapLibraryButton.style.borderStyle = "inset"
               }

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
    if(PublishButton)
    openAddMapButton.disabled=true
}





