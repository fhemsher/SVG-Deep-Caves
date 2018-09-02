
//---provide window events for printing---
function printWindowEvent()
{

    var beforePrint = function()
    {
        printHideDiv.style.display = "none"
        selectDrawElemDiv.style.visibility = "hidden"
        gpsDiv.style.display = "none"
        gpsGotoDiv.style.display = "none"


    };

    var afterPrint = function()
    {

        printHideDiv.style.display = "block"
         selectDrawElemDiv.style.visibility = "visible"
        gpsDiv.style.display = "block"
        gpsGotoDiv.style.display = "block"


    };

    if (window.matchMedia)
    {
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function(mql)
            {
                if (mql.matches)
                {
                    beforePrint();
                }
                else
                {
                    afterPrint();
                }
            }
        );
    }

    window.onbeforeprint = beforePrint
    window.onafterprint = afterPrint;

}

 //---initialize window print events---
printWindowEvent()
