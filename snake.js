var jsonFile = " ";
var perdu = false;
var combo = document.getElementById("level");
var buttonValidate = document.getElementById("validate");
var container = document.getElementById("app");
var canvas = document.getElementById("canvas");


//Game variables
var d1;
var d2;
var delay;
var character = "character.png";
var colorField;
var food;
const width = 25;  
var SNAKE; 
var FOOD;
var multi;
var score;

function valuesWithoutJSON(){
    d1 = 32;
    d2 = 64;
    delay = 200;
    colorField = "pink";
    food="Chicken.png";
    SNAKE=[[0,0],[1,0]];
    FOOD=[2,8];
    multi = 2;
    

}


//This function is called when I click on the "Ok" button
buttonValidate.addEventListener("click", function(){
    goToGame();
});

//Play the game
function goToGame()
{
    gameOn();
}

//Load json file when the window is loaded
$(document).ready(function() {
    
    
    var combo2 = document.getElementById("level");
    var level = combo2.value;
    if(level=="easy")
    {
        jsonFile ="./easySnake"+".json";
        document.getElementById("body").style.backgroundColor = "lightgreen";
    }
    else if(level=="medium")
    {
        jsonFile ="./mediumSnake"+".json";
        document.getElementById("body").style.backgroundColor = "pink";
    }
    else
    {
        jsonFile ="./hardSnake"+".json";
        document.getElementById("body").style.backgroundColor = "lightblue";
    }
    $.getJSON(jsonFile, function(jd) {
        d1 = jd.dimensions[0];
        d2 = jd.dimensions[1];
        delay = jd.delay;
        colorField = jd.colorField;
        food = jd.foodImage;
        SNAKE = jd.snake;
        FOOD = jd.food;
        multi = jd.multi;}); 
        $("#level").change(function(event){
            var combo2 = document.getElementById("level");
            var level = combo2.value;
            console.log(level);
            if(level=="easy")
            {
                jsonFile ="./easySnake"+".json";
                document.getElementById("body").style.backgroundColor = "lightgreen";
            }
            else if(level=="medium")
            {
                jsonFile ="./mediumSnake"+".json";
                document.getElementById("body").style.backgroundColor = "pink";
            }
            else
            {
                jsonFile ="./hardSnake"+".json";
                document.getElementById("body").style.backgroundColor = "lightblue";
            }
            $.getJSON(jsonFile, function(jd) {
                d1 = jd.dimensions[0];
                d2 = jd.dimensions[1];
                delay = jd.delay;
                colorField = jd.colorField;
                food = jd.foodImage;
                SNAKE = jd.snake;
                FOOD = jd.food;
                multi = jd.multi;});  
                    
                }); 
            
    });
        
        
            
    
//Load the easyJSONFile by default to prevent from some problems
function loadDefaultJSON()
{
    $.getJSON("easySnake.json", function(jd) {
        d1 = jd.dimensions[0];
        d2 = jd.dimensions[1];
        delay = jd.delay;
        colorField = jd.colorField;
        food = jd.foodImage;
        SNAKE = jd.snake;
        FOOD = jd.food;
        multi = jd.multi;
        console.log(jd.delay);
        });
}

//This function is called when the user load the game the second time without refreshing
function loadJSON() {
    var combo2 = document.getElementById("level");
    var level = combo2.value;
    console.log(level);
    
    if(level=="easy")
    {
        document.getElementById("body").style.backgroundColor = "lightgreen";
        jsonFile ="./easySnake"+".json";
    }
    else if(level=="medium")
    {
        document.getElementById("body").style.backgroundColor = "pink";
        jsonFile ="./mediumSnake"+".json";
    }
    else
    {
        document.getElementById("body").style.backgroundColor = "lightblue";
        jsonFile ="./hardSnake"+".json";
    }
    $.getJSON(jsonFile, function(jd) {
        d1 = jd.dimensions[0];
        d2 = jd.dimensions[1];
        delay = jd.delay;
        colorField = jd.colorField;
        food = jd.foodImage;
        SNAKE = jd.snake;
        FOOD = jd.food;
        multi = jd.multi;});
}

