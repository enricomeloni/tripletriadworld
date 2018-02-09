
var RULE_PLUS = 1;          //0000_0000_0001
var RULE_SAME = 2;          //0000_0000_0010
var RULE_SAMEWALL = 4;      //0000_0000_0100
var RULE_ELEMENTAL = 8;     //0000_0000_1000
var RULE_OPEN = 16;         //0000_0001_0000
var RULE_ONE = 32;          //0000_0010_0000
var RULE_ALL = 64;          //0000_0100_0000
var RULE_DIRECT = 128;      //0000_1000_0000
var RULE_DIFFERENCE = 256;  //0001_0000_0000
var RULE_RANDOM = 1024;     //0100_0000_0000

var elements = ['fire', 'poison', 'ice', 'light', 'earth', 'water', 'thunder', 'wind'];

var gameStarted = false;

function Playground(rules)
{
    this.rules = rules;
    this.mat = [new Array(3), new Array(3), new Array(3)];
    this.elemMat = [new Array(3), new Array(3), new Array(3)];
    this.leftPlayer = new Player('left', 'human', leftDeck,rules&RULE_RANDOM);
    this.rightPlayer = new Player('right', 'ai', rightDeck);

    this.buildPlayground();

    this.turn = (Math.random() <= 0.50) ? 1 : 2;
    document.getElementById('turnPointer').className = 'begin' + ((this.turn == 1) ? 'Left' : 'Right');

    this.animate = new Animation();

    this.playedCards = 0;

    this.winner = null;

}

Playground.prototype.buildPlayground = function()
{
    var htmlPG = document.getElementById('playground');
    for (var i = 0; i < 9; ++i) {
        var div = document.createElement('div');
        div.id = 'card' + (Math.floor(i / 3) ) + '_' + (i % 3);
        div.className = 'matrixPosition';
        htmlPG.appendChild(div);

        var elemPresent = Math.random() * 100;

        //icona elementale
        if(this.rules & RULE_ELEMENTAL && elemPresent < 33)
        {
            var rand = Math.random() * (elements.length - 1);
            rand = Math.floor(rand);
            var elem = elements[rand];
            var icon = new Image();
            icon.alt = elem;
            icon.src = 'img/text/' + elem + '.png';
            icon.className = "matElem";
            this.elemMat[(Math.floor(i / 3) )][(i % 3)] = elem;
            div.appendChild(icon);
        }
    }


    
    var posArray = htmlPG.getElementsByClassName('matrixPosition');
    
    for (var i = 0; i < posArray.length; ++i)
    {
        

        var reg = /card(\d)_(\d)/;
        var pos = reg.exec(posArray[i].id);
        
        //definizione funzione onClick
        posArray[i].onclick = (function (y, x) {
            if (this.busy || this.turn == 2)
                return;
            var selected = this.leftPlayer.hand.selected;
            if (selected == null)
                return;

            var htmlHand = document.getElementById('leftHand');
            var wrapper = htmlHand.getElementsByClassName('inHand')[selected];
            this.leftPlayer.hand.selected = null;
            this.playCard(this.leftPlayer.hand.cards[selected], wrapper, y, x);

        }).bind(this,pos[1],pos[2]);
    }

    var pts = document.getElementsByClassName('points');

    pts[0].src = pts[1].src = 'img/text/p5.png';

    

    if (this.rules & RULE_RANDOM)
        this.leftPlayer.hand.buildElement(true);

    this.rightPlayer.hand.buildElement(this.rules&RULE_OPEN);
}

