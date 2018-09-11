
var ActiveBGimage
function placeDrawBGimage()
{
     bgImageG=document.getElementById("bgImageG")
    if(bgImageG.childNodes.length>0)
         bgImageG.removeChild(bgImageG.childNodes[0])


    var cw = addElemBGImageCw
    coverOn()

    var opacity = cw.drawBGimageOpacitySelect.options[cw.drawBGimageOpacitySelect.selectedIndex].text


    ActiveElem = ActiveElemG.append("g")
    .attr("id", "activeElem")
    .attr("class", "dragTargetObj")
    .attr("pointer-events", null)
   // .attr("transform", "translate("+SVGx+" "+SVGy+")")

    ActiveBGimage = ActiveElem.append("image")
    .attr("id", "activeBGimage")
    .style("cursor", "move")
    .attr("opacity", opacity)
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", BGImageHeight)
    .attr("width", BGImageWidth)
    .attr("href",ImageHREF)


    //---place ImgDragArrow in g---
    activeElem = document.getElementById("activeElem")

       domActiveElemG.appendChild(imgDragArrow)
        //ImgDragArrow.attr("cx", bb.width)




         ImgDragArrow.attr("class", "dragTargetObj")
        ImgDragArrow.attr("transform", "translate("+(SVGx+BGImageWidth)+" "+(SVGy+BGImageHeight)+")")
        ImgDragArrow.style("visibility", "visible")


        //activeElem.setAttribute("transform", "translate("+SVGx+" "+SVGy+")")
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")

    ActiveElem.attr("transform","translate("+SVGx+" "+SVGy+")")





        BGimageCorner =[0, 0]


        mySVG.removeAttribute('onclick')

        mySVG.setAttribute("onmousedown", "startDragBGimage(evt)")
        mySVG.setAttribute("onmousemove", "dragBGimage(evt)")
        mySVG.setAttribute("onmouseup", "endDragBGimage(evt)")

        cw.drawBGimageCancelButton.disabled = false
        cw.drawBGimageFinishButton.disabled = false

}

var ImageHREF
var BGImageWidth
var BGImageHeight
function loadBGImageFile()
{

    var cw = addElemBGImageCw

    var file = cw.document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function ()
        {

            ImageHREF = reader.result
             var image = new Image();
            image.src = reader.result;
            image.onload = function() {

                BGImageWidth=image.naturalWidth
                BGImageHeight=image.naturalHeight
                cw.bgImageWidthValue.value = BGImageWidth
                cw.bgImageHeightValue.value = BGImageHeight
            }


        }
        , false);

    if (file)
    {
        reader.readAsDataURL(file);

    }
}






///---X button and iframe close all---
function closeDrawBGimage()
{
    if(addElemBGImageViz==true)
    {
        RotateAngle = 0
        closeIframe("addElemBGimage");
        var cw = addElemBGImageCw

        if(EditBGimage==true && BGimageDeleted==false)
        {
            var elemObjEdit = document.getElementById(DrawBGimageEditId)
            elemObjEdit.style.visibility = ""

            elemObjEdit.setAttribute("onmousedown", "editBGimageDraw("+DrawBGimageEditId+",evt)")
        }
        DraggingObj = false
        DrawBGimage = false
        EditBGimage = false
        BGimageDeleted = false

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")
        mySVG.removeAttribute('onclick')
        if(document.getElementById("activeElem"))
        {
            mySVG.appendChild(imgDragArrow)
            document.getElementById("activeElem").removeAttribute("class")
            domActiveElemG.removeChild(document.getElementById("activeElem"))
        }

        if(ActiveElem)
            ActiveElem.style("cursor", null)

            ActiveElem = null
            DrawX.style("display", "none")
            DrawX.attr("stroke", "violet")
            DrawX.attr("transform", null)
            ImgDragArrow.style("visibility", "hidden")
            ImgDragArrow.attr("transform", null)
            ImgDragArrow.attr("x", -12.5)
            ImgDragArrow.attr("y", -12.5)
             var cw = addElemBGImageCw


            cw.drawBGimageFinishButton.disabled = true
            cw.drawBGimageCancelButton.disabled = true
            cw.drawBGimageDeleteButton.style.visibility = "hidden"
            cw.drawBGimageEditSpan.innerText = "Background Template Image"
            cw.drawBGimageTopTable.style.backgroundColor = "ghostwhite"
            cw.containerDiv.style.backgroundColor = "ghostwhite"

            coverOff()
            //domWrapper.style.display = "none"

            cw.adjustedRotateBGimageValue.value = 0
            closeIframe("addElemBGImage")
            MyMap.scrollWheelZoom.enable();
                MyMap.dragging.enable()
    }
}

//---on add icon DrawX follows cursor
function trackDrawBGImage()
{

    if(ActiveElem==null&&EditBGimage==false && BGimageDeleted==false)
    {
        DrawX.style("display", "inline")
      DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")

    }
}

var EditBGimage = false
var DrawBGimage = false
var BGimageDeleted = false

