import './stylePages/UploadSearchMain.css'
import Name from '../Name'
import OptionBox from '../OptionBox'
import { AiOutlineFolder } from "react-icons/ai";
import { BsArchive } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";

function UploadMain(){
    return( 
        <div style={{marginLeft:"5.8vw"}}>
            <Name 
                titulo="Subir Archivos"
                descripcion="Selecciona el tipo de archivo que quieres subir"
            />

            <div className="optionsContainer">
                <OptionBox
                    colorbox={
                        <div className='colorBox' style={{background:'#45B2E6'}}>
                            {<AiOutlineFolder className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                        </div>
                    }
                    titulo="JUICIO DE NULIDAD"
                    descripcion="Pequeña descripcion en este espacio que pueda describir de lo que se trata esta seccion"
                    page="/uploadmain/uploadsearch"
                />

                <OptionBox
                    colorbox={
                        <div className='colorBox' style={{background:'#8B2E87'}}>
                            {<BsArchive className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                        </div>
                    }
                    titulo="CARPETA DE INVESTIGACIÓN"
                    descripcion="Pequeña descripcion en este espacio que pueda describir de lo que se trata esta seccion"
                    page="/uploadmain/uploadsearch"
                />

                <OptionBox
                    colorbox={
                        <div className='colorBox' style={{background:'#66C214'}}>
                            {<TbReportAnalytics className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                        </div>
                    }
                    titulo="TITULO 3"
                    descripcion="Pequeña descripcion en este espacio que pueda describir de lo que se trata esta seccion"
                    page="/uploadmain/uploadsearch"
                />

                <OptionBox
                    colorbox={
                        <div className='colorBox' style={{background:'#FFA928'}}>
                            {<BiCommentDetail className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                        </div>
                    }
                    titulo="TITULO 4"
                    descripcion="Pequeña descripcion en este espacio que pueda describir de lo que se trata esta seccion"
                    page="/uploadmain/uploadsearch"
                />

                <OptionBox
                    colorbox={
                        <div className='colorBox' style={{background:'#FCDC4B'}}>
                            {<AiOutlineFolder className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                        </div>
                    }
                    titulo="TITULO 5"
                    descripcion="Pequeña descripcion en este espacio que pueda describir de lo que se trata esta seccion"
                    page="/uploadmain/uploadsearch"
                />

                <OptionBox
                    colorbox={
                        <div className='colorBox' style={{background:'#44B2ED'}}>
                            {<BsArchive className="icon" style={{width:'8.3vw', height:'auto'}}/>}
                        </div>
                    }
                    titulo="TITULO 6"
                    descripcion="Pequeña descripcion en este espacio que pueda describir de lo que se trata esta seccion"
                    page="/uploadmain/uploadsearch"
                />

                
            </div>
            
            
        </div>
    );
}

export default UploadMain;