Playground.prototype.playCard = function(card,wrapper, x, y)
{
    document.getElementById('card' + x + '_' + y).onclick = null;
    wrapper.onclick = null;
    this.busy = true; //impedisce che il giocatore possa giocare una carta durante un animazione o durante il turno dell'ai
    var side;
    //converte il proprietario in un lato del campo
    side = (card.owner == 'blue') ? 'left' : 'right';
        
    var player = this[side + 'Player'];
    this.mat[x][y] = card;
    player.hand.removeCard(card);

    var htmlHand = document.getElementById(side + 'Hand');
    
    //aggiunta stili css per una carta giocata
    wrapper.classList.remove('inHand');
    wrapper.classList.remove('selected');
    wrapper.classList.add('positioned');
    
    htmlHand.removeChild(wrapper);

    if (card.back) //se la carta è giocata dall'AI e la regola open non è attiva, bisogna rimettere l'immagine frontale
    {
        wrapper.getElementsByClassName('numberWrap')[0].style.display = 'block';
        wrapper.getElementsByClassName('picture')[0].src = 'img/cards/' + card.src + '.png';
        wrapper.getElementsByClassName('elementModifier')[0].style.display = 'initial';
        wrapper.getElementsByClassName('elementIcon')[0].style.display = 'initial';
    }
    
    document.getElementById('card' + x + '_' + y).appendChild(wrapper);
    if (this.rules & RULE_ELEMENTAL)
    {
        var elem = wrapper.getElementsByClassName('elementModifier');

        if (this.elemMat[x][y] && card.element && card.element == this.elemMat[x][y])
            elem[0].src = 'img/text/plus1.png';
        else if (this.elemMat[x][y])
            elem[0].src = 'img/text/minus1.png';
    }

    this.applyRules(x, y); //si applicano gli scambi di carte
}

Playground.prototype.applyRules = function(x, y,combo)
{
    /*  regola base: se un lato adiacente ha un valore maggiore
        della carta avversaria, essa viene conquistata */
    
    //l'array dir contiene le coppie di lati da confrontare
    var dir = [ ['top', 'bot'], ['right', 'left'], ['bot', 'top'], ['left', 'right'] ];
    //l'array shift contiene i valori da sommare alla posizione della carta
    //per ottenere la posizione della carta da confrontare
    var shift = [ [-1, 0], [0, +1], [+1, 0], [0, -1]];
    
    var card = this.mat[x][y];
    var cmp;

    var nx, ny;

    var toChange = [];
    var toCombo = [];

    for(var i = 0; i < dir.length; ++i)
    {
        nx = 1 * x + shift[i][0];
        ny = 1 * y + shift[i][1];

        cmp = this.returnCard(nx, ny);
        
        if (!cmp || cmp == 'wall' || card.owner == cmp.owner)
            continue; //si ignora la carta se il proprietario è lo stesso

        var op1 = 1 * card[dir[i][0]];
        var op2 = 1 * cmp[dir[i][1]];

        //controllo sull'elemento

        if (this.rules & RULE_ELEMENTAL)
        {
            //controllo sulla carta giocata
            if (this.elemMat[x][y] && card.element && card.element == this.elemMat[x][y])
                ++op1;
            else if (this.elemMat[x][y])
                --op1;

            if (this.elemMat[nx][ny] && cmp.element && cmp.element == this.elemMat[nx][ny])
                ++op2;
            else if (this.elemMat[nx][ny])
                --op2;
        }

        if (op1 > op2)
            toChange.push([nx, ny]);
    }

    //fine regola base 


    var ndir = cartesian(dir, dir);
    var nshift = cartesian(shift, shift);

    

    var card1, card2;
    var cdir, cshift;
    var nx1, ny1, nx2, ny2;

    for (var i = 0; i < ndir.length; ++i)
    {
        cdir = ndir[i];
        cshift = nshift[i];

        nx1 = 1 * x + cshift[0][0];
        ny1 = 1 * y + cshift[0][1];

        nx2 = 1 * x + cshift[1][0];
        ny2 = 1 * y + cshift[1][1];

        card1 = this.returnCard(nx1, ny1);
        card2 = this.returnCard(nx2, ny2);

        if(!card1 || !card2 || (card1.owner == card.owner && card2.owner == card.owner) )
            continue;

        /* regola same: se la carta viene piazzata vicino a due carte, di cui almeno
       una dell'avversario, che hanno i valori adiacenti 
       uguali a quelli della carta, si catturano tutt'e due le carte */

        if (this.rules & RULE_SAME &&
            ((this.rules & RULE_SAMEWALL && xor(card1 == 'wall', card2 == 'wall')) ||
                !(card1 == 'wall' || card2 == 'wall')) &&
                card[cdir[0][0]] * 1 == ((card1 == 'wall') ? 10 : (card1[cdir[0][1]] * 1)) &&
                card[cdir[1][0]] * 1 == ((card2 == 'wall') ? 10 : (card2[cdir[1][1]] * 1))) {
            if (card1 != 'wall')
                toCombo.specialPush([nx1, ny1, 'same']);
            if (card2 != 'wall')
                toCombo.specialPush([nx2, ny2, 'same']);
        }
        //regola same

        /*  regola plus: se la carta viene piazzata vicino a due carte, di cui
        almeno una dell'avversario, se la somma dei lati adiacenti è uguale
        si catturano tutt'e due le carte */

        if(this.rules&RULE_PLUS && !(card1 == 'wall' || card2 == 'wall') &&
            card[cdir[0][0]]*1 + card1[cdir[0][1]]*1 == card[cdir[1][0]]*1 + card2[cdir[1][1]]*1)
        {
                toCombo.specialPush([nx1, ny1,'plus']);
                toCombo.specialPush([nx2, ny2,'plus']);
        }

        //fine regola plus

        
    }

    this.applyCombo(toCombo,card);      //gestione carte che fanno combo
    this.applyChange(toChange, card);   //gestione carte che non fanno combo
    if (!combo)                         //se la carta è stata giocata in una combo, l'animazione è già avviata
        this.animate.start();

}

