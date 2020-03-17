import React, { Component } from 'react';
import Salones from './Salones/'
import Computadoras from './Computadoras/'


class ReporteFallas extends Component {
    render() {
        return (
            <div>
                <Salones/>
                <Computadoras/>
            </div>
        );
    }
}

export default ReporteFallas;