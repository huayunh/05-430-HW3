
textList = [
	"Tired of dull pillows? We specialize in custom decorative throw pillows.",
	"All pillows are handmade in our artisan workshop out of Pittsburgh PA.",
	"You may customize your dream pillow!"
]

window.addEventListener("wheel", onWheel);

var onAnimation = 0;
var currentFrame = 0;
var totalFrames = document.getElementsByClassName("pics").length;

function onWheel(e){
	if (onAnimation || (e.deltaY>=-10 && e.deltaY <= 10)){
		return;
	}

	// change the big picture on the left
	var currentPic = document.getElementById('pic'+currentFrame);
	var nextPic;
	var nextFrame;
	if (e.deltaY > 0) { // if scrolling down
		if (currentFrame < (totalFrames-1)){ // if not at the last picture
			nextFrame = currentFrame + 1;
			nextPic = document.getElementById('pic'+ nextFrame);
			onAnimation = 1;
		} else {
			return;
		}
	} else { // if scrolling up
		if (currentFrame != 0){ // if not at the first picture
			nextFrame = currentFrame - 1;
			nextPic = document.getElementById('pic'+ nextFrame);
			onAnimation = 1;
		} else {
			return;
		}
	}
	currentPic.classList.toggle("hidden");
	nextPic.classList.toggle("hidden");

	// change the texts on the right
	var currentLength = textList[currentFrame].length; 
	var nextLength = textList[nextFrame].length;
	var bragText = document.getElementById("brag");
	bragText.classList.toggle("changing");
	var animationFrame = 0;
	var totalAnimationFrames = 15;
	var animateTimer = setInterval(function(){
		animationFrame +=1;
		bragText.innerHTML = randomText(
			Math.floor((animationFrame/totalAnimationFrames)*(nextLength-currentLength))
			+currentLength);
		if (animationFrame == totalAnimationFrames){
			bragText.innerHTML = textList[nextFrame];
			clearInterval(animateTimer);
			onAnimation = 0;
			bragText.classList.toggle("changing");
			animationFrame = 0;
		}
	}, 50);
	currentFrame = nextFrame;
	var lock
}

// return a string of length n
function randomText(n){
	var str = "abcdefghijklmnopqrstuvwxyz.,abcdefghijklmnopqrstuvwxyz.,abcdefghijklmnopqrstuvwxyz.,abcdefghijklmnopqrstuvwxyz.,"
	return getRandomSubarray(str.split(""), n).join("");
}

// https://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}
