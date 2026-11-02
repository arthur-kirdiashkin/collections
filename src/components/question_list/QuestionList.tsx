import type { Question } from "../../types/collections.types";

import "./question_list.css";
import QuestionItem from "./QuestionItem";

interface QuestionListProps {
  questions: Question[];
}

export default function QuestionList({ questions }: QuestionListProps) {
  if (!questions || !Array.isArray(questions)) {
    return (
      <div className="questions-list questions-list--empty">
        <p className="questions-empty-text">Нет данных</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="questions-list questions-list--empty">
        <p className="questions-empty-text">
          По выбранным фильтрам ничего не найдено
        </p>
      </div>
    );
  }

  return (
    <div className="questions-list">
      {questions.map((question: Question) => (
        <QuestionItem
          key={question.id}
          questions={questions}
          question={question}
        />
      ))}
    </div>
  );
}
