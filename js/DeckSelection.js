function DeckSelection(player)
{
    this.player = player;
    this.deck = [];
    this.xmlHttp = getRequest();
    this.counter = 0;
}

DeckSelection.prototype.getDeck = function()
{
    /*var val = { left: 10, top: 5, right: 10, bot: 5, name: 'Squall', src: 'Squall', element: 'fire', owner: 'red' };

    val.src = 'Irvine';

    for (var i = 0; i < 5; ++i)
    {
        val.owner = (this.player == 'human')?'blue':'red';
        var card1 = new Card(val);
        this.deck.push(card1);
    }
    */
    this.deck = [];
    this.counter = 0;

    this.xmlHttp.open('GET', 'php/getDeck.php?req='+this.player, true);
    //this.xmlHttp.setRequestHeader("Content-type", "application/x-www-formurlencoded");
    this.xmlHttp.send();

    var xmlDeck;

    this.xmlHttp.onreadystatechange = (function()
    {
        if(this.xmlHttp.readyState == 4)
        {
            xmlDeck = this.xmlHttp.responseXML;
            var xmlCards = xmlDeck.getElementsByTagName('card');
            for (var i = 0; i < xmlCards.length; ++i) {
                var values = xmlCards[i].getElementsByTagName('values')[0];

                var obj = new Object;
                obj.top = values.childNodes[0].firstChild.nodeValue;
                obj.right = values.childNodes[1].firstChild.nodeValue;
                obj.bot = values.childNodes[2].firstChild.nodeValue;
                obj.left = values.childNodes[3].firstChild.nodeValue;
                obj.owner = (this.player == 'human') ? 'blue' : 'red';

                obj.element = xmlCards[i].getElementsByTagName('element')[0].firstChild;
                if (obj.element)
                    obj.element = obj.element.nodeValue;
                obj.name = obj.src = xmlCards[i].getElementsByTagName('name')[0].firstChild.nodeValue;
                obj.quantity = xmlCards[i].getElementsByTagName('quantity')[0].firstChild.nodeValue;
                obj.lvl = xmlCards[i].getElementsByTagName('level')[0].firstChild.nodeValue;
                var add = new Card(obj);
                this.deck.push(add);
                this.counter += 1*obj.quantity;
            }

        }
    }).bind(this);
    
    
    return this.deck;
}

