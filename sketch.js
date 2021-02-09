var dog, sadDog, happyDog, feed, foodObj, database;
var foodStock, foodS = 0;
var database;
var array = [];
var a, lastFed;

function preload() {
    sadDog = loadImage("dog.png");
    happyDog = loadImage("happy dog.png");
}

function setup() {
    database = firebase.database();
    createCanvas(1000, 400);
    
    food= new food();
    foodStock = database.ref('Food');
    foodStock.on("value", readStock);
   
    dog = createSprite(800, 200, 150, 150);
    dog.addImage(sadDog);
    dog.scale = 0.15;
   

    feed = createButton("Feed the dog");
    feed.position(100, 10);
    feed.mousePressed(feedDog);

    addFood = createButton("Add food");
    addFood.position(100, 100);
    addFood.mousePressed(addFoods);

    

   
}

function draw() {
    background(255);
    food.display();
    //food.getFedTime();
   // food.deductFood();
    

    fedTime = database.ref('FeedTime');
    fedTime.on("value", function (data) {
        lastFed = data.val();
    });

    textSize(20);
    if (lastFed >= 12) {
        text("Last Fed:" + lastFed % 12 + "PM", 200, 200);
    }
    else if (lastFed == 0) {
        text("Last Fed:12AM", 200, 200);
    }
    else {
        text("Last Feed:" + lastFed + "AM", 200, 200);
    }




    //if (keyWentDown(UP_ARROW)) {
    // writeStock(foodS);
    // dog.addImage(happyDog);
    //}
    //else {
    //writeStock(foodS);
    //dog.addImage(sadDog);
    //}
    //if (foodS == 0) {
    // dog.addImage(sadDog);
    //  }



    drawSprites();
   
    //text("Food remaining: " + foodS, 100, 100);

    //text("Press UP_ARROW to feed the dog", 200, 100);
}

//function to read food Stock
function readStock(data) {
    foodS = data.val();
    food.updateFoodStock(foodS);
}
/*function writeStock(x) {
    if (x <= 0) {
        x = 0;
    }
    else {
        x = x - 1;
    }
     database.ref('/').update({
         Food:x
     })
}

//function to update food stock and last fed time
function update() {
    var food = "player" + playerCount;
    database.ref(playerIndex).set({
        name: name
    });
}*/

//function to add food in stock

function feedDog() {
    dog.addImage(happyDog);
    food.updateFoodStock(food.getFoodStock() - 1);
    database.ref('/').update({
        Food: food.getFoodStock(),
        FeedTime: hour()
    })
}

function addFoods() {
    foodS++;
    database.ref('/').update({
        Food: foodS
    })
}