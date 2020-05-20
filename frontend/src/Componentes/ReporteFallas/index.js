import React, { Component } from 'react';

import Computadoras from './Computadoras/'


class ReporteFallas extends Component {
    render() {
        return (
            <div className="w-100">
                {/* <Salones/> */}
                <Computadoras/>
            </div>
        );
    }
}

export default ReporteFallas;