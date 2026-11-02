import type { Collection } from "../../types/collections.types";
import CollectionItem from "./CollectionItem";
import "./collections_list.css";

interface CollectionsListProps {
  collections: Collection[];
}

export default function CollectionsList({ collections }: CollectionsListProps) {
  if (!collections || !Array.isArray(collections)) {
    return (
      <div className="collections-list collections-list--empty">
        <p className="collections-empty-text">Нет данных</p>
      </div>
    );
  }

  if (collections.length === 0) {
    return (
      <div className="collections-list collections-list--empty">
        <p className="collections-empty-text">
          По выбранным фильтрам ничего не найдено
        </p>
      </div>
    );
  }

  return (
    <div className="collections-list">
      {collections.map((collection) => (
        <CollectionItem key={collection.id} collection={collection} />
      ))}
    </div>
  );
}
