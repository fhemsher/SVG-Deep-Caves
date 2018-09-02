 function loadCaves()
 {
      var xhr = new XMLHttpRequest();
        xhr.open("GET", "Library/Cave.svg", true);
        xhr.onload = function()
        {
            var xmlString = this.responseText
 //---DOMParser---
            var parser = new DOMParser();
            CaveDoc = parser.parseFromString(xmlString, "text/xml").documentElement;
              var caves = CaveDoc.childNodes

                for(var k = 0; k<caves.length; k++)
                {
                    var cave = caves.item(k)
                    if(cave.nodeName!="#text")
                    {

                      var clone=cave.cloneNode(true)
                      domCaveG.appendChild(clone)


                    }
                }
            zoomUpdateCaves()

       }
         xhr.send()
 }





function loadCaveSymbolTable()
{
     //---clear rows---
     var rows=caveSymbolTable.rows
     for(var k=rows.length-1;k>=0;k--)
        caveSymbolTable.deleteRow(k)


           var xhr = new XMLHttpRequest();
        xhr.open("GET", "Library/RegisteredSymbols.svg", true);
        xhr.onload = function()
        {
            var xmlString = this.responseText
 //---DOMParser---
            var parser = new DOMParser();
            SymbolDoc = parser.parseFromString(xmlString, "text/xml").documentElement;



                var rowCnt = 0

                //----write table---
                var symbols = SymbolDoc.childNodes

                for(var k = 0; k<symbols.length; k++)
                {
                    var symbol = symbols.item(k)
                    if(symbol.nodeName!="#text")
                    {


                        var plantCnt = symbol.getAttribute("plantCnt")
                        var title = symbol.getAttribute("title")


                        var row = caveSymbolTable.insertRow(rowCnt++)

                        var cntr = (rowCnt)/2+""
                        if(cntr.indexOf('.')!=-1)
                            var bg = "#aadc82"
                            else
                                var bg = "#f0e99c"
                                row.style.background = bg

                          var symbolCell=row.insertCell(0)
                            symbolCell.style.width="20px"
                            symbolCell.style.heignt="20px"
                            var svg=document.createElementNS(NS,"svg")
                            svg.setAttribute("width",20)
                            svg.setAttribute("height",20)
                            var clone=symbol.cloneNode(true)
                            clone.setAttribute("transform","translate(10 10)scale(.5)")
                            svg.appendChild(clone)
                            symbolCell.innerHTML=new XMLSerializer().serializeToString(svg)


                            var titleCell=row.insertCell(1)
                            titleCell.innerHTML=title+" ("+plantCnt+")"


                    }
              }

          }
          xhr.send()
}

function closeDrawCave()
{

   closeIframe("addElemCave")
   var cw=addElemCaveCw

   cw.containerDiv.style.background="#7df9ff"
   cw.drawCaveEditSpan.innerHTML="Add Caves"
   cw.drawCaveDeleteButton.style.visibility='hidden'
   cw.depthValue.value=""
   cw.nameValue.value=""

   cw.latValue.value=""
   cw.lngValue.value=""
     if(getCookie("email"))
   {
       cw.emailValue.value=getCookie("email").replace(/%20/g," ")
   }
   else
   cw.emailValue.value=""
   cw.depthSpan.style.visibility="hidden"
   cw.drawCaveSendButton.disabled=true
   cw.sendCaveDiv.style.visibility="hidden"
    EditDrawCave = false
}

