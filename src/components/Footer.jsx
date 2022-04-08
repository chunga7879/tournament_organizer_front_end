import logo from '../images/hc_logo.png';


export default function Footer() {
    return (
        <footer>
            <div className="footer_logo">
                <div className="footer_logo_container">
                    <img src={logo} alt="Hairless Cat Logo" className="logo"/>
                </div>
                <div className="footer_name">Tournament Organizer</div>
            </div>

            <p className="copyright">
                &copy; Hairless Cat. All Rights Reserved.
            </p>

        </footer>
    );
}