//Recreate the home page when the user loses.
function goToHomePage()
{
    var html = '<div id="homepage" style="margin-top:0%;">'+
    '<h1 class="text-center display-4">SNAKE JAVASCRIPT</h1>'+
    '<div class="row justify-content-center">'+
        '<img class="col-1" src="character.png" alt=""/>'+
        '<p class="col-5 mt-3" style="font-size:18px;">Help Charlie to be bigger by giving him some food</p>'+
    '</div>'+

    '<h5 class="text-center">Choose a level</h5>'+

    '<div class="row mt-3">'+
        '<select class="mx-auto form-control col-5"  onchange="loadJSON()" id="level" name="level">'+
            '<option value="easy" selected>Easy</option>'+
            '<option value="medium">Medium</option>'+
            '<option value="hard">Hard</option>'+
        '</select>'+
    '</div>'+

    '<div class="row mt-3">'+
        '<button class="btn btn-secondary mx-auto px-4"  onclick="goToGame()" id="validate">Ok</button>'+
    '</div>'+
    '<div class="row">'+
        '<iframe src="https://giphy.com/embed/tVHqp1rty3dgf9jmJt" class=" mx-auto mt-5" width="250" height="250" frameBorder="0"'+
        'class="giphy-embed" allowFullScreen></iframe><p>'+
            '<a href="https://giphy.com/gifs/pizza-wolke-giessen-sound-on-pizzawolke-pizza-wolke-tVHqp1rty3dgf9jmJt"></a></p>'+
    '</div>'+
'</div>'+
'<canvas id="canvas"></canvas>';
    document.getElementById("body").style.backgroundColor = "lightgreen";
    container.innerHTML = html;
    loadDefaultJSON();
        
    
    canvas.setAttribute(name="height", 0);
    canvas.setAttribute(name="width", 0);
    buttonValidate.addEventListener("click", function(){
        goToGame();
    });
}




