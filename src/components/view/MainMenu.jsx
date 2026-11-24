import './MainMenu.css';

export default function MainMenu({ onNavigate }) {
    return (
        <div className="main-menu-container">
            <div className="main-menu-content">
                <h1 className="game-title">TCG Strategy Game</h1>
                <p className="game-subtitle">Elige una opción para comenzar</p>

                <div className="menu-buttons">
                    <button
                        className="menu-btn primary-btn"
                        onClick={() => onNavigate('game')}
                    >
                        Iniciar Partida
                    </button>
                    <button
                        className="menu-btn secondary-btn"
                        onClick={() => onNavigate('gallery')}
                    >
                        Compendio de Cartas
                    </button>
                </div>
            </div>
        </div>
    );
}