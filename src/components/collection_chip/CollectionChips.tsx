import "./collection_chips.css";

interface CollectionChipProps {
  keywords: string[];
}

export default function CollectionChips({ keywords }: CollectionChipProps) {
  return (
    <div className="collection-chips">
      {keywords.slice(0, 5).map((e, index) => (
        <p key={`${e}-${index}`} className="collection-chips__title">
          {e}
        </p>
      ))}
    </div>
  );
}
