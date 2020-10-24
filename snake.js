var container = document.getElementById("app");
var buttonValidate = document.getElementById("validate");
var canvas = document.getElementById("canvas");

//This function is called when I click on the "Ok" button
buttonValidate.addEventListener("click", function(){
    goToGame();
});

//Play the game
function goToGame()
{
    gameOn();
}

//Select a level on the homepage
function goToHomePage()
{
    var html = '<div id="homepage" style="margin-top:0%;">'+'<h1 class="text-center display-4">SNAKE JAVASCRIPT</h1>'+

    '<p class="text-center mt-3">Welcome to this Snake game created by MERAOUI Camelia</p>'+

    '<h5 class="text-center">Choose a level</h5>'+

    '<div class="row mt-3">'+
        '<select class="mx-auto form-control col-5" name="level">'+
            '<option value="easy">Easy</option>'+
            '<option value="medium">Medium</option>'+
            '<option value="hard">Hard</option>'+
        '</select>'+
    '</div>'+

    '<div class="row mt-3">'+
        '<button class="btn btn-secondary mx-auto px-4" onclick="gameOn()" id="validate">Ok</button>'+
    '</div></div><canvas id="canvas">'+'</canvas></div>';
    container.innerHTML = html;
    
        canvas.setAttribute(name="height", 0);
        canvas.setAttribute(name="width", 0);
        buttonValidate.addEventListener("click", function(){
            goToGame();
        });
    
}
//TODO: ADD WIDTH SQUARE AS ATTRIBUTE
//TODO: ADD JSON FILE TO KEEP IN MEMORY THE BEST SCORE AND DISPLAY IT WHEN THE USER LOST ON THE ALERT
//TODO: IMPROVE FOOD GENERATION WHEN IT HAS THE SAME COORDINATES THAN THE SNAKE'S BODY
//TODO: ADD SCORE AND FILL JSON FILE. IMPROVE CONFIGURATION IN ORDER TO BE ADAPTED WITH EVERY CONFIGURATION ON THE JSON FILE

