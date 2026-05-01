import './Footer.css'
import sellImage from '../assets/sell-image.svg';
import advertiseImage from '../assets/advertise-image.svg';
import giftCardImage from '../assets/gift-cards-image.svg';
import helpCenterImage from '../assets/help-centre-image.svg';

function Footer() {
    return (
        <div className='footer' >
            <div className='footer-main-heading'>
                <div >
                    <p className='footer-heading'>ABOUT</p>
                    <a className='footer-link' href="">Contact Us</a>
                    <a className='footer-link' href="">About Us</a>
                    <a className='footer-link' href="">Careers</a>
                    <a className='footer-link' href="">Press</a>
                    <a className='footer-link' href="">Corporate Information</a>
                </div>

                <div >
                    <p className='footer-heading'>HELP</p>
                    <a className='footer-link' href="">Payments</a>
                    <a className='footer-link' href="">Shipping</a>
                    <a className='footer-link' href="">Cancellation & Returns</a>
                    <a className='footer-link' href="">FAQ</a>
                </div>
                <div >
                    <p className='footer-heading'>CONSUMER POLICY</p>
                    <a className='footer-link' href="">Cancellation & Returns</a>
                    <a className='footer-link' href="">Terms of Use</a>
                    <a className='footer-link' href="">Security</a>
                    <a className='footer-link' href="">Privacy</a>
                    <a className='footer-link' href="">Sitemap</a>
                    <a className='footer-link' href="">Grievance Redressal</a>
                    <a className='footer-link' href="">EPR Compliance</a>
                </div>
                <div >
                    <p className='footer-heading'>Mail Us:</p>
                    <a className='footer-link' >Flipkart Internet Privated Limited</a>
                    <a className='footer-link' >Building Alyssa, Ghaziabad &</a>
                    <a className='footer-link' >Clove Embassy Tech Village,</a>
                    <a className='footer-link' >Outer ring Road, Devarabeesannahalli Village</a>
                    <a className='footer-link' >Delhi, 560103</a>
                    <a className='footer-link' >Delhi, India</a>
                </div>

            </div>

            <div className='footer-end'>
                <div className='footer-end-link'>
                    <img src={sellImage} alt="" />
                    <a href="">Become a Seller</a>
                </div>
                <div className='footer-end-link'>
                    <img src={advertiseImage} alt="" />
                    <a href="">Advertise</a>
                </div>
                <div className='footer-end-link'>
                    <img src={giftCardImage} alt="" />
                    <a href="">Gift Cards</a>
                </div>
                <div className='footer-end-link'>
                    <img src={helpCenterImage} alt="" />
                    <a href="">Help Center</a>
                </div>
                <div className='footer-end-link'>
                    <p>&copy; 2001-2025 Flipkart.com</p>
                </div>


            </div>

        </div>
    )
}
export default Footer;





























