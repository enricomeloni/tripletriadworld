var playground;
var leftDeck;
var rightDeck;

window.onload = function () {
    var play = document.getElementById('playground');

    var barState = false;

    var deckSelect1 = new DeckSelection('human');
    leftDeck = deckSelect1.getDeck();
    var deckSelect2 = new DeckSelection('ai');
    rightDeck = deckSelect2.getDeck();

    //funzione per aprire la barra laterale
    document.getElementById('barButton').onclick = (function () {
        var bar = document.getElementById('rightBar');
        if (!barState) {
            bar.classList.remove('fold');
            bar.classList.add('unfold'); //animazione css
            barState = true;
        }
        else {
            bar.classList.remove('unfold');
            bar.classList.add('fold'); //animazione css
            bar.style.width = '0%';
            barState = false;
        }
    })

    //preparazione delle regole
    var ruleSelect = document.getElementById('ruleSelection');

    var checkboxes = document.getElementById('checkboxes').getElementsByTagName('input');
    checkboxes[1].onclick = function()
    {
        if (!checkboxes[1].checked && checkboxes[2].checked)
            checkboxes[2].checked = false;
    }

    checkboxes[2].onclick = function()
    {
        if (!checkboxes[1].checked && checkboxes[2].checked)
            checkboxes[1].checked = true;
    }

    document.getElementById('startGame').onclick = function()
    {
        var rules = 0;
        var radios = document.getElementById('radios').getElementsByTagName('input');

        for (var i = 0; i < checkboxes.length; ++i)
        {
            if(checkboxes[i].checked)
                rules |= checkboxes[i].value;
        }
            

        for (var i = 0; i < radios.length; ++i)
        {
            if(radios[i].checked)
                rules |= radios[i].value;
        }

        ruleSelect.style.display = 'none';
        playground = new Playground(rules);

        if (playground.rules & RULE_RANDOM)
            gameStarted = true;

        if (playground.turn == 2 && (playground.rules & RULE_RANDOM))
            startAI();
    }

    var right = document.getElementById('rightBar');

    var listElem = right.childNodes[3].childNodes[3];

    var playState = false;
    listElem.childNodes[5].style.display = 'none';
    listElem.childNodes[3].onclick = changePlayState;
    listElem.childNodes[5].onclick = changePlayState;

    function changePlayState()
    {
        if(playState)
        {
            playState = false;
            listElem.childNodes[1].pause();
            listElem.childNodes[3].style.display = 'inline';
            listElem.childNodes[5].style.display = 'none';
            right.childNodes[3].childNodes[1].firstChild.nodeValue = 'Musica - OFF';

        }
        else
        {
            playState = true;
            listElem.childNodes[1].play();
            listElem.childNodes[3].style.display = 'none';
            listElem.childNodes[5].style.display = 'inline';
            right.childNodes[3].childNodes[1].firstChild.nodeValue = 'Musica - ON';
        }
    }
   

    right.childNodes[3].childNodes[5].onclick = function()
    {
        if(!gameStarted || confirm('Sei sicuro di voler uscire?'))
        {
            window.close();
        }
        
    }
}


function startAI() {
    var timeStart;
    timeStart = setTimeout(function () {
        playground.rightPlayer.aiPlay();
        clearTimeout(timeStart);
    }, 1000);
}