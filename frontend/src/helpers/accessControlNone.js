import React from "react"
import { useCookies } from 'react-cookie';
import PaginaPermiso from '../Componentes/PaginaPermiso'

export const accessControlNone = (WrappepComponent) =>{
    const SecuredControl = ({...props})=>{ 
        const [cookies] = useCookies(['cookie-name']);
        if(cookies.token){
            return <PaginaPermiso></PaginaPermiso>
        }else{
                return <WrappepComponent {...props} />
        }
    }
    return SecuredControl
}