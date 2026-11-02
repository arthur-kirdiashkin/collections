import "./footer.css";
import yeahub from "../../assets/yeahub.png";
import { SOCIALS } from "../../constants/constants";

export default function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="container">
          <img className="footer__title" src={yeahub} alt="Заголовок" />
          <p className="footer__subtitle">
            Выбери, каким будет IT завтра, вместе с нами
          </p>
          <p className="footer__desc">
            YeaHub — это полностью открытый проект, призванный объединить и
            улучшить IT- сферу. Наш исходный код доступен для просмотра на
            GitHub. Дизайн проекта также открыт для ознакомления в Figma.
          </p>
          <hr className="footer__hr" />
          <div className="footer-info">
            <div className="footer__links">
              <span className="footer__copyright">© 2024 YeaHub</span>
              <a href="#!" className="footer__doc-link">
                Документы
              </a>
            </div>
            <div className="footer-wrapper">
              <p className="footer__social-label">
                Ищите нас и в других соцсетях @yeahub_it
              </p>
              <ul className="footer__social-list">
                {SOCIALS.map(({ id, icon, alt }) => (
                  <li key={id} className="footer__social-item">
                    <a href="#!" className="footer__social-link">
                      <img src={icon} alt={alt} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
