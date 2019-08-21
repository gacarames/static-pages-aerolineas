var bw = new checkBrowser();
var fromLeft = 15; 				// How much from the left of the cursor should the div be
var fromTop = 15; 				// How much from the top of the cursor should the div be

function deActivate() { 
	document.getElementById('ToolTip').style.display = "none"; 
}

//browsercheck
function checkBrowser() {
	this.ver = navigator.appVersion;
	this.dom = document.getElementById?1:0;
	this.ie6 = (this.ver.indexOf("MSIE 6")>-1 && this.dom) ? 1 : 0;
	this.ie5 = (this.ver.indexOf("MSIE 5")>-1 && this.dom) ? 1 : 0;
	this.ie4 = (document.all && !this.dom) ? 1 : 0;
	this.ns5 = (this.dom && parseInt(this.ver) >= 5) ? 1 : 0;
	this.ns4 = (document.layers && !this.dom) ? 1 : 0;
	this.bw = (this.ie6 || this.ie5 || this.ie4 || this.ns4 || this.ns5);
	return this;
}

//Initilizes the objects -------------------------------------
function Activate(){
	oCursor = new makeCursorObj('ToolTip');
	scrolled = bw.ns4 || bw.ns5 ? "window.pageYOffset" : "document.body.scrollTop";
	if (bw.ns4) document.captureEvents(Event.MOUSEMOVE);
	document.onmousemove = move;
}

//Contructs the cursorobjects -------------------------------------
function makeCursorObj(obj,nest) {

	nest=(!nest) ? '':'document.'+nest+'.';										
	this.css=bw.dom ? document.getElementById(obj).style:bw.ie4 ? document.all[obj].style : bw.ns4 ? eval(nest+"document.layers." +obj) : 0;														
	this.moveIt = b_moveIt; 
	return this;
}

function b_moveIt(x,y) { 
	this.x = x; 
	this.y = y; 
	this.css.left = this.x; 
	this.css.top = this.y;
}

function EnterContent(elementID,Titulo,Descricao) {
	ContentInfo = '<table border="0" width="100%" cellspacing="0" cellpadding="0" id="BPagTTInternTable">';
	ContentInfo += '<tr><td width="100%" id="BPagTTTit">'+Titulo+'</td></tr>';
	ContentInfo += '<tr><td width="100%" id="BPagTTDesc">'+Descricao+'</td></tr>';
	ContentInfo += '</table>';
	
	document.getElementById('ToolTip').innerHTML = ContentInfo;
	document.getElementById('ToolTip').style.display = "block"; 
}

//Tracking the mousemove and moves the object along. -------------------------------------
function move(e) {
	x = (bw.ns4 || bw.ns5) ? e.pageX : event.x;
	y = (bw.ns4 || bw.ns5) ? e.pageY : event.y;
	if ( bw.ie4 || bw.ie5 || bw.ie6 ) 
		y = y + eval(scrolled);
	
	oCursor.moveIt(x+fromLeft,y+fromTop);
}