import React from 'react'

const Error = ({mensaje}) => {
    return ( 
        // Margin 3 padding 4 text aling center el color y como se muestrara el mensaje, son clases de boostrap
        <p className="my-3 p-4 text-center alert-primary">{mensaje}</p>
     );
}
 
export default Error;