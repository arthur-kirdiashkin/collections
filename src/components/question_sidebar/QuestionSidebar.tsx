import QuestionMetric from "../question_metric/QuestionMetric";
import SidebarChip from "../sidebar/SidebarChip";
import "./question_sidebar.css";
import "../sidebar/sidebar-group.css";
import close from "../../assets/close.png";
import type { Question } from "../../types/collections.types";

interface QuestionSidebarProps {
  question: Question;
  isOpen: boolean;
  handleClose: () => void;
}

export default function QuestionSidebar({
  question,
  isOpen,
  handleClose,
}: QuestionSidebarProps) {
  const { keywords, rate, complexity, questionSkills, createdBy } = question;

  return (
    <aside
      className={`question-sidebar ${isOpen ? "question-sidebar--open" : ""}`}
    >
      <img
        onClick={handleClose}
        className="close-btn"
        src={close}
        alt="Закрыть"
      />
      <section className="question-levels">
        <p className="question-info__title">Уровень:</p>
        <div className="question-info">
          <QuestionMetric label="Рейтинг" value={rate} />
          <QuestionMetric label="Сложность" value={complexity} />
        </div>
      </section>
      <section className="question-skills">
        <p className="question-info__title">Навыки:</p>
        <div className="sidebar-group__content">
          {questionSkills.map((skill) => (
            <SidebarChip key={skill.id} value={skill.title} isActive={true} />
          ))}
        </div>
      </section>
      <section className="question-keywords">
        <p className="question-info__title">Ключевые слова:</p>
        <div className="sidebar-group__content">
          {keywords.map((key, index) => (
            <p key={index} className="question-keywords__title pointer">
              #{key}
            </p>
          ))}
        </div>
      </section>
      {createdBy?.username && (
        <section className="question-author">
          <p className="question-author__title">
            Автор:
            <span className="question-author__name">{createdBy?.username}</span>
          </p>
        </section>
      )}
    </aside>
  );
}
