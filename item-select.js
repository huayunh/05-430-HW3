var buttons = document.getElementsByClassName("item");
function onClick(n){
	removeSelection();
	document.getElementById('button'+n).classList.add("selected");					
};

function removeSelection(){
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].classList.remove("selected");
	} 
}
