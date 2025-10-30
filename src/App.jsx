import React, { useState, useEffect } from 'react';
import fondoGif from './assets/img/fondo.gif';
import montanaGif from './assets/img/montaña.gif';
import destellosGif from './assets/img/destellos.gif';
import diamante from './assets/img/diamante.png';
import corazonGif from './assets/img/corazon.gif';
import copa from './assets/img/copa.png';
import error from './assets/img/error.png';
import correcto from './assets/img/correcto.png';
import reloj from './assets/img/reloj.png';
import apiService from './services/apiService';
import { hasAuthToken } from './config/api';


const App = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [unlockedLevels, setUnlockedLevels] = useState([1]);
  const [currentPage, setCurrentPage] = useState(0); // Paginación 8 en 8
  const [gameState, setGameState] = useState('inicio');
  const [levelData, setLevelData] = useState({}); //  Niveles dinámicos
  const [TOTAL_LEVELS, setTotalLevels] = useState(0); //  Total dinámico
  // const [recompensa, setRecompensa] = useState(null);
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
  const [nivelIdAPI, setNivelIdAPI] = useState(null); 
  const [nivelYaCompletado, setNivelYaCompletado] = useState(false); 
  const [matchedCardIds, setMatchedCardIds] = useState([]);
  
  //    Estados para funcionalidad completa de API
  const [nivelesAPI, setNivelesAPI] = useState([]);
  const [cargandoNiveles, setCargandoNiveles] = useState(true);
  const [errorAPI, setErrorAPI] = useState(null);
  const [usuarioProgreso, setUsuarioProgreso] = useState(null);

//  funcionalidades del juego 
  const [showPreview, setShowPreview] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(null);
  const [movimientosRestantes, setMovimientosRestantes] = useState(null);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [resultadosBackend, setResultadosBackend] = useState(null);

  //  Generar pares dinámicamente
