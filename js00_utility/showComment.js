
function showCaveComment(evt)
{
			var target=evt.target.parentNode

	  var comment=target.getAttribute("comment")
	  if(comment)
	  {
         var lat=+target.getAttribute("lat")
         var lng=+target.getAttribute("lng")
         var gps="<br>GPS: "+lat.toFixed(6)+", "+lng.toFixed(6)
         var email=target.getAttribute("createdBy")
        var utcMS=+target.getAttribute("id").split("cave")[1].slice(0,13);  //

        var time=new Date(utcMS).toUTCString()
        var updated=""
          if(target.getAttribute("update"))
             updated="<br>Updated: "+target.getAttribute("update")
	     commentDiv.innerHTML=xml2txt(comment)+gps+"<br>Contributed by: "+email+ "<br>" +time+updated

	     commentDiv.style.left=evt.clientX+10+"px"
	     commentDiv.style.top=evt.clientY+30+"px"

	     commentDiv.style.visibility="visible"

	  }
}

function hideCaveComment(evt)
{
   		commentDiv.style.visibility="hidden"

}