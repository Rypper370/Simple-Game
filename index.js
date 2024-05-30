//membuat variabel 
var buttonColours = ["red","blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern =[];
var started = false;
var level = 0;

//membuat function untuk memulai permainan ketika tombol pada keyboard ditekan untuk pertama kalinya
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//membuat function pada button sesuai button warna yang dipilh user 
$(".btn").click(function(){
    var userChooseColor = $(this).attr("id");
    userClickedPattern.push(userChooseColor);
    playSound(userChooseColor);
    animate(userChooseColor);
    checkAnswer(userClickedPattern.length-1);
});

//membuat function untuk mengecek jawaban user
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, press any key to restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

//membuat function random pada user agar dapat mengiinput sesuai perintah random yang diberikan
//serta mensetting level jika user berhasil menginput button secara benar
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColours[randomNumber];
    gamePattern.push(randomColor);
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

//function animasi 
function animate(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

//membuat function untuk suara dimana terdapat parameter name untuk membaca
//variabel buttonColours  
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//function ini dibuat untuk mengulang game 
function startOver() {
    level = 0;
    gamePattern = []; 
    started = false;
}