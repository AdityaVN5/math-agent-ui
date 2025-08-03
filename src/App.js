import React, { useState } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    const response = await fetch('https://obscure-space-dollop-g4xgw464xp7w2wj5v-8000.app.github.dev/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });
    const data = await response.json();
    setAnswer(data.answer);
    setLoading(false);
  };

  const handleRefine = async () => {
    setLoading(true);
    const response = await fetch('https://obscure-space-dollop-g4xgw464xp7w2wj5v-8000.app.github.dev/refine', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: question,
        initial_answer: answer,
        feedback: feedback,
      }),
    });
    const data = await response.json();
    setAnswer(data.refined_answer);
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Math Routing Agent</h1>
        <div className="card">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a math question"
          />
          <button onClick={handleAsk} disabled={loading}>
            {loading ? 'Thinking...' : 'Ask'}
          </button>
        </div>
        {answer && (
          <div className="card">
            <h2>Answer:</h2>
            <p>{answer}</p>
            <div className="feedback-section">
              <input
                type="text"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide feedback to refine the answer"
              />
              <button onClick={handleRefine} disabled={loading}>
                {loading ? 'Refining...' : 'Refine Answer'}
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;