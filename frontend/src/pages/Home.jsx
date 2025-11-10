import { useTheme } from '../context/ThemeContext';

function Home() {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <main className="container">
      <section className="list-area">
        <h2>Welcome</h2>
        <p>
          Welcome to MyStore - a lightweight inventory manager. Use the{' '}
          <a href="/inventory">Inventory</a> page to add items and track total value. 
          This site stores data in your browser using localStorage.
        </p>
        
        <div className="theme-switcher">
          <label htmlFor="themeToggle">Dark Mode: </label>
          <input
            type="checkbox"
            id="themeToggle"
            checked={isDarkTheme}
            onChange={toggleTheme}
          />
        </div>
      </section>
    </main>
  );
}

export default Home;
