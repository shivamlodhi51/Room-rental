import "../styles/Footer.scss"
import logo from './dDesigner.png';
import { LocationOn, LocalPhone, Email } from "@mui/icons-material"
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_left">
        <a href="/"><img width={"50px"} src={logo} alt="logo" /></a>
      </div>

      <div className="footer_center">
        <h3>Useful Links</h3>
        <ul>
          <li>About Us</li>
          <li>Terms and Conditions</li>
          <li>Return and Refund Policy</li>
        </ul>
      </div>

      <div className="footer_right">
        <h3>Contact</h3>
        <div className="footer_right_info">
          <LocalPhone />
          <p>+91 7987290643</p>
        </div>
        <div className="footer_right_info">
          <Email />
          <p>lodhishivam51@gmail.com</p>
        </div>
        {/* <img src="/assets/payment.png" alt="payment" /> */}
      </div>
    </div>
  )
}

export default Footer