function sendDrawCave()
{

if(EditDrawCave==false)
{
    var cw=addElemCaveCw
    var depth=+cw.depthValue.value
    var name=cw.nameValue.value
    var lat=+cw.latValue.value
    var lng=+cw.lngValue.value
    var email=cw.emailValue.value
   if(depth>=100)
   {
    if(depth>=2000) caveSymbol="Rv280"
    else if(depth>=1900) caveSymbol="Rv15"
    else if(depth>=1800) caveSymbol="Rv17"
    else if(depth>=1700) caveSymbol="Rv26"
    else if(depth>=1600) caveSymbol="Rv27"
    else if(depth>=1500) caveSymbol="Rv30"
    else if(depth>=1400) caveSymbol="Rv5"
    else if(depth>=1300) caveSymbol="Rv33"
    else if(depth>=1200) caveSymbol="Rv62"
    else if(depth>=1100) caveSymbol="Rv189"
    else if(depth>=1000) caveSymbol="Rv354"
    else if(depth>=900) caveSymbol="Rh355"
    else if(depth>=800) caveSymbol="Rh354"
    else if(depth>=700) caveSymbol="Rh346"
    else if(depth>=600) caveSymbol="Rh339"
    else if(depth>=500) caveSymbol="Rh320"
    else if(depth>=400) caveSymbol="Rh254"
    else if(depth>=300) caveSymbol="Rh242"
    else if(depth>=200) caveSymbol="Rh11"
    else if(depth>=100) caveSymbol="Rh187"

         var xhr = new XMLHttpRequest();
        xhr.open("GET", "Library/RegisteredSymbols.svg", true);
        xhr.onload = function()
        {
            var xmlString = this.responseText
 //---DOMParser---
            var parser = new DOMParser();
            SymbolDoc = parser.parseFromString(xmlString, "text/xml").documentElement;



                var rowCnt = 0

                //----write table---
                var symbols = SymbolDoc.childNodes

                for(var k = 0; k<symbols.length; k++)
                {
                    var symbol = symbols.item(k)
                    if(symbol.nodeName!="#text")
                    {

                        if(symbol.id==caveSymbol)
                        {
                            var id="cave"+new Date().getTime()
                           var clone=symbol.cloneNode(true)
                           clone.setAttribute("class","caveElem")
                           clone.setAttribute("parentId",caveSymbol)
                           clone.setAttribute("lat",lat)
                           clone.setAttribute("lng",lng)
                           clone.setAttribute("createdBy",email)
                           clone.setAttribute("id",id)

                           var comment=name+" @ "+depth+" m"
                           clone.setAttribute("comment",comment)

                            clone.setAttribute("onmouseover","showCaveComment(evt)")
                            clone.setAttribute("onmouseout","hideCaveComment(evt)")

                             clone.setAttribute("onmousedown","editAddCave("+id+",evt)" )

                            var latLng= new  L.latLng(lat, lng)
                            var transX=MyMap.latLngToLayerPoint(latLng).x
                            var transY=MyMap.latLngToLayerPoint(latLng).y
                            clone.setAttribute("transform","translate("+transX+" "+transY+")")

                            domCaveG.appendChild(clone)

                            uploadCave(clone)

                            setCookie("email",email,720)

                         break
                        }

                     }

                }

       }
         xhr.send()



    cw.depthSpan.style.visibility="hidden"
   }
   else
   {
    cw.depthSpan.style.visibility="visible"
   }
  }
  else
  editThisCave()

}


function uploadCave(cave)
{



    var svgString = new XMLSerializer().serializeToString(cave)

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "_ASP/sendCave.asp", true);
    xhr.onload = function()
    {
        if (this.status == 200)
        {
           var cw=addElemCaveCw
           cw.drawCaveSendButton.disabled=true
           cw.sendCaveDiv.style.visibility="visible"

            console.log(this.responseText)
            loadCaveSymbolTable()
        }
        else if (this.status == 500)
        console.log(this.responseText)

    };

    xhr.send(svgString);

}

function removeCave()
{

    var parentId=EditThisCave.getAttribute("parentId")

    var svgString = "<remove parentId='"+parentId+"' myId='"+DrawCaveEditId+"' />"

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "_ASP/removeCave.asp", true);
    xhr.onload = function()
    {
        if (this.status == 200)
        {
           domCaveG.removeChild(EditThisCave)
           closeDrawCave()
           loadCaveSymbolTable()
        }
        else if (this.status == 500)
        console.log(this.responseText)

    };

    xhr.send(svgString);

}
//--mousedown/right button on cave---
var DrawCaveEditId
var EditThisCave
var  EditDrawCave = false
function editAddCave(elemObjEdit, evt)
{

    var isRightMB;
    var evtW = window.event;
    if(evtW)
    {
        isRightMB = evtW.which == 3;
        if (!isRightMB) // IE, Opera
            isRightMB = evtW.button == 2;
    }
    else //---firefox--
        isRightMB = evt.which == 3;


    var myZoomLevel=+elemObjEdit.getAttribute("InitZoom")

    if(isRightMB)
    {

        EditThisCave = elemObjEdit
        DrawCaveEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--


        EditDrawCave = true
        if(addElemCaveLoad==false)
        {
            openIframe("AddElem", "addElemCave", 10)

        }
        else if(addElemCaveViz==false)
        {
            openIframe("AddElem", "addElemCave", 10)

        }

       setTimeout(setEditCave,1000)
    }

}

