import { Link, animateScroll as scroll } from "react-scroll";
import { IoIosArrowDown } from "react-icons/io";

function Arrow(){
    return(
        <Link 
            activeClass="active"
            to="optionsContainer"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}>
                <IoIosArrowDown style={{width: '8.33vw', height: '6.6vw', cursor:"pointer"}}/>
        </Link>
    );
}

export default Arrow;