var ActiveBGimage

function startBGimageDraw()
{
    RotateAngle = 0
   // elemSizeDiv.innerHTML = "w = <input id=drawBGimageWidthValue type='text' style='width:30px;border=0' /> h = <input id=drawBGimageHeightValue type='text' style='width:30px;border=0' />"

    var cw = addElemBGImageCw
    if(EditBGimage==false)
    {
        activeElem = null

        ActiveElem = null
        DrawBGimage = true
        mySVG.setAttribute('onclick', " placeDrawBGimage()") //---click to add more icons for this session---
        DrawX.style("display", "inline")
    }

    if(cw.adjustedRotateBGimageValue)
        cw.adjustedRotateBGimageValue.value = 0
      cw.bgImgFile.value=""
      cw.bgImageWidthValue.value=""
      cw.bgImageHeightValue.value=""
      MyMap.scrollWheelZoom.disable();
        MyMap.dragging.disable()

}

//--click on svg---


function finishDrawBGimage()
{

    if(EditBGimage==true)
        finishEditBGimage()
        else if(document.getElementById("activeElem"))
        {
            var cw = addElemBGImageCw
            activeElem.removeAttribute("class")

            var finishedElem = document.getElementById("activeBGimage").cloneNode(true)

            DrawBGimageEditId = "bgImage"+new Date().getTime()
            finishedElem.setAttribute("id", DrawBGimageEditId)

            if(activeElem.getAttribute("transform"))
            finishedElem.setAttribute("transform", activeElem.getAttribute("transform"))

            var ctm = finishedElem.getCTM()
            RAD2DEG = 180 / Math.PI;
            var rotateAngle = Math.atan2(ctm.b, ctm.a) * RAD2DEG;
            finishedElem.setAttribute("rotateAngle", rotateAngle)

            finishedElem.setAttribute("class", "addElem")
            finishedElem.setAttribute("InitZoom",  MyMap.getZoom() )
            finishedElem.style.cursor = "default"

         //   finishedElem.setAttribute("onmousedown", "editBGimageDraw("+BGImageID+",evt)")

            DrawX.style("display", "none")
            ImgDragArrow.style("visibility", "hidden")

            cw.drawBGimageFinishButton.disabled = true
            cw.drawBGimageCancelButton.disabled = true
            coverOff()

            mySVG.appendChild(imgDragArrow)
            domActiveElemG.removeChild(document.getElementById("activeElem"))
            ActiveElem = null
            activeElem = null
             setLatLng(finishedElem) //---helperFuncts.js---
            bgImageG.appendChild(finishedElem)
            closeDrawBGimage()
        }

        addElemBGImageCw.editTemplateCheck.checked=false

}

function cancelDrawBGimage()
{
    if(EditBGimage==true)
        cancelEditBGimage()
        else if(document.getElementById("activeElem"))
        {
            mySVG.appendChild(imgDragArrow)
            domActiveElemG.removeChild(document.getElementById("activeElem"))

            activeElem = null

            ActiveElem = null

            mySVG.setAttribute('onclick', "placeDrawBGimage()") //---click to add more icons for this session---
            ImgDragArrow.style("visibility", "hidden")
            ImgDragArrow.attr("transform", null)
            //DrawX.style("visibility","hidden")
            DrawX.attr("transform", null)
            var cw = addElemBGImageCw
            cw.drawBGimageFinishButton.disabled = true
            cw.drawBGimageCancelButton.disabled = true
            cw.adjustedRotateBGimageValue.value = 0
            coverOff()
            cw.bgImgFile.value=""
              cw.bgImageWidthValue.value=""
              cw.bgImageHeightValue.value=""

        }
    addElemBGImageCw.editTemplateCheck.checked=false
}

//====================edit/update rect===============================

var EditBGimage = false
var DrawBGimageEditId
var EditThisBGimage

