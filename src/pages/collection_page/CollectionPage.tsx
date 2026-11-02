import { useEffect, useRef, useState } from "react";
import type { Collection, Question } from "../../types/collections.types";
import { useParams } from "react-router-dom";
import { getCollection, getQuestions } from "../../api/requests";
import Spinner from "../../components/spinner/Spinner";
import CollectionBanner from "../../components/collection_banner/CollectionBanner";
import axios from "axios";
import { LIMIT } from "../../constants/constants";
import QuestionList from "../../components/question_list/QuestionList";
import CollectionPagination from "../../components/collection_pagination/CollectionPagination";
import "./collection_page.css";
import CollectionInfoSidebar from "../../components/collection_info_sidebar/CollectionInfoSidebar";

export default function CollectionPage() {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  const [totalPages, setTotalPages] = useState<number>(0);

  const [currentPage, setCurrentPage] = useState(1);

  const [isOpen, setIsOpen] = useState(false);

  const controllerRef = useRef<AbortController>(null);

  const [isCollectionLoading, setIsCollectionLoading] = useState(true);
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(false);
  const [error, setError] = useState("");

  const { collectionId } = useParams<{ collectionId: string }>();

  const currentId = Number(collectionId);

  const fetchCollection = async () => {
    setIsCollectionLoading(true);
    try {
      const data = await getCollection(currentId);

      setCollection(data || []);
    } catch (error) {
      console.error("Ошибка при загрузке вопроса:", error);
      setError("Не удалось загрузить коллекцию");
      setCollection(null);
    } finally {
      setIsCollectionLoading(false);
    }
  };

  useEffect(() => {
    fetchCollection();
  }, [currentId]);

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();

    controllerRef.current = controller;

    setError("");

    setIsQuestionsLoading(true);

    const fetchQuestions = async () => {
      try {
        const { data, total } = await getQuestions({
          page: currentPage,
          collection: currentId,
          signal: controller.signal,
        });

        setTotalPages(Math.ceil((total || 0) / LIMIT));

        setQuestions(data || []);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Запрос отменен");
          return;
        }
        console.error("Ошибка при загрузке вопросов:", error);
        setError("Не удалось загрузить вопросы");

        setQuestions([]);
        setTotalPages(0);
      } finally {
        if (!controller.signal.aborted) {
          setIsQuestionsLoading(false);
        }
      }
    };

    fetchQuestions();

    return () => {
      controller.abort();
    };
  }, [currentPage, currentId]);

  const pageTitle = collection?.specializations?.length
    ? collection?.specializations.map((s) => s.title).join(", ")
    : collection?.keywords?.join(", ");

  return (
    <section>
      <div className="container">
        <div className="collection-layout">
          {isCollectionLoading && <Spinner />}

          {!isCollectionLoading && (error || !collection) && (
            <div className="collections-error">
              <p className="collections-error__text">{error}</p>
              <button
                className="collections-error__btn"
                onClick={fetchCollection}
              >
                Повторить попытку
              </button>
            </div>
          )}

          {!isCollectionLoading && collection && (
            <>
              <div className="collection-coll">
                <CollectionBanner
                  handleOpen={() => setIsOpen(true)}
                  imageSrc={collection.imageSrc}
                  title={collection.title}
                  description={collection.description}
                />

                <div className="collection-quest">
                  <h2 className="collection-quest__title">
                    Вопросы {pageTitle}
                  </h2>

                  {isQuestionsLoading ? (
                    <Spinner />
                  ) : (
                    <QuestionList questions={questions} />
                  )}

                  {!isQuestionsLoading && totalPages > 1 && (
                    <div className="collection-pagination__container">
                      <CollectionPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                      />
                    </div>
                  )}
                </div>
              </div>

              <CollectionInfoSidebar
                collection={collection}
                handleClose={() => setIsOpen(false)}
                isOpen={isOpen}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
