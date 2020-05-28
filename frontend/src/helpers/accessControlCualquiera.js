import React from "react"
import { useCookies } from 'react-cookie';
import PaginaPermiso from '../Componentes/PaginaPermiso'
import Menu from '../Componentes/Otros/BarraNavegacion'

export const accessControlCualquiera = (WrappepComponent) =>{
    const SecuredControl = ({...props})=>{ 
        const [cookies] = useCookies(['cookie-name']);
        if(!cookies.token){
            return (
                <div>
                <Menu usuario="Admin" />
                <PaginaPermiso></PaginaPermiso>
                </div>
            )
        }else{
                return <WrappepComponent {...props} />
        }
    }
    return SecuredControl
}