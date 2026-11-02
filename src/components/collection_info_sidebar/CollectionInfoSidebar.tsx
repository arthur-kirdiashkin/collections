import SidebarChip from "../sidebar/SidebarChip";
import "./collection_info_sidebar.css";
import "../sidebar/sidebar-group.css";
import close from "../../assets/close.png";
import type { Collection } from "../../types/collections.types";

interface CollectionInfoSidebarProps {
  collection: Collection;
  handleClose: () => void;
  isOpen: boolean;
}

export default function CollectionInfoSidebar({
  collection,
  handleClose,
  isOpen,
}: CollectionInfoSidebarProps) {
  const {
    specializations,
    keywords,
    createdBy,
    isFree,
    questionsCount,
    company,
  } = collection;

  return (
    <aside
      className={`collection-info-sidebar ${isOpen ? "collection-info-sidebar--open" : ""}`}
    >
      <img
        onClick={handleClose}
        className="close-btn"
        src={close}
        alt="Закрыть"
      />
      <section className="collection-info-spec">
        <p className="collection-info__title">Специализация</p>
        <div className="sidebar-group__content">
          {specializations.map((spec) => (
            <SidebarChip key={spec.id} value={spec.title} isActive={false} />
          ))}
        </div>
      </section>
      <section className="collection-info-free">
        <p className="collection-info__title">Доступ</p>
        <div className="sidebar-group__content">
          <SidebarChip
            key={1}
            value={isFree ? "Для всех" : "Для участников"}
            isActive={false}
          />
        </div>
      </section>
      {company?.title && (
        <section className="collection-info-company">
          <p className="collection-info__title">Компания</p>
          <div className="sidebar-group__content">
            <SidebarChip key={1} value={company.title} isActive={false} />
          </div>
        </section>
      )}
      {questionsCount > 0 && (
        <section className="collection-info-count">
          <p className="collection-info__title">Количество вопросов</p>
          <div className="sidebar-group__content">
            <SidebarChip
              key={1}
              value={String(questionsCount)}
              isActive={false}
            />
          </div>
        </section>
      )}
      <section className="collection-info-keywords">
        <p className="collection-info__title">Ключевые слова</p>
        <div className="sidebar-group__content">
          {keywords.map((key, index) => (
            <p key={index} className="collection-info-keywords__title pointer">
              #{key}
            </p>
          ))}
        </div>
      </section>
      {createdBy?.username && (
        <section className="collection-info-author">
          <p className="collection-info-author__title">
            Автор:
            <span className="collection-info-author__name">
              {createdBy.username}
            </span>
          </p>
        </section>
      )}
    </aside>
  );
}
