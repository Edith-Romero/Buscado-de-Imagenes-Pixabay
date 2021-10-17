
import React, {useState} from 'react';
import Error from './Error';
import PropTypes from 'prop-types';


const Formulario = ({setBusqueda,setPaginaActual}) => {

    const [termino,setTermino] = useState('')
    const [error,setError] = useState('')

    const buscarImagenes = e =>{
        e.preventDefault();

        // Validar

        if(termino.trim() === '') {
            setError(true);
            return;
        }
        setError(false);

        // enviar el termino de busquedas hacia el componente principal
         setBusqueda(termino);
        //  Reiniciar el state cuando esta en una busqueda se hace estando en una busqueda anterior
         setPaginaActual(1);
    }
    return ( 
        <form
            onSubmit={buscarImagenes}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: futbol o cafe"
                        onChange={e =>setTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
            {error ? <Error mensaje="Agregar un termino de busqueda"/> : null}
        </form>        
     );
}
Formulario.proptype = {
    setBusqueda: PropTypes.func.isRequired,
    setPaginaActual: PropTypes.func.isRequired,
} 

export default Formulario;