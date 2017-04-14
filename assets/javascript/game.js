
var arrpw = [
    "PROGRAMMER",
    "ARCHITECT",
    "DEVELOPER",
    "CODER",
    "ENGINEER",
    "FRAMEWORK",
    "JAVASCRIPT",
    "DATABASE",
    "ANGULAR",
    "REACT",
];
var puzzleword = "";
var arrpuzzleword = []; //this will help to find position of each guessed key by the user.

function startPlay() {

    console.log("startPlay");

    //Reset stars of puzzle word.
    for (var i = 0; i < 10; i++) {
        document.getElementById("alpha" + i).innerHTML = "*";
    }

    //User gets 7 chances to guess the puzzle word.
    document.getElementById("guessesleft").value = 7;

    //User has not guessed anything yet.
    document.getElementById("lettersguessed").value = "";

    //Computer picks up Random puzzle word for the user to guess
    puzzleword = arrpw[Math.floor(Math.random() * arrpw.length)];
    arrpuzzleword = puzzleword.split("");
    //alert(puzzleword);

    //Hide excess * to match the length of the puzzle word.
    for (var i = 0; i < 10; i++) {
        if (i >= puzzleword.length) {
            document.getElementById("alpha" + i).style.display = "none"; //hide
        } else {
            document.getElementById("alpha" + i).style.display = ""; //show
        }
    }

    document.getElementById("play").disabled = true;
    document.getElementById("msg").value = "";
}

//traping keys
document.onkeyup = function (event) {

    console.log("you pressed :" + event.key);
    var currentkey = event.key.toUpperCase();
    var lg = document.getElementById("lettersguessed");
    var gl = document.getElementById("guessesleft");
    var msg = document.getElementById("msg");
    var ws = document.getElementById("wins");
    var ls = document.getElementById("losses");

    //when the game gets over, disable do not handle key up further.
    if (msg.value == "CONGRATULATIONS, YOU WON!!!" || msg.value == "GAME OVER, YOU LOST !!!") {
        return
    }

    msg.value = "";
    //when the key was already guessed, no need to check further.
    if (lg.value.indexOf(currentkey) >= 0) {
        msg.value = currentkey + ' was already guessed.';
        return
    }

    //when the keypressed exist in puzzleword
    if (puzzleword.indexOf(currentkey) >= 0) {
        //alert("//right guess");
        for (var i = 0; i < arrpuzzleword.length; i++) {
            if (currentkey == arrpuzzleword[i]) {
                document.getElementById("alpha" + i).innerHTML = currentkey;
            }
        }


        //find if any stars left in the alphas, if no user wins
        var foundstar = false;
        for (var i = 0; i < arrpuzzleword.length; i++) {
            if (document.getElementById("alpha" + i).innerHTML == "*") {
                foundstar = true;
                break;
            }
        }
        //msg.value = "foundstar: " + foundstar;
        if (foundstar == false) {
            ws.value = parseInt(ws.value) + 1;
            msg.value = "CONGRATULATIONS, YOU WON!!!";
            document.getElementById("play").disabled = false;
        }

    }
    else { //-1
        //alert("//wrong guess");
        lg.value = lg.value + currentkey + ' ';
        gl.value = gl.value - 1;
        if (gl.value == 0) {
            ls.value = parseInt(ls.value) + 1;
            msg.value = "GAME OVER, YOU LOST !!!";
            document.getElementById("play").disabled = false;
        }
    }

}

