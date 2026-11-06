import Header from './components/Header.jsx';
import './App.css';

function App() {
  return (
    <>
      <Header onMenuClick={() => console.log('menu clicked')} />
      <main className="layout">
        <p>Posts go here</p>
      </main>
    </>
  );
}

export default App;