const generarParesParaNivel = (cantidadPares, tema) => {
  const bancoEmojis = {
    'Ingeniería de Sistemas': [
      { symbol: '💻', name: 'Computador' },
      { symbol: '⚙️', name: 'Engranaje' },
      { symbol: '🔧', name: 'Herramientas' },
      { symbol: '📡', name: 'Antena' },
      { symbol: '🔌', name: 'Enchufe' },
      { symbol: '🌐', name: 'Internet' },
      { symbol: '🔒', name: 'Seguridad' },
      { symbol: '📊', name: 'Datos' },
      { symbol: '🤖', name: 'Robot' },
      { symbol: '💾', name: 'Disco' },
      { symbol: '🖥️', name: 'Monitor' },
      { symbol: '⌨️', name: 'Teclado' },
      { symbol: '🖱️', name: 'Mouse' },
      { symbol: '📱', name: 'Móvil' },
      { symbol: '💿', name: 'CD' },
    ],
    'Administración de Empresas': [
      { symbol: '💼', name: 'Maletín' },
      { symbol: '📊', name: 'Gráfica' },
      { symbol: '💰', name: 'Dinero' },
      { symbol: '🏢', name: 'Empresa' },
      { symbol: '📈', name: 'Crecimiento' },
      { symbol: '🎯', name: 'Objetivo' },
      { symbol: '📋', name: 'Planificación' },
      { symbol: '👔', name: 'Negocio' },
      { symbol: '🤝', name: 'Acuerdo' },
      { symbol: '📞', name: 'Comunicación' },
      { symbol: '💳', name: 'Finanzas' },
      { symbol: '📅', name: 'Agenda' },
      { symbol: '✍️', name: 'Firma' },
      { symbol: '🏆', name: 'Éxito' },
      { symbol: '🔑', name: 'Llave' },
    ],
    'Derecho': [
      { symbol: '⚖️', name: 'Balanza' },
      { symbol: '📜', name: 'Ley' },
      { symbol: '🏛️', name: 'Justicia' },
      { symbol: '👨‍⚖️', name: 'Juez' },
      { symbol: '📖', name: 'Código' },
      { symbol: '✍️', name: 'Firma' },
      { symbol: '🔨', name: 'Martillo' },
      { symbol: '📋', name: 'Contrato' },
      { symbol: '🎓', name: 'Graduación' },
      { symbol: '🔒', name: 'Privacidad' },
      { symbol: '🗂️', name: 'Archivo' },
      { symbol: '💼', name: 'Abogado' },
      { symbol: '🏢', name: 'Tribunal' },
      { symbol: '📝', name: 'Documento' },
      { symbol: '⚔️', name: 'Defensa' },
    ],
    'Medicina': [
      { symbol: '💉', name: 'Jeringa' },
      { symbol: '🩺', name: 'Estetoscopio' },
      { symbol: '🦷', name: 'Diente' },
      { symbol: '🧬', name: 'ADN' },
      { symbol: '🔬', name: 'Microscopio' },
      { symbol: '💊', name: 'Medicina' },
      { symbol: '🏥', name: 'Hospital' },
      { symbol: '🩹', name: 'Curita' },
      { symbol: '🧪', name: 'Laboratorio' },
      { symbol: '🌡️', name: 'Termómetro' },
      { symbol: '🩻', name: 'Rayos X' },
      { symbol: '🧫', name: 'Petri' },
      { symbol: '💓', name: 'Corazón' },
      { symbol: '🧠', name: 'Cerebro' },
      { symbol: '🦴', name: 'Hueso' },
    ],
    'Arquitectura': [
      { symbol: '🏗️', name: 'Construcción' },
      { symbol: '📐', name: 'Escuadra' },
      { symbol: '🏛️', name: 'Edificio' },
      { symbol: '🎨', name: 'Diseño' },
      { symbol: '📏', name: 'Regla' },
      { symbol: '🏠', name: 'Casa' },
      { symbol: '🏢', name: 'Rascacielos' },
      { symbol: '🏰', name: 'Castillo' },
      { symbol: '🌉', name: 'Puente' },
      { symbol: '🗼', name: 'Torre' },
      { symbol: '⛪', name: 'Iglesia' },
      { symbol: '🏟️', name: 'Estadio' },
      { symbol: '🎭', name: 'Teatro' },
      { symbol: '🏛️', name: 'Museo' },
      { symbol: '🔨', name: 'Construcción' },
    ],
    'Psicología': [
      { symbol: '🧠', name: 'Cerebro' },
      { symbol: '💭', name: 'Pensamiento' },
      { symbol: '😊', name: 'Emoción' },
      { symbol: '🎭', name: 'Teatro' },
      { symbol: '💡', name: 'Idea' },
      { symbol: '🔍', name: 'Análisis' },
      { symbol: '👥', name: 'Grupo' },
      { symbol: '💬', name: 'Diálogo' },
      { symbol: '😌', name: 'Calma' },
      { symbol: '😢', name: 'Tristeza' },
      { symbol: '😡', name: 'Enojo' },
      { symbol: '🤔', name: 'Reflexión' },
      { symbol: '💪', name: 'Fortaleza' },
      { symbol: '🧘', name: 'Meditación' },
      { symbol: '❤️', name: 'Amor' },
    ],
    'Ingeniería Civil': [
      { symbol: '🏗️', name: 'Construcción' },
      { symbol: '🌉', name: 'Puente' },
      { symbol: '🛣️', name: 'Carretera' },
      { symbol: '⚒️', name: 'Herramientas' },
      { symbol: '📐', name: 'Plano' },
      { symbol: '🏢', name: 'Estructura' },
      { symbol: '🚧', name: 'Obra' },
      { symbol: '🧱', name: 'Ladrillo' },
      { symbol: '⛏️', name: 'Pico' },
      { symbol: '🪜', name: 'Escalera' },
      { symbol: '🏗️', name: 'Grúa' },
      { symbol: '🔩', name: 'Tornillo' },
      { symbol: '🪛', name: 'Destornillador' },
      { symbol: '⚙️', name: 'Engranaje' },
      { symbol: '📏', name: 'Medida' },
    ],
    'Comunicación Social': [
      { symbol: '📺', name: 'TV' },
      { symbol: '📻', name: 'Radio' },
      { symbol: '🎤', name: 'Micrófono' },
      { symbol: '📰', name: 'Periódico' },
      { symbol: '📱', name: 'Redes' },
      { symbol: '🎬', name: 'Cine' },
      { symbol: '📷', name: 'Fotografía' },
      { symbol: '🎥', name: 'Video' },
      { symbol: '📡', name: 'Transmisión' },
      { symbol: '🎙️', name: 'Podcast' },
      { symbol: '💬', name: 'Mensaje' },
      { symbol: '📢', name: 'Megáfono' },
      { symbol: '🗣️', name: 'Oratoria' },
      { symbol: '📝', name: 'Redacción' },
      { symbol: '🌐', name: 'Internet' },
    ],
    'Contaduría': [
      { symbol: '💰', name: 'Dinero' },
      { symbol: '📊', name: 'Finanzas' },
      { symbol: '🧮', name: 'Cálculo' },
      { symbol: '💳', name: 'Tarjeta' },
      { symbol: '📈', name: 'Balance' },
      { symbol: '🏦', name: 'Banco' },
      { symbol: '💵', name: 'Billete' },
      { symbol: '💴', name: 'Moneda' },
      { symbol: '📋', name: 'Informe' },
      { symbol: '🧾', name: 'Recibo' },
      { symbol: '📑', name: 'Documento' },
      { symbol: '✍️', name: 'Firma' },
      { symbol: '🔢', name: 'Números' },
      { symbol: '📊', name: 'Gráfico' },
      { symbol: '💼', name: 'Contador' },
    ],
    'Economía': [
      { symbol: '💹', name: 'Mercado' },
      { symbol: '📊', name: 'Estadística' },
      { symbol: '💰', name: 'Capital' },
      { symbol: '🌍', name: 'Global' },
      { symbol: '📈', name: 'Crecimiento' },
      { symbol: '💼', name: 'Negocios' },
      { symbol: '🏦', name: 'Finanzas' },
      { symbol: '💵', name: 'Divisa' },
      { symbol: '📉', name: 'Recesión' },
      { symbol: '🔄', name: 'Comercio' },
      { symbol: '🎯', name: 'Objetivo' },
      { symbol: '⚖️', name: 'Balance' },
      { symbol: '📊', name: 'Análisis' },
      { symbol: '💳', name: 'Crédito' },
      { symbol: '🪙', name: 'Moneda' },
    ],
    'Biología': [
      { symbol: '🧬', name: 'ADN' },
      { symbol: '🔬', name: 'Microscopio' },
      { symbol: '🌿', name: 'Planta' },
      { symbol: '🦠', name: 'Microorganismo' },
      { symbol: '🐛', name: 'Insecto' },
      { symbol: '🧫', name: 'Cultivo' },
      { symbol: '🌱', name: 'Semilla' },
      { symbol: '🍃', name: 'Hoja' },
      { symbol: '🦋', name: 'Mariposa' },
      { symbol: '🐝', name: 'Abeja' },
      { symbol: '🌺', name: 'Flor' },
      { symbol: '🌳', name: 'Árbol' },
      { symbol: '🐸', name: 'Rana' },
      { symbol: '🐟', name: 'Pez' },
      { symbol: '🦎', name: 'Lagarto' },
    ],
    'Química': [
      { symbol: '⚗️', name: 'Alambique' },
      { symbol: '🧪', name: 'Tubo ensayo' },
      { symbol: '🔬', name: 'Laboratorio' },
      { symbol: '⚛️', name: 'Átomo' },
      { symbol: '🧬', name: 'Molécula' },
      { symbol: '🌡️', name: 'Temperatura' },
      { symbol: '🧫', name: 'Petri' },
      { symbol: '💧', name: 'Líquido' },
      { symbol: '🔥', name: 'Reacción' },
      { symbol: '💨', name: 'Gas' },
      { symbol: '🧊', name: 'Sólido' },
      { symbol: '⚗️', name: 'Experimento' },
      { symbol: '🥽', name: 'Protección' },
      { symbol: '🧤', name: 'Guantes' },
      { symbol: '📊', name: 'Análisis' },
    ],
    'Física': [
      { symbol: '⚛️', name: 'Átomo' },
      { symbol: '🔭', name: 'Telescopio' },
      { symbol: '⚡', name: 'Energía' },
      { symbol: '🧲', name: 'Imán' },
      { symbol: '🌡️', name: 'Termómetro' },
      { symbol: '💡', name: 'Luz' },
      { symbol: '🌊', name: 'Onda' },
      { symbol: '🎢', name: 'Velocidad' },
      { symbol: '⚙️', name: 'Mecánica' },
      { symbol: '🪐', name: 'Planeta' },
      { symbol: '🌌', name: 'Universo' },
      { symbol: '🔬', name: 'Experimento' },
      { symbol: '📐', name: 'Geometría' },
      { symbol: '⏱️', name: 'Tiempo' },
      { symbol: '🎯', name: 'Precisión' },
    ],
    'Matemáticas': [
      { symbol: '🧮', name: 'Ábaco' },
      { symbol: '📐', name: 'Geometría' },
      { symbol: '📏', name: 'Medida' },
      { symbol: '🔢', name: 'Números' },
      { symbol: '➗', name: 'División' },
      { symbol: '✖️', name: 'Multiplicación' },
      { symbol: '➕', name: 'Suma' },
      { symbol: '➖', name: 'Resta' },
      { symbol: '📊', name: 'Gráfica' },
      { symbol: '🔺', name: 'Triángulo' },
      { symbol: '⭕', name: 'Círculo' },
      { symbol: '◼️', name: 'Cuadrado' },
      { symbol: '📉', name: 'Función' },
      { symbol: '∞', name: 'Infinito' },
      { symbol: '🎲', name: 'Probabilidad' },
    ],
    'Filosofía': [
      { symbol: '🧠', name: 'Pensamiento' },
      { symbol: '📚', name: 'Sabiduría' },
      { symbol: '🤔', name: 'Reflexión' },
      { symbol: '💭', name: 'Ideas' },
      { symbol: '🎓', name: 'Conocimiento' },
      { symbol: '⚖️', name: 'Ética' },
      { symbol: '🔍', name: 'Búsqueda' },
      { symbol: '💡', name: 'Iluminación' },
      { symbol: '📖', name: 'Lectura' },
      { symbol: '✍️', name: 'Escritura' },
      { symbol: '🗿', name: 'Sócrates' },
      { symbol: '🕊️', name: 'Paz' },
      { symbol: '⏳', name: 'Existencia' },
      { symbol: '🌍', name: 'Mundo' },
      { symbol: '🎭', name: 'Drama' },
    ],
    'Historia': [
      { symbol: '📜', name: 'Pergamino' },
      { symbol: '🏛️', name: 'Antigüedad' },
      { symbol: '⏳', name: 'Tiempo' },
      { symbol: '🗿', name: 'Monumento' },
      { symbol: '👑', name: 'Realeza' },
      { symbol: '⚔️', name: 'Guerra' },
      { symbol: '🏰', name: 'Castillo' },
      { symbol: '🗡️', name: 'Espada' },
      { symbol: '🛡️', name: 'Escudo' },
      { symbol: '📖', name: 'Crónica' },
      { symbol: '🏺', name: 'Reliquia' },
      { symbol: '⛪', name: 'Iglesia' },
      { symbol: '🗺️', name: 'Mapa' },
      { symbol: '🎖️', name: 'Medalla' },
      { symbol: '📚', name: 'Archivo' },
    ],
    'Mix CUC': [
      { symbol: '🎯', name: 'Objetivo' },
      { symbol: '🏆', name: 'Trofeo' },
      { symbol: '⭐', name: 'Estrella' },
      { symbol: '💎', name: 'Diamante' },
      { symbol: '🔥', name: 'Fuego' },
      { symbol: '⚡', name: 'Rayo' },
      { symbol: '🌟', name: 'Brillo' },
      { symbol: '👑', name: 'Corona' },
      { symbol: '🎪', name: 'Show' },
      { symbol: '🎨', name: 'Arte' },
      { symbol: '🎭', name: 'Teatro' },
      { symbol: '🎬', name: 'Cine' },
      { symbol: '🎵', name: 'Música' },
      { symbol: '📚', name: 'Libros' },
      { symbol: '🧠', name: 'Cerebro' },
    ],
    'default': [
      { symbol: '📚', name: 'Libros' },
      { symbol: '🎓', name: 'Birrete' },
      { symbol: '💡', name: 'Idea' },
      { symbol: '✏️', name: 'Lápiz' },
      { symbol: '📝', name: 'Nota' },
      { symbol: '🔍', name: 'Búsqueda' },
      { symbol: '🎯', name: 'Meta' },
      { symbol: '⭐', name: 'Estrella' },
      { symbol: '🌟', name: 'Destello' },
      { symbol: '💫', name: 'Brillo' },
      { symbol: '✨', name: 'Chispa' },
      { symbol: '🔥', name: 'Pasión' },
      { symbol: '💪', name: 'Fuerza' },
      { symbol: '🚀', name: 'Cohete' },
      { symbol: '🎉', name: 'Celebración' },
    ]
  };

  const pares = bancoEmojis[tema] || bancoEmojis['default'];
  
  // ⚠️ VALIDACIÓN: Si pides más pares de los disponibles, usar default
  if (cantidadPares > pares.length) {
    console.warn(`⚠️ Tema "${tema}" solo tiene ${pares.length} emojis, pero se pidieron ${cantidadPares}. Usando tema default.`);
    return bancoEmojis['default'].sort(() => Math.random() - 0.5).slice(0, cantidadPares);
  }
  
  return pares.sort(() => Math.random() - 0.5).slice(0, cantidadPares);
};

