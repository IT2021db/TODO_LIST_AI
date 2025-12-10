import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <a href="#zadania" className="nav-link active">
          Zadania
        </a>
        <a href="#o-autorze" className="nav-link">
          O autorze
        </a>
      </div>
    </nav>
  );
};

export default Navigation;

