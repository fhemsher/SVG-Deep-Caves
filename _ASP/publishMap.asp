<%@ Language=javascript %>
<%
	var sendXML =  Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)

	var mySVG=sendXML.documentElement
    var id=mySVG.getAttribute("id")
    var publishMapSVG = Server.CreateObject("Msxml2.DOMDocument.6.0");
    var svgFile='../LIBRARY/Publish.svg'
    var svgMap=Server.MapPath(svgFile)
    publishMapSVG.load(svgMap)

    var docSVG=publishMapSVG.documentElement
    var publish=true
    for(var k=0;k<docSVG.childNodes.length;k++)
    {
         var elemG=docSVG.childNodes.item(k)
         var elemId=elemG.getAttribute("id")
          if(elemId==id)
          {
            publish=false
            break
          }
    }
    if(publish==true)
    {
        docSVG.appendChild(mySVG)
        publishMapSVG.save(svgMap)
    }
   Response.Write("OK")

%>