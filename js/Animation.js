function Animation()
{
    this.list = [];
    this.interval = null;
    this.oldsrc = null;
    this.wait = 0;
}

Animation.prototype.addElement = function(elem)
{
    this.list.specialUnshift(elem); //{x,y, val, toAdd,finish,combo}
}

Animation.prototype.start = function()
{
    this.interval = setInterval(this.exec.bind(this),50);
}

Animation.prototype.stop = function()
{
    clearInterval(this.interval);
    this.interval = null;
}

Animation.prototype.exec = function()
{
    

    var toExe = this.list[0];

    if (!toExe)
    {
        this.stop();
        this.wait = 0;
        var ms = (playground.turn == 1) ? 20 : 0;
        this.finish(ms);
        return;
    }


    if (toExe.val == 0)
    {
        if (toExe.combo)
        {
            document.getElementById('broad-pic').src = 'img/text/text-' + toExe.combo + '.png';
            document.getElementById('broadcast').style.display = 'block';

        }
    }
        



    var wrap = document.getElementById('card' + toExe.x + '_' + toExe.y);

    toExe.val += toExe.toAdd;

    wrap.style.transform = 'rotateY(' + toExe.val + 'deg)';

    if (toExe.val >= toExe.finish) {
        this.list.shift();
        document.getElementById('broadcast').style.display = 'none';
        if (toExe.combo)
            playground.applyRules(toExe.x, toExe.y, toExe.combo)
    }
    
    if (toExe.val == 96)
    {
        oldsrc = wrap.getElementsByClassName('picture')[0].src;
        wrap.getElementsByClassName('picture')[0].src = 'img/cards/Back.png';
        wrap.getElementsByClassName('numberWrap')[0].style.display = 'none';
        wrap.getElementsByClassName('elementIcon')[0].style.display = 'none';
        wrap.getElementsByClassName('elementModifier')[0].style.display = 'none';
    }

    if(toExe.val == 276)
    {
        wrap.getElementsByClassName('picture')[0].src = oldsrc;
        playground.changeCardOwner(toExe.x, toExe.y);
        wrap.getElementsByClassName('numberWrap')[0].style.display = 'initial';
        wrap.getElementsByClassName('elementIcon')[0].style.display = 'initial';
        wrap.getElementsByClassName('elementModifier')[0].style.display = 'initial';
    }
}


Animation.prototype.finish = function(frames)
{
    if (this.wait == 0)
    {
        this.interval = setInterval(this.finish.bind(this,frames), 50);
    }

    if (this.wait++ < frames)
        return;
    this.stop();
    playground.finishRules(false);
    
}


Array.prototype.specialUnshift = function (obj) {
    for (var i = 0; i < this.length; ++i) {
        if (animCompare(this[i],obj))
            return;
    }
    this.unshift(obj);
}

function animCompare(obj1,obj2)
{
    return (obj1.x == obj2.x && obj1.y == obj2.y);

}