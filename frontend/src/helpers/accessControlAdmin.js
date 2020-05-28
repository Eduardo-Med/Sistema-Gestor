import React from "react"

import { useCookies } from 'react-cookie';
import PaginaPermiso from '../Componentes/PaginaPermiso'
import Menu from '../Componentes/Otros/BarraNavegacion'


export const accessControlAdmin = (WrappepComponent) =>{
    const SecuredControl = ({...props})=>{ 
        const [cookies] = useCookies(['cookie-name']);
        if(!cookies.token){
            return <PaginaPermiso></PaginaPermiso>
        }else{
            if(cookies.tipoUsuario=== '1'){
                return <WrappepComponent {...props} />
            }else{
                return <PaginaPermiso></PaginaPermiso>
            }   
        }
    }
    return SecuredControl
}

export const accessControlAdminAndTecnico = (WrappepComponent) =>{
    const SecuredControl = ({...props})=>{ 
        const [cookies] = useCookies(['cookie-name']);
        if(!cookies.token){
            return <PaginaPermiso></PaginaPermiso>
        }else{
            if(cookies.tipoUsuario=== '1' || cookies.tipoUsuario=== '2'){
                return <WrappepComponent {...props} />
            }else{
                return (
                    <div>
                    <Menu usuario="Admin" />
                    <PaginaPermiso></PaginaPermiso>
                    </div>
                )
                    

                
            }   
        }
    }
    return SecuredControl
}