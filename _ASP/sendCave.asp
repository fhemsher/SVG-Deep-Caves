<%@ Language=javascript %>
<%
	var sendXML =  Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)

	var mySVG=sendXML.documentElement
     var parentId=mySVG.getAttribute("parentId")
    var updateCaveSVG = Server.CreateObject("Msxml2.DOMDocument.6.0");
    var svgFile='../LIBRARY/Cave.svg'
    var svgMap=Server.MapPath(svgFile)
    updateCaveSVG.load(svgMap)

    var docSVG=updateCaveSVG.documentElement

    docSVG.appendChild(mySVG)
    updateCaveSVG.save(svgMap)

    //----update plantCnt---------
        var updateCntSVG = Server.CreateObject("Msxml2.DOMDocument.6.0");
    var svgFile='../LIBRARY/RegisteredSymbols.svg'
    var svgMap=Server.MapPath(svgFile)
    updateCntSVG.load(svgMap)

    var docSVG=updateCntSVG.documentElement

    for(var k=0;k<docSVG.childNodes.length;k++)
    {
       var svg=docSVG.childNodes.item(k)
       if(svg.nodeName!="#text")
       {
           var id=svg.getAttribute("id")
           if(id==parentId)
           {
               var plantCnt=+svg.getAttribute("plantCnt")


               svg.setAttribute("plantCnt",plantCnt+1)


                updateCntSVG.save(svgMap)
              break;


           }
        }

    }


%>