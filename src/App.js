import React, {useState,useEffect} from 'react';
import Formulario from './Components/Formulario';
import ListadoImagenes from './Components/ListadoImagen';

function App() {

  // State de la Busqueda de la APP
  const [ busqueda,setBusqueda ] =useState('');
  const [ imagenes,setImagenes ] = useState([]); 
  // State para crear el paginador
  const [ paginaactual, setPaginaActual] = useState(1);
  const [ totalpaginas,setTotalPagina] = useState(1);

  useEffect(() => {
    const consultaApi = async () =>{
      // Para que no ejecute la consulta al estar vacio
      if(busqueda === '')
      return;
      const imagenesPorPagina=30;
      const key = '23877587-9cf55dc551f13f36e8a693a44'
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImagenes(resultado.hits)

      // Calcular el total de paginas ceil es una operacion matematica de dividir el total entre la variable
      const calcularTotalPagina = Math.ceil(resultado.totalHits/imagenesPorPagina);
      setTotalPagina(calcularTotalPagina);

      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior:'smooth'})
    }
    consultaApi();

  }, [busqueda,paginaactual])

  // Definir la pagina Anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    if(nuevaPaginaActual === 0)
      return;
    setPaginaActual(nuevaPaginaActual);
  }
  // Definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    if(nuevaPaginaActual > totalpaginas) return;
    setPaginaActual(nuevaPaginaActual)
  }

  return (
    <div className="container">
      <div className="jumbotron">
        {/* Para que el texto este centrado horizontalmente  */}
        <p className="lead text-center">Buscardor de imagenes</p>
        <Formulario
          setBusqueda={setBusqueda}
          setPaginaActual={setPaginaActual}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />

      {(paginaactual === 1) ? null : (
        <button
          type="button"
          className="bbtn btn-info mr-1"
          onClick = {paginaAnterior}
          >&laquo; Anterior</button>
      )}

      {(paginaactual === totalpaginas) ? null : (
        <button
          type="button"
          className="bbtn btn-info mr-1"
          onClick={paginaSiguiente}
          >Siguiente &raquo;</button>
      )}
      </div>
    </div>
  );
}

export default App;