//Launch when the game is on
function gameOn()
{
    document.getElementById("body").style.backgroundColor = "lightgray";
    score = 0;
    var homePageContainer = document.getElementById('homepage');
    var canvas = document.getElementById("canvas");
    homePageContainer.remove();  
    var scoreText = "<p id='score'>Your score : <span id='score'>0</span></p>";
    container.insertAdjacentHTML("beforeend", scoreText);
    
    //Selecting a random song
    tabSong = ["Astronomia.mp3","Naruto.mp3","OnePiece.mp3","DemonSlayer.mp3"];
    var nbSong = getRandomInt(tabSong.length);

    var audio = "<audio controls autoplay loop style='display:none;'><source src='"+tabSong[nbSong]+"' type='audio/mp3'></audio>";
    container.insertAdjacentHTML("beforeend", audio);
    
    //Game configuration
    
    var WORLD = new Array(d1);

    for(var i = 0;i<d1;i++)
    {
        WORLD[i] = new Array(d2);
        for(var j=0;j<d2;j++)
        {
            WORLD[i][j] = 0; //Fill each element of an array by 0
        }
    }

    //Load food images
    function make_base()
    {
        base_image = new Image();
        base_image.src = food;
        base_image.onload = function(){
            context.drawImage(base_image,x1Rect+width*FOOD[0],y1Rect+width*FOOD[1],width,width);
    }
}
    
    for(var i=0;i<SNAKE.length;i++)
    {
        WORLD[SNAKE[i][0]][SNAKE[i][1]] = 1;
    }
    WORLD[FOOD[0]][FOOD[1]] = 2;
    


    /*
        Background coordinates
    */
    var x1Rect = 200;
    var y1Rect = 50;

    
    base_image2 = new Image();
    base_image2.src = character;
    
    canvas.setAttribute(name="height", width*d2);
    canvas.setAttribute(name="width",x1Rect+(width*d1)-50);

    var context = canvas.getContext("2d");
    var keyLastPressed = "RIGHT"; //Right key is pressed by default
    context.fillStyle =colorField;
    context.fillRect(x1Rect, y1Rect, x1Rect+d1*width, width*d2);
    SNAKE.forEach(function(oneCoordinate)
    {
        base_image2.onload = function(){
            context.drawImage(base_image,x1Rect+width*oneCoordinate[0],y1Rect+width*oneCoordinate[1],width,width);
        }
    });
        
    make_base();


    //End game configuration


    //This function is called when the user pressed one of the arrow keys
    document.addEventListener('keydown', function (e){
        if((e.keyCode == 40)&&(keyLastPressed!="UP")) {
            keyLastPressed = "DOWN";
            
        }
        else if((e.keyCode == 38)&&(keyLastPressed!="DOWN"))
        {
            keyLastPressed = "UP";
        }
        else if((e.keyCode == 37)&&(keyLastPressed!="RIGHT"))
        {
            keyLastPressed = "LEFT";
        }
        else if((e.keyCode == 39)&&(keyLastPressed!="LEFT"))
        {
            keyLastPressed = "RIGHT";
        }
    });

    var deplacer = setInterval(function()
    {
        if(keyLastPressed == "DOWN")
        {
            goDown();
        }
        else if(keyLastPressed == "UP")
        {
            goUp();
        }
        else if(keyLastPressed == "LEFT")
        {
            goLeft();
        }
        else
        {
            goRight();
        }
        
        

    },delay);

    //This function is called when the snake is out of the background
   
    function lose()
    {
        if(SNAKE.length>1)
        {
            for(var i = 0;i<=SNAKE.length-2;i++)
            {
                if(SNAKE[i][1]==SNAKE[SNAKE.length-1][1]&&SNAKE[i][0]==SNAKE[SNAKE.length-1][0])
                {
                    return true;
                }
            }
        }
        if(SNAKE[SNAKE.length-1][0]<0|| SNAKE[SNAKE.length-1][0]+1>=d1 || SNAKE[SNAKE.length-1][1]<0 || SNAKE[SNAKE.length-1][1]+1>=d2)
        {
            return true;
        }
        return false;
    }

    //This function is called when the user loses so the snake stops moving
    function stop()
    {
        clearInterval(deplacer);
    }

    //Generate random number for food
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function generateFood() {
        x = getRandomInt(d1-2);
        y = getRandomInt(d2-2);
        SNAKE.forEach(function a(part) {
            var has_eaten = (part[0]==x && part[1]==y) || (FOOD[0]==x && FOOD[1]==y);
            
            if (has_eaten) generateFood();
        });
          WORLD[FOOD[0]][FOOD[1]] = 0;
          FOOD[0] = x;
          FOOD[1] = y;
          WORLD[x][y] = 2;
    }
    
    //This function verify if the snake eats the food and generate another one by calling generateFood()
    function eatFood()
    {
        
        if(FOOD[0]==SNAKE[SNAKE.length-1][0]&&FOOD[1]==SNAKE[SNAKE.length-1][1])
        {
            score+=10*multi;
            var scoreT = document.getElementById("score");
            scoreT.innerHTML = "Your score : "+score;
            var grow;
            if(keyLastPressed=="LEFT")
            {
                grow = [SNAKE[SNAKE.length-1][0]-1,SNAKE[SNAKE.length-1][1]];
            }
            else if(keyLastPressed=="RIGHT")
            {
                grow = [SNAKE[SNAKE.length-1][0]+1,SNAKE[SNAKE.length-1][1]];
            }
            else if(keyLastPressed=="UP")
            {
                grow = [SNAKE[SNAKE.length-1][0],SNAKE[SNAKE.length-1][1]-1];
            }
            else if(keyLastPressed=="DOWN")
            {
                grow = [SNAKE[SNAKE.length-1][0],SNAKE[SNAKE.length-1][1]+1];
            }
            SNAKE.unshift(grow);

            //Generate FOOD
             
            generateFood();
            console.log(FOOD[0]+ " "+FOOD[1]);
        }
        
        make_base();
        

    }

    /*Actions made when the user presses a key */

    function goDown()
    {
        
        context.fillStyle = colorField;
        context.fillRect(x1Rect+width*SNAKE[0][0],y1Rect+width*SNAKE[0][1],width,width);
        var el = [SNAKE[SNAKE.length-1][0],SNAKE[SNAKE.length-1][1]+1];
        if(SNAKE[SNAKE.length-1][1]>0)
        {
            WORLD[SNAKE[0][0]][SNAKE[0][1]]=0;
        }
        
        SNAKE.shift();

        
        SNAKE.push(el);

        base_image2 = new Image();
        base_image2.src = character;

        for(var i=0;i<SNAKE.length;i++)
        {
            if(SNAKE[SNAKE.length-1][1]>0)
            {
                WORLD[SNAKE[i][0]][SNAKE[i][1]]=1;
            }
            
            context.drawImage(base_image2,x1Rect+width*SNAKE[SNAKE.length-1][0],y1Rect+width*SNAKE[SNAKE.length-1][1],width,width);
        }
        if(lose())
        {
            alert(message = "Game over ! Your score:"+score);
            goToHomePage();
            stop();
        }
        eatFood();
       
        
    }

    function goUp()
    {
        
        context.fillStyle = colorField;
        context.fillRect(x1Rect+width*SNAKE[0][0],y1Rect+width*SNAKE[0][1],width,width);
        var el = [SNAKE[SNAKE.length-1][0],SNAKE[SNAKE.length-1][1]-1];
        if(SNAKE[SNAKE.length-1][1]>0)
        {
            WORLD[SNAKE[0][0]][SNAKE[0][1]]=0;
        }
        
        SNAKE.shift();

        
        SNAKE.push(el);
        base_image2 = new Image();
        base_image2.src = character;

        for(var i=0;i<SNAKE.length;i++)
        {
            if(SNAKE[SNAKE.length-1][1]>0)
            {
                WORLD[SNAKE[i][0]][SNAKE[i][1]]=1;
            }
            
            context.drawImage(base_image2,x1Rect+width*SNAKE[SNAKE.length-1][0],y1Rect+width*SNAKE[SNAKE.length-1][1],width,width);
        }
        if(lose())
        {
            alert(message = "Game over ! Your score:"+score);
            goToHomePage();
            stop();
        }
        eatFood();
    }

    

    function goRight()
    {
       
        context.fillStyle = colorField;
        context.fillRect(x1Rect+width*SNAKE[0][0],y1Rect+width*SNAKE[0][1],width,width);
        
        var el = [SNAKE[SNAKE.length-1][0]+1,SNAKE[SNAKE.length-1][1]];
        WORLD[SNAKE[0][0]][SNAKE[0][1]]=0;
        SNAKE.shift();
        
        SNAKE.push(el);
        base_image2 = new Image();
        base_image2.src = character;

        for(var i=0;i<SNAKE.length;i++)
        {
            WORLD[SNAKE[i][0]][SNAKE[i][1]]=1;
            
            context.drawImage(base_image2,x1Rect+width*SNAKE[SNAKE.length-1][0],y1Rect+width*SNAKE[SNAKE.length-1][1],width,width);
        }
        if(lose())
        {
            alert(message = "Game over ! Your score:"+score);
            goToHomePage();
            stop();
        }
        eatFood();
       
        
    }
    

    function goLeft()
    {
        
        context.fillStyle = colorField;
        context.fillRect(x1Rect+width*SNAKE[0][0],y1Rect+width*SNAKE[0][1],width,width);
        
        var el = [SNAKE[SNAKE.length-1][0]-1,SNAKE[SNAKE.length-1][1]];
        if(SNAKE[0][0]!=-1)
        {
            WORLD[SNAKE[0][0]][SNAKE[0][1]]=0;
        }
        
        SNAKE.shift();
        
        SNAKE.push(el);

        for(var i=0;i<SNAKE.length;i++)
        {
            if(SNAKE[i][0]!=-1)
            {
                WORLD[SNAKE[i][0]][SNAKE[i][1]]=1;
            }
            
            context.drawImage(base_image2,x1Rect+width*SNAKE[SNAKE.length-1][0],y1Rect+width*SNAKE[SNAKE.length-1][1],width,width);

        }
        
        
        if(lose())
        {
            alert(message = "Game over ! Your score:"+score);
            goToHomePage();
            stop();
        }
        eatFood();
       
        
    } 
            
}
       
    