//  FUNCIÓN: Calcular dificultad
const calcularDificultad = (pares) => {
  if (pares <= 5) return 'Fácil';
  if (pares <= 7) return 'Medio';
  if (pares <= 9) return 'Difícil';
  if (pares <= 11) return 'Muy Difícil';
  return 'EXTREMO';
};


  //Cargar niveles y progreso desde API al iniciar
  useEffect(() => {
    const cargarDatosAPI = async () => {
      if (!hasAuthToken()) {
        setCargandoNiveles(false);
        return;
      }

      try {
        const niveles = await apiService.obtenerNiveles();
        setNivelesAPI(niveles);

        // ⭐ CONVERTIR niveles de API a formato de juego
        const nivelesFormateados = {};
        niveles.forEach(nivel => {
          nivelesFormateados[nivel.numero] = {
            id: nivel.id,
            name: nivel.nombre,
            tema: nivel.tema,
            pairs: generarParesParaNivel(nivel.pares, nivel.tema),
            color: 'from-pink-600 to-purple-600',
            difficulty: calcularDificultad(nivel.pares),
            xp_juego: nivel.xp_juego,
            xp_general: nivel.xp_general,
            otorga_xp_general: nivel.otorga_xp_general,
            tiempo_limite: nivel.tiempo_limite,
            movimientos_limite: nivel.movimientos_limite,
            mostrar_preview: nivel.mostrar_preview
          };
        });

        setLevelData(nivelesFormateados);
        setTotalLevels(niveles.length);

        const progreso = await apiService.obtenerProgreso();
        setUsuarioProgreso(progreso);

        const nivelesDisponibles = niveles
          .filter(n => n.estado === 'disponible' || n.estado === 'en_progreso' || n.estado === 'completado')
          .map(n => n.numero);
        
        if (nivelesDisponibles.length > 0) {
          setUnlockedLevels(nivelesDisponibles);
        }

        setCargandoNiveles(false);
      } catch (error) {
        console.error('Error al cargar datos API:', error);
        setErrorAPI('Error al conectar con el servidor. El juego funcionará en modo local.');
        setCargandoNiveles(false);
      }
    };

    cargarDatosAPI();
  }, []);

  // Timer para tiempo límite (cuenta regresiva)
