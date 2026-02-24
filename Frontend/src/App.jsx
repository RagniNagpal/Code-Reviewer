// import { useState, useEffect } from 'react'
// import Editor from 'react-simple-code-editor'
// import prism from 'prismjs'
// import 'prismjs/themes/prism-tomorrow.css'
// import 'prismjs/components/prism-javascript'
// import Markdown from 'react-markdown'
// import rehypeHighlight from 'rehype-highlight'
// import 'highlight.js/styles/github-dark.css'
// import axios from 'axios'
// import './App.css'

// function App() {
//   const [code, setCode] = useState(`function sum(a, b) {
//   return a + b;
// }`)

//   const [review, setReview] = useState(``)

//   useEffect(() => {
//     prism.highlightAll()
//   }, [code])

//   async function reviewCode() {
//     try {
//       const response = await axios.post('http://localhost:3000/ai/get-review', { code })
//       setReview(response.data.message) // ✅ Only use the "message" string
//     } catch (err) {
//       setReview("❌ Error: " + (err.response?.data?.message || err.message))
//     }
//   }


  
//   return (
//     <main>
//       <div className="left">
//         <div className="code">
//           <Editor
//             value={code}
//             onValueChange={setCode}
//             highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
//             padding={10}
//             style={{
//               fontFamily: '"Fira code", "Fira Mono", monospace',
//               fontSize: 16,
//               backgroundColor: "#0c0c0c",
//               color: "#fff",
//               minHeight: "400px",
//               border: "1px solid #333",
//               borderRadius: "5px"
//             }}
//           />
//         </div>
//         <div className="review" onClick={reviewCode}>Review</div>
//       </div>
//       <div className="right" style={{
//   maxHeight: "90vh",
//   overflowY: "auto",
//   backgroundColor: "#f5f5f5",
//   padding: "20px",
//   borderRadius: "8px",
//   color: "#222",
//   fontFamily: "sans-serif",
//   lineHeight: "1.6"
// }}>
//   <Markdown rehypePlugins={[rehypeHighlight]}>
//     {review}
//   </Markdown>
// </div>

//     </main>
//   )
// }

// export default App



import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState(`function sum(a, b) {
  return a + b;
}`);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  async function reviewCode() {
    if (!code.trim()) return alert('Please enter some code!');
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code });
      setReview(response.data.message);
    } catch (err) {
      setReview("❌ Error: " + (err.response?.data || err.message));
    }
    setLoading(false);
  }

  return (
    <main className="container">
      {/* Left Panel: Code Editor */}
      <div className="panel editor-panel">
        <h2>Code Editor</h2>
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
          padding={15}
          style={{
            fontFamily: '"Fira Code", monospace',
            fontSize: 16,
            minHeight: '400px',
            backgroundColor: '#1e1e2f',
            color: '#fff',
            borderRadius: '8px',
            border: '1px solid #444',
          }}
        />
        <button className="review-btn" onClick={reviewCode}>
          {loading ? 'Analyzing...' : 'Review Code'}
        </button>
      </div>

      {/* Right Panel: AI Review */}
      <div className="panel review-panel">
        <h2>AI Review</h2>
        <div className="review-content">
          {review ? (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          ) : (
            <p className="placeholder">Your code review will appear here...</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
