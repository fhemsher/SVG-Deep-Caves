
function clearCaveNext()
{
    caveFindNextButton.disabled=false
    CaveX.style("display","none")
    findNextSpan.innerHTML="Find"
    caveFindNextButton.setAttribute("onClick","findCave()")
}



var FoundCaveArray=[]
function findCave()
{

    var findString=searchCaveValue.value
    if(findString!="")
    {
        FoundCaveArray=[]
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

                    var comment=cave.getAttribute("comment")
                    if(comment.indexOf(findString)!=-1)
                    {
                        var lat=+cave.getAttribute("lat")
                        var lng=+cave.getAttribute("lng")
                        FoundCaveArray.push([lat,lng])
                    }
                }
            }
            CaveFindIndex=0
            if(FoundCaveArray.length==1)
            {
                caveFindNextButton.disabled=true
                var caveLatLng=FoundCaveArray[0]
                CaveX.style("display","block")

                MyMap.setView(caveLatLng)

                LatCave=caveLatLng[0]
                LngCave=caveLatLng[1]

                caveX.setAttribute("lat",LatCave)
                caveX.setAttribute("lng",LngCave)

                caveX.setAttribute("transform","")
                var transformRequestObj=mySVG.createSVGTransform()

                var animTransformList=caveX.transform

                var transformList=animTransformList.baseVal

                var latLng= new  L.latLng(LatCave, LngCave)
                var transX=MyMap.latLngToLayerPoint(latLng).x
                var transY=MyMap.latLngToLayerPoint(latLng).y

                transformRequestObj.setTranslate(transX,transY)
                transformList.appendItem(transformRequestObj)
                transformList.consolidate()

            }
            if(FoundCaveArray.length>1)
            {
                goToCave()
                caveFindNextButton.setAttribute("onClick","goToCave()")
                findNextSpan.innerHTML="Find Next("+FoundCaveArray.length+")"
            }

            if(FoundCaveArray.length==0)
                findNextSpan.innerHTML="Find(0)"
        }
        xhr.send()
    }
}
var CaveFindIndex
var LatCave
var LngCave
function goToCave()
{
    if(CaveFindIndex<FoundCaveArray.length)
    {
        var caveLatLng=FoundCaveArray[CaveFindIndex++]
        CaveX.style("display","block")

        MyMap.setView(caveLatLng)

        LatCave=FoundCaveArray[CaveFindIndex-1][0]
        LngCave=FoundCaveArray[CaveFindIndex-1][1]

        caveX.setAttribute("lat",FoundCaveArray[CaveFindIndex-1][0])
        caveX.setAttribute("lng",FoundCaveArray[CaveFindIndex-1][1])


        caveX.setAttribute("transform","")
        var transformRequestObj=mySVG.createSVGTransform()

        var animTransformList=caveX.transform

        var transformList=animTransformList.baseVal

        var latLng= new  L.latLng(LatCave, LngCave)
        var transX=MyMap.latLngToLayerPoint(latLng).x
        var transY=MyMap.latLngToLayerPoint(latLng).y

        transformRequestObj.setTranslate(transX,transY)
        transformList.appendItem(transformRequestObj)
        transformList.consolidate()
        findNextSpan.innerHTML="Find Next("+(FoundCaveArray.length-CaveFindIndex) +")"
    }
    if(CaveFindIndex==FoundCaveArray.length)
        caveFindNextButton.disabled=true
}