//Launch when the game is on
function gameOn()
{
    var homePageContainer = document.getElementById('homepage');
    var canvas = document.getElementById("canvas");
    homePageContainer.remove();  

    //Game configuration
    /*
        WORLD : 16x12 d1xd2
        SNAKE : SNAKE[0] represents the snake position. SNAKE[1] represents its length
     */
    var d1 = 16; 
    var d2 = 12;
    var WORLD = new Array(d1);

    for(var i = 0;i<d1;i++)
    {
        WORLD[i] = new Array(d2);
        for(var j=0;j<d2;j++)
        {
            WORLD[i][j] = 0; //Fill each element of an array by 0
        }
    }

    
    var SNAKE = [[0,0]]; 
    var FOOD = [8,8];
    for(var i=0;i<SNAKE.length;i++)
    {
        WORLD[SNAKE[i][0],SNAKE[i][1]] = 1;
    }
    WORLD[FOOD[0],FOOD[1]] = 2;
    


    /*
        Gray Background coordinates
    */
    var x1Rect = 200;
    var y1Rect = 50;
    var x2Rect = 1000;
    var y2Rect = 600;

    
    canvas.setAttribute(name="height", 700);
    canvas.setAttribute(name="width", 1000);

    var context = canvas.getContext("2d");
    var keyLastPressed = "RIGHT"; //Right key is pressed by default
    context.fillStyle ='lightgray';
    context.fillRect(x1Rect, y1Rect, x2Rect, y2Rect);
    SNAKE.forEach(function(oneCoordinate)
    {
        context.fillRect(x1Rect+50*oneCoordinate[0],y1Rect+50*oneCoordinate[1],50,50);
    });
    
    context.fillStyle = "red";
    context.fillRect(x1Rect+50*FOOD[0],y1Rect+50*FOOD[1],50,50);

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
        
        

    },200);

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
        
        if(SNAKE[SNAKE.length-1][0]<0 || SNAKE[SNAKE.length-1][0]>=d1 || SNAKE[SNAKE.length-1][1]<0 || SNAKE[SNAKE.length-1][1]>=d2)
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
    
    function eatFood()
    {
        if(FOOD[0]==SNAKE[SNAKE.length-1][0]&&FOOD[1]==SNAKE[SNAKE.length-1][1])
        {
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
            var value = WORLD[FOOD[0]][FOOD[1]];
            
            

            while(value!=0)
            {
                x = getRandomInt(d1);
                y = getRandomInt(d2);
                value = WORLD[x][y];
            }  
            WORLD[FOOD[0]][FOOD[1]] = 0;
            FOOD[0] = x;
            FOOD[1] = y
            context.fillStyle = "red";
            WORLD[x][y] = 2;
            context.fillRect(x1Rect+50*FOOD[0],y1Rect+50*FOOD[1],50,50);

        }
    }


    function goDown()
    {
        
        context.fillStyle = "lightgray";
        context.fillRect(x1Rect+50*SNAKE[0][0],y1Rect+50*SNAKE[0][1],50,50);
        var el = [SNAKE[SNAKE.length-1][0],SNAKE[SNAKE.length-1][1]+1];
        WORLD[SNAKE[0][0],SNAKE[0][1]]=0;
        SNAKE.shift();
        
        SNAKE.push(el);

        for(var i=0;i<SNAKE.length;i++)
        {
            WORLD[SNAKE[i][0],SNAKE[i][1]]=1;
            console.log(SNAKE[i][0]+ " "+SNAKE[i][1]);
            context.fillStyle = "orange";
            context.fillRect(x1Rect+50*SNAKE[SNAKE.length-1][0],y1Rect+50*SNAKE[SNAKE.length-1][1],50,50);
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
        
        context.fillStyle = "lightgray";
        context.fillRect(x1Rect+50*SNAKE[0][0],y1Rect+50*SNAKE[0][1],50,50);
        var el = [SNAKE[SNAKE.length-1][0],SNAKE[SNAKE.length-1][1]-1];
        WORLD[SNAKE[0][0],SNAKE[0][1]]=0;
        SNAKE.shift();
        
        SNAKE.push(el);

        for(var i=0;i<SNAKE.length;i++)
        {
            WORLD[SNAKE[i][0],SNAKE[i][1]]=1;
            console.log(SNAKE[i][0]+ " "+SNAKE[i][1]);
            context.fillStyle = "orange";
            context.fillRect(x1Rect+50*SNAKE[SNAKE.length-1][0],y1Rect+50*SNAKE[SNAKE.length-1][1],50,50);
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
        
        context.fillStyle = "lightgray";
        context.fillRect(x1Rect+50*SNAKE[0][0],y1Rect+50*SNAKE[0][1],50,50);
        var el = [SNAKE[SNAKE.length-1][0]+1,SNAKE[SNAKE.length-1][1]];
        WORLD[SNAKE[0][0],SNAKE[0][1]]=0;
        SNAKE.shift();
        
        SNAKE.push(el);
        
        for(var i=0;i<SNAKE.length;i++)
        {
            WORLD[SNAKE[i][0],SNAKE[i][1]]=1;
            console.log(SNAKE[i][0]+ " "+SNAKE[i][1]);
            context.fillStyle = "orange";
            context.fillRect(x1Rect+50*SNAKE[SNAKE.length-1][0],y1Rect+50*SNAKE[SNAKE.length-1][1],50,50);
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
        
        context.fillStyle = "lightgray";
        context.fillRect(x1Rect+50*SNAKE[0][0],y1Rect+50*SNAKE[0][1],50,50);
        var el = [SNAKE[SNAKE.length-1][0]-1,SNAKE[SNAKE.length-1][1]];
        WORLD[SNAKE[0][0],SNAKE[0][1]]=0;
        SNAKE.shift();
        
        SNAKE.push(el);

        for(var i=0;i<SNAKE.length;i++)
        {
            WORLD[SNAKE[i][0],SNAKE[i][1]]=1;
            console.log(SNAKE[i][0]+ " "+SNAKE[i][1]);
            context.fillStyle = "orange";
            context.fillRect(x1Rect+50*SNAKE[SNAKE.length-1][0],y1Rect+50*SNAKE[SNAKE.length-1][1],50,50);
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