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
var colorSnake;
var colorField;
var colorFood;
const width = 25;  
var SNAKE; 
var FOOD;
var multi;

//This function is called when I click on the "Ok" button
buttonValidate.addEventListener("click", function(){
    goToGame();
});

//Play the game
function goToGame()
{
    perdu = false;
    gameOn();
}


$(document).ready(function() {
    $.getJSON("easySnake.json", function(jd) {
        d1 = jd.dimensions[0];
        d2 = jd.dimensions[1];
        delay = jd.delay;
        colorSnake = jd.colorSnake;
        colorField = jd.colorField;
        colorFood = jd.colorFood;
        SNAKE = jd.snake;
        FOOD = jd.food;
        multi = jd.multi;

        console.log(jd.delay);
        });
        $("#level").change(function(event){
                
            var level = combo.value;
            console.log(level);
            if(level=="easy")
            {
                jsonFile ="./easySnake"+".json";
            }
            else if(level=="medium")
            {
                jsonFile ="./mediumSnake"+".json";
            }
            else
            {
                jsonFile ="./hardSnake"+".json";
            }
            $.getJSON(jsonFile, function(jd) {
                d1 = jd.dimensions[0];
                d2 = jd.dimensions[1];
                delay = jd.delay;
                colorSnake = jd.colorSnake;
                colorField = jd.colorField;
                colorFood = jd.colorFood;
                SNAKE = jd.snake;
                FOOD = jd.food;
                multi = jd.multi;
                console.log(jd.delay);
            });
        });
               
});

function loadJSON() {
    var combo2 = document.getElementById("level");
    var level = combo2.value;
    console.log(level);
    if(level=="easy")
    {
        jsonFile ="./easySnake"+".json";
    }
    else if(level=="medium")
    {
        jsonFile ="./mediumSnake"+".json";
    }
    else
    {
        jsonFile ="./hardSnake"+".json";
    }
    $.getJSON(jsonFile, function(jd) {
        d1 = jd.dimensions[0];
        d2 = jd.dimensions[1];
        delay = jd.delay;
        colorSnake = jd.colorSnake;
        colorField = jd.colorField;
        colorFood = jd.colorFood;
        SNAKE = jd.snake;
        FOOD = jd.food;
        multi = jd.multi;});
}

//Select a level on the homepage
function goToHomePage()
{
    var html = '<div id="homepage" style="margin-top:0%;">'+'<h1 class="text-center display-4">SNAKE JAVASCRIPT</h1>'+

    '<p class="text-center mt-3">Welcome to this Snake game created by MERAOUI Camelia</p>'+

    '<h5 class="text-center">Choose a level</h5>'+

    '<div class="row mt-3">'+
        '<select class="mx-auto form-control col-5" onchange="loadJSON()" id="level" name="level">'+
            '<option value="easy">Easy</option>'+
            '<option value="medium">Medium</option>'+
            '<option value="hard">Hard</option>'+
        '</select>'+
    '</div>'+

    '<div class="row mt-3">'+
        '<button class="btn btn-secondary mx-auto px-4" onclick="gameOn()" id="validate">Ok</button>'+
    '</div></div><canvas id="canvas">'+'</canvas></div>';
    container.innerHTML = html;

    $.getJSON("easySnake.json", function(jd) {
        d1 = jd.dimensions[0];
        d2 = jd.dimensions[1];
        delay = jd.delay;
        colorSnake = jd.colorSnake;
        colorField = jd.colorField;
        colorFood = jd.colorFood;
        SNAKE = jd.snake;
        FOOD = jd.food;
        multi = jd.multi;});
        
    
        canvas.setAttribute(name="height", 0);
        canvas.setAttribute(name="width", 0);
        buttonValidate.addEventListener("click", function(){
            goToGame();
        });
}


//TODO: ADD JSON FILE TO KEEP IN MEMORY THE BEST SCORE AND DISPLAY IT WHEN THE USER LOST ON THE ALERT
//TODO: ADD SCORE AND FILL JSON FILE. IMPROVE CONFIGURATION IN ORDER TO BE ADAPTED WITH EVERY CONFIGURATION ON THE JSON FILE

