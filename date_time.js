var refDateTime = new Date();
    refDateTime.setMinutes(refDateTime.getMinutes() + getServerTimeDelta());
    // ...
    var serverTimeDelta;
    function getServerTimeDelta(recalc) {
       var xmlHttp;
       if (recalc || !serverTimeDelta) {
          try {
             if (window.XMLHttpRequest) {
                xmlHttp = new XMLHttpRequest();
             } else {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
             }
          } catch(err1) {
             //IE
             try {
                xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
             } catch(err2) { /* swallow it */ }
          }
          if (xmlHttp) {
             xmlHttp.open('HEAD', 'http://127.0.0.1:8081/', false);
             xmlHttp.setRequestHeader("Content-Type", "text/html");
             xmlHttp.send('');
             var serverDateTime = xmlHttp.getResponseHeader("Date");
             if (serverDateTime) {
				 var refresh=1000; // Refresh rate in milli seconds
				 mytime = setTimeout('display_ct()',refresh)
                 var dateNow = new Date();
                 var serverDate = new Date(serverDateTime);
                 var delta = serverDate.getTime() - dateNow.getTime();
                 // Convert to minutes
                 serverTimeDelta = parseInt((delta / 60000) + ''); 
                 if (!serverTimeDelta) serverTimeDelta = 0.01; 
              } else {
                 serverTimeDelta = 0.011; // avoid auto recalc
              }
          } else {
             serverTimeDelta = 0.012;
          }
       }
       return serverTimeDelta;
    }

/* var xmlHttp;
function srvTime(){
	try {
		//FF, Opera, Safari, Chrome
		xmlHttp = new XMLHttpRequest();
	}
	catch (err1) {
		//IE
		try {
			xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
			document.write("hola<br>");
		}
		catch (err2) {
			try {
				xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
				document.write("hola2<br>");
			}
			catch (eerr3) {
				//AJAX not supported, use CPU time.
				alert("AJAX not supported");
			}
		}
	}
	xmlHttp.open('GET','http://127.0.0.1:8081/',true);
	xmlHttp.setRequestHeader("Content-Type", "text/html");
	document.write("hola5<br>");
	xmlHttp.send('');
	document.write("hola5<br>");
	return xmlHttp.getResponseHeader("Date");
}

var st = srvTime();
var date = new Date(st); */