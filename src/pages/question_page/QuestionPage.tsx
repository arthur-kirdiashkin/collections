import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getQuestion } from "../../api/requests";
import "../../components/collections_layout/collections_layout.css";
import questionImg from "../../assets/question_img.svg";
import "./question_page.css";
import Spinner from "../../components/spinner/Spinner";
import altArrowLeft from "../../assets/alt_arrow_left.svg";
import altArrowRight from "../../assets/alt_arrow_right.svg";
import caretLeft from "../../assets/caret_left.svg";
import showFilter from "../../assets/show_filter.svg";
import type { Question } from "../../types/collections.types";
import QuestionAnswer from "../../components/question_answer/QuestionAnswer";
import QuestionSidebar from "../../components/question_sidebar/QuestionSidebar";

export default function QuestionPage() {
  const { questionId } = useParams<{ questionId: string }>();

  const location = useLocation();

  const navigate = useNavigate();

  const questions: Question[] = location.state?.questions || [];

  const currentId = Number(questionId);

  const [loading, setLoading] = useState(true);

  const [question, setQuestion] = useState<Question | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true);
      try {
        const data = await getQuestion(currentId);

        console.log(data);

        setQuestion(data || []);
      } catch (error) {
        console.error("Ошибка при загрузке вопроса:", error);
        setQuestion(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [currentId]);

  const handleNext = () => {
    const currentIndex = questions.findIndex(
      (ques) => Number(ques.id) === currentId,
    );
    if (currentIndex !== -1) {
      const nextId = questions[currentIndex + 1].id;
      navigate(`/questions/${Number(nextId)}`, {
        state: { questions },
      });
    }
  };

  const handlePrev = () => {
    const currentIndex = questions.findIndex(
      (ques) => Number(ques.id) === currentId,
    );
    if (currentIndex !== -1) {
      const prevId = questions[currentIndex - 1].id;
      navigate(`/questions/${Number(prevId)}`, {
        state: { questions },
      });
    }
  };

  const handleClick = () => {
    navigate(-1);
  };

  if (loading) {
    return <Spinner />;
  }

  if (!question) {
    return (
      <div className="container">
        <p>Вопрос не найден</p>
      </div>
    );
  }

  const { title, description, longAnswer, shortAnswer } = question;

  return (
    <div className="container">
      <div className="collections-layout">
        <div className="question_col">
          <button className="question-back" onClick={handleClick}>
            <img
              className="question-back__icon"
              src={caretLeft}
              alt="Стрелка влево"
            />
            <span className="question-back__text">Назад</span>
          </button>
          <section className="question-header">
            <img
              className="question-header__img"
              src={questionImg}
              alt="Иконка"
            />
            <div className="question-header__info">
              <div className="question-header__col">
                <h2 className="question-header__title">{title}</h2>
                <p className="question-header__desc">{description}</p>
              </div>
              <img
                onClick={() => setIsOpen(true)}
                className="question-filter__btn"
                src={showFilter}
                alt="Показать фильтр"
              />
            </div>
          </section>
          {questions.length > 1 && (
            <section className="question-nav">
              <button
                onClick={handlePrev}
                className="question-nav__btn question-nav__btn--prev"
              >
                <img src={altArrowLeft} alt="" aria-hidden="true" />
                <span className="question-nav__text">Предыдущий</span>
              </button>

              <button
                onClick={handleNext}
                className="question-nav__btn question-nav__btn--next"
              >
                <span className="question-nav__text">Следующий</span>
                <img src={altArrowRight} alt="" aria-hidden="true" />
              </button>
            </section>
          )}

          <QuestionAnswer title="Краткий ответ" answer={shortAnswer} />
          <QuestionAnswer title="Развернутый ответ" answer={longAnswer} />
        </div>
        <QuestionSidebar
          handleClose={() => setIsOpen(false)}
          isOpen={isOpen}
          question={question}
        />
      </div>
    </div>
  );
}
