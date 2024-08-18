


let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

let cellsize = 50//height and width for each cell
// snake-cells
// 2d array to store the starting point of snake k reactangle
let snakecells = [[0,0]]
let boardheight = 600;
let boardwidth = 1000;
let direction = 'right'

let gameover = false;//wall sa touch hone k baad ho jaeiy true



let foodcells = generateFood();//bcz we need 2 values ie x,y

let score = 0;



// baar baar reapeat
// it retrun the id
let intervalID = setInterval(function(){
    update();//phela brush ko dip kaara than draw
    draw();

},100)




// event
// keydown : ie key ko down karna ya dabana 
document.addEventListener('keydown', function(e) {
    // console.log(e);
    if(e.key === 'ArrowUp'){
        direction='up'
    }
    else if(e.key === 'ArrowDown'){
        direction='down'
    }
    else if(e.key === 'ArrowLeft'){
        direction='left'
    }
    else{
        direction='right'
    }
})

// function to draw snake
function draw() {
    if(gameover===true){//ised to stop the draw wall sa touch hone k baad
        clearInterval(intervalID);
        ctx.fillStyle='pink'
        ctx.font = '50px monospace'
        ctx.fillText("GAME OVER!!!",350,300)
        return;
    }

    ctx.clearRect(0, 0, boardwidth,boardheight)
    for(let cell of snakecells){
        ctx.fillStyle = 'red'
        ctx.fillRect(cell[0], cell[1], cellsize,cellsize);
        ctx.strokeStyle = 'orange'
        ctx.strokeRect(cell[0],cell[1],cellsize,cellsize)
    }


    // draw food
    ctx.fillStyle='green'
    ctx.fillRect(foodcells[0],foodcells[1],cellsize,cellsize)



    // draw score 
    ctx.font ='24px monospace'
    ctx.fillText(`score : ${score}`,20,25);

}


// function to updtae snake
function update() {
    let headx = snakecells[snakecells.length-1][0];
    let heady = snakecells[snakecells.length-1][1];
    // update the head of snake
    // let newheadx = headx + cellsize;
    // let newheady = heady;
    //we cannot cahnge directly
    if(direction === 'right'){
        newheadx = headx + cellsize;
        newheady = heady;
        if(newheadx === boardwidth || khelkhatam(newheadx,newheady)){
            gameover=true;
        }
    }
    else if(direction === 'left'){
        newheadx = headx - cellsize;
        newheady = heady;
        if(newheadx < 0 || khelkhatam(newheadx,newheady)){
            gameover=true;
        }
    }
    else if(direction === 'up'){
        newheadx = headx;
        newheady = heady  - cellsize;
        if(newheady < 0 || khelkhatam(newheadx,newheady)){
            gameover=true;
        }
    }
    else {
        newheadx = headx;
        newheady = heady  + cellsize;
        if(newheady  === boardheight || khelkhatam(newheadx,newheady)){
            gameover=true;
        }
    }




    snakecells.push([newheadx,newheady]);
    if(newheadx===foodcells[0] && newheady===foodcells[1]){
        foodcells=generateFood();
        score += 1;
    }
    else{
        snakecells.shift();
    }
    

}



function generateFood(){
    return [
        Math.round((Math.random()*(boardwidth-cellsize))/cellsize)*cellsize,
        Math.round((Math.random()*(boardheight-cellsize))/cellsize)*cellsize
    ]
}



function khelkhatam(newheadx,newheady){
    for(let item of snakecells){
        if(item[0] === newheadx && item[1] === newheady){
            return true;
        }
    }
    return false;

}







