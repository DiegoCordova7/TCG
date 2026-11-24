import { useState } from 'react';
import CreatureCard from './CreatureCard';
import ItemCard from './ItemCard';
import CardModal from './CardModal';
import FieldCard from './FieldCard';
import creaturesData from '../../data/creatures.json';
import objectsData from '../../data/objects.json';
import fieldsData from '../../data/fields.json';
import './CardGallery.css';

export default function CardGallery({ onBackToMenu }) {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [inspectedCard, setInspectedCard] = useState(null);

    const allCreatures = (creaturesData.creatures || []).map(c => ({
        id: c.id,
        name: c.name,
        type: 'creature',
        faction: c.faction,
        hp: c.hp,
        attacks: c.attacks || []
    }));

    const allEquipment = (objectsData.equipment || []).map(eq => ({
        id: eq.id,
        name: eq.name,
        type: 'equipment',
        faction: 'neutral',
        description: eq.description,
        effect: eq.effect,
        duration: eq.duration,
        restriction: eq.restriction
    }));

    const allConsumables = (objectsData.consumables || []).map(con => ({
        id: con.id,
        name: con.name,
        type: 'consumable',
        faction: 'neutral',
        description: con.description,
        effect: con.effect,
        restriction: con.restriction
    }));

    const allArtifacts = (objectsData.artifacts || []).map(art => ({
        id: art.id,
        name: art.name,
        type: 'artifact',
        faction: 'neutral',
        description: art.description,
        effect: art.effect,
        restriction: art.restriction
    }));

    const allFields = (fieldsData?.fields || []).map(f => ({
        id: f.id,
        name: f.name,
        type: 'field',
        faction: f.faction,
        cardImage: f.cardImage,
        boardBgImage: f.boardBgImage,
        description: f.description,
        effect: f.effect
    }));

    const masterDeck = [
        ...allCreatures,
        ...allEquipment,
        ...allConsumables,
        ...allArtifacts,
        ...allFields
    ];

    const filteredCards = masterDeck.filter(card => {
        if (selectedFilter === 'all') return true;
        return card.type === selectedFilter;
    });

    return (
        <div className="gallery-container">
            <header className="gallery-header">
                <button className="back-btn" onClick={onBackToMenu}>← Volver al Menú</button>
                <h2>Compendio de Cartas ({filteredCards.length})</h2>
                <div className="filter-buttons">
                    <button
                        className={selectedFilter === 'all' ? 'active' : ''}
                        onClick={() => setSelectedFilter('all')}
                    >
                        Todas
                    </button>
                    <button
                        className={selectedFilter === 'creature' ? 'active' : ''}
                        onClick={() => setSelectedFilter('creature')}
                    >
                        Criaturas
                    </button>
                    <button
                        className={selectedFilter === 'equipment' ? 'active' : ''}
                        onClick={() => setSelectedFilter('equipment')}
                    >
                        Equipamiento
                    </button>
                    <button
                        className={selectedFilter === 'consumable' ? 'active' : ''}
                        onClick={() => setSelectedFilter('consumable')}
                    >
                        Consumibles
                    </button>
                    <button
                        className={selectedFilter === 'artifact' ? 'active' : ''}
                        onClick={() => setSelectedFilter('artifact')}
                    >
                        Artefactos
                    </button>
                    <button
                        className={selectedFilter === 'field' ? 'active' : ''}
                        onClick={() => setSelectedFilter('field')}
                    >
                        Campos
                    </button>
                </div>
            </header>

            <div className="gallery-grid">
                {filteredCards.length > 0 ? (
                    filteredCards.map((card, index) => (
                        <div
                            key={`${card.id}-${index}`}
                            style={{ cursor: 'pointer', transform: 'scale(0.9)', transition: 'transform 0.2s' }}
                            onClick={() => setInspectedCard(card)}
                        >
                            {
                                card.type === 'creature' ? (<CreatureCard card={card} factionColor="#38bdf8" />)
                                    : card.type === 'field' ? (<FieldCard card={card} />)
                                        : (<ItemCard card={card} />)
                            }
                        </div>
                    ))
                ) : (
                    <p className="gallery-placeholder">No hay cartas en esta categoría.</p>
                )}
            </div>

            <CardModal card={inspectedCard} onClose={() => setInspectedCard(null)} />
        </div>
    );
}