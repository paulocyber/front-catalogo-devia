import React, { useEffect } from 'react'

import './modal.css'

const Modal = ({ isOpen, setOpenModal, produto, children }) => {
    // Assim que eu entrar no modal ele desabilita scroll - se eu sair ele volta
    useEffect(() => {
        if (isOpen) {
            // primeiro vou desabilitar o componente pai
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen])

    if (isOpen && produto) {
        return (
            <div className='Background_modal'>
                <div className='container_buttonExit ml-10'>
                    <button onClick={() => setOpenModal(false)} type="button" className="Buttonexit"><ion-icon name="close-outline"></ion-icon></button>
                </div>
                <div className='Conteudo_modal'>
                    {children}
                </div>
            </div>
        )
    } else { return null }
}

export default Modal