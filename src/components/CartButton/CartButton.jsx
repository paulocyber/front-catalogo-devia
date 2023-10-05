import React from "react";
import { MdOutlineWhatsapp } from 'react-icons/md';
import ReactWhatsapp from 'react-whatsapp';

import './CartButton.css';

function CartButton() {
    return (
        <div className="whatsapp_icon">
            <ReactWhatsapp number="(11) 969234702" message="Olá mundo">
                < MdOutlineWhatsapp />
            </ReactWhatsapp>
        </div>
    );
}

export default CartButton;