Playground.prototype.applyCombo = function(toCombo,card)
{
    for (var i = 0; i < toCombo.length; ++i) {
        if (this.returnCard(toCombo[i][0], toCombo[i][1]).owner != card.owner)
        {
            var elem = { x: toCombo[i][0], y: toCombo[i][1], val:0, toAdd:12, finish:360,combo:toCombo[i][2]}
            this.animate.addElement(elem); //inserisce la carta nella coda di animazione
        }
    }
}


Playground.prototype.applyChange = function(toChange, card)
{
    for (var i = 0; i < toChange.length; ++i) {
        if (this.returnCard(toChange[i][0], toChange[i][1]).owner != card.owner) {
            var elem = { x: toChange[i][0], y: toChange[i][1], val: 0, toAdd: 12, finish: 360,combo:false}
            this.animate.addElement(elem); //inserisce la carta nella coda di animazione
        }
    }
}

Playground.prototype.finishRules = function (combo) {
    if (!combo) {
        this.playedCards++;
        this.turn = (this.turn == 1) ? 2 : 1;
        document.getElementById('turnPointer').className = 'go' + ((this.turn == 1) ? 'Left' : 'Right');
        this.busy = false;
        if (this.playedCards != 9 &&  this.turn == 2) //passa il turno all'AI
            setTimeout(this.rightPlayer.aiPlay.bind(this.rightPlayer),1000);
        else if(this.playedCards == 9) //se sono state giocate 9 carte la partita è finita
        {
            this.finishGame();
        }
    }
}


