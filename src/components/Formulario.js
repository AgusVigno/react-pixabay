import React, {useState} from 'react';
import Error from './Error';

const Formulario = ({guardarBusqueda}) => {

    const [termino, guardarTermino] = useState('');
    const [error, actualizarError] = useState(false);

    const realizarBusqueda = e => {
        e.preventDefault();

        //validar
        if(termino.trim() === ''){
            actualizarError(true);
            return
        }

        //pasar al componente principal el termino de busqueda
        actualizarError(false);
        
        guardarBusqueda(termino);
    }

    return (
        <form
            onSubmit={realizarBusqueda}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo futbol o cafe"
                        onChange={e => guardarTermino(e.target.value)}
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

            {error ? <Error mensaje='Debes completar el término de búsqueda'/> : null}
        </form>
    );
}
 
export default Formulario;