import './styleComponents/Name.css'

function Name(props){
    return(
        <div>
            <p className="titulo">{props.titulo}</p>
            <p className="descripcion">{props.descripcion}</p>
        </div>
    );
}

export default Name;