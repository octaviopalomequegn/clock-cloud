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
             xmlHttp.open('HEAD', window.location.href.toString(), false);
             xmlHttp.setRequestHeader("Content-Type", "text/html");
             xmlHttp.send('');
             var serverDateTime = xmlHttp.getResponseHeader("Date");
             if (serverDateTime) {
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