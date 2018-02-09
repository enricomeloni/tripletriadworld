var gotDeck = false;

var selectDeck;

var deck;

var onShop = true;

function refreshMoney()
{
    xmlHttp = getRequest();
    xmlHttp.open('GET', 'php/refreshMoney.php', true);
    xmlHttp.send();

    xmlHttp.onreadystatechange = function()
    {
        if(xmlHttp.readyState == 4)
        {
            var p = document.getElementById('statInfo').getElementsByTagName('p')[1].childNodes[0];

            p.nodeValue = 'Denaro: ' + xmlHttp.responseText;
        }
    }
}

function refreshCanPlay()
{
    if (selectDeck.counter != undefined && selectDeck.counter >= 5)
        document.getElementById('confirmPlay').childNodes[7].className = 'hidden';
}

setInterval(refreshMoney, 5000);

setInterval(refreshCanPlay, 2500);

window.onload = function ()
{
    selectDeck = new DeckSelection('human');;
    deck = selectDeck.getDeck();

    document.getElementById('play').onclick = function()
    {
        hideAllExcept('confirmPlay');
    }

    document.getElementById('shop').onclick = function()
    {
        hideAllExcept('shopView');
    }

    document.getElementById('logout').onclick = function()
    {
        window.location = "php/logout.php";
    }
    
    document.getElementById('cards').onclick = function()
    {
        hideAllExcept('cardView');

        //bisogna scaricare le carte, se non lo ha già fatto
        var cardView = document.getElementById('cardView')
        if(!gotDeck)
        {
            gotDeck = true;
            if (cardView.childNodes[2])
                cardView.removeChild(cardView.childNodes[2]);
            var div = document.createElement('div');
            cardView.appendChild(div);
            var currLvl = -1;
            for(var i = 0; i < deck.length; ++i)
            {
                if (currLvl != deck[i].lvl)
                {
                    var p = document.createElement('p');
                    p.appendChild(document.createTextNode('Livello: ' + deck[i].lvl));
                    div.appendChild(p);
                    currLvl = deck[i].lvl;
                }
                var fig= document.createElement('div');
                var card = deck[i].buildElement(true, true);
                var span = document.createElement('span');
                span.appendChild(document.createTextNode(deck[i].name + ': ' + deck[i].quantity));
                fig.className = 'didascaly';
                fig.appendChild(card);
                fig.appendChild(span);

                div.appendChild(fig);
                
            }
        }
    }

    document.getElementById('confirmPlay').childNodes[5].onclick = function()
    {
        if (selectDeck.counter < 5)
        {
            document.getElementById('confirmPlay').childNodes[7].className = "error";
            return false;
        }

        var win = window.open('play.php?auth=ok', 'play');

        win.onunload = function()
        {
            gotDeck = false;
            deck = selectDeck.getDeck();
        }


    }

    document.getElementById('ad').onclick = function()
    {
        var win = window.open('advertise.php', 'adv', 'height=500,width=500,left=400');
    }

    var shopLvl = 1;
    var animID;
    var busy = false;

    function scroll(dir)
    {
        if (busy)
            return;
        busy = true;
        time = 0;
        animID = setInterval(scrollAnimation, 10, dir);
    }
    var shopCard =document.getElementById('shopCard');

    var time;
    function scrollAnimation(dir)
    {
        var reg = /(-?\d+)%/;
        var curLeft = shopCard.style.left;

        if(time != 500)
        {
            var toAdd = 2 * ((dir == 'left') ? (-1) : (+1));
            
            
            if (!curLeft)
                curLeft = "0%";
            curLeft = reg.exec(curLeft)[1] * 1;
            curLeft += toAdd;
            shopCard.style.left = curLeft + "%";

            if (time == 1000)
            {
                clearInterval(animID);
                busy = false;
            }
                
        }
        else if(time == 500)
        {
            shopLvl += ((dir == 'left') ? (-1) : (+1));

            if (shopLvl == 0)
                shopLvl = 10;
            else if (shopLvl == 11)
                shopLvl = 1;

            document.getElementById('lvl').childNodes[0].nodeValue = "LVL " + shopLvl;
            document.getElementById('price').childNodes[0].nodeValue = "Prezzo " + shopLvl*2;
            curLeft = reg.exec(curLeft)[1] * (-1);
            shopCard.style.left = curLeft + "%";
        }

        time += 10;
    }

    document.getElementById('leftScroll').onclick = scroll.bind(undefined, 'left');
    document.getElementById('rightScroll').onclick = scroll.bind(undefined, 'right');

    window.onkeydown = function(e)
    {
        if (!onShop || (e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 13) )
            return;

        if (e.keyCode != 13)
            scroll((e.keyCode == 37) ? 'left' : 'right');
        else
            buyCard();
    }

    function buyCard()
    {
        var xmlHttp = getRequest();
        xmlHttp.open('GET', 'php/buyCard.php?lvl=' + shopLvl, true);
        xmlHttp.send();
        xmlHttp.onreadystatechange = function()
        {
            if(xmlHttp.readyState == 4)
            {

                //far apparire finestra con scritto hai vinto questa carta
                var arr = JSON.parse(xmlHttp.responseText);
                var dispWin = document.getElementById('dispWin');
                dispWin.className = "";
                var p = dispWin.childNodes[1];
                var str = "Hai vinto: " + arr[0];

                if (arr[0] == 'no')
                    str = "Non hai abbastanza denaro";


                if (p.childNodes[0])
                    p.childNodes[0].nodeValue = str;
                else
                    p.appendChild(document.createTextNode(str));


                if (arr[0] != 'no')
                {
                    dispWin.childNodes[3].src = 'img/cards/' + arr[0] + '.png';
                    dispWin.childNodes[3].className = "";
                }
                else
                {
                    dispWin.childNodes[3].className = "hidden";
                }

                dispWin.childNodes[5].onclick = function()
                {
                    dispWin.className = "hidden";
                }

                gotDeck = false;
                deck = selectDeck.getDeck();
                document.getElementById('statInfo').getElementsByTagName('p')[1].childNodes[0].nodeValue = 'Denaro: ' + arr[1];
            }
        }
    }

    document.getElementById('buy').onclick = buyCard;
}

function hideAllExcept(which)
{
    var nodes = document.getElementById('center').getElementsByTagName('section');

    if (which != 'shopView')
        onShop = false;
    else
        onShop = true;

    for(var i = 0; i < nodes.length; ++i)
    {
        nodes[i].className = (nodes[i].id != which)?'hidden':'';
    }
}