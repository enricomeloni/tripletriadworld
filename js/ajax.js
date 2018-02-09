function getRequest() {
    var xmlHttp;

    try { xmlHttp = new XMLHttpRequest(); }
    catch (e) {
        try { xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); }
        //IE (recent versions)
        catch (e) {
            try { xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); }
            //IE (older versions)
            catch (e) {
                window.alert("Your browser does not support AJAX!");
            }
        }
    }
    return xmlHttp;
}