Playground.prototype.finishGame = function()
{
    var winner;
    if (this.leftPlayer.points == this.rightPlayer.points)
    {
        winner = 'draw';
        this.winner = 'draw';
    }
        
    else if (this.leftPlayer.points > this.rightPlayer.points)
    {
        winner = 'win';
        this.winner = 'left';
    }
    else
    {
        winner = 'lose';
        this.winner = 'right';
    }

    xmlHttp = getRequest();
    xmlHttp.open('GET', 'php/registerMatch.php?win=' + winner);
    xmlHttp.send();

    //broadcast al giocatore della vittoria/sconfitta
    document.getElementById('broad-pic').src = 'img/text/text-' + winner + '.png';
    document.getElementById('broadcast').style.display = 'block';

    var leftCards = []; //carte originariamente appartenenti al giocatore di sinistra
    var rightCards = [];//come sopra, per il giocatore di destra

    var giveToLeft = [];//carte che a fine partita verranno assegnate al giocatore di sinistra
    var giveToRight = [];//come sopra, per il giocatore di destra

    var howMany;

    for (var i = 0; i < 3; ++i)
    {
        for(var j = 0; j < 3; ++j)
        {
            if (this.mat[i][j].originalOwner == 'blue')
                leftCards.push(this.mat[i][j]);
            else
                rightCards.push(this.mat[i][j]);

            if(this.rules & RULE_DIRECT) //se vale la regola Direct, tutte le carte conquistate in partita vengono vinte.
            {
                function specialPush(array,card)
                {
                    for(var i = 0; i < array.length; ++i)
                    {
                        if (array[i] == card)
                            return;
                    }
                    array.push(card);
                }

                if(this.mat[i][j].owner == 'blue')
                    specialPush(giveToLeft, this.mat[i][j]);
                else
                    specialPush(giveToRight, this.mat[i][j]);
            }
        }      
    }


    if (this.leftPlayer.hand.cards[0])
        leftCards.push(this.leftPlayer.hand.cards[0]);
    if (this.rightPlayer.hand.cards[0])
        rightCards.push(this.rightPlayer.hand.cards[0]);



    if (this.rules & RULE_ALL) //se vale la regola ALL tutte le carte dello sconfitto vanno al vincente
    {
        if (this.winner == 'left')
            giveToLeft = rightCards;
        else if (this.winner == 'right')
            giveToRight = leftCards;
    }

    if (this.rules & RULE_ONE)
        howMany = 1;
    else if (this.rules & RULE_DIFFERENCE)
    {
        howMany = Math.abs(this.leftPlayer.points - this.rightPlayer.points);

        if (howMany > 5)
            howMany = 5;
    }


    if (this.winner == 'left' && howMany)
    {
        var cs = document.getElementById('cardSelector');
        cs.style.display = 'block';
        var p = document.createElement('p');
        p.appendChild(document.createTextNode('Seleziona ' + howMany + ' cart' + ( (howMany > 1) ? 'e' : 'a') ));
        cs.appendChild(p);

        for(var i = 0; i < rightCards.length; ++i)
        {
            var img = new Image();
            img.src = 'img/cards/' + rightCards[i].src + '.png';
            img.id = 'pic' + i;
            cs.appendChild(img);
            var selected = 0;
            var clickfunction = (function (i) {
                var flag = this.classList.contains('choose');
                if (flag) {
                    this.classList.remove('choose');
                    giveToLeft[i] = null;
                    selected--
                }
                else {
                    if (selected == howMany)
                        return;
                    selected++;
                    giveToLeft[i] = rightCards[i];
                    this.classList.add('choose');
                }


            });

            img.onclick = clickfunction.bind(img,i);
        }

        var but = document.createElement('button');
        but.appendChild(document.createTextNode('Conferma!'));
        cs.appendChild(but);

        but.onclick = (function()
        {
            cs.style.display = 'none';

            var gr = document.getElementById('gameRecap');
            gr.style.display = 'block';
            var cardWraps = cs.getElementsByClassName('choose');
            
            var p = document.createElement('p');
            p.appendChild(document.createTextNode('Hai vinto:'));
           
            gr.appendChild(p);

            var i = 0;
            while(cardWraps[0])
            {
                if (!giveToLeft[i++])
                    continue;
                var move = cs.removeChild(cardWraps[0])
                gr.appendChild(move);
                sendCards(giveToLeft,'left')
            }

            var but2 = document.createElement('button');
            but2.appendChild(document.createTextNode('Gioca Ancora'));
            but2.onclick = function()
            {
                window.location = window.location;
            }
            gr.appendChild(but2);
        })
    }
    else if(this.winner == "right" && howMany)
    {
        var rands = new Array();
        function specialPush(array,val)
        {
            for(var i = 0; i < array.length; ++i)
            {
                if (array[i] == val)
                    return;
            }
            array.push(val);
        }

        while(rands.length != howMany)
        {
            var val = Math.floor(Math.random() * 4);
            specialPush(rands, val);
        }

        for(var i = 0; i < rands.length; ++i)
        {
            giveToRight.push(leftCards[rands[i]]);
        }

        var gr = document.getElementById('gameRecap');
        gr.style.display = 'block';
        var h = document.createElement('h1');
        h.appendChild(document.createTextNode('Hai perso:'));
        gr.appendChild(h);

        for (var i = 0; i < giveToRight.length; ++i) {
            var img = new Image();
            img.src = 'img/cards/' + giveToRight[i].src + '.png';
            img.alt = 'Carta: ' + giveToRight[i].name;
            gr.appendChild(img);
        }

        var but2 = document.createElement('button');
        but2.appendChild(document.createTextNode('Gioca Ancora'));
        but2.onclick = function () {
            window.location = window.location;
        }
        gr.appendChild(but2);
        sendCards(giveToRight, 'right');
    }
    else if(this.rules & RULE_DIRECT) //non conta chi abbia vinto
    {
        var gr = document.getElementById('gameRecap');
        gr.style.display = 'block';
        var h2 = document.createElement('h2');
        h2.appendChild(document.createTextNode('Hai vinto:'));
        gr.appendChild(h2);

        for(var i = 0; i < giveToLeft.length; ++i)
        {
            var img = new Image();
            img.src = 'img/cards/' + giveToLeft[i].src + '.png';
            img.alt = 'Carta: ' + giveToLeft[i].name;
            gr.appendChild(img);
        }

        h2 = document.createElement('h2');
        h2.appendChild(document.createTextNode('Hai perso: '));
        gr.appendChild(h2);

        for(var i = 0; i < giveToRight.length; ++i)
        {
            var img = new Image();
            img.src = 'img/cards/' + giveToRight[i].src + '.png';
            img.alt = 'Carta: ' + giveToRight[i].name;
            gr.appendChild(img);
        }
        var but2 = document.createElement('button');
        but2.appendChild(document.createTextNode('Gioca Ancora'));
        but2.onclick = function () {
            window.location = window.location;
        }
        sendCards(giveToLeft, 'left');
        sendCards(giveToRight, 'right');
    }
    else if(this.winner == 'left' && this.rules & RULE_ALL)
    {
        var gr = document.getElementById('gameRecap');
        gr.style.display = 'block';
        var h = document.createElement('h1');
        h.appendChild(document.createTextNode('Hai vinto:'));
        gr.appendChild(h);

        for (var i = 0; i < giveToLeft.length; ++i)
        {
            var img = new Image();
            img.src = 'img/cards/' + giveToLeft[i].src + '.png';
            img.alt = 'Carta: ' + giveToLeft[i].name;
            gr.appendChild(img);
        }

        var but2 = document.createElement('button');
        but2.appendChild(document.createTextNode('Gioca Ancora'));
        but2.onclick = function () {
            window.location = window.location;
        }
        gr.appendChild(but2);
        sendCards(giveToLeft, 'left');
    }
    else if(this.winner == "right" && this.rules & RULE_ALL)
    {
        var gr = document.getElementById('gameRecap');
        gr.style.display = 'block';
        var h = document.createElement('h1');
        h.appendChild(document.createTextNode('Hai perso:'));
        gr.appendChild(h);

        for (var i = 0; i < giveToRight.length; ++i) {
            var img = new Image();
            img.src = 'img/cards/' + giveToRight[i].src + '.png';
            img.alt = 'Carta: ' + giveToRight[i].name;
            gr.appendChild(img);
        }

        var but2 = document.createElement('button');
        but2.appendChild(document.createTextNode('Gioca Ancora'));
        but2.onclick = function () {
            window.location = window.location;
        }
        gr.appendChild(but2);
        sendCards(giveToRight, 'right');
    }
    else if(this.winner == "draw")
    {
        var gr = document.getElementById('gameRecap');
        gr.style.display = 'block';
        var h = document.createElement('h1');
        h.appendChild(document.createTextNode('Pareggio: non hai vinto niente'));
        gr.appendChild(h);
        var but2 = document.createElement('button');
        but2.appendChild(document.createTextNode('Gioca Ancora'));
        but2.onclick = function () {
            window.location = window.location;
        }
        gr.appendChild(but2);
    }
    


    setTimeout(function () {
        document.getElementById('broadcast').style.display = 'none';
        var gF = document.getElementById('gameFinish');
        gF.classList.remove('disappear');
        gF.style.display = 'block';
        gF.classList.add('appear');
    }, 2000);

}