//---after iframe loaded see sendSize() at addElemBGimage.htm---
var EditBGimageObj
function setEditBGimage()
{
    coverOn()
    mySVG.removeAttribute('onclick')
    var cw = addElemBGImageCw
    var elemObjEdit = document.getElementById(DrawBGimageEditId)

    EditBGimage=true

    ActiveElem = ActiveElemG.append("g")
    .attr("id", "activeElem")
    .attr("transform", elemObjEdit.getAttribute("transform"))
    .attr("class", "dragTargetObj")
    activeElem = document.getElementById("activeElem")
    EditBGimageObj = elemObjEdit.cloneNode(true)
    activeElem.appendChild(EditBGimageObj).setAttribute("id", "activeBGimage")

    ActiveBGimage = d3.select("#activeBGimage")
    .attr("transform", null)
    .attr("class", null)
    .attr("onmouseover", null)
    .attr("onmouseout", null)
    .attr("onmousedown", null)
    .attr("onmouseup", null)
    domActiveElemG.appendChild(imgDragArrow)

    //---is this text rotated?---
    var ctm = elemObjEdit.getCTM()
    RAD2DEG = 180 / Math.PI;
    var rotatedDeg = Math.atan2(ctm.b, ctm.a) * RAD2DEG;

    if(!rotatedDeg) rotatedDeg = 0
        cw.adjustedRotateBGimageValue.value = rotatedDeg

        elemObjEdit.style.visibility = "hidden"



        //  domActiveElemG.appendChild(EditBGimageObj)
        ActiveElem = d3.select("#activeElem")
        activeElem = document.getElementById("activeElem")

        cw.drawBGimageCancelButton.disabled = false
        cw.drawBGimageFinishButton.disabled = false

           cw.drawBGimageDeleteButton.style.visibility="visible"


                var opacity = EditBGimageObj.getAttribute("opacity")




            cw.drawBGimageEditSpan.innerHTML = "Edit Background Template"
            cw.drawBGimageTopTable.style.backgroundColor = "orange"

            cw.containerDiv.style.backgroundColor = "orange"
            DrawX.attr("stroke", "darkorange")
            DrawX.style("display", "inline")
            DrawX.attr("transform", ActiveElem.attr("transform"))

            //--place ImgDragArrow----
            var width = parseFloat(ActiveBGimage.attr("width"))
            var height = parseFloat(ActiveBGimage.attr("height"))
             imgDragArrow.setAttribute("x",width-12.5)
        imgDragArrow.setAttribute("y",height-12.5)
         imgDragArrow.setAttribute("transform",activeElem.getAttribute("transform"))


            setBGimageEditDrag()

}

function setBGimageEditDrag()
{

    activeElem.removeAttribute("onmousedown")
    ImgDragArrow.style("visibility", "visible")

    //---timeout??---
    mySVG.setAttribute("onmousedown", "startDragBGimage(evt)")
    mySVG.setAttribute("onmousemove", "dragBGimage(evt)")
    mySVG.setAttribute("onmouseup", "endDragBGimage(evt)")
    ActiveBGimage.style("cursor", "move")

}
function finishEditBGimage()
{

    if(document.getElementById("activeElem"))
    {
        var cw = addElemBGImageCw
        activeElem.removeAttribute("class")
        var finishedElem = document.getElementById(DrawBGimageEditId)//.cloneNode(true)
        finishedElem.setAttribute("transform", ActiveElem.attr("transform"))
        finishedElem.setAttribute("width", ActiveBGimage.attr("width"))
        finishedElem.setAttribute("height", ActiveBGimage.attr("height"))
        finishedElem.setAttribute("class", "addElem")

     finishedElem.setAttribute("opacity", ActiveBGimage.attr("opacity"))


            finishedElem.setAttribute("rotateAngle", RotateAngle)

            mySVG.appendChild(imgDragArrow)
            domActiveElemG.removeChild(document.getElementById("activeElem"))
            ActiveElem = null
            activeElem = null
            finishedElem.style.cursor = "default"
            finishedElem.style.visibility = ""
            //---is this a timelined elem---
             setLatLng(finishedElem) //---helperFuncts.js---
           // finishedElem.setAttribute("onmousedown", "editBGimageDraw("+DrawBGimageEditId+",evt)")
            finishedElem.setAttribute("id", DrawBGimageEditId)
            UpdateThisBGimage = finishedElem
            //updateBGimage()
            //domAddElemG.insertBefore(finishedElem, EditThisBGimage)
            //domAddElemG.removeChild(EditThisBGimage)

            EditBGimage = false

    }
    closeDrawBGimage()
}

function resetEditBGimage()
{

    var cw = addElemBGImageCw
    EditBGimage = false
    cw.editBGimageSpan.innerText = "Draw BGimages"
    cw.drawBGimageTopTable.style.backgroundColor = "honeydew"
    ActiveElem = null
    activeElem = null
    DrawX.style("display", "none")
    DrawX.attr("stroke", "violet")
    ImgDragArrow.style("visibility", "hidden")

    cw.drawBGimageCopyButton.style.visibility = "hidden"
    cw.drawBGimageDeleteButton.style.visibility = "hidden"
    cw.drawBGimageCancelButton.disabled = false
    cw.drawBGimageFinishButton.disabled = false
    DrawBGimage = true


    //---click to add more circles for this session---

}

function cancelEditBGimage()
{

 closeDrawBGimage()

}


//=======================delete rect==================
var BGimageDeleted = false
//---button---
function removeCurrentDrawBGimage()
{

    var cw = addElemBGImageCw
    mySVG.appendChild(imgDragArrow)
    domActiveElemG.removeChild(activeElem)
    var elemObjEdit = document.getElementById(DrawBGimageEditId)
    bgImageG.removeChild(elemObjEdit)
    BGimageDeleted = true
       cw.editTemplateCheck.checked=false
            cw.editTemplateCheckDiv.style.visibility="hidden"
           EditBGimage = false
            DrawBGimage = false

            DrawBGimageEditId=null
    closeDrawBGimage()

}

