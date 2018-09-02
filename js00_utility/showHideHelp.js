function openHelp()
{

    var height = helpDiv.scrollHeight
    d3.select("#helpDiv").transition().duration(800).style("height", height+"px")
    helpDiv.style.visibility = "visible"

    introDiv.style.visibility = "hidden"
    mapHelpLibraryDiv.style.height = "1px"
    mapHelpLibraryDiv.style.visibility = "hidden"

}
function closeHelp()
{
    var height = 1
    d3.select("#helpDiv").transition().duration(800).style("height", height+"px")
    setTimeout('helpDiv.style.visibility="hidden"', 900)

    introDiv.style.visibility = "hidden"
}


function openCaveHelp()
{
    introDiv.style.visibility = "hidden"
    caveHelpDiv.style.top = "60px"

    var height = caveHelpDiv.scrollHeight
    d3.select("#caveHelpDiv").transition().duration(800).style("height", height+"px")
    caveHelpDiv.style.visibility = "visible"


     helpDiv.style.visibility = "hidden"
    helpDiv.style.height = "1px"
    mapHelpLibraryDiv.style.visibility = "hidden"
    mapHelpLibraryDiv.style.height = "1px"

}
function closeCaveHelp()
{
    var height = 1
    d3.select("#caveHelpDiv").transition().duration(800).style("height", height+"px")
    setTimeout('caveHelpDiv.style.visibility="hidden"', 900)
}




function openMapHelp()
{
    introDiv.style.visibility = "hidden"
    mapHelpLibraryDiv.style.top = "60px"

    var height = mapHelpLibraryDiv.scrollHeight
    d3.select("#mapHelpLibraryDiv").transition().duration(800).style("height", height+"px")
    mapHelpLibraryDiv.style.visibility = "visible"

    helpDiv.style.visibility = "hidden"
    helpDiv.style.height = "1px"


}
function closeMapHelp()
{
    var height = 1
    d3.select("#mapHelpLibraryDiv").transition().duration(800).style("height", height+"px")
    setTimeout('mapHelpLibraryDiv.style.visibility="hidden"', 900)
}



function openSaveMapHelp()
{
    introDiv.style.visibility = "hidden"
    saveMapHelpDiv.style.top = "60px"

    var height = saveMapHelpDiv.scrollHeight
    d3.select("#saveMapHelpDiv").transition().duration(800).style("height", height+"px")
    saveMapHelpDiv.style.visibility = "visible"

    helpDiv.style.visibility = "hidden"
    helpDiv.style.height = "1px"
    mapHelpLibraryDiv.style.visibility = "hidden"
    mapHelpLibraryDiv.style.height = "1px"


}
function closeSaveMapHelp()
{
    var height = 1
    d3.select("#saveMapHelpDiv").transition().duration(800).style("height", height+"px")
    setTimeout('saveMapHelpDiv.style.visibility="hidden"', 900)
}





function hideAllHelps()
{
    introDiv.style.visibility = "hidden"
    helpDiv.style.visibility = "hidden"
    helpDiv.style.height = "1px"
    saveMapHelpDiv.style.visibility = "hidden"
    saveMapHelpDiv.style.height = "1px"

    mapHelpLibraryDiv.style.visibility = "hidden"
    mapHelpLibraryDiv.style.height = "1px"
    mapTableCloseButton.style.visibility = "hidden"



}


