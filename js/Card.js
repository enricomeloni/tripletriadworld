function Card(values)
{
    this.top = values.top;
    this.right = values.right;
    this.bot = values.bot;
    this.left = values.left;
    
    this.owner = values.owner;
    this.originalOwner = values.owner;

    this.lvl = values.lvl;

    this.element = values.element;
    this.name = values.name;
    this.src = values.src;
    this.quantity = values.quantity //usato solo per la selezione delle carte
    this.back = null;
}


//crea l'immagine per il numeretto
function createNumber(pos,num)
{
    var add = new Image();
    add.className = pos;
    add.alt = pos + ' value: '+num;
    add.src = 'img/text/c'+ num + '.png'; //TODO - va aggiunto qui una funzione che restituisce l'img del numeretto;
    return add;
}

//crea il contenitore per i numeretti
function createNumberWrap(val) // {top,right,bot,left}
{
    var ret = document.createElement('div');
    ret.name = 'values';
    ret.appendChild(createNumber('top',val.top));
    ret.appendChild(createNumber('right',val.right));
    ret.appendChild(createNumber('bot',val.bot));
    ret.appendChild(createNumber('left',val.left));
    return ret;
}

//crea l'elemento html per contenere la carta
Card.prototype.buildElement = function(positioned,open)
{
    var wrapper = document.createElement('div'); //wrapper che conterrà l'immagine e i parametri della carta
    var image = new Image();
    image.className = 'picture'
    image.alt = 'Card: '+this.name;
    wrapper.appendChild(image);
    wrapper.className = 'wrapper';
    if (positioned)                         //a seconda che sia nel campo di gioco o nella mano ha css e javascript diverso
        wrapper.className += ' positioned';
    else {
        wrapper.className += ' inHand';
        if (this.owner == 'blue') {
            wrapper.onclick = (function (wrapper, x, y) { //funzione eseguita al click (da cambiare)
                var htmlHand = document.getElementById('leftHand');
                if (playground.leftPlayer.hand.selected != null)
                    htmlHand.getElementsByClassName('selected')[0].classList.remove('selected');
                playground.leftPlayer.hand.selected = playground.leftPlayer.hand.cards.indexOf(this);
                wrapper.classList.add('selected');
            }).bind(this, wrapper);
        }
    }
    
    wrapper.style.backgroundImage = 'url(img/grad-' + this.owner + '.png)';
    wrapper.style.backgroundSize = '100% 100%';
    var src = (open) ? this.src : 'Back';
    image.src = 'img/cards/'+src+'.png';
    var numbers = createNumberWrap(this);  //sezione in cui compariranno i numeri
    numbers.className = 'numberWrap';
    
    wrapper.appendChild(numbers);

    // icona elemento

    var element = new Image();
    element.alt = this.element;
    element.className = 'elementIcon';
    var elemSrc = (this.element) ? this.element : 'blank';
    element.src = 'img/text/' + elemSrc+ '.png';
    wrapper.appendChild(element);
    

    // icona +1/-1 per l'elemento

    var mod = new Image();
    mod.alt = 'Modificatore elementale';
    mod.className = 'elementModifier';
    mod.src = 'img/text/blank.png';
    wrapper.appendChild(mod);

    

    if (!open) {
        this.back = true;
        numbers.style.display = 'none';
        element.style.display = 'none';
        mod.style.display = 'none';
    }

    return wrapper;
}

Card.prototype.changeOwner = function()
{
    this.owner = (this.owner == 'blue') ? 'red' : 'blue';
}