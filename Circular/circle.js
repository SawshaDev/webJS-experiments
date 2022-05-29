const circle = document.querySelector(".circle:not(.copy)")
MagicNumber = Math.PI/180
function sin(x) { //sin by degrees
    x*=MagicNumber;
    return Math.sin(x);

}
function cos(x) { //gloopy
    x*=MagicNumber;
    return Math.cos(x);
}




i = 1;
count = 45;
ringDistance = 1;
radius = 50; //The greater the radius, the more steps the circle will need to look good 
//but im dumb so i just made it 100 for now since i dont know how to do it
const interval = setInterval(function(){
    if (circle !== undefined){
        for (z = 1; z < count; z++) {
            cos(i)==1? i=0:null //NaN prevention
            copy = circle.cloneNode();
            copy.className += z+" copy";
            rad = radius+(z*ringDistance)
            copy.style.transform = `translate(${sin(i+z)*rad}px, ${cos(i+z)*rad}px)`
            document.body.append(copy)
            ringLayer = document.querySelectorAll(`.copyRing${z}`)
            ringLayer.length > 25 ? ringLayer[0].remove() : null
            i++
        }
    }
    else {
        clearInterval(interval)
    }
},1000/120)