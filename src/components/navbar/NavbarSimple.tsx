import classes from "./NavbarSimple.module.css";
import { Link } from "react-router-dom";
import { menuData } from "../../routes/menuData";
import { useTranslation } from "react-i18next";

interface NavbarSimpleProps {
  active: string;
  setActive: (value: string) => void;
}

const NavbarSimple: React.FC<NavbarSimpleProps> = ({ active, setActive }) => {
  const { t } = useTranslation();

  const links = menuData.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      key={item.label}
      to={item.link}
      onClick={() => {
        setActive(item.label);
      }}
    >
      {t(`${item.label}`)}
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>
    </nav>
  );
};

export default NavbarSimple;
