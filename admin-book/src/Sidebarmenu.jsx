import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

function Sidebarmenu({ children }) {
    return (
        <div className="container-fluid d-flex">
            <div className="row bg-dark" style={{ width: '18%' }} >
                <div className='bg-dark min-vh-100 col'>
                    <div>

                        <div className='text-white d-flex align-items-center ms-3 mt-2'>
                            <i className='fs-4 bi bi-speedometer'></i>
                            <span className='ms-1 fs-4'>Book Store</span>
                        </div>

                        <hr className='text-secondary' />

                        <ul className='nav nav-pills flex-column'>

                            <li className='nav-item my-1'>
                                <Link to='/books' className='nav-link text-white fs-5'>
                                    <i className='bi bi-book fs-6'></i>
                                    <span className='ms-2 fs-6'>Manage Book</span>
                                </Link>
                            </li>

                            <li className='nav-item my-1'>
                                <Link to='/mobiles' className='nav-link text-white fs-5'>
                                    <i className='bi bi-phone fs-6'></i>
                                    <span className='ms-2 fs-6'>Manage Mobile</span>
                                </Link>
                            </li>

                            <li className='nav-item my-1'>
                                <Link to='/discounts' className='nav-link text-white fs-5'>
                                    <i className='bi bi-magic fs-6'></i>
                                    <span className='ms-2 fs-6'>Discounts</span>
                                </Link>
                            </li>

                            <li className='nav-item my-1'>
                                <Link to='/transaction' className='nav-link text-white fs-5'>
                                    <i className='bi bi-credit-card fs-6'></i>
                                    <span className='ms-2 fs-6'>Transaction</span>
                                </Link>
                            </li>

                            <li className='nav-item my-1'>
                                <Link to='/places' className='nav-link text-white fs-5'>
                                    <i className='bi bi-truck fs-6'></i>
                                    <span className='ms-2 fs-6'>Delivery</span>
                                </Link>
                            </li>

                            <li className='nav-item my-1'>
                                <Link to='/reviews' className='nav-link text-white fs-5'>
                                    <i className='bi bi-star fs-6'></i>
                                    <span className='ms-2 fs-6'>Reviews</span>
                                </Link>
                            </li>

                            <li className='nav-item my-1'>
                                <Link to='/dashboard' className='nav-link text-white fs-5'>
                                    <i className='bi bi-table fs-6'></i>
                                    <span className='ms-2 fs-6'>Dashboard</span>
                                </Link>
                            </li>

                        </ul>

                    </div>
                </div>
            </div>

            <main style={{ width: '100%', margin: '20px' }}>
                {children}
            </main>
        </div>
    )
}

export default Sidebarmenu;