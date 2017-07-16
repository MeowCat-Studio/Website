document.onselectstart = function() {
	return false
};
var nI = 0;
var kI = 0;
var run = false;
function setOpacity(obj, o) {
	if (o < 0) {
		o = 0
	} else {
		if (o > 100) {
			o = 100
		}
	}
	if (obj.filters) {
		obj.filters.alpha.opacity = o
	} else {
		obj.style.opacity = o / 100
	}
}
function tpr__(p) {
	P1.style.left = 50 - (2.5 * p) + "%";
	P1.style.width = (2.5 * p) + "%";
	setOpacity(P1i, 0.5 * p * p);
	if (p == 20) {
		run = false
	}
}
function tpr_(p) {
	P2.style.width = 50 - (2.5 * p) + "%";
	setOpacity(P2i, 100 - 0.5 * (p * p));
	if (p == 20) {
		P2i.src = 
		imgsrc[kI].src;
		setOpacity(P2i, 100);
		P2.style.width = "50%";
		for (var i = 1; i <= 20; i++) {
			setTimeout("tpr__(" + i + ")", i * 32)
		}
	}
}
function tpr() {
	if (!run) {
		run = true;
		P01i.src = imgsrc[kI].src;
		P1.style.width = 0;
		kI++;
		if (kI >= nI) {
			kI = 0
		}
		titLe(kI);
		P02i.src = imgsrc[kI].src;
		P1i.src = imgsrc[kI].src;
		for (var i = 1; i <= 20; i++) {
			setTimeout("tpr_(" + i + ")", i * 32)
		}
	} else {
		setTimeout("tpr()", 100)
	}
}
function tpl__(p) {
	P2.style.width = (2.5 * p) + "%";
	setOpacity(P2i, 0.5 * p * p);
	if (p == 20) {
		run = false
	}
}
function tpl_(p) {
	P1.style.left = (2.5 * p) + "%";
	P1.style.width = 40 + (10 - 2.5 * p) + "%";
	setOpacity(P1i, 100 - 0.5 * (p * p));
	if (p == 20) {
		P1i.src = imgsrc[kI].src;
		setOpacity(P1i, 100);
		P1.style.left = 0;
		P1.style.width = "50%";
		for (var i = 1; i <= 20; i++) {
			setTimeout("tpl__(" + i + ")", i * 32)
		}
	}
}
function tpl() {
	if (!run) {
		run = true;
		P02i.src = imgsrc[kI].src;
		P2.style.width = 0;
		kI--;
		if (kI < 0) {
			kI = nI - 1
		}
		titLe(kI);
		P01i.src = imgsrc[kI].src;
		P2i.src = imgsrc[kI].src;
		for (var i = 1; i <= 20; i++) {
			setTimeout("tpl_(" + i + ")", i * 32)
		}
	} else {
		setTimeout("tpl()", 100)
	}
}
function titLe(p) {
	document.getElementById("txtbox").innerHTML = imgsrc[p].alt
}
onload = function() {
	imgsrc = document.getElementById("imgsrc").getElementsByTagName("img");
	DB = document.getElementById("dhtmlbook");
	P01 = DB.getElementsByTagName("span")[0];
	P01i = P01.getElementsByTagName("img")[0];
	P02 = DB.getElementsByTagName("span")[1];
	P02i = P02.getElementsByTagName("img")[0];
	P1 = DB.getElementsByTagName("span")[2];
	P1i = P1.getElementsByTagName("img")[0];
	P2 = DB.getElementsByTagName("span")[3];
	P2i = P2.getElementsByTagName("img")[0];
	nI = imgsrc.length;
	P1i.src = imgsrc[kI].src;
	P2i.src = imgsrc[kI].src;
	titLe(kI);
	DB.style.visibility = "visible"
};