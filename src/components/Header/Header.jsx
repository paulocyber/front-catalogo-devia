import React, { useState } from "react";
import './Header.css';
import CartButton from "../CartButton/CartButton";
import Menu from "../Menu/Menu";


function Header({valor, onChange}) {

    return (
        <header className="hearder">
            <div className="container_menu">
                <img className="logo" src="logodevia.png" alt="logo__devia" />
                <div className="input_search">
                        <div className="search">
                            <input
                                type="search"
                                id="default-search"
                                className="p-4 pl-1 text-sm border border-gray-200 rounded-lg bg-gray-50 "
                                placeholder="Pesquisar"
                                value={valor}
                                onChange={onChange}
                                loading
                            />
                            <div className="icon-search">
                                <ion-icon name="search-outline"></ion-icon>
                            </div>
                        </div>

                </div>
                <div className="container_button">
                    <CartButton />
                    <Menu/>
                </div>

            </div>
        </header>
    );
}

export default Header;