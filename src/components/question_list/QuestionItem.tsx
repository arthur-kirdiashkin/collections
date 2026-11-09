import "./question_item.css";
import DOMPurify from "dompurify";
import arrowDown from "./../../assets/arrow_down.png";
import arrowRight from "./../../assets/arrow_right.png";
import arrowUpp from "./../../assets/arrow_upp.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Question } from "../../types/collections.types";
import QuestionMetric from "../question_metric/QuestionMetric";

interface QuestionItemProps {
  questions: Question[];
  question: Question;
  collectionId?: string | number;
}

export default function QuestionItem({
  questions,
  question,
  collectionId,
}: QuestionItemProps) {
  const { id, title, shortAnswer, rate, complexity, imageSrc } = question;

  const [isActive, setIsActive] = useState(false);

  const onQuestionClick = () => {
    setIsActive((prev) => !prev);
  };

  const cleanContent = DOMPurify.sanitize(shortAnswer || "");

  return (
    <div className="question-item" key={title}>
      <div className="question-content" onClick={onQuestionClick}>
        <div className="question">
          <div className="question-circle"></div>
          <div className="question-title">{title}</div>
        </div>
        <div>
          {isActive ? (
            <img src={arrowDown} alt="Стрелка вниз" />
          ) : (
            <img src={arrowUpp} alt="Стрелка вверх" />
          )}
        </div>
      </div>
      {isActive && (
        <div className="question-desc">
          <div className="question-info">
            <QuestionMetric label="Рейтинг" value={rate} />
            <QuestionMetric label="Сложность" value={complexity} />
          </div>
          {imageSrc && (
            <div className="question-image">
              <img src={imageSrc} alt="Иллюстрация к вопросу" />
            </div>
          )}
          <div
            className="question-text"
            dangerouslySetInnerHTML={{ __html: cleanContent }}
          ></div>
          <Link
            className="question__action"
            to={`/questions/${id}`}
            state={{ questions, collectionId }}
          >
            <span className="question__button">Подробнее</span>
            <img src={arrowRight} alt="Стрелка вправо" />
          </Link>
        </div>
      )}
    </div>
  );
}
