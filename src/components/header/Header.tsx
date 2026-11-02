import logo from "../../assets/logo.png";
import yeahub from "../../assets/yeahub.png";
import "./header.css";
import menu from "../../assets/menu.png";
import NavDropdown from "./NavDropdown";
import { PREPARATION_LINKS } from "../../constants/constants";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <div className="header__left">
            <div className="header__logo">
              <img src={logo} alt="Логотип заголовка" />
              <img
                className="header__logo-title"
                src={yeahub}
                alt="Заголовок"
              />
            </div>

            <div className="header__tablet-nav">
              <NavDropdown items={PREPARATION_LINKS} />
            </div>
          </div>

          <ul className="header__list">
            {PREPARATION_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
          <div className="header__buttons">
            <a href="#!" className="header__entr">
              Вход
            </a>
            <button className="header__reg">Регистрация</button>
          </div>
          <img className="header__burger" src={menu} alt="меню" />
        </div>
      </div>
    </header>
  );
}
