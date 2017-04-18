var lienzo = Snap("#svg");
var ubicacionString;

function createSVG_withArgs(theForm) {
	//Drag from phone
	var move = function(dx, dy, x, y) {
		var clientX, clientY;
		if ((typeof dx == 'object') && (dx.type == 'touchmove')) {
			clientX = dx.changedTouches[0].clientX;
			clientY = dx.changedTouches[0].clientY;
			dx = clientX - this.data('ox');
			dy = clientY - this.data('oy');
		}
		this.attr({
			transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
		});
	}
	var start = function(x, y, ev) {
		if ((typeof x == 'object') && (x.type == 'touchstart')) {
			x.preventDefault();
			this.data('ox', x.changedTouches[0].clientX);
			this.data('oy', x.changedTouches[0].clientY);
		}
		this.data('origTransform', this.transform().local);
	}
	var stop = function() {}
	elemento = lienzo.rect(300, 50, theForm.width.value, theForm.height.value)
		.attr({
				fill: theForm.fill.value,
				stroke: theForm.stroke.value,
				strokeWidth: theForm.strokeWidth.value
		})
		.drag()
		.data("contenido", theForm.data.value)
		.dblclick(
			function() {
				if (this.data().contenido.leght > 0){
					console.log(this.data().contenido + " borrado");
				}
				else {
					console.log("Elemento borrado.");
				}
				this.remove()
			}
		)
		.hover(
			function() {
				console.log(this.toString())
				if (this.data().contenido.leght > 0){
					console.log(this.data().contenido)
				}
			}
		)
		.touchstart(start)
		.touchmove(move)
		.touchend(stop)
};

function createSVG_sampleBox() {
	elemento = lienzo.rect(300, 50, 100, 100)
		.attr({
			fill: "#c4c4c4",
			stroke: "#000000",
			strokeWidth: 1
		})
		.drag()
		.data("contenido", "8408-E8E: Server 1")
		.dblclick(
			function() {
				ubicacionString = this.toString();
				this.remove()
				alert(this.data().contenido + " borrado");
			}
		)
		.hover(
			function() {
				console.log(this.data().contenido)
			}
		);
};

function LoadBefore(){
	if (ubicacionString != undefined) {
		console.log(ubicacionString);
		var before = Snap.parse(ubicacionString).select("*")
		.drag()
		.dblclick(
			function() {
				ubicacionString = this.toString();
				this.remove()
			}
		);
		lienzo.append(before);
	}
	else console.log("Debe haber borrado algo antes.");
};

function importSVG_Image() {
	var grupo = lienzo.group();
	var elemento = Snap.load("img/block.svg", function(loadedFragment) {
		grupo.append(loadedFragment);
		grupo.drag()
		.dblclick(
			function(){
				ubicacionString = this.toString();
				this.remove();
			}
		)
		.hover(
			function(){
				console.log(this.toString())
			});

		lienzo.append(elemento);
	});
};