useEffect(() => {
  let interval = null;
  if (isTimerActive && gameState === 'playing' && tiempoRestante !== null && tiempoRestante > 0) {
    interval = setInterval(() => {
      setTimer(t => t + 1); // Seguir contando el tiempo jugado total
      setTiempoRestante(t => {
        const nuevoTiempo = t - 1;
        if (nuevoTiempo <= 0) {
          // Tiempo agotado
          clearInterval(interval);
          setIsTimerActive(false);
          finalizarJuegoPorLimite('tiempo');
          return 0;
        }
        return nuevoTiempo;
      });
    }, 1000);
  } else if (isTimerActive && gameState === 'playing' && tiempoRestante === null) {
    // Si no hay límite de tiempo, solo incrementar el timer normal
    interval = setInterval(() => {
      setTimer(t => t + 1);
    }, 1000);
  }
  
  return () => {
    if (interval) clearInterval(interval);
  };
}, [isTimerActive, gameState, tiempoRestante]);


const initializeLevel = (level) => {
  if (!levelData[level]) {
    console.error(`Nivel ${level} no existe`);
    return;
  }

  const levelConfig = levelData[level];
  const levelPairs = levelConfig.pairs;
  
  const shuffledCards = [...levelPairs, ...levelPairs]
    .sort(() => Math.random() - 0.5)
    .map((pair, index) => ({ 
      id: index, 
      symbol: pair.symbol, 
      name: pair.name, 
      isFlipped: levelConfig.mostrar_preview, // Mostrar si preview está activo
      isMatched: false
    }));

  setCards(shuffledCards);
  setFlippedCards([]);
  setMatchedPairs([]);
  setMoves(0);
  setMistakes(0);
  setMatchedCardIds([]);
  setJuegoTerminado(false);
  setResultadosBackend(null);
  
  // Configurar tiempo límite
  if (levelConfig.tiempo_limite) {
    setTiempoRestante(levelConfig.tiempo_limite);
    setTimer(0);
    setIsTimerActive(false); // No iniciar hasta que termine el preview
  } else {
    setTiempoRestante(null);
    setTimer(0);
    setIsTimerActive(false);
  }
  
  // Configurar movimientos límite
  if (levelConfig.movimientos_limite) {
    setMovimientosRestantes(levelConfig.movimientos_limite);
  } else {
    setMovimientosRestantes(null);
  }
  
  // Manejar preview
  if (levelConfig.mostrar_preview) {
    setShowPreview(true);
    setGameState('preview');
    
    setTimeout(() => {
      setCards(prev => prev.map(card => ({ ...card, isFlipped: false })));
      setShowPreview(false);
      setGameState('playing');
      setIsTimerActive(true);
    }, 1000); // 0.5 segundos de preview
  } else {
    setGameState('playing');
    setIsTimerActive(true);
  }
};

const handleCardClick = (id) => {
  if (gameState !== 'playing' || showPreview || juegoTerminado) return;
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
    const nuevosMoves = moves + 1;
    setMoves(nuevosMoves);
    
    // Verificar límite de movimientos
    if (movimientosRestantes !== null) {
      const nuevosMovimientosRestantes = movimientosRestantes - 1;
      setMovimientosRestantes(nuevosMovimientosRestantes);
      
      if (nuevosMovimientosRestantes <= 0) {
        // Movimientos agotados
        setTimeout(() => {
          finalizarJuegoPorLimite('movimientos');
        }, 700);
        return;
      }
    }
    
    setTimeout(() => checkMatch(newFlippedCards, newCards), 700);
  }
};

