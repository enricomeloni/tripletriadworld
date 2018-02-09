function Exchange()
{
    this.xmlHttp = getRequest();
}

Exchange.prototype.exchangeCard = function(cardName, player)
{
    this.xmlHttp.open('GET', 'php/exchangeCard.php?card=' + cardName + '&player=' + player, true)
    this.xmlHttp.send();
    this.xmlHttp.onreadystatechange = function()
    {
        if(this.xmlHttp.readyState == 4)
        {
            window.toAdd += 1*this.xmlHttp.responseText;
        }
    }
}