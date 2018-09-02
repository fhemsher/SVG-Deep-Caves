<%@ Language=javascript %>
<%
	var sendXML =  Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)

	var update=sendXML.documentElement
    var myId=update.getAttribute("id")
    
    var updateCaveSVG = Server.CreateObject("Msxml2.DOMDocument.6.0");
    var svgFile='../LIBRARY/Cave.svg'
    var svgCave=Server.MapPath(svgFile)
    updateCaveSVG.load(svgCave)

    var docSVG=updateCaveSVG.documentElement
    for(var k=0;k<docSVG.childNodes.length;k++)
    {
       var svg=docSVG.childNodes.item(k)
       if(svg.nodeName!="#text")
       {
           var id=svg.getAttribute("id")
           if(id==myId)
           {

              docSVG.insertBefore(update,svg)
               docSVG.removeChild(svg)
             updateCaveSVG.save(svgCave)
              break;

           }
      }

    }


   Response.Write("OK")


%>