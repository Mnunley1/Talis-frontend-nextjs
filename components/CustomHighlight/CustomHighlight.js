import { connectHighlight } from 'react-instantsearch-dom';

const Highlight = ({ highlight, suggestion }) => {
  const parsedHit = highlight({
    highlightProperty: '_highlightResult',
    attribute: suggestion.key,
    hit: suggestion.hit,
  });

  return (
    <span>
      {parsedHit.map(
        (part, index) =>
          part.isHighlighted ? (
            <mark key={index}>{part.value}</mark>
          ) : (
            <span key={index}>{part.value}</span>
          )
      )}
    </span>
  );
};

export const CustomHighlight = connectHighlight(Highlight);
