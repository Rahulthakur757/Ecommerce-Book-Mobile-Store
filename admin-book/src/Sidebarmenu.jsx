import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
function Sidebarmenu({ children }) {
    return (
        <div className="container-fluid d-flex">
            <div className="row bg-dark" style={{ width: '18%' }} >
                <div className='bg-dark min-vh-100 col'>
                    <div>
                        <a className='text-decoration-none text-white d-flex align-itemcenter ms-3 mt-2'>
                            <i className=' fs-4 bi bi-speedometer'></i>
                            <span className='ms-1 fs-4'>Book Store</span>
                        </a>
                        <hr className='text-secondry' />
                        <ul className='nav nav-pills flex-column'>
                           
                            <li className='nav-item text-white fs-4 my-1'>
                                <a href='/books' className='nav-link text-white fs-5' aria-current="page">
                                    <i className='bi bi-book fs-6'></i>
                                    <span className='ms-2 fs-6'>Manage Book</span>
                                </a>
                            </li>
                            <li className='nav-item text-white fs-4 my-1'>
                                <a href='/mobiles' className='nav-link text-white fs-5' aria-current="page">
                                    <i className='bi bi-phone fs-6'></i>
                                    <span className='ms-2 fs-6'>Manage Mobile</span>
                                </a>
                            </li>
                            <li className='nav-item text-white fs-4 my-1'>
                                <a href='/discounts' className='nav-link text-white fs-5' aria-current="page">
                                    <i className='bi bi-magic fs-6'></i>
                                    <span className='ms-2 fs-6'>Discounts</span>
                                </a>
                            </li>
                            <li className='nav-item text-white fs-4 my-1'>
                                <a href='/transaction' className='nav-link text-white fs-5' aria-current="page">
                                    <i className='bi bi-credit-card fs-6'></i>
                                    <span className='ms-2 fs-6'>Transaction</span>
                                </a>
                            </li>
                            <li className='nav-item text-white fs-4 my-1'>
                                <a href='/places' className='nav-link text-white fs-5' aria-current="page">
                                    <i className='bi bi-truck fs-6'></i>
                                    <span className='ms-2 fs-6'>Delivery</span>
                                </a>
                            </li>
                            <li className='nav-item text-white fs-4 my-1'>
                                <a href='/reviews' className='nav-link text-white fs-5' aria-current="page">
                                    <i className='bi bi-star fs-6'></i>
                                    <span className='ms-2 fs-6'>Reviews</span>
                                </a>
                            </li>
                            <li className='nav-item text-white fs-4 my-1'>
                                <a href='/dashboard' className='nav-link text-white fs-5' aria-current="page">
                                    <i className='bi bi-table fs-6'></i>
                                    <span className='ms-2 fs-6'>Dashboard</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <main style={{ width: '100%', margin: '20px' }}>{children}</main>
        </div>
    )
}

export default Sidebarmenu