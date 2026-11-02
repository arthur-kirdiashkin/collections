import type { Collection } from "../../types/collections.types";
import "./collection_item.css";
import defaultImage from "../../assets/place.png";
import CollectionChips from "../collection_chip/CollectionChips";
import free from "../../assets/free.svg";
import questionCount from "../../assets/question_count.svg";
import { pluralizeQuestions } from "../../utils/pluralize";
import { Link } from "react-router-dom";

interface CollectionItemProps {
  collection: Collection;
}

export default function CollectionItem({ collection }: CollectionItemProps) {
  const {
    id,
    description,
    imageSrc,
    isFree,
    questionsCount,
    keywords = [],
    specializations = [],
  } = collection;

  const finalImage = imageSrc || defaultImage;

  return (
    <Link to={`/collections/${id}`} className="collection-item">
      <div className="collection-content">
        <img
          src={finalImage}
          alt="Иллюстрация к коллекции"
          className="collection-item__cover"
          onError={(e) => {
            e.currentTarget.src = defaultImage;
          }}
        />
        <div className="collection-item__body">
          {keywords.length > 0 && <CollectionChips keywords={keywords} />}

          <h3 className="collection-item__desc">{description}</h3>

          <section className="collection-item__badges">
            <div className="collection-item__badge">
              <img src={free} alt="звезда" />
              <span className="collection-item__access">
                {isFree ? "Для всех" : "Для участников"}
              </span>
            </div>
            {questionsCount > 0 && (
              <div className="collection-item__badge">
                <img src={questionCount} alt="звезда" />
                <span className="collection-item__count">
                  {pluralizeQuestions(Number(questionsCount))}
                </span>
              </div>
            )}
          </section>

          {specializations.length > 0 && (
            <section className="collection-item__spec">
              {specializations.map((e) => (
                <p key={e.id} className="collection-item__spec-title">
                  {e.title}
                </p>
              ))}
            </section>
          )}
        </div>
      </div>
    </Link>
  );
}
