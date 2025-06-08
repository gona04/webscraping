import React from 'react';
import ReactDOM from 'react-dom/client';
import News from './news/news';
import './style.css';

function App() {
  return (
    <div>
      <h1>Most Recent News</h1>
      <News/>
      </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);