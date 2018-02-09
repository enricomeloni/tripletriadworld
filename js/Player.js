function Player(side,type,deck,random)
{
    this.points = 5;
    this.side = side;
    this.type = type;

    this.hand = new Hand(side);
    if (this.type == 'ai')
    {
        for (var i = 0; i < deck.length; ++i) {
            this.hand.addCard(deck[i]);
        }
    }
    else if(this.type == 'human' && !random)
    {
        var cardList = document.getElementById('cardList');
        var cardPreview = document.getElementById('cardPreview');

        var val = { left: 1, top: 1, right: 1, bot: 1, name: 'Placeholder', src: 'Placeholder', element: null, owner: 'blue' }

        var card = new Card(val);
        var wrap = card.buildElement(false, false);
        cardPreview.appendChild(wrap);
        
        for(var i = 0; i < deck.length; ++i)
        {
            var cardSelect = document.getElementById('cardSelection');
            cardSelect.style.display = 'block';
            var p = document.createElement('p');
            p.appendChild(document.createTextNode(deck[i].name + ': ' + deck[i].quantity));
            p.quantity = deck[i].quantity;
            p.onmouseover = (function(card)
            {
                var prev = cardPreview.childNodes[1];
                prev.getElementsByTagName('img')[0].src = 'img/cards/'+card.src+'.png';
                var values = prev.childNodes[1].childNodes;
                prev.childNodes[1].style.display = prev.childNodes[2].style.display = 'block';
                prev.childNodes[3].style.display = 'block';
                values[0].src = 'img/text/c' + card.top + '.png';
                values[1].src = 'img/text/c' + card.right + '.png';
                values[2].src = 'img/text/c' + card.bot + '.png';
                values[3].src = 'img/text/c' + card.left + '.png';

            }).bind(p, deck[i])

            var addToHand = new Array();

            function updateText(par)
            {
                var string = par.childNodes[0].nodeValue;
                var reg = /(\w+:) (\d+)/;
                var ret = reg.exec(string);
                par.childNodes[0].nodeValue = string.replace(reg, ret[1] +' ' + par.quantity);
            }
            p.onclick = (function (card,hand)
            {
                if (this.quantity <= 0 || addToHand.length >= 5)
                    return false;

                --this.quantity;
                var newCard = new Card(card);
                addToHand.push(newCard);
                updateText(this);

                hand.deleteElement();
                hand.cards = addToHand;
                hand.buildElement(true);
                return false;
            }).bind(p,deck[i], this.hand);

            p.oncontextmenu = (function(card,hand)
            {
                if(addToHand.length <= 0)
                    return false;
                for(var i = 0; i < addToHand.length;++i)
                {
                    if(addToHand[i].name == card.name)
                    {
                        addToHand[i] = null;
                        addToHand.clean(null);
                        ++this.quantity;
                        updateText(this);
                        hand.deleteElement();
                        hand.cards = addToHand;
                        hand.buildElement(true);
                        return false;
                    }
                }
                return false;


            }).bind(p, deck[i], this.hand);

            cardList.appendChild(p);

            document.getElementById('confirm').onclick = (function()
            {
                if (addToHand.length != 5)
                    return false;
                
                cardSelect.style.display = 'none';

                gameStarted = true;

                if (playground.turn == 2)
                    startAI();
                
            })
        }
    }
    else //type==human&&random
    {
        var rands = new Array();
        var length = countDeck(deck);

        while(rands.length != 5)
        {
            var val = Math.floor(Math.random() * (length - 1));
            randsPush(rands,val);
        }

        for(var i = 0; i < rands.length; ++i)
        {
            this.hand.addCard(getFromDeck(deck,rands[i]));
        }
    }
}

function randsPush(array,val) //pusha un valore random solo se non è già presente
{
    for(var i = 0; i < array.length; ++i)
    {
        if (array[i] == val)
            return false;
    }
    array.push(val);
}

function countDeck(deck) //conta quante carte ci sono nel deck tenendo presente delle quantità per ogni carta
{
    var length = 0;
    for(var i = 0; i < deck.length; ++i)
    {
        for(var j = 0; j < deck[i].quantity; ++j)
        {
            ++length;
        }
    }

    return length;
}

function getFromDeck(deck, idx) //restituisce una carta del deck tenendo conto delle quantità
{
    var cnt = 0;
    for (var i = 0; i < deck.length; ++i) {
        for (var j = 0; j < deck[i].quantity; ++j) {
            if (cnt++ == idx)
                return new Card(deck[i]);
        }
    }
}

Player.prototype.aiPlay = function()
{
    var wrapper = document.getElementById(this.side + 'Hand').getElementsByClassName('inHand')[0];
    var card = this.hand.cards[0];
    var found = false;
    for (var i = 0; i < 3 && !found; ++i)
    {
        for (var j = 0; j < 3 && !found; ++j)
        {
            if (!playground.mat[i][j])
                found = true;
        }
    }
    playground.playCard(card, wrapper, --i, --j);
}