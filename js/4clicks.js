var puntosPatron = [0,1,7,6];
var puntosFigura = [5,6,10,9];
var equises = [];
var yeses = [];
var colores = ['red','blue','magenta','green'];

	function crearMalla(capa, numero){
		//Dibujar nodos
		for(var i=0;i<numero;i++){
			for(var j=0;j<numero;j++){
				var punto = new Kinetic.Circle({
				x: 50+100*j,
				y: 50+100*i,
				radius: 16,
				fill: "white",
				stroke: "gray",
				strokeWidth: 4,
				detectionType: "pixel"
				});
				equises.push(50+100*j);
				yeses.push(50+100*i);
				capa.add(punto);
				}
		}
		//Dibujar lineas conectoras
		for(var t=0;t<numero;t++){
			(function() {
				var lineaH = new Kinetic.Line({
					points: [equises[0], yeses[0], equises[numero-1], yeses[0]],
					strokeWidth: 2,
					stroke: "white",
					lineCap: "round"
				});
				lineaH.move(0,100*t);
				capa.add(lineaH);
				lineaH.moveToBottom();
			})();
		}
		for(var k=0;k<numero;k++){
			(function() {
				var lineaV = new Kinetic.Line({
						points: [equises[0], yeses[0], equises[0], yeses[7]],
						strokeWidth: 2,
						stroke: "white",
						lineCap: "round"
					});
					lineaV.move(100*k,0);
					capa.add(lineaV);
					lineaV.moveToBottom();
			})();
		}
	};
	
	function dibujarPatron(capa, puntos){
		var patron = new Kinetic.Polygon({
			points: [equises[puntosPatron[0]], yeses[puntosPatron[0]],equises[puntosPatron[1]], yeses[puntosPatron[1]],equises[puntosPatron[2]], yeses[puntosPatron[2]],equises[puntosPatron[3]], yeses[puntosPatron[3]]],
			fill: "grey",
			stroke: "grey",
			strokeWidth: 1
		});
		capa.add(patron);
		for(var i=0;i<4;i++){
			var punto = new Kinetic.Circle({
					x: equises[puntosPatron[i]],
					y: yeses[puntosPatron[i]],
					radius: 16,
					fill: colores[i],
					stroke: "gray",
					strokeWidth: 3,
					detectionType: "pixel"
					});
			capa.add(punto);
		}
	}
	
	function actualizarLineas(capa){
		var q = capa.figura;

        var green = capa.get('#greenLine')[0];

        /*green.setPoints([q.punto1.attrs.x,q.punto1.attrs.y,
			q.punto2.attrs.x, q.punto2.attrs.y,
			q.punto3.attrs.x, q.punto3.attrs.y,
			q.punto4.attrs.x, q.punto4.attrs.y,
			q.punto1.attrs.x, q.punto1.attrs.y]);*/
	}
	
	function agregarDrag(capa, x, y, color){
			var trans = null;
			var scale = 1;
			
			var drag = new Kinetic.Group({
			x: x,
			y: y,
			draggable: true,
			startScale: scale
			});
			
			var grande = new Kinetic.Circle({
				x: 0,
				y: 0,
				radius: 19,
				fill: "lightgray",
				stroke: "gray",
				strokeWidth: 1,
				});
				
			var peque = new Kinetic.Circle({
				x: 0,
				y: 0,
				radius: 13,
				fill: "light"+color,
				stroke: color,
				strokeWidth: 4,
				});
				
			var invisible = new Kinetic.Circle({
				x: 0,
				y: 0,
				radius: 30,
				});
			
			if(color=="red"){
					peque.setFill("#E81C1C");
					peque.setStroke("#BD1919");
				}
			if(color=="blue"){
				peque.setFill("#0E51A7");
				peque.setStroke("blue");
			}
			if(color=="magenta"){
				peque.setFill("magenta");
				peque.setStroke("#B33092");
			}
			if(color=="green"){
				peque.setFill("#35B53D");
				peque.setStroke("green");
			}
				
				drag.add(grande);
				drag.add(peque);
				drag.add(invisible);
				
				drag.setDragBounds({
					top: 50,
					left: 50,
					right: equises[8],
					bottom: yeses[8]
				});
				
				drag.on("mouseover", function() {
				document.body.style.cursor = "pointer";
				capa.draw();
				});
				
				drag.on("mouseout", function() {
				document.body.style.cursor = "default";
				capa.draw();
				});
				
				drag.on("dragmove", function() {
				document.body.style.cursor = "pointer";
				capa.draw();
				});
				
				drag.on('dragstart', function() {
				if(trans) {
					trans.stop();
				}
				
				drag.moveToTop();

				drag.setAttrs({
				scale: {
				  x: drag.attrs.startScale * 1.4,
				  y: drag.attrs.startScale * 1.4
				}
				});
				});
				
				drag.on('dragend', function() {
				trans = drag.transitionTo({
					duration: 0.7,
					easing: 'elastic-ease-out',
					scale: {
					  x: drag.attrs.startScale,
					  y: drag.attrs.startScale
					}
				});
				
				/*for(var i =0; i<puntosPatron.length; i++){
					if(estaCerca(drag,puntosPatron[i])){
						drag.setAttrs({
						position:{
							x: equises[puntosPatron[i]],
							y: yeses[puntosPatron[i]]
							}
						})
					}
				}*/
				var coso = estaCerca(drag);
				if(coso!=null){
				//alert("wiiii");
						drag.setAttrs({
						position:{
							x: coso[0],
							y: coso[1]
							}
						})
					}
				});
			capa.add(drag);
			return drag;
		}
	
	function estaCerca2(drag, punto) {
		var a = drag;
		var equis = equises[punto];
		var ye = yeses[punto];
		if(a.attrs.x > equis - 50 && a.attrs.x < equis + 50 && a.attrs.y > ye - 50 && a.attrs.y < ye + 50) {
			return true;
		}
		else {
			return false;
		}
	}
	
	function estaCerca(drag){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(drag.attrs.x > equises[j] - 50 && drag.attrs.x < equises[j] + 50 && drag.attrs.y > yeses[i] - 50 && drag.attrs.y < yeses[i] + 50) {
					return res = [equises[j],yeses[i]];
					break;
				}
			}
		}
		return null;
	}
	
	window.onload = function() {
		var escena = new Kinetic.Stage({
			container: "fourclicks",
			width: 300,
			height: 300
		});

		var capaInmovil = new Kinetic.Layer();
		var capaMovil = new Kinetic.Layer();
		
		try{
			crearMalla(capaInmovil, 3);
			dibujarPatron(capaInmovil, puntosPatron);
			
			capaMovil.figura = {
			  punto1: agregarDrag(capaMovil, 150,100, colores[0]),
			  punto2: agregarDrag(capaMovil, 200,150, colores[1]),
			  punto3: agregarDrag(capaMovil, 150,200, colores[2]),
			  punto4: agregarDrag(capaMovil, 100,150, colores[3])
			};
			
			var greenLine = new Kinetic.Line({
          points: [capaMovil.figura.punto1.attrs.x,capaMovil.figura.punto1.attrs.y,
		  capaMovil.figura.punto2.attrs.x, capaMovil.figura.punto2.attrs.y,
		  capaMovil.figura.punto3.attrs.x, capaMovil.figura.punto3.attrs.y,
		  capaMovil.figura.punto4.attrs.x, capaMovil.figura.punto4.attrs.y,
		  capaMovil.figura.punto1.attrs.x, capaMovil.figura.punto1.attrs.y],
          stroke: 'white',
          strokeWidth: 2,
          lineJoin: 'round',
          dashArray: [10, 5]
			});
	
			capaMovil.add(greenLine);
			greenLine.moveToBottom();
			
			capaMovil.beforeDraw(function() {
				actualizarLineas(capaMovil);
			});
			
			escena.on("mouseout", function() {
				capaMovil.draw();
			});
			
			escena.add(capaInmovil);
			escena.add(capaMovil);
		}
		
		catch(err)
			{
			txt="Hubo un error!! :(\n\n";
			txt+="Descripción: " + err.message + "\n\n";
			txt+="Presionar ''Aceptar''.\n\n";
			alert(txt);
		}
	}