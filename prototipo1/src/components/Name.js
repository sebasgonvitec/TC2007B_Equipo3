import './styleComponents/Name.css'

function Name(props){
    return(
        <div>
            <div className="titulo">{props.titulo}</div>
            <p className="descripcion">{props.descripcion}</p>
        </div>
    );
}

export default Name;