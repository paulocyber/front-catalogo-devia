import React from "react";
import './Button.css';
import { BsCart3 } from 'react-icons/bs';
import { RiContactsLine } from 'react-icons/ri';
import { BsMegaphone } from 'react-icons/bs';


function Button () {
    return (
        <div className="button">
            <button className="button-car">
                <div><BsMegaphone/></div>
            </button>

            <button className="button-atendimento">
                <div><RiContactsLine/></div>
            </button>

            <button className="button-promocao">
                <div><BsCart3/></div>
            </button>
        </div>
    );
}

export default Button;