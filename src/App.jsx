import { useState } from 'react';
import MainMenu from './components/view/MainMenu';
import Gameboard from './components/view/Gameboard';
import CardGallery from './components/card/CardGallery';

export default function App() {
  const [currentView, setCurrentView] = useState('menu');

  return (
    <div>
      {currentView === 'menu' && (
        <MainMenu onNavigate={(view) => setCurrentView(view)} />
      )}

      {currentView === 'game' && (
        <Gameboard onBackToMenu={() => setCurrentView('menu')} />
      )}

      {currentView === 'gallery' && (
        <CardGallery onBackToMenu={() => setCurrentView('menu')} />
      )}
    </div>
  );
}