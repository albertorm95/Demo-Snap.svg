var s = Snap("#svg");
var highlightRect, lastSelectedEl, firstSelectedEl, activeEl, clickHandler, dragging = false;
var ubicacionString;
var a = "aqui";

var dragStart = function(x, y, ev) {
    this.data('origTransform', this.transform().local);
}

var dragMove = function(dx, dy, ev, x, y) {
    var tdx, tdy;
    var snapInvMatrix = this.transform().diffMatrix.invert();
    snapInvMatrix.e = snapInvMatrix.f = 0;
    tdx = snapInvMatrix.x(dx, dy);
    tdy = snapInvMatrix.y(dx, dy);

    this.attr({
        transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [tdx, tdy]
    });
    highlightRect.transform(this.transform().global.toString());
}

var dragEnd = function() {}

document.onkeypress = function(e) {
    e = e || window.event;
    console.log(e);
    if (e.keyCode == "110") {
        if (lastSelectedEl.parent().type != 'svg') {
            highlightEl(lastSelectedEl.parent());
        } else {
            highlightEl(firstSelectedEl);
        }
    } else if (e.keyCode == "97") {
        animateEl(lastSelectedEl);
    }

};

function rectObjFromBB(bb) {
    return {
        x: bb.x,
        y: bb.y,
        width: bb.width,
        height: bb.height
    }
}

function highlightEl(el) {
	//console.log(a+3)
    if (lastSelectedEl) {
    	console.log(a+3+"if1")
        lastSelectedEl.undrag();
    }
    if (highlightRect) {
    	console.log(a+3+"if2")
        highlightRect.remove();
    }

    highlightRect = s.rect(rectObjFromBB(el.getBBox(1)))
        .attr({
            fill: "none",
            stroke: "red",
            strokeDasharray: "5,5"
        });

    highlightRect.transform(el.transform().global.toString());


    lastSelectedEl = el;
    el.drag(dragMove, dragStart, dragEnd)
    .dblclick(
    	function(){
    		ubicacionString = this.toString();
    	}
    );
}

function getEventElement(ev) {
	//console.log(a+2)
    if (ev.target.localName == 'svg') {
        return;
    };
    var snapEl = Snap(ev.target);
    firstSelectedEl = snapEl;
    highlightEl(snapEl);
}

function removeClickHandlerFromSVG() {
    s.unclick();
}

function addHandlerToSVG() {
    s.click(function(ev) {
    	//console.log(a+1)
        getEventElement(ev)
    })
}

function LoadBefore(){
	if (ubicacionString != undefined) {
		var before = Snap.parse(ubicacionString).select("*")
		.drag()
		.dblclick(
			function() {
				ubicacionString = this.toString();
				this.remove()
			}
		);
		s.append(before);
	}
	else console.log("Debe haber borrado algo antes.");
};
var grupo = s.group();
var tux = Snap.load("img/kiwi.svg", function(loadedFragment) {
    grupo.append(loadedFragment);
    grupo.dblclick(
    	function(){
    		ubicacionString = this.toString();
    		this.remove();
    	}
    );
    s.append(loadedFragment);
    addHandlerToSVG();
});