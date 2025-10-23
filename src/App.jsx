import React, { useState, useEffect } from 'react';
import { RefreshCw, Trophy, Clock, Target, Zap } from 'lucide-react';


const levelData = {
  1: {
    name: "FUNDAMENTOS DEL SABER",
    pairs: [
      { symbol: '💻', name: 'Computador' },
      { symbol: '📚', name: 'Libros' },
      { symbol: '🎓', name: 'Birrete' },
      { symbol: '💡', name: 'Bombillo' },
      { symbol: '🌿', name: 'Hoja' },
      { symbol: '🤝', name: 'Manos' }
    ],
    color: 'from-pink-600 to-purple-600',
    difficulty: 'Fácil'
  },
  2: {
    name: "ÁREAS DEL CONOCIMIENTO",
    pairs: [
      { symbol: '⚙️', name: 'Engranaje' },
      { symbol: '⚖️', name: 'Balanza' },
      { symbol: '🧪', name: 'Tubo de ensayo' },
      { symbol: '🔬', name: 'Microscopio' },
      { symbol: '📊', name: 'Gráfica' },
      { symbol: '🧭', name: 'Brújula' },
      { symbol: '🧠', name: 'Cerebro' },
      { symbol: '🏫', name: 'Edificio' }
    ],
    color: 'from-pink-600 to-purple-600',
    difficulty: 'Fácil'
  },
  3: {
    name: "VIDA UNIVERSITARIA",
    pairs: [
      { symbol: '📱', name: 'Celular' },
      { symbol: '📅', name: 'Calendario' },
      { symbol: '🗣️', name: 'Burbuja de diálogo' },
      { symbol: '🧾', name: 'Portafolio' },
      { symbol: '👩‍🎓', name: 'Estudiante' },
      { symbol: '❤️', name: 'Corazón' },
      { symbol: '🌍', name: 'Planeta' },
      { symbol: '🕊️', name: 'Paloma' },
      { symbol: '✏️', name: 'Lápiz' },
      { symbol: '☀️', name: 'Sol' }
    ],
    color: 'from-pink-600 to-purple-600',
    difficulty: 'Medio'
  },
  4: {
    name: "TECNOLOGÍA E INNOVACIÓN",
    pairs: [
      { symbol: '🔧', name: 'Herramientas' },
      { symbol: '🎯', name: 'Objetivo' },
      { symbol: '📡', name: 'Antena' },
      { symbol: '🔌', name: 'Enchufe' },
      { symbol: '⚡', name: 'Energía' },
      { symbol: '🌐', name: 'Internet' },
      { symbol: '📈', name: 'Crecimiento' },
      { symbol: '🔑', name: 'Llave' },
      { symbol: '🎨', name: 'Arte' },
      { symbol: '🎭', name: 'Teatro' },
      { symbol: '🎬', name: 'Cine' },
      { symbol: '🎵', name: 'Música' }
    ],
    color: 'from-pink-600 to-purple-600',
    difficulty: 'Medio'
  },
  5: {
    name: "CIENCIA Y MÉTODO",
    pairs: [
      { symbol: '🔭', name: 'Telescopio' },
      { symbol: '🧬', name: 'ADN' },
      { symbol: '⚗️', name: 'Alambique' },
      { symbol: '🧮', name: 'Ábaco' },
      { symbol: '📐', name: 'Regla' },
      { symbol: '📏', name: 'Escuadra' },
      { symbol: '🔩', name: 'Tornillo' },
      { symbol: '⚙️', name: 'Mecanismo' },
      { symbol: '🧲', name: 'Imán' },
      { symbol: '🌡️', name: 'Termómetro' },
      { symbol: '💉', name: 'Jeringa' },
      { symbol: '🩺', name: 'Estetoscopio' },
      { symbol: '🦷', name: 'Diente' },
      { symbol: '🧫', name: 'Petri' }
    ],
    color: 'from-pink-600 to-purple-600',
    difficulty: 'Difícil'
  },
  6: {
    name: "CULTURA Y SOCIEDAD",
    pairs: [
      { symbol: '🏛️', name: 'Museo' },
      { symbol: '📖', name: 'Libro abierto' },
      { symbol: '✍️', name: 'Escritura' },
      { symbol: '🗿', name: 'Estatua' },
      { symbol: '🎪', name: 'Circo' },
      { symbol: '🎤', name: 'Micrófono' },
      { symbol: '📻', name: 'Radio' },
      { symbol: '📺', name: 'TV' },
      { symbol: '📰', name: 'Periódico' },
      { symbol: '🗞️', name: 'Prensa' },
      { symbol: '📮', name: 'Buzón' },
      { symbol: '📬', name: 'Correo' },
      { symbol: '🎁', name: 'Regalo' },
      { symbol: '🎀', name: 'Lazo' },
      { symbol: '🎈', name: 'Globo' },
      { symbol: '🎊', name: 'Confeti' }
    ],
    color: 'from-pink-600 to-purple-600',
    difficulty: 'Difícil'
  },
  7: {
    name: "EXCELENCIA ACADÉMICA",
    pairs: [
      { symbol: '🏆', name: 'Trofeo' },
      { symbol: '🥇', name: 'Medalla oro' },
      { symbol: '🥈', name: 'Medalla plata' },
      { symbol: '🥉', name: 'Medalla bronce' },
      { symbol: '🎖️', name: 'Insignia' },
      { symbol: '⭐', name: 'Estrella' },
      { symbol: '🌟', name: 'Destello' },
      { symbol: '✨', name: 'Brillo' },
      { symbol: '💫', name: 'Resplandor' },
      { symbol: '🔥', name: 'Fuego' },
      { symbol: '💪', name: 'Fuerza' },
      { symbol: '👏', name: 'Aplauso' },
      { symbol: '🙌', name: 'Celebración' },
      { symbol: '👍', name: 'Aprobación' },
      { symbol: '✅', name: 'Completado' },
      { symbol: '☑️', name: 'Verificado' },
      { symbol: '✔️', name: 'Correcto' },
      { symbol: '➕', name: 'Más' }
    ],
    color: 'from-pink-600 to-purple-600',
    difficulty: 'Muy Difícil'
  },
  8: {
    name: "MAESTRÍA DEL CONOCIMIENTO",
    pairs: [
      { symbol: '🔮', name: 'Cristal' },
      { symbol: '💎', name: 'Diamante' },
      { symbol: '👑', name: 'Corona' },
      { symbol: '🦉', name: 'Búho' },
      { symbol: '🐉', name: 'Dragón' },
      { symbol: '🦅', name: 'Águila' },
      { symbol: '🦁', name: 'León' },
      { symbol: '🐺', name: 'Lobo' },
      { symbol: '🌙', name: 'Luna' },
      { symbol: '⭐', name: 'Estrella brillante' },
      { symbol: '🌠', name: 'Estrella fugaz' },
      { symbol: '☄️', name: 'Cometa' },
      { symbol: '🌈', name: 'Arcoíris' },
      { symbol: '⚡', name: 'Rayo' },
      { symbol: '🔱', name: 'Tridente' },
      { symbol: '⚔️', name: 'Espadas' },
      { symbol: '🛡️', name: 'Escudo' },
      { symbol: '🗡️', name: 'Espada' },
      { symbol: '🏹', name: 'Arco' },
      { symbol: '🎯', name: 'Diana' }
    ],
    color: 'from-pink-600 to-purple-600',
    difficulty: 'EXTREMO'
  }
};

