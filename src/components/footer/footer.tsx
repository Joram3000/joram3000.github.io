import { FC } from "react";
import "./style.css";

const Footer: FC = () => {
  return (
    <div className="footer">
      <div className="contactBlock">
        <p>
          Mirjam Kroon-Hoekendijk
          <br></br>Trainer en (team-)coach{" "}
        </p>
        <p>KvK 23083220 </p>
        <p>BTW NL 001192641B33</p>
      </div>

      <div className="contactBlock">
        <p>
          e-mail: <strong>mirjam@kroontrainingadvies.com</strong>
        </p>
        <p>tel: 06-53507815</p>
        <p>
          Adres: Dorpsweg 71,
          <br></br>
          4223 ND Hoornaar (ZH)
        </p>
      </div>
    </div>
  );
};

export default Footer;
