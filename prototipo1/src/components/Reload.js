import { useEffect } from 'react'

const ReloadAlert = () => {
    useEffect(() => {
        const unloadCallback = (event) => {
          event.preventDefault();
          event.returnValue = "";
          return "";
        };
      
        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, []);
    
}

export default ReloadAlert;