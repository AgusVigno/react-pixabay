import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';


function App() {

	const [busqueda, guardarBusqueda] = useState('');
	const [imagenes, guardarImagenes] = useState([]);
	
	//implementar un paginado
	const [paginaActual, guardarPaginaActual] = useState(1);
	const [totalPaginas, guardarTotalPaginas] = useState(5);

	useEffect(() => {
		const consultarAPI = async () => {
			//evitamos que cargue al iniciar la pagina
			if(busqueda === '') return null;
			const imagenesPorPagina = 30;
			const apiKey = '16771829-679b3d0dba38be73f0f71d71e';
			const url = `https://pixabay.com/api/?key=${apiKey}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

			const resultado = await fetch(url);
			const respuesta = await resultado.json();
			guardarImagenes(respuesta.hits);

			//calcular el total de paginas
			const calcularTotalPaginas = Math.ceil(respuesta.totalHits / imagenesPorPagina);
			guardarTotalPaginas(calcularTotalPaginas);

			//mover la pantalla hacia arriba
			const jumbotron = document.querySelector('.jumbotron');
			jumbotron.scrollIntoView({ behavior: 'smooth'});

		}
		consultarAPI();
	}, [busqueda, paginaActual]);

	const paginaAnterior = () => {
		const nuevaPaginaActual = paginaActual - 1;
		
		if (nuevaPaginaActual === 0) return
		guardarPaginaActual(nuevaPaginaActual);
	}

	const paginaSiguiente = () => {
		const nuevaPaginaActual = paginaActual + 1;
		
		if (nuevaPaginaActual > totalPaginas) return
		guardarPaginaActual(nuevaPaginaActual);
	}

	return (
		<div className="container">
			<div className="jumbotron">
				<p className="lead text-center">Buscador de imágenes</p>

				<Formulario 
					guardarBusqueda={guardarBusqueda}
				/>
			</div>
			<div className="row justify-content-center">
				<ListadoImagenes 
					imagenes={imagenes}
				/>
				
				{ (paginaActual === 1)
				? 
					null 
				: 
					<button
						type="button"
						className="bbtn btn-info mr-1"
						onClick={paginaAnterior}
					>&laquo; Anterior</button> 
				}
				{ (paginaActual === totalPaginas ) 
				? 
					null 
				:
					<button
						type="button"
						className="bbtn btn-info mr-1"
						onClick={paginaSiguiente}
					>Siguiente &raquo;</button> 
				}
			</div>
		</div>
	);
}

export default App;
