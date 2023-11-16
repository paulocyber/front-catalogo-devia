// Styles
import './Header.css';

// Fotos
import carrinho from './../../assets/carts.png'
import whatappicon from './../../assets/whatsappicon.png'
import iconDevia from './../../assets/logodevia.png'

// Bibliotecas
import ReactWhatsapp from 'react-whatsapp';
import { Link } from 'react-router-dom';

function Header({ valor, onChange }) {

    return (

        <div className="hearder w-screen flex flex-row items-center justify-between shadow-xs">
            <div className="ml-8 md:flex">
                <img className="logo md:w-36 w-28" src={iconDevia} alt="logo__kimaster" />
            </div>
            <span className="w-1/3 md:w-1/3 h-10 bg-gray-200 cursor-pointer border border-gray-300 text-sm rounded-full flex">
                <input type="search" name="serch" placeholder="Search" value={valor} onChange={onChange}
                    className="search flex-grow px-4 rounded-l-full rounded-r-full text-sm text-black font-bold focus:outline-none" />

                <div className="icon_search m-2 mr-5 text-lg md:flex">
                    <ion-icon name="search-outline"></ion-icon>
                </div>
            </span>

            <div className="container_icons flex flex-row-reverse md:mr-8 ml-4 md:flex">

                <Link to='/cart' className="icons bg-white md:px-3 px-2 md:py-3 py-2 m-2 ml-2 rounded-full">
                    <img className='w-5 md:w-6' src={carrinho} />
                </Link>


                <ReactWhatsapp className="icons bg-white md:px-3 px-2 md:py-3 py-2 m-2 rounded-full" number="+558592328282" message="Olá, :) Estou interessado(a) em conhecer mais sobre os produtos que vocês oferece;">
                    <img className='w-5 md:w-6' src={whatappicon} />
                </ReactWhatsapp>

                {/* <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">Link</div> */}
            </div>
        </div>
        // <header className="hearder">
        //     <div className="container_menu">
        //         <img className="logo" src="logobranca.png" alt="logo__kimaster" />
        //         <div className="input_search">
        //                 <div className="search">
        //                     <input
        //                         type="search"
        //                         id="default-search"
        //                         className="p-4 pl-1 text-sm border border-gray-200 rounded-lg bg-gray-50 "
        //                         placeholder="Pesquisar"
        //                         value={valor}
        //                         onChange={onChange}
        //                     />
        //                     <div className="icon-search">
        //                         <ion-icon name="search-outline"></ion-icon>
        //                     </div>
        //                 </div>

        //         </div>
        //         <div className="container_button">
        //             <CartButton />
        //             <Menu/>
        //             <Button />
        //         </div>
        //     </div>
        // </header>
    );
}

export default Header;