function showCursor(id)
{
	var cur = document.getElementById(id).getElementsByTagName('img')[0];
	cur.style.display = "inline";
}

function hideCursor(id)
{
	var cur = document.getElementById(id).getElementsByTagName('img')[0];
	cur.style.display = "none";
}

window.onload = function()
{
	//inizializzazione eventi cursore menu principale
	document.getElementById("register").onmouseover = showCursor.bind(undefined,"register");
	document.getElementById("login").onmouseover = showCursor.bind(undefined,"login");
	document.getElementById("register").onmouseout = hideCursor.bind(undefined,"register");
	document.getElementById("login").onmouseout = hideCursor.bind(undefined, "login");
	document.getElementById("documentation").onmouseover = showCursor.bind(undefined, "documentation");
	document.getElementById("documentation").onmouseout = hideCursor.bind(undefined, "documentation");


	var log = document.getElementById('loginText');
	log.onclick = function () {
	    document.getElementById('loginForm').className = "";
	    document.getElementById('regForm').className = "hidden";
	}

	var reg = document.getElementById('regText');
	reg.onclick = function()
	{
	    document.getElementById('loginForm').className = "hidden";
	    document.getElementById('regForm').className = "";
	}

	var regZone = document.getElementById('regForm');

    function regUser(e)
	{
	    if (e.which != 1 && e.which != 13)
	        return;
	    
        //validation
        var user = document.getElementById('regUser');
	    var pass = document.getElementById('regPass');
	    var confPass = document.getElementById('confPass');
	    var email = document.getElementById('email');
	    var confEmail = document.getElementById('confEmail');
	    var errReg = document.getElementById('errorRegistration');

	    var p = errReg.childNodes[1];



	    if(user.validity.valueMissing | pass.validity.valueMissing |
            confPass.validity.valueMissing | email.validity.valueMissing |
            confEmail.validity.valueMissing)
	    {
	        var arr = [user, pass, confPass, email, confEmail];
	        for(var i = 0; i < arr.length; ++i)
	        {
	            if(arr[i].validity.valueMissing)
	            {
	                arr[i].focus();
	                break;
	            }
	        }
	        if (p.childNodes[0])
	            p.removeChild(p.childNodes[0]);
	        p.appendChild(document.createTextNode('Compila tutti i campi'));
	        errReg.className = "";
	        return;
	    }

	    if (user.validity.patternMismatch) {
	        user.className = 'error';
	        if (p.childNodes[0])
	            p.removeChild(p.childNodes[0]);
	        p.appendChild(document.createTextNode('Sono ammessi solo caratteri alfanumerici'));
	        errReg.className = "";
	        return;
	    }

	    if (email.validity.patternMismatch) {
	        email.className = 'error';
	        if (p.childNodes[0])
	            p.removeChild(p.childNodes[0]);
	        p.appendChild(document.createTextNode('Sono ammessi indirizzi del tipo: esempio@dominio.it'));
	        errReg.className = "";
	        return;
	    }

	    if (pass.value != confPass.value) {
	        pass.className = 'error';
	        confPass.className = 'error';
	        if (p.childNodes[0])
	            p.removeChild(p.childNodes[0]);
	        p.appendChild(document.createTextNode('Le password non combaciano'));
	        errReg.className = "";
	        return;
	    }
	    if (email.value != confEmail.value) {
	        //errore email
	        email.className = 'error';
	        confEmail.className = 'error';
	        if (p.childNodes[0])
	            p.removeChild(p.childNodes[0]);
	        p.appendChild(document.createTextNode('Le email non combaciano'));
	        errReg.className = "";
	        return;
	    }

	    


        //server side
	    
	    xmlHttp = getRequest();

	    xmlHttp.open('POST', 'php/registration.php', true);
	    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	    xmlHttp.send('user=' + user.value + '&pass=' + pass.value + '&email=' + email.value);

	    xmlHttp.onreadystatechange = function()
	    {
	        if(xmlHttp.readyState == 4)
	        {
	            if(xmlHttp.responseText == 'OK')
	            {
	                regZone.className = "hidden";
	                document.getElementById('confirmRegistration').className = "";
	                document.getElementById('register').className = "hidden";
	                document.getElementById('errorRegistration').className = 'hidden';
	            }
	            else if(xmlHttp.responseText == 'email')
	            {
	                var p = document.getElementById('errorRegistration').childNodes[1];
	                if (p.childNodes[0])
	                    p.removeChild(p.childNodes[0]);
	                p.appendChild(document.createTextNode('Errore: Email già utilizzata'));
	                email.className = "error";
	                document.getElementById('errorRegistration').className = "";
	            }
	            else
	            {
	                var p = document.getElementById('errorRegistration').childNodes[1];
	                if(p.childNodes[0])
	                    p.removeChild(p.childNodes[0]);
	                p.appendChild(document.createTextNode('Errore: Username già utilizzato'));
	                user.className = "error";
	                document.getElementById('errorRegistration').className = "";
	            }
	        }
	    }


	}
	
    
    regZone.onkeypress = regUser;

    document.getElementById('confirmReg').onclick = regUser;

	var logZone = document.getElementById('loginForm');

	function logUser(e)
	{
	    if (e.which != 1 && e.which != 13)
	        return;
	    
	    var user = document.getElementById('user');
	    var pass = document.getElementById('pass');

	    //validation

	    var arr = [user, pass];
	    var errLog = document.getElementById('errorLogin');
	    var p = errLog.childNodes[1];
	    for (var i = 0; i < arr.length; ++i)
	    {
	        if(arr[i].validity.valueMissing)
	        {
	            arr[i].focus();
	            if (p.childNodes[0])
	                p.removeChild(p.childNodes[0]);
	            p.appendChild(document.createTextNode('Compila tutti i campi'));
	            errLog.className = "";
	            return;
	        }
	    }

	    if (user.validity.patternMismatch)
	    {
	        user.className = 'error';
	        if (p.childNodes[0])
	            p.removeChild(p.childNodes[0]);
	        p.appendChild(document.createTextNode('Sono ammessi solo caratteri alfanumerici'));
	        errLog.className = "";
	        return;
	    }

	    


        //server side
	    xmlHttp = getRequest();
	    xmlHttp.open('POST', "php/login.php", true);
	    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
	    

	    xmlHttp.send('user=' + user.value + '&pass=' + pass.value);


	    xmlHttp.onreadystatechange = function()
	    {
	        if(xmlHttp.readyState == 4)
	        {
	            if(xmlHttp.responseText == 'OK')
	            {
	                window.location = 'home.php';
	            }
	            else
	            {
	                if (p.childNodes[0])
	                    p.removeChild(p.childNodes[0]);
	                p.appendChild(document.createTextNode('User o password errati'));
	                document.getElementById('errorLogin').className = "";
	            }
	        }
	    }

	}
    
	logZone.onkeypress = logUser;
	document.getElementById('confirmLogin').onclick = logUser;


	function clear()
	{
	    this.className = "";
	}

	var regInputs = document.getElementById('regForm').getElementsByTagName('input');

	for(var i = 0; i < regInputs.length; ++i)
	{
	    regInputs[i].onfocus = clear.bind(regInputs[i]);
	}

}

