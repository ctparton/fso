import React from "react";
import {Alert} from 'react-bootstrap'
const Notification = ({message}) => {
    return (
        <div>
            <Alert variant="success" show="false">{message}</Alert>
        </div>
    )
}

export default Notification