//Launch when the game is on
function gameOn()
{
    

    var score = 0;
    var homePageContainer = document.getElementById('homepage');
    var canvas = document.getElementById("canvas");
    homePageContainer.remove();  
    var scoreText = "<p id='score'>Your score : <span id='score'>0</span></p>";
    container.insertAdjacentHTML("beforeend", scoreText);
    
    //Selecting a random song
    tabSong = ["Astronomia.mp3","Naruto.mp3","OnePiece.mp3"];
    var nbSong = getRandomInt(tabSong.length);

    var audio = "<audio controls autoplay loop style='display:none;'><source src='"+tabSong[nbSong]+"' type='audio/mp3'></audio>";
    container.insertAdjacentHTML("beforeend", audio);
    
    //Game configuration
    /*
        WORLD : 16x12 d1xd2
        SNAKE : SNAKE[0] represents the snake position. SNAKE[1] represents its length
     */
    
    var WORLD = new Array(d1);

    for(var i = 0;i<d1;i++)
    {
        WORLD[i] = new Array(d2);
        for(var j=0;j<d2;j++)
        {
            WORLD[i][j] = 0; //Fill each element of an array by 0
        }
    }
    
    
    for(var i=0;i<SNAKE.length;i++)
    {
        WORLD[SNAKE[i][0]][SNAKE[i][1]] = 1;
    }
    WORLD[FOOD[0]][FOOD[1]] = 2;
    


    /*
        Gray Background coordinates
    */
    var x1Rect = 200;
    var y1Rect = 50;

    
    canvas.setAttribute(name="height", width*d2);
    canvas.setAttribute(name="width",x1Rect+(width*d1)-50);

    var context = canvas.getContext("2d");
    var keyLastPressed = "RIGHT"; //Right key is pressed by default
    context.fillStyle =colorField;
    context.fillRect(x1Rect, y1Rect, x1Rect+d1*width, width*d2);
    SNAKE.forEach(function(oneCoordinate)
    {
        context.fillRect(x1Rect+width*oneCoordinate[0],y1Rect+width*oneCoordinate[1],width,width);
    });
    
    context.fillStyle = colorFood;
    context.fillRect(x1Rect+width*FOOD[0],y1Rect+width*FOOD[1],width,width);

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
        
        
        
        context.fillStyle = colorFood;
        
        context.fillRect(x1Rect+width*FOOD[0],y1Rect+width*FOOD[1],width,width);
        

    }


    function goDown()
    {
        
        context.fillStyle = colorField;
        context.fillRect(x1Rect+width*SNAKE[0][0],y1Rect+width*SNAKE[0][1],width,50);
        var el = [SNAKE[SNAKE.length-1][0],SNAKE[SNAKE.length-1][1]+1];
        if(SNAKE[SNAKE.length-1][1]>0)
        {
            WORLD[SNAKE[0][0]][SNAKE[0][1]]=0;
        }
        
        SNAKE.shift();

        
        SNAKE.push(el);

        for(var i=0;i<SNAKE.length;i++)
        {
            if(SNAKE[SNAKE.length-1][1]>0)
            {
                WORLD[SNAKE[i][0]][SNAKE[i][1]]=1;
            }
            context.fillStyle = colorSnake;
            context.fillRect(x1Rect+width*SNAKE[SNAKE.length-1][0],y1Rect+width*SNAKE[SNAKE.length-1][1],width,width);
        }
        if(lose())
        {
            alert("perdu");
            goToHomePage();
            stop();
        }
        eatFood();
       
        
    }

    function goUp()
    {
        
        context.fillStyle = colorField;
        context.fillRect(x1Rect+width*SNAKE[0][0],y1Rect+width*SNAKE[0][1],width,50);
        var el = [SNAKE[SNAKE.length-1][0],SNAKE[SNAKE.length-1][1]-1];
        if(SNAKE[SNAKE.length-1][1]>0)
        {
            WORLD[SNAKE[0][0]][SNAKE[0][1]]=0;
        }
        
        SNAKE.shift();

        
        SNAKE.push(el);

        for(var i=0;i<SNAKE.length;i++)
        {
            if(SNAKE[SNAKE.length-1][1]>0)
            {
                WORLD[SNAKE[i][0]][SNAKE[i][1]]=1;
            }
            context.fillStyle = colorSnake;
            context.fillRect(x1Rect+width*SNAKE[SNAKE.length-1][0],y1Rect+width*SNAKE[SNAKE.length-1][1],width,width);
        }
        if(lose())
        {
            alert("perdu");
            goToHomePage();
            stop();
        }
        eatFood();
    }

    

    function goRight()
    {
       
        context.fillStyle = colorField;
        context.fillRect(x1Rect+width*SNAKE[0][0],y1Rect+width*SNAKE[0][1],width,50);
        
        var el = [SNAKE[SNAKE.length-1][0]+1,SNAKE[SNAKE.length-1][1]];
        WORLD[SNAKE[0][0]][SNAKE[0][1]]=0;
        SNAKE.shift();
        
        SNAKE.push(el);

        for(var i=0;i<SNAKE.length;i++)
        {
            WORLD[SNAKE[i][0]][SNAKE[i][1]]=1;
            context.fillStyle = colorSnake;
            context.fillRect(x1Rect+width*SNAKE[SNAKE.length-1][0],y1Rect+width*SNAKE[SNAKE.length-1][1],width,width);
        }
        if(lose())
        {
            alert("perdu");
            goToHomePage();
            stop();
        }
        eatFood();
       
        
    }
    

    function goLeft()
    {
        
        context.fillStyle = colorField;
        context.fillRect(x1Rect+width*SNAKE[0][0],y1Rect+width*SNAKE[0][1],width,50);
        
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
            context.fillStyle = colorSnake;
            context.fillRect(x1Rect+width*SNAKE[SNAKE.length-1][0],y1Rect+width*SNAKE[SNAKE.length-1][1],width,width);

        }
        
        
        if(lose())
        {
            alert("perdu");
            goToHomePage();
            stop();
        }
        eatFood();
       
        
    } 
            
}
       
    
