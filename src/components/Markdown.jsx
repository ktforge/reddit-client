import ReactMarkdown from 'react-markdown';
import './Markdown.css';

// renders lemmy's markdown as html, raw html in posts is ignored so it stays safe
function Markdown({ children }) {
  return (
    <div className="markdown">
      <ReactMarkdown
        components={{
          // links leave the app in a new tab
          a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
          img: ({ node, ...props }) => <img {...props} alt={props.alt || ''} loading="lazy" />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

export default Markdown;