const finalizarJuegoPorLimite = async (tipo) => {
  setIsTimerActive(false);
  setJuegoTerminado(true);
  
  // Guardar partida como no completada en el backend
  if (hasAuthToken() && nivelIdAPI) {
    try {
      const resultado = await apiService.guardarPartida(
        nivelIdAPI,
        timer,
        moves,
        false, // No completado
        mistakes
      );
      setResultadosBackend(resultado.data);
    } catch (error) {
      console.error('Error al guardar partida fallida:', error);
    }
  }
  
  setGameState('nivelFallido');
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
        
        if (newMatchedPairs.length === levelData[currentLevel]?.pairs.length) {
          setIsTimerActive(false);
          const newLevelTimes = { ...levelTimes, [currentLevel]: timer };
          setLevelTimes(newLevelTimes);
          setTotalTime(Object.values(newLevelTimes).reduce((a, b) => a + b, 0));
          
          // Guardar en API y obtener resultados reales
          if (hasAuthToken() && nivelIdAPI && !nivelYaCompletado) {
            apiService.completarNivel(nivelIdAPI, timer, moves, mistakes)
              .then(async (response) => {
                // Guardar resultados del backend
                setResultadosBackend(response.data);
                
                // Actualizar niveles desde API
                try {
                  const nivelesActualizados = await apiService.obtenerNiveles();
                  setNivelesAPI(nivelesActualizados);
                  
                  const nivelesDisponibles = nivelesActualizados
                    .filter(n => n.estado === 'disponible' || n.estado === 'en_progreso' || n.estado === 'completado')
                    .map(n => n.numero);
                  
                  if (nivelesDisponibles.length > 0) {
                    setUnlockedLevels(nivelesDisponibles);
                  }
                } catch (err) {
                  console.error('Error actualizando niveles:', err);
                }
              })
              .catch(err => console.error('Error API:', err));
          }
          
          if (currentLevel < TOTAL_LEVELS) {
            setGameState('levelComplete');
            
            const completedCount = Object.keys(newLevelTimes).length;
            let newUnlocked = [...unlockedLevels];
            
            // Desbloquear el siguiente nivel EN ORDEN
            if (!newUnlocked.includes(currentLevel + 1) && currentLevel + 1 <= TOTAL_LEVELS) {
              newUnlocked.push(currentLevel + 1);
            }
            
            // Si completaste un múltiplo de 8 (nivel 8, 16, 24...), desbloquear TAMBIÉN el primer nivel del siguiente bloque
            if (completedCount % 8 === 0 && completedCount > 0) {
              const nextBlockFirstLevel = completedCount + 1;
              if (nextBlockFirstLevel <= TOTAL_LEVELS && !newUnlocked.includes(nextBlockFirstLevel)) {
                newUnlocked.push(nextBlockFirstLevel);
              }
            }
            
            setUnlockedLevels(newUnlocked);
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

  const startLevel = async (level) => {
    //    Iniciar nivel en API si hay token
    if (hasAuthToken()) {
      try {
        const niveles = await apiService.obtenerNiveles();
        const nivelAPI = niveles.find(n => n.numero === level);
        if (nivelAPI) {
          setNivelIdAPI(nivelAPI.id);
          
          //    Verificar si el nivel YA estaba completado
          const yaEstabaCompletado = nivelAPI.estado === 'completado';
          setNivelYaCompletado(yaEstabaCompletado);
          
          //    Solo marcar como "en_progreso" si NO está completado
          if (!yaEstabaCompletado) {
            await apiService.iniciarNivel(nivelAPI.id);
          }
        }
      } catch (error) {
        console.error('Error API:', error);
      }
    } else {
      setNivelYaCompletado(false); // En modo local, siempre permitir recompensas
    }
    
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

  //    PANTALLA DE CARGA
  if (cargandoNiveles) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <img 
          src={fondoGif} 
          alt="Fondo animado" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 animate-twinkle"
        />
        
        <div className="relative z-10 text-center px-4">
          <div className="mb-8">
            <h1 className="font-arcade text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6 animate-glow">
              CARGANDO NIVELES
            </h1>
            <div className="flex items-center justify-center gap-3 mb-8">
              <img src={corazonGif} alt="Cargando" className="w-20 animate-pulse" />
              <img src={corazonGif} alt="Cargando" className="w-20 animate-pulse" style={{ animationDelay: '0.3s' }} />
              <img src={corazonGif} alt="Cargando" className="w-20 animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
            <div className="font-arcade text-sm text-white/70 animate-pulse">
              Espera un momento...
            </div>
          </div>
        </div>
      </div>
    );
  }

  //    PANTALLA DE ERROR (si hay error, mostrar mensaje pero permitir jugar)
  if (errorAPI && gameState === 'inicio') {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <img 
          src={fondoGif} 
          alt="Fondo animado" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 animate-twinkle"
        />
        
        <div className="relative z-10 text-center px-4 max-w-md">
          <div className="mb-8">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="font-arcade text-xl md:text-2xl text-yellow-400 mb-4">
              MODO OFFLINE
            </h1>
            <p className="font-arcade text-sm text-white/80 mb-6">
              {errorAPI}
            </p>
            <p className="font-arcade text-xs text-white/60 mb-8">
              Puedes jugar normalmente, pero tu progreso no se guardará.
            </p>
            <button
              onClick={() => setErrorAPI(null)}
              className="pixel-button bg-gradient-to-r from-pink-600 to-purple-600 text-white font-arcade text-lg px-6 py-2 border-4 border-white hover:scale-110 transition-transform duration-200"
            >
              CONTINUAR
            </button>
          </div>
        </div>
      </div>
    );
  }

  // PANTALLA DE INICIO
  if (gameState === 'inicio') {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">

        {/* Fondo animado */}
        <img
          src={fondoGif}
          alt="Fondo animado"
          className="absolute inset-0 w-full h-full object-cover opacity-40 animate-twinkle"
        />

        {/* Montañas inferiores */}
        <div className="absolute bottom-[10%] w-full flex justify-center">
          <img
            src={montanaGif}
            alt="Montañas animadas"
            className="w-full h-auto animate-float-delay"
          />
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 text-center px-4">
          <div className="mb-8">
            <div className="text-xl font-arcade text-white mb-[10%] tracking-wider">ECOTIC</div>
            <h1 className="font-arcade text-1xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6 tracking-tight animate-glow">
              ICONOS DEL SABER CUC
            </h1>
            <div
              className="font-pixellet text-6xl md:text-8xl text-white mb-8 tracking-wider pixel-text"
              style={{ textShadow: '4px 4px 0px rgba(139, 92, 246, 0.5)' }}
            >
              LET'S PLAY
            </div>
          </div>

          {/*    Mostrar progreso del usuario si hay datos de API */}
          {usuarioProgreso && hasAuthToken() && (
            <div className="mb-8 bg-black/40 rounded-lg p-4 max-w-md mx-auto border border-purple-500/30">
              <div className="font-arcade text-xs text-purple-300 mb-3">TU PROGRESO</div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl text-pink-500 font-bold font-arcade">
                    {usuarioProgreso.niveles_completados || 0}
                  </div>
                  <div className="text-[10px] text-white/70 font-arcade">NIVELES</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-purple-500 font-bold font-arcade">
                    {usuarioProgreso.nivel_juego?.nivel_actual || 1}
                  </div>
                  <div className="text-[10px] text-white/70 font-arcade">RANGO</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-yellow-400 font-bold font-arcade">
                    {usuarioProgreso.nivel_juego?.xp_actual || 0}
                  </div>
                  <div className="text-[10px] text-white/70 font-arcade">XP</div>
                </div>
              </div>
            </div>
          )}

          {/* Barra de vida */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <img src={corazonGif} alt="Vida" className="w-[150px] animate-pulse-slow" />
          </div>

          {/* Botón de inicio */}
          <button
            onClick={() => setGameState('menu')}
            className="pixel-button bg-gradient-to-r from-pink-600 to-purple-600 text-white font-arcade text-xl px-8 py-2 border-4 border-white hover:scale-110 transition-transform duration-200 shadow-xl animate-bounce-slow mb-[10%]"
            style={{ imageRendering: 'pixelated' }}
          >
            ▶ JUGAR
          </button>
        </div>

        {/* Elementos decorativos laterales */}
        <div className="absolute top-1/4 left-0 md:left-[10%] text-2xl">
          <img src={destellosGif} alt="Brillo izquierdo" className="w-16 h-auto animate-float" />
        </div>
        <div className="absolute top-1/4 right-0 md:right-[10%] text-3xl">
          <img src={destellosGif} alt="Brillo derecho" className="w-16 h-auto animate-float-delay" />
        </div>
      </div>
    );
  }

  // MENÚ PRINCIPAL
  if (gameState === 'menu') {
    // Lógica de paginación por bloques de 8
    const LEVELS_PER_PAGE = 8;
    
    //  Calcular cuántos niveles están completados (desde API o local)
    let completedLevels = 0;
    if (hasAuthToken() && nivelesAPI.length > 0) {
      // Si hay API, contar niveles completados desde la API
      completedLevels = nivelesAPI.filter(n => n.estado === 'completado').length;
    } else {
      // Si no hay API, usar levelTimes local
      completedLevels = levelTimes ? Object.keys(levelTimes).length : 0;
    }
    
    // Calcular cuántos bloques de 8 niveles se han completado
    const completedBlocks = Math.floor(completedLevels / LEVELS_PER_PAGE);
    
    //  Permitir ver el siguiente bloque solo si se completó el bloque anterior
    const maxAvailablePage = completedBlocks;
    
    // Limitar la página actual al máximo disponible
    const safePage = Math.min(currentPage, maxAvailablePage);
    
    // Calcular niveles visibles de este bloque
    const startIdx = safePage * LEVELS_PER_PAGE;
    const endIdx = startIdx + LEVELS_PER_PAGE;
    const blockLevels = [];
    for (let i = startIdx + 1; i <= endIdx && i <= TOTAL_LEVELS; i++) {
      blockLevels.push(i);
    }
    
    // Mostrar TODOS los niveles del bloque (algunos bloqueados, otros desbloqueados)
    const visibleLevels = blockLevels;
    
    //  Verificar si hay páginas siguiente/anterior disponibles
    const hasNextPage = completedLevels >= (safePage + 1) * LEVELS_PER_PAGE && (safePage + 1) * LEVELS_PER_PAGE < TOTAL_LEVELS;
    const hasPrevPage = safePage > 0;

    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">

        {/* Montañas inferiores */}
        <div className="absolute bottom-[10%] w-full flex justify-center">
          <img
            src={montanaGif}
            alt="Montañas animadas"
            className="w-full h-auto animate-float-delay"
          />
        </div>

        <div className="relative z-10 px-4 py-8 max-w-6xl mx-auto">
          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="font-arcade text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6 tracking-tight animate-glow">
              ICONOS DEL SABER CUC
            </h1>
            <p className="font-arcade text-white text-sm tracking-wider">{TOTAL_LEVELS} NIVELES DE DESAFÍO PROGRESIVO</p>
          </div>

           {/*  Mostrar progreso del usuario si hay datos de API */}
            {usuarioProgreso && hasAuthToken() && (
              <div className="mb-8 bg-black/40 rounded-lg p-4 max-w-md mx-auto border border-purple-500/30">
                <div className="font-arcade text-xs text-purple-300 mb-3 text-center">TU PROGRESO</div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl text-pink-500 font-bold font-arcade">
                      {usuarioProgreso.niveles_completados || 0}
                    </div>
                    <div className="text-[10px] text-white/70 font-arcade">NIVELES</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-purple-500 font-bold font-arcade">
                      {usuarioProgreso.nivel_juego?.nivel_actual || 1}
                    </div>
                    <div className="text-[10px] text-white/70 font-arcade">RANGO</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-yellow-400 font-bold font-arcade">
                      {usuarioProgreso.nivel_juego?.xp_actual || 0}
                    </div>
                    <div className="text-[10px] text-white/70 font-arcade">XP</div>
                  </div>
                </div>
              </div>
            )}
          
          {/* Grid de niveles */}
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4">
            {visibleLevels.map(level => (
              <div 
              style={{
              background: 'linear-gradient(to bottom, #8e0b6a 50%, #ad0d81 50%)'}}
                key={level} 
                className={`relative bg-gradient-to-br from-pink-600 to-purple-700 rounded-[30px] p-4 mx-8 md:mx-0 transition-all duration-300 ${
                  unlockedLevels.includes(level) ? 'hover:scale-105 cursor-pointer' : 'opacity-50'
                }`}
              >
                {/* Diamante decorativo */}
                <img
                src={diamante}
                alt="Efecto brillante"
                className="absolute top-4 right-3 w-8 animate-pulse"
              />
                
                <div className="text-start">
                  <div className="font-pixellet text-[#29ed22] text-4xl mb-1 animate-glow">NIVEL {level}</div>
                  <div className="font-arcade text-[10px] text-white mb-3 uppercase ">{levelData[level].name}</div>
                  <div className='flex justify-between'>
                    <div>
                         <div className="font-arcade text-xs text-white mb-3">{levelData[level].pairs.length} PARES</div>
                    {(() => {
                      // Buscar el nivel en la API para obtener el mejor_tiempo
                      const nivelAPI = nivelesAPI.find(n => n.numero === level);
                      const mejorTiempo = nivelAPI?.mejor_tiempo;
                      
                      // Mostrar mejor tiempo si existe (desde API) o tiempo local como fallback
                      const tiempoAMostrar = mejorTiempo || levelTimes[level];
                      
                      return tiempoAMostrar ? (
                        <div className="font-arcade text-xs text-green-400 mb-2">
                          ✓ {formatTime(tiempoAMostrar)}
                          
                        </div>
                      ) : null;
                    })()}
                    </div>
                
                    <div className=''>
                        <button
                      onClick={() => unlockedLevels.includes(level) && startLevel(level)}
                      disabled={!unlockedLevels.includes(level)}
                      className={`w-full p-2 font-arcade text-xs rounded mt-3 border-2 transition-all ${
                        unlockedLevels.includes(level)
                          ? 'bg-sky-400 text-white border-white hover:bg-[#29ed22]'
                          : 'bg-[#b4b4b4] text-gray-600 border-gray-700 cursor-not-allowed'
                      }`}
                    >
                      {unlockedLevels.includes(level) ? '▶ JUGAR' : 'BLOQUEADO'}
                    </button>
                    </div>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>

          {/* Botones de paginación */}
          {(hasNextPage || hasPrevPage) && (
            <div className="flex justify-center gap-4 mb-8 mt-4">
              {hasPrevPage && (
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="font-arcade px-6 py-2 bg-pink-600 text-white rounded border-2 border-white hover:bg-pink-700 transition-all"
                >
                  ← ANTERIOR
                </button>
              )}
              {hasNextPage && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="font-arcade px-6 py-2 bg-pink-600 text-white rounded border-2 border-white hover:bg-pink-700 transition-all"
                >
                  SIGUIENTE →
                </button>
              )}
            </div>
          )}
        </div>

        {/* Elementos decorativos laterales */}
        <div className="absolute top-1/4 left-0 md:left-[10%] text-2xl">
          <img src={destellosGif} alt="Brillo izquierdo" className="w-16 h-auto animate-float" />
        </div>
        <div className="absolute top-1/4 right-0 md:right-[10%] text-3xl">
          <img src={destellosGif} alt="Brillo derecho" className="w-16 h-auto animate-float-delay" />
        </div>

 
      </div>
    );
  }

  // Pantalla de nivel completado
  if (gameState === 'levelComplete') {
    const accuracy = getAccuracy();
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
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
        <div className="absolute bottom-[5%] sm:bottom-[10%] w-full flex justify-center">
          <img
            src={montanaGif}
            alt="Montañas animadas"
            className="w-full h-auto animate-float-delay"
          />
        </div>

        <div className="relative z-10 bg-gradient-to-br from-pink-600 to-purple-700 rounded-lg border-4 border-white p-4 sm:p-6 md:p-8 w-full max-w-md mx-auto text-center shadow-2xl">
          <div className="font-pixellet text-3xl sm:text-4xl md:text-5xl text-white mb-2">NIVEL {currentLevel}</div>
          <div className="font-pixellet text-3xl sm:text-4xl md:text-5xl text-white mb-4 sm:mb-6">COMPLETADO</div>
          <div className="font-arcade text-[10px] sm:text-xs text-pink-200 mb-4 sm:mb-6 uppercase">{levelData[currentLevel]?.name}</div>
          
          <div className="bg-black/30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 space-y-3">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <img
                src={reloj}
                alt="Efecto brillante"
                className="w-8 sm:w-10 md:w-12"
              />
              <div className="text-center">
                <div className="font-arcade text-xl sm:text-2xl text-white font-bold">{formatTime(timer)}</div>
                <div className="font-arcade text-[10px] sm:text-xs text-gray-300">TIEMPO</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-xl sm:text-2xl">🎯</div>
                <div className="font-arcade text-lg sm:text-xl text-white font-bold">{moves}</div>
                <div className="font-arcade text-[9px] sm:text-[10px] text-gray-300">MOVIMIENTOS</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl">📊</div>
                <div className="font-arcade text-lg sm:text-xl text-white font-bold">{accuracy}%</div>
                <div className="font-arcade text-[9px] sm:text-[10px] text-gray-300">PRECISIÓN</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl">❌</div>
                <div className="font-arcade text-lg sm:text-xl text-white font-bold">{mistakes}</div>
                <div className="font-arcade text-[9px] sm:text-[10px] text-gray-300">ERRORES</div>
              </div>
            </div>
          </div>
  
          {/* Mostrar XP y récords */}
            {resultadosBackend && hasAuthToken() && (
              <div className="space-y-3">
                {/* XP de juego */}
                {resultadosBackend.xp_juego_ganada > 0 && (
                  <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded-lg p-3">
                    <div className="font-arcade text-sm text-yellow-400 font-bold mb-1">⭐ XP DE JUEGO</div>
                    <div className="font-arcade text-lg text-yellow-300">+{resultadosBackend.xp_juego_ganada} XP</div>
                  </div>
                )}
                
                {/* XP general */}
                {resultadosBackend.xp_general_ganada > 0 && (
                  <div className="bg-green-400/20 border-2 border-green-400 rounded-lg p-3 ">
                    <div className="font-arcade text-sm text-green-400 font-bold mb-1">🌟 XP GENERAL </div>
                    <div className="font-arcade text-lg text-green-300">+{resultadosBackend.xp_general_ganada} XP</div>
                  </div>
                )}
                
                {/* Récords */}
                {(resultadosBackend.nuevo_record_tiempo || resultadosBackend.nuevo_record_movimientos) && (
                  <div className="bg-purple-400/20 border-2 border-purple-400 rounded-lg p-3">
                    <div className="font-arcade text-sm text-purple-400 font-bold mb-1">🏆 ¡NUEVO RÉCORD!</div>
                    {resultadosBackend.nuevo_record_tiempo && (
                      <div className="font-arcade text-xs text-purple-300">⏱️ Mejor tiempo</div>
                    )}
                    {resultadosBackend.nuevo_record_movimientos && (
                      <div className="font-arcade text-xs text-purple-300">🎯 Menos movimientos</div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Mensaje si el nivel ya estaba completado */}
            {hasAuthToken() && nivelYaCompletado && (
              <div className="bg-blue-400/20 border-2 border-blue-400 rounded-lg p-3 mb-4">
                <div className="font-arcade text-sm text-blue-400 font-bold mb-1">ℹ️ NIVEL REPETIDO</div>
                <div className="font-arcade text-xs text-blue-300">Ya habías completado este nivel</div>
              </div>
            )}
          
          <div className="space-y-2 sm:space-y-3 mt-2">

          <div className="space-y-2 sm:space-y-3">
            {currentLevel < TOTAL_LEVELS && (
              <button
                onClick={nextLevel}
                className="w-full bg-gray-800 text-white font-arcade py-2 sm:py-3 text-sm sm:text-base rounded border-4 border-white hover:bg-gray-700 transition-all transform hover:scale-105"
              >
                SIGUIENTE NIVEL ({currentLevel + 1})
              </button>
            )}
            <button
              onClick={backToMenu}
              className="w-full bg-gray-900 text-white font-arcade py-2 sm:py-3 text-sm sm:text-base rounded border-2 border-gray-600 hover:bg-gray-800 transition-all"
            >
              VOLVER A MENÚ
            </button>
          </div>
        </div>
          </div>

          

        <div className="absolute top-1/4 left-2 sm:left-4 md:left-[10%]">
          <img src={destellosGif} alt="Brillo izquierdo" className="w-10 sm:w-12 md:w-16 h-auto animate-float" />
        </div>
        <div className="absolute top-1/4 right-2 sm:right-4 md:right-[10%]">
          <img src={destellosGif} alt="Brillo derecho" className="w-10 sm:w-12 md:w-16 h-auto animate-float-delay" />
        </div>
      </div>
    );
  }

  // Pantalla de nivel fallido
if (gameState === 'nivelFallido') {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
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

      <div className="absolute bottom-[5%] sm:bottom-[10%] w-full flex justify-center">
        <img src={montanaGif} alt="Montañas animadas" className="w-full h-auto animate-float-delay" />
      </div>

      <div className="relative z-10 bg-gradient-to-br from-red-600 to-orange-700 rounded-lg border-4 border-white p-4 sm:p-6 md:p-8 w-full max-w-md mx-auto text-center shadow-2xl">
        <div className="text-5xl sm:text-6xl mb-4">⏰</div>
        <div className="font-pixellet text-3xl sm:text-4xl text-white mb-2">NIVEL {currentLevel}</div>
        <div className="font-arcade text-xl sm:text-2xl text-white mb-4">
          {tiempoRestante === 0 ? '¡TIEMPO AGOTADO!' : '¡SIN MOVIMIENTOS!'}
        </div>
        <div className="font-arcade text-[10px] sm:text-xs text-red-200 mb-6 uppercase">
          {levelData[currentLevel]?.name}
        </div>
        
        <div className="bg-black/30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div>
              <div className="text-xl sm:text-2xl">⏱️</div>
              <div className="font-arcade text-lg sm:text-xl text-white font-bold">{formatTime(timer)}</div>
              <div className="font-arcade text-[9px] sm:text-[10px] text-gray-300">TIEMPO</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl">🎯</div>
              <div className="font-arcade text-lg sm:text-xl text-white font-bold">{moves}</div>
              <div className="font-arcade text-[9px] sm:text-[10px] text-gray-300">MOVIMIENTOS</div>
            </div>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <button
            onClick={() => startLevel(currentLevel)}
            className="w-full bg-orange-600 text-white font-arcade py-2 sm:py-3 text-sm sm:text-base rounded border-4 border-white hover:bg-orange-700 transition-all transform hover:scale-105"
          >
            🔄 REINTENTAR NIVEL
          </button>
          <button
            onClick={backToMenu}
            className="w-full bg-gray-900 text-white font-arcade py-2 sm:py-3 text-sm sm:text-base rounded border-2 border-gray-600 hover:bg-gray-800 transition-all"
          >
            VOLVER A MENÚ
          </button>
        </div>
      </div>

      <div className="absolute top-1/4 left-2 sm:left-4 md:left-[10%]">
        <img src={destellosGif} alt="Brillo izquierdo" className="w-10 sm:w-12 md:w-16 h-auto animate-float" />
      </div>
      <div className="absolute top-1/4 right-2 sm:right-4 md:right-[10%]">
        <img src={destellosGif} alt="Brillo derecho" className="w-10 sm:w-12 md:w-16 h-auto animate-float-delay" />
      </div>
    </div>
  );
}

  // Pantalla de juego completado
  if (gameState === 'gameComplete') {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">

        <div className="relative z-10 bg-gradient-to-br from-purple-700 to-pink-700 rounded-lg border-4 border-yellow-400 p-4 sm:p-6 md:p-8 w-full max-w-2xl mx-auto text-center shadow-2xl">
          <div className="text-5xl sm:text-6xl md:text-8xl mb-3 sm:mb-4 animate-bounce flex justify-center">
           <img 
              src={copa} 
              alt="copa" 
              className="w-32"
            />
          </div>
          <div className="font-arcade text-2xl sm:text-3xl md:text-4xl text-yellow-400 mb-2 font-bold animate-pulse">¡MAESTRÍA!</div>
          <div className="font-arcade text-sm sm:text-lg md:text-xl text-white mb-4 sm:mb-6">HAS CONQUISTADO TODOS LOS NIVELES</div>
          
          <div className="bg-black/30 rounded-lg p-4 sm:p-5 md:p-6 mb-4 sm:mb-6">
            <div className="font-arcade text-xs sm:text-sm text-gray-300 mb-2">TIEMPO TOTAL ACUMULADO</div>
            <div className="font-arcade text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-3 sm:mb-4">{formatTime(totalTime)}</div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left max-h-48 sm:max-h-56 overflow-y-auto">
              {/* {visibleLevels.map(level => (
                <div key={level} className="flex justify-between items-center font-arcade text-xs sm:text-sm bg-white/10 rounded p-2 sm:p-2.5">
                  <span className="text-gray-300">NIVEL {level}:</span>
                  <span className="font-bold text-white">{formatTime(levelTimes[level])}</span>
                </div>
              ))} */}
            </div>
          </div>

          <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="font-arcade text-base sm:text-lg font-bold text-yellow-400 mb-1 sm:mb-2">🌟 LOGRO DESBLOQUEADO</div>
            <div className="font-arcade text-xs sm:text-sm text-yellow-300">"MAESTRO DE LOS ÍCONOS DEL SABER CUC"</div>
          </div>

          <button
            onClick={backToMenu}
            className="w-full bg-yellow-400 text-black font-arcade py-3 sm:py-4 rounded border-4 border-white font-bold text-base sm:text-lg hover:bg-yellow-300 transition-all transform hover:scale-105"
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
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col">

      {/* Animación de acierto global */}
      {showMatchAnimation && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className=" animate-success-pop font-bold">
            <img 
              src={correcto} 
              alt="correcto" 
              className="w-32 h-32 object-contain"
            />
          </div>
        </div>
      )}
      
      {/* Animación de error global */}
      {showErrorAnimation && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="animate-error-shake flex justify-center items-center">
            <img 
              src={error} 
              alt="Error" 
              className="w-32 h-32 object-contain"
            />
          </div>
        </div>
      )}
      
      {/* Contenido principal centrado */}
      <div className="flex-1 flex flex-col justify-center items-center relative z-10 px-4 py-8">
        {/* Header */}

        <div className="w-full max-w-3xl flex justify-between items-center font-arcade">
            <div>
              <div className="text-[8px] md:text-2xl font-bold text-yellow-500">Recompensa</div>
              <div className="text-[12px] md:text-2xl font-bold text-yellow-500 flex">
                {levelData[currentLevel]?.xp_juego || 0} XP
              </div>
              {levelData[currentLevel]?.otorga_xp_general && (
                <div className="text-[10px] md:text-sm text-green-400">
                  +{levelData[currentLevel]?.xp_general || 0} XP General
                </div>
              )}
            </div>

            {/* Contador de tiempo */}
            <div className="text-white text-right text-[15px] md:text-3xl font-bold">
              {tiempoRestante !== null ? (
                <>
                  <div className="text-red-400">{formatTime(tiempoRestante)}</div>
                  <div className="text-[6px] md:text-sm text-red-300">TIEMPO RESTANTE</div>
                </>
              ) : (
                <>
                  {formatTime(timer)}
                  <div className="text-[8px] md:text-sm text-gray-400">TIEMPO</div>
                </>
              )}
            </div>

            {/* Contador de movimientos */}
            <div className="text-white text-right text-[15px] md:text-3xl font-bold">
              {movimientosRestantes !== null ? (
                <>
                  <div className={movimientosRestantes <= 5 ? 'text-red-400' : 'text-white'}>
                    {movimientosRestantes}
                  </div>
                  <div className="text-[8px] md:text-sm text-gray-400">MOVIMIENTOS</div>
                </>
              ) : (
                <>
                  <div>{moves}</div>
                  <div className="text-[8px] md:text-sm text-gray-400">MOVIMIENTOS</div>
                </>
              )}
            </div>
          </div>

          {/* Indicador de preview */}
          {showPreview && (
            <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
              <div className="bg-black/70 px-6 py-3 rounded-lg">
                <div className="font-arcade text-white text-xl animate-pulse">
                  ¡MEMORIZA LAS CARTAS!
                </div>
              </div>
            </div>
          )}
   
         <div className='font-pixellet text-xl md:text-4xl font-bold text-pink-500 md:m-8 m-3 animate-glow'>
            {levelData[currentLevel]?.name}
          </div>

        {/* Board con cartas */}
        <div className={`grid gap-2 md:gap-3 ${gridCols} w-full max-w-3xl mb-6 md:mb-8 px-2`}>
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
                  <div className="card-front bg-[#ab1d8c] rounded-lg flex items-center justify-center">
                     <img
                      src={diamante}
                      alt="Efecto brillante"
                      className="animate-pulse w-[50%]"
                    />
                  </div>
                  
                  {/* Card Back (delantera - boca arriba con emoji) */}
                  <div className={`card-back ${card.isMatched ? 'bg-[#39068b]' : 'bg-[#39068b]'} rounded-lg flex items-center justify-center`}>
                    <span className={`${currentLevel >= 6 ? 'text-2xl md:text-4xl' : 'text-5xl md:text-[100px]'}`}>
                      {card.symbol}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón volver */}
        <div className="text-center md:mb-[5%]">
          <button
            onClick={backToMenu}
            className="bg-gray-800 text-white font-arcade px-4 md:px-6 py-2 rounded border-2 border-white hover:bg-gray-700 transition-all text-sm md:text-base"
          >
            ← MENÚ
          </button>
        </div>
      </div>

      {/* Montaña siempre en el fondo abajo */}
      <div className="absolute bottom-0 left-0 right-0 w-full flex justify-center z-0">
        <img
          src={montanaGif}
          alt="Montañas animadas"
          className="w-full h-auto animate-float-delay"
        />
      </div>

      {/* Destellos laterales fijos */}
      <div className="absolute top-1/4 left-2 md:left-[10%]">
        <img src={destellosGif} alt="Brillo izquierdo" className="w-12 md:w-16 h-auto animate-float" />
      </div>
      <div className="absolute top-1/4 right-2 md:right-[10%]">
        <img src={destellosGif} alt="Brillo derecho" className="w-12 md:w-16 h-auto animate-float-delay" />
      </div>
    
    </div>
  );
};

export default App;