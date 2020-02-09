/*Iniciamos uso de libreria externa Grid https://haltu.github.io/muuri/ */
var grid= new Muuri('.grid',{layout: {
    rounding: false
  }});


/*Funcionalidades*/

window.addEventListener('load',()=>{
	document.getElementById('grid').classList.add('activoImagenes');
});



function realizarFiltrado(){
    
    var categorias = document.querySelectorAll('#cajaCategorias a');

	categorias.forEach((categoria)=>{
		categoria.addEventListener('click',(categoria) => {
			
			categoria.preventDefault();
			//Elimino la clase activos
			categorias.forEach((categoria) => categoria.classList.remove('categoriaActivada') );
			//Asigno la clase activa
			categoria.target.classList.add('categoriaActivada');
			
			//target devuelve el <a>
			var nombreCategoria = categoria.target.innerHTML.toLowerCase();
			
			//usamos if-inline y methods de grid para filtrado y motrar
			nombreCategoria == "todos" ? grid.filter('[data-categoria]'):
			grid.filter(`[data-categoria = "${nombreCategoria}"]`);
			
		});

	});
}

realizarFiltrado();

function realizarBusqueda(){
	document.querySelector('#barraDeBusqueda').addEventListener('input', (valorABuscar)=>{
		var busqueda = valorABuscar.target.value;
		grid.filter((item) => item.getElement().dataset.etiqueta.includes(busqueda));
	});
}
realizarBusqueda();

function generarPantallaUnica(){
	var pantallaUnica = document.getElementById('cajaPantallaUnica');
	
	var imagenes = document.querySelectorAll('.grid .item img');

	imagenes.forEach((imagen)=>{
		var ruta = imagen.getAttribute('src');
		const descripcion = imagen.parentNode.parentNode.dataset.description;

		imagen.addEventListener('click',()=>{
			pantallaUnica.classList.add('activoPantallaUnica');
			document.querySelector('#cajaPantallaUnica img').src = ruta;
			document.querySelector('#cajaPantallaUnica .cajaDescripcion').innerText = descripcion;

		});

	});

	funcionalidadBoton(pantallaUnica);

}

generarPantallaUnica();



function funcionalidadBoton(pantallaUnica){

  document.getElementById('botonCerrar').addEventListener('click',()=>{
		pantallaUnica.classList.remove('activoPantallaUnica');

	});

	pantallaUnica.addEventListener('click',(evento)=>{
		evento.target.id =='cajaPantallaUnica' ? pantallaUnica.classList.remove('activoPantallaUnica') : '';
	});
};


