MagicNumber = Math.PI/180
function sin(x) { //sin by degrees
    x*=MagicNumber;
    return Math.sin(x);

}
function cos(x) { //gloopy
    x*=MagicNumber;
    return Math.cos(x*1.01);
}



fileInput = document.getElementsByTagName("input")[0]
circle = document.getElementsByClassName('circle')[0]
function check(){
    if(fileInput.files[0].name.endsWith(".png") || fileInput.files[0].name.endsWith(".jpg")){
        allowFile(fileInput.files[0])
    }
    
}

function allowFile(file){
    blob = URL.createObjectURL(file)
    img = new Image()
    img.src = blob
    canvas = document.getElementsByTagName("canvas")[0]
    img.onload = function(){
        canvas.height = img.height
        canvas.width = img.width
        canvas.getContext('2d').drawImage(img,0 ,0)
        beginProcessing(canvas)
    }   
}

function rgbToHex(r,g,b){
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}


async function beginProcessing(canvas){
    height = canvas.height
    width = canvas.width
    ctx = canvas.getContext('2d')
    var r,g,b,a;
    num = 0
    Offset = circle.getBoundingClientRect().toJSON()
    xOffset = Offset.x;
    yOffset = Offset.y
    for(var y = 0; y < height; y++){
        layer = document.createElement('div')
        layer.style.height = '1px'
        console.log(sin(y))
        for(var x = 0; x < width; x++){
            
            [r,g,b,a] = ctx.getImageData(x,y,1,1).data
            hex = rgbToHex(r,g,b)
            pixel = circle.cloneNode();
            pixel.style.top = `${y+yOffset}px`
            pixel.style.left = `${x+xOffset}px`
            //if pixel.style.setProperty("box-shadow: 0px 0px 8px 1px currentColor;")
            pixel.style.setProperty("color", `rgba(${r},${g},${b},${a})`)
            layer.append(pixel)
            num+=0.02
        }
        document.body.append(layer)
    }
    console.log('done')
}




//box-shadow: 0px 0px 8px 1px currentColor;
//style="color:blue;--posX:20px;--posY:90px;"