Playground.prototype.changeCardOwner = function(x, y,stop)
{
    var oldowner = this.mat[x][y].owner;
    this.mat[x][y].changeOwner();

    var wrap = document.getElementById('card' + x + '_' + y).getElementsByClassName('wrapper')[0];
    wrap.style.backgroundImage = 'url(img/grad-' + this.mat[x][y].owner + '.png)';

    var side = (oldowner == 'blue') ? 'left' : 'right';

    this[side + 'Player'].points--;
    this[((side == 'left') ? 'right' : 'left') + 'Player'].points++;

    var pts = document.getElementsByClassName('points');

    pts[0].src = 'img/text/p' + this.leftPlayer.points + '.png';
    pts[1].src = 'img/text/p' + this.rightPlayer.points + '.png';
}





//restituisce undefined se la carta non esiste, o 'wall' se la posizione indicata è un muro
Playground.prototype.returnCard = function(nx,ny)
{
    if(nx < 0 || ny < 0 || nx > 2 || ny > 2)
    {
        if(nx < 0 && ny < 0)
            return null; //nx = -1, ny  = -1, posizione non valida;
        if(nx < 0 && ny > 2)
            return null; //nx = -1, ny = 3, posizione non valida;
        if(nx > 2 && ny < 0)
            return null; //nx = 3, ny = -1, posizione non valida;
        if(nx > 2 && ny > 2)
            return null; //nx = 3, ny = 3, posizione non valida;

        return 'wall'; //tutti gli altri casi sono dei muri;
        
             
    }

    return this.mat[nx][ny];
}


function cartesian(x, y) //esegue un prodotto cartesiano modificato per i fini delle regole 
{
    var ret = [];
    var cnt = 0;
    for(var i = 0; i < x.length; ++i)
        for(var j = i+1; j < y.length; ++j)
        {
            ret[cnt] = [x[i], y[j]];
            ++cnt;
        }
    return ret;
}

//pusha l'oggetto solo se non è già presente
Array.prototype.specialPush = function(obj)
{
    for(var i = 0; i < this.length; ++i)
    {
        if(this[i].compare(obj))
            return;
    }
    this.push(obj);

}



Array.prototype.compare = function(other) //i due array devono avere la stessa dimensione
{
    for(var i = 0; i < this.length; ++i)
    {
        if(this[i] != other[i])
            return false;
    }
    return true;
}

function xor(a,b)
{
    return (a && !b) || (!a && b);
}

function sendCards(cardArray,player)
{
    cardArray.clean(undefined);
    cardArray.clean(null);
    for(var i = 0; i < cardArray.length; ++i)
    {
        var exch = new Exchange();
        exch.exchangeCard(cardArray[i].name, player);
    }
}


