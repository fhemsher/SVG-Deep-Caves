<%@ Language=javascript %>
<%
	var sendXML =  Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)

	var remove=sendXML.documentElement
    var myId=remove.getAttribute("myId")
    var parentId=remove.getAttribute("parentId")

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
             docSVG.removeChild(svg)

                updateCaveSVG.save(svgCave)
              break;


           }
       }

    }


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
                svg.setAttribute("plantCnt",plantCnt-1)
                updateCntSVG.save(svgMap)
                break;
            }
        }
    }

   Response.Write("OK")              


%>