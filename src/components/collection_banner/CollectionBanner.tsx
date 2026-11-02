import "./collection_banner.css";
import defaultImage from "../../assets/place.png";
import showFilter from "../../assets/show_filter.svg";

interface CollectionBannerProps {
  imageSrc: string | null;
  title: string;
  description: string;
  handleOpen: () => void;
}

export default function CollectionBanner({
  imageSrc,
  title,
  description,
  handleOpen,
}: CollectionBannerProps) {
  const finalImage = imageSrc || defaultImage;

  return (
    <section className="question-header">
      <img
        className="question-header__img"
        src={finalImage}
        onError={(e) => {
          e.currentTarget.src = defaultImage;
        }}
        alt="Иконка"
      />
      <div className="question-header__info">
        <div className="question-header__col">
          <h2 className="question-header__title">{title}</h2>
          <p className="question-header__desc">{description}</p>
        </div>
        <img
          onClick={handleOpen}
          className="question-filter__btn"
          src={showFilter}
          alt="Показать фильтр"
        />
      </div>
    </section>
  );
}
