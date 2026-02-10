import { Link } from "react-router-dom";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
export default function Footer() {
  return (
    <>
      <section className="footer" id="contact">
        <div className="footerCol">
          <h2 className="font-bold text-md">About Site</h2>
          <p className="font-light text-xs">
            This website is a simple and secure notes management platform that
            allows users to create, organize, and track their personal notes
            efficiently. Users can easily add new notes, edit existing ones, and
            mark completed tasks as “Done” to keep their work organized and
            focused. The system is designed to provide a clean and user-friendly
            experience, helping individuals manage daily tasks, reminders, and
            ideas in one convenient place while ensuring that all notes remain
            accessible whenever needed.
          </p>
        </div>
        <div className="footerCol">
          <h2 className="font-bold text-md">My Account</h2>
          <Link to={"/profile"}>My Account</Link>
        </div>
        <div className="footerCol">
          <h2 className="font-bold text-md">Important Links</h2>
          <Link to={"#"}>Technical Support</Link>
        </div>
        <div className="footerCol">
          <h2 className="font-bold text-md">Contact us</h2>
          <p>
            <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon> 01000400154
          </p>
          <Link to={"mailto:diaahassan777@gmail.com"}>
            <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>{" "}
            diaahassan777@gmail.com
          </Link>
        </div>
      </section>
    </>
  );
}
