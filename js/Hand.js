function Hand(side)
{
    this.cards = [];
    this.side = side;
    this.selected = null;
}

//aggiunge una carta alla mano
Hand.prototype.addCard = function(card)
{
    this.cards.push(card);
}

//rimuove la carta scelta dalla mano
Hand.prototype.removeCard = function(card)
{
    var id = this.cards.indexOf(card);
    this.cards[id] = null;
    this.cards.clean(null);
}

//crea l'elemento html per contenere mano
Hand.prototype.buildElement = function(open)
{
    var elem = document.getElementById(this.side + 'Hand');
    var toAdd;

    for (var i = 0; i < this.cards.length; ++i)
    {
        toAdd = this.cards[i].buildElement(false,open);
        
        elem.appendChild(toAdd);
    }
}

Hand.prototype.deleteElement = function()
{
    var elem = document.getElementById(this.side + 'Hand');
    var divs = elem.getElementsByClassName('wrapper');
    var max = divs.length;
    while (divs[0])
    {
        elem.removeChild(divs[0]);
    }
}

//funzione di utilità per compattare l'array della mano
Array.prototype.clean = function (deleteValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == deleteValue) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
};