const App = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [unlockedLevels, setUnlockedLevels] = useState([1]);
  const [gameState, setGameState] = useState('inicio');
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [levelTimes, setLevelTimes] = useState({});
  const [mistakes, setMistakes] = useState(0);
  const [showMatchAnimation, setShowMatchAnimation] = useState(false);
  const [showErrorAnimation, setShowErrorAnimation] = useState(false);
  const [matchedCardIds, setMatchedCardIds] = useState([]);

  // Timer
  useEffect(() => {
    let interval = null;
    if (isTimerActive && gameState === 'playing') {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, gameState]);

  const initializeLevel = (level) => {
    const levelPairs = levelData[level].pairs;
    const shuffledCards = [...levelPairs, ...levelPairs]
      .sort(() => Math.random() - 0.5)
      .map((pair, index) => ({ 
        id: index, 
        symbol: pair.symbol, 
        name: pair.name, 
        isFlipped: false,
        isMatched: false
      }));

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setMistakes(0);
    setTimer(0);
    setIsTimerActive(true);
    setGameState('playing');
    setMatchedCardIds([]);
  };

  const handleCardClick = (id) => {
    if (flippedCards.length === 2) return;
    
    const card = cards.find(c => c.id === id);
    if (card.isFlipped || card.isMatched) return;

    const newCards = cards.map(c =>
      c.id === id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, card];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(m => m + 1);
      setTimeout(() => checkMatch(newFlippedCards, newCards), 700);
    }
  };

  const checkMatch = (flipped, currentCards) => {
    const [first, second] = flipped;
    
    if (first.symbol === second.symbol) {
      setShowMatchAnimation(true);
      setMatchedCardIds([first.id, second.id]);
      
      setTimeout(() => {
        const updatedCards = currentCards.map(card =>
          flipped.some(f => f.id === card.id) ? { ...card, isMatched: true } : card
        );
        setCards(updatedCards);
        
        const newMatchedPairs = [...matchedPairs, { symbol: first.symbol, name: first.name }];
        setMatchedPairs(newMatchedPairs);
        setFlippedCards([]);
        setShowMatchAnimation(false);
        setMatchedCardIds([]);
        
        if (newMatchedPairs.length === levelData[currentLevel].pairs.length) {
          setIsTimerActive(false);
          const newLevelTimes = { ...levelTimes, [currentLevel]: timer };
          setLevelTimes(newLevelTimes);
          setTotalTime(Object.values(newLevelTimes).reduce((a, b) => a + b, 0));
          
          if (currentLevel < 8) {
            setGameState('levelComplete');
            if (!unlockedLevels.includes(currentLevel + 1)) {
              setUnlockedLevels([...unlockedLevels, currentLevel + 1]);
            }
          } else {
            setGameState('gameComplete');
          }
        }
      }, 500);
    } else {
      setShowErrorAnimation(true);
      setMistakes(m => m + 1);
      
      setTimeout(() => {
        setCards(currentCards.map(card =>
          flipped.some(f => f.id === card.id) ? { ...card, isFlipped: false } : card
        ));
        setFlippedCards([]);
        setShowErrorAnimation(false);
      }, 1000);
    }
  };

  const startLevel = (level) => {
    setCurrentLevel(level);
    initializeLevel(level);
  };

  const nextLevel = () => {
    startLevel(currentLevel + 1);
  };

  const backToMenu = () => {
    setGameState('menu');
    setIsTimerActive(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getAccuracy = () => {
    if (moves === 0) return 100;
    const correctMoves = matchedPairs.length;
    return Math.round((correctMoves / moves) * 100);
  };

  // PANTALLA DE INICIO
  if (gameState === 'inicio') {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        {/* Estrellas de fondo */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Montañas inferiores */}
        <div className="absolute bottom-0 w-full h-32">
          <svg viewBox="0 0 1200 200" className="w-full h-full">
            <polygon points="0,200 0,100 200,60 400,120 600,40 800,100 1000,80 1200,140 1200,200" fill="#8b5cf6" opacity="0.8"/>
            <polygon points="0,200 100,140 300,100 500,160 700,100 900,140 1100,120 1200,160 1200,200" fill="#a855f7"/>
            <polygon points="0,200 150,160 350,180 550,140 750,170 950,150 1150,180 1200,170 1200,200" fill="#c026d3"/>
          </svg>
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 text-center px-4">
          <div className="mb-8">
            <div className="text-xs font-mono text-cyan-400 mb-4 tracking-widest animate-pulse">
              ▶▶▶▶▶▶▶▶▶
            </div>
            <div className="text-xl font-mono text-white mb-4 tracking-wider">ECOTIC</div>
            <h1 className="font-mono text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6 tracking-tight animate-glow" style={{fontFamily: 'monospace', fontWeight: 'bold'}}>
              ÍCONOS DEL SABER CUC
            </h1>
            <div className="font-mono text-6xl md:text-8xl text-white mb-8 tracking-wider pixel-text" style={{textShadow: '4px 4px 0px rgba(139, 92, 246, 0.5)'}}>
              LET'S PLAY
            </div>
          </div>

          {/* Barra de vida */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="text-4xl animate-pulse">💖</div>
            <div className="w-48 h-6 bg-gray-800 border-2 border-pink-500 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-pink-500 to-pink-600 animate-pulse-slow" style={{width: '60%'}}></div>
            </div>
          </div>

          {/* Botón de inicio */}
          <button
            onClick={() => setGameState('menu')}
            className="pixel-button bg-gradient-to-r from-pink-600 to-purple-600 text-white font-mono text-xl px-12 py-4 border-4 border-white hover:scale-110 transition-transform duration-200 shadow-xl animate-bounce-slow"
            style={{imageRendering: 'pixelated'}}
          >
            ▶ JUGAR
          </button>
        </div>

        {/* Logos inferiores */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-8 z-20">
          <div className="text-white font-mono text-xs">
            <div className="font-bold">CUC</div>
            <div className="text-[8px]">UNIVERSIDAD</div>
            <div className="text-[8px]">DE LA COSTA</div>
          </div>
          <div className="text-white font-mono text-xs">
            <div className="font-bold">CED+</div>
            <div className="text-[8px]">CENTRO DE</div>
            <div className="text-[8px]">EXCELENCIA DOCENTE</div>
          </div>
        </div>

        {/* Elementos decorativos laterales */}
        <div className="absolute top-1/2 left-4 text-pink-500 text-2xl animate-float">✦</div>
        <div className="absolute top-1/3 right-8 text-pink-500 text-3xl animate-float-delay">✦</div>
        <div className="absolute bottom-32 right-1/4 text-cyan-400 text-xs animate-pulse">◀◀◀◀◀◀◀◀◀</div>

        <style>{`
          @keyframes glow {
            0%, 100% { filter: drop-shadow(0 0 10px rgba(236, 72, 153, 0.8)); }
            50% { filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.8)); }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes float-delay {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          @keyframes pulse-slow {
            0%, 100% { width: 60%; }
            50% { width: 70%; }
          }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-glow { animation: glow 2s ease-in-out infinite; }
          .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
          .animate-float { animation: float 3s ease-in-out infinite; }
          .animate-float-delay { animation: float-delay 4s ease-in-out infinite 1s; }
          .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
          .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
          .pixel-text {
            image-rendering: pixelated;
            -webkit-font-smoothing: none;
            -moz-osx-font-smoothing: grayscale;
          }
          .pixel-button {
            image-rendering: pixelated;
            clip-path: polygon(
              0% 8px, 8px 8px, 8px 0%, calc(100% - 8px) 0%, calc(100% - 8px) 8px, 100% 8px,
              100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%,
              8px 100%, 8px calc(100% - 8px), 0% calc(100% - 8px)
            );
          }
        `}</style>
      </div>
    );
  }

  // MENÚ PRINCIPAL
  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Estrellas de fondo */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Montañas inferiores */}
        <div className="absolute bottom-0 w-full h-32">
          <svg viewBox="0 0 1200 200" className="w-full h-full">
            <polygon points="0,200 0,100 200,60 400,120 600,40 800,100 1000,80 1200,140 1200,200" fill="#8b5cf6" opacity="0.8"/>
            <polygon points="0,200 100,140 300,100 500,160 700,100 900,140 1100,120 1200,160 1200,200" fill="#a855f7"/>
            <polygon points="0,200 150,160 350,180 550,140 750,170 950,150 1150,180 1200,170 1200,200" fill="#c026d3"/>
          </svg>
        </div>

        <div className="relative z-10 px-4 py-8 max-w-6xl mx-auto">
          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="font-mono text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2 tracking-tight font-bold">
              ÍCONOS DEL SABER CUC
            </h1>
            <p className="font-mono text-white text-sm tracking-wider">8 NIVELES DE DESAFÍO PROGRESIVO</p>
          </div>
          
          {/* Grid de niveles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(level => (
              <div 
                key={level} 
                className={`relative bg-gradient-to-br from-pink-600 to-purple-700 rounded-lg p-4 border-4 ${
                  unlockedLevels.includes(level) ? 'border-cyan-400' : 'border-gray-600'
                } transition-all duration-300 ${
                  unlockedLevels.includes(level) ? 'hover:scale-105 cursor-pointer' : 'opacity-50'
                }`}
              >
                {/* Diamante decorativo */}
                <div className="absolute top-2 right-2 text-2xl animate-pulse">💎</div>
                
                <div className="text-center">
                  <div className="font-mono text-white text-lg mb-1 font-bold">NIVEL {level}</div>
                  <div className="font-mono text-xs text-pink-200 mb-3 uppercase">{levelData[level].name}</div>
                  <div className="font-mono text-xs text-white mb-3">{levelData[level].pairs.length} PARES</div>
                  
                  {levelTimes[level] && (
                    <div className="font-mono text-xs text-green-400 mb-2">
                      ✓ {formatTime(levelTimes[level])}
                    </div>
                  )}
                  
                  <button
                    onClick={() => unlockedLevels.includes(level) && startLevel(level)}
                    disabled={!unlockedLevels.includes(level)}
                    className={`w-full py-2 font-mono text-xs rounded border-2 transition-all ${
                      unlockedLevels.includes(level)
                        ? 'bg-gray-800 text-white border-white hover:bg-gray-700'
                        : 'bg-gray-900 text-gray-600 border-gray-700 cursor-not-allowed'
                    }`}
                  >
                    {unlockedLevels.includes(level) ? '▶ JUGAR' : '🔒 BLOQUEADO'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Logos inferiores */}
          <div className="flex justify-center items-center gap-8 mt-8">
            <div className="text-white font-mono text-xs">
              <div className="font-bold">CUC</div>
              <div className="text-[8px]">UNIVERSIDAD</div>
              <div className="text-[8px]">DE LA COSTA</div>
            </div>
            <div className="text-white font-mono text-xs">
              <div className="font-bold">CED+</div>
              <div className="text-[8px]">CENTRO DE</div>
              <div className="text-[8px]">EXCELENCIA DOCENTE</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de nivel completado
  if (gameState === 'levelComplete') {
    const accuracy = getAccuracy();
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        {/* Estrellas de fondo */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Montañas inferiores */}
        <div className="absolute bottom-0 w-full h-32">
          <svg viewBox="0 0 1200 200" className="w-full h-full">
            <polygon points="0,200 0,100 200,60 400,120 600,40 800,100 1000,80 1200,140 1200,200" fill="#8b5cf6" opacity="0.8"/>
            <polygon points="0,200 100,140 300,100 500,160 700,100 900,140 1100,120 1200,160 1200,200" fill="#a855f7"/>
          </svg>
        </div>

        <div className="relative z-10 bg-gradient-to-br from-pink-600 to-purple-700 rounded-lg border-4 border-white p-8 max-w-md mx-4 text-center shadow-2xl">
          <div className="font-mono text-5xl mb-4 animate-bounce">🎉</div>
          <div className="font-mono text-2xl text-white mb-2 font-bold">NIVEL {currentLevel}</div>
          <div className="font-mono text-lg text-white mb-6">COMPLETADO</div>
          <div className="font-mono text-xs text-pink-200 mb-6 uppercase">{levelData[currentLevel].name}</div>
          
          <div className="bg-black/30 rounded-lg p-4 mb-6 space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="text-3xl">⏱️</div>
              <div className="text-center">
                <div className="font-mono text-2xl text-white font-bold">{formatTime(timer)}</div>
                <div className="font-mono text-xs text-gray-300">TIEMPO</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-2xl">🎯</div>
                <div className="font-mono text-xl text-white font-bold">{moves}</div>
                <div className="font-mono text-[10px] text-gray-300">MOVIMIENTOS</div>
              </div>
              <div>
                <div className="text-2xl">📊</div>
                <div className="font-mono text-xl text-white font-bold">{accuracy}%</div>
                <div className="font-mono text-[10px] text-gray-300">PRECISIÓN</div>
              </div>
              <div>
                <div className="text-2xl">❌</div>
                <div className="font-mono text-xl text-white font-bold">{mistakes}</div>
                <div className="font-mono text-[10px] text-gray-300">ERRORES</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {currentLevel < 8 && (
              <button
                onClick={nextLevel}
                className="w-full bg-gray-800 text-white font-mono py-3 rounded border-4 border-white hover:bg-gray-700 transition-all transform hover:scale-105"
              >
                SIGUIENTE NIVEL ({currentLevel + 1})
              </button>
            )}
            <button
              onClick={backToMenu}
              className="w-full bg-gray-900 text-white font-mono py-3 rounded border-2 border-gray-600 hover:bg-gray-800 transition-all"
            >
              VOLVER A MENÚ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de juego completado
  if (gameState === 'gameComplete') {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 bg-gradient-to-br from-purple-700 to-pink-700 rounded-lg border-4 border-yellow-400 p-8 max-w-2xl mx-4 text-center shadow-2xl">
          <div className="text-8xl mb-4 animate-bounce">🏆</div>
          <div className="font-mono text-4xl text-yellow-400 mb-2 font-bold animate-pulse">¡MAESTRÍA!</div>
          <div className="font-mono text-xl text-white mb-6">HAS CONQUISTADO LOS 8 NIVELES</div>
          
          <div className="bg-black/30 rounded-lg p-6 mb-6">
            <div className="font-mono text-sm text-gray-300 mb-2">TIEMPO TOTAL ACUMULADO</div>
            <div className="font-mono text-5xl text-white font-bold mb-4">{formatTime(totalTime)}</div>
            
            <div className="grid grid-cols-2 gap-2 text-left max-h-48 overflow-y-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(level => (
                <div key={level} className="flex justify-between items-center font-mono text-xs bg-white/10 rounded p-2">
                  <span className="text-gray-300">NIVEL {level}:</span>
                  <span className="font-bold text-white">{formatTime(levelTimes[level])}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded-lg p-4 mb-6">
            <div className="font-mono text-lg font-bold text-yellow-400 mb-2">🌟 LOGRO DESBLOQUEADO</div>
            <div className="font-mono text-sm text-yellow-300">"MAESTRO DE LOS ÍCONOS DEL SABER CUC"</div>
          </div>

          <button
            onClick={backToMenu}
            className="w-full bg-yellow-400 text-black font-mono py-4 rounded border-4 border-white font-bold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105"
          >
            🎯 VER ESTADÍSTICAS FINALES
          </button>
        </div>
      </div>
    );
  }

  // PANTALLA DE JUEGO
  const gridCols = 
    currentLevel <= 3 ? 'grid-cols-4' :
    currentLevel <= 5 ? 'grid-cols-5' :
    currentLevel <= 7 ? 'grid-cols-6' :
    'grid-cols-7';

  return (
    <div className="min-h-screen bg-black relative overflow-hidden p-4">
      {/* Estrellas de fondo */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Animación de acierto global */}
      {showMatchAnimation && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-9xl text-green-500 animate-success-pop font-bold">✓</div>
        </div>
      )}
      
      {/* Animación de error global */}
      {showErrorAnimation && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-9xl text-red-500 animate-error-shake font-bold">✗</div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 font-mono">
          <div className="text-white">
            <div className="text-2xl font-bold text-pink-500">NIVEL {currentLevel}</div>
          </div>
          
          <div className="text-white text-right text-xl font-bold">
            {formatTime(timer)}
          </div>
        </div>

        {/* Board con cartas */}
        <div className={`grid gap-3 ${gridCols} max-w-5xl mx-auto mb-4`}>
          {cards.map(card => {
            const isMatching = matchedCardIds.includes(card.id);
            return (
              <div
                key={card.id}
                className={`card ${card.isFlipped || card.isMatched ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''} ${isMatching ? 'matching' : ''}`}
                onClick={() => handleCardClick(card.id)}
              >
                <div className="card-inner">
                  {/* Card Front (trasera - boca abajo con diamante) */}
                  <div className="card-front bg-gradient-to-br from-pink-600 to-purple-700 rounded-lg flex items-center justify-center border-4 border-cyan-400">
                    <span className="text-6xl">💎</span>
                  </div>
                  
                  {/* Card Back (delantera - boca arriba con emoji) */}
                  <div className={`card-back ${card.isMatched ? 'bg-gray-900' : 'bg-white'} rounded-lg border-4 ${card.isMatched ? 'border-gray-700' : 'border-pink-500'} flex items-center justify-center`}>
                    <span className={`${currentLevel >= 6 ? 'text-4xl' : 'text-5xl'}`}>
                      {card.symbol}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón volver */}
        <div className="text-center">
          <button
            onClick={backToMenu}
            className="bg-gray-800 text-white font-mono px-6 py-2 rounded border-2 border-white hover:bg-gray-700 transition-all"
          >
            ← MENÚ
          </button>
        </div>
      </div>
      
      <style>{`
        .card {
          aspect-ratio: 1;
          perspective: 1000px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .card:hover:not(.matched) {
          transform: scale(1.05);
        }

        .card-inner {
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
          position: relative;
        }

        .card.flipped .card-inner {
          transform: rotateY(180deg);
        }

        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .card-front {
          transform: rotateY(0deg);
        }

        .card-back {
          transform: rotateY(180deg);
        }

        .card.matching {
          animation: match-pulse 0.6s ease-out;
        }

        @keyframes match-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); filter: brightness(1.5); }
          100% { transform: scale(1); }
        }

        .card.matched {
          animation: fade-out 0.5s ease-out forwards;
        }

        @keyframes fade-out {
          to {
            opacity: 0.3;
            transform: scale(0.8);
          }
        }

        @keyframes success-pop {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.5); opacity: 1; }
          100% { transform: scale(1); opacity: 0; }
        }
        
        @keyframes error-shake {
          0%, 100% { transform: translateX(0) scale(1); opacity: 0; }
          25% { transform: translateX(-20px) scale(1.2); opacity: 1; }
          50% { transform: translateX(20px) scale(1.2); opacity: 1; }
          75% { transform: translateX(-20px) scale(1.2); opacity: 1; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        .animate-success-pop { animation: success-pop 0.8s ease-out; }
        .animate-error-shake { animation: error-shake 0.6s ease-out; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default App;