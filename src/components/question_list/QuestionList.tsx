import type { Question } from "../../types/collections.types";

import "./question_list.css";
import QuestionItem from "./QuestionItem";

interface QuestionListProps {
  questions: Question[];
  collectionId?: string | number;
}

export default function QuestionList({
  questions,
  collectionId,
}: QuestionListProps) {
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
          collectionId={collectionId}
          key={question.id}
          questions={questions}
          question={question}
        />
      ))}
    </div>
  );
}