function setEditCave()
{
   var cw=addElemCaveCw

   cw.containerDiv.style.background="orange"
   cw.drawCaveEditSpan.innerHTML="Edit Cave"
   cw.drawCaveDeleteButton.style.visibility='visible'

   var name=EditThisCave.getAttribute("comment").split("@")[0]
     cw.nameValue.value=name



    var depth=EditThisCave.getAttribute("comment").split("@ ")[1].split(" m")[0]
    cw.depthValue.value=depth
    cw.latValue.value=EditThisCave.getAttribute("lat")
    cw.lngValue.value=EditThisCave.getAttribute("lng")
     cw.emailValue.value=EditThisCave.getAttribute("createdBy")
     DrawCaveEditId=EditThisCave.id
     if(cw.emailValue.value==CookieEmail)
      {
         cw.drawCaveSendButton.disabled=false
      }
      else
      {
         cw.drawCaveSendButton.disabled=true
          cw.drawCaveDeleteButton.style.visibility='hidden'
      }
}

function editThisCave()
{

   var cw=addElemCaveCw
    var depth=+cw.depthValue.value
    var name=cw.nameValue.value
    var lat=+cw.latValue.value
    var lng=+cw.lngValue.value
    var email=cw.emailValue.value
   if(depth>=100)
   {
    if(depth>=2000) caveSymbol="Rv280"
    else if(depth>=1900) caveSymbol="Rv15"
    else if(depth>=1800) caveSymbol="Rv17"
    else if(depth>=1700) caveSymbol="Rv26"
    else if(depth>=1600) caveSymbol="Rv27"
    else if(depth>=1500) caveSymbol="Rv30"
    else if(depth>=1400) caveSymbol="Rv5"
    else if(depth>=1300) caveSymbol="Rv33"
    else if(depth>=1200) caveSymbol="Rv62"
    else if(depth>=1100) caveSymbol="Rv189"
    else if(depth>=1000) caveSymbol="Rv354"
    else if(depth>=900) caveSymbol="Rh355"
    else if(depth>=800) caveSymbol="Rh354"
    else if(depth>=700) caveSymbol="Rh346"
    else if(depth>=600) caveSymbol="Rh339"
    else if(depth>=500) caveSymbol="Rh320"
    else if(depth>=400) caveSymbol="Rh254"
    else if(depth>=300) caveSymbol="Rh242"
    else if(depth>=200) caveSymbol="Rh11"
    else if(depth>=100) caveSymbol="Rh187"

         var xhr = new XMLHttpRequest();
        xhr.open("GET", "Library/RegisteredSymbols.svg", true);
        xhr.onload = function()
        {
            var xmlString = this.responseText
 //---DOMParser---
            var parser = new DOMParser();
            SymbolDoc = parser.parseFromString(xmlString, "text/xml").documentElement;



                var rowCnt = 0

                //----write table---
                var symbols = SymbolDoc.childNodes

                for(var k = 0; k<symbols.length; k++)
                {
                    var symbol = symbols.item(k)
                    if(symbol.nodeName!="#text")
                    {

                        if(symbol.id==caveSymbol)
                        {
                            //var id="cave"+new Date().getTime()
                           var clone=symbol.cloneNode(true)
                           clone.setAttribute("lat",lat)
                           clone.setAttribute("lng",lng)
                           clone.setAttribute("createdBy",email)
                          clone.setAttribute("id",DrawCaveEditId)

                           var comment=name+" @ "+depth+" m"
                           clone.setAttribute("comment",comment)

                            clone.setAttribute("onmouseover","showCaveComment(evt)")
                            clone.setAttribute("onmouseout","hideCaveComment(evt)")

                             clone.setAttribute("onmousedown","editAddCave("+DrawCaveEditId+",evt)" )

                            var latLng= new  L.latLng(lat, lng)
                            var transX=MyMap.latLngToLayerPoint(latLng).x
                            var transY=MyMap.latLngToLayerPoint(latLng).y
                            clone.setAttribute("transform","translate("+transX+" "+transY+")")

                            domCaveG.insertBefore(clone,EditThisCave)
                            domCaveG.removeChild(EditThisCave)
                            editCave(clone)
                            zoomUpdateCaves()
                            setCookie("email",email,720)
                           closeDrawCave()
                         break
                        }

                     }

                }

       }
         xhr.send()



    cw.depthSpan.style.visibility="hidden"
   }
   else
   {
    cw.depthSpan.style.visibility="visible"
   }

}


function editCave(cave)
{



    var svgString = new XMLSerializer().serializeToString(cave)

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "_ASP/updateCave.asp", true);
    xhr.onload = function()
    {
        if (this.status == 200)
        {
           var cw=addElemCaveCw
           cw.drawCaveSendButton.disabled=true
           cw.sendCaveDiv.style.visibility="visible"

        }
        else if (this.status == 500)
        console.log(this.responseText)

    };

    xhr.send(svgString);

}