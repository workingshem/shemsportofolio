import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Database, PieChart, Play, RotateCcw } from "lucide-react";

/**
 * Player interface defines the properties of a player in the game
 * - Position (x, y)
 * - Dimensions (width, height)
 * - Appearance (color, icon)
 * - Movement states
 * - Score tracking
 */
interface Player {
  x: number;             // X position
  y: number;             // Y position
  width: number;         // Width of player
  height: number;        // Height of player
  color: string;         // Color of player
  speed: number;         // Movement speed
  score: number;         // Player's score
  moveUp: boolean;       // Flag for upward movement
  moveDown: boolean;     // Flag for downward movement
  moveLeft: boolean;     // Flag for leftward movement
  moveRight: boolean;    // Flag for rightward movement
  icon: string;          // Text label shown on player ('DB' or 'AI')
}

/**
 * DataPoint interface defines the collectible items in the game
 * - Position (x, y)
 * - Appearance (radius, color)
 * - State tracking (collected)
 */
interface DataPoint {
  x: number;             // X position
  y: number;             // Y position 
  radius: number;        // Size of the data point
  color: string;         // Color of the data point
  collected: boolean;    // Whether the point has been collected
}

/**
 * MultiplayerGame component implements a local two-player game
 * where players compete to collect data points.
 * 
 * Game features:
 * - Two players on same keyboard (WASD and arrow keys)
 * - Collectible data points spawned at intervals
 * - Score tracking for each player
 * - Canvas-based rendering with grid background
 */
export default function MultiplayerGame() {
  // Canvas reference for drawing
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Game state management
  const [gameActive, setGameActive] = useState(false);
  const requestRef = useRef<number>();        // Stores animation frame ID
  const gameFrameRef = useRef(0);             // Counts game frames for timed events
  const dataPointsRef = useRef<DataPoint[]>([]); // Stores collectible data points
  
  // Player 1 state (Database themed - blue)
  const [player1, setPlayer1] = useState<Player>({
    x: 50,                // Starting X position (left side)
    y: 200,               // Starting Y position (middle)
    width: 30,            // Player width
    height: 30,           // Player height
    color: '#2563eb',     // Blue color
    speed: 5,             // Movement speed
    score: 0,             // Initial score
    moveUp: false,        // Movement flags (all initially false)
    moveDown: false,
    moveLeft: false,
    moveRight: false,
    icon: 'DB'            // Database icon text
  });
  
  // Player 2 state (AI themed - green)
  const [player2, setPlayer2] = useState<Player>({
    x: 720,               // Starting X position (right side)
    y: 200,               // Starting Y position (middle)
    width: 30,            // Player width
    height: 30,           // Player height
    color: '#10b981',     // Green color
    speed: 5,             // Movement speed
    score: 0,             // Initial score
    moveUp: false,        // Movement flags (all initially false)
    moveDown: false,
    moveLeft: false,
    moveRight: false,
    icon: 'AI'            // AI icon text
  });

  /**
   * Resets the game to initial state:
   * - Repositions players to starting locations
   * - Resets scores to zero
   * - Clears all data points
   * - Resets the frame counter
   */
  const resetGame = () => {
    // Reset player 1 position and score
    setPlayer1(prev => ({
      ...prev,
      x: 50,
      y: 200,
      score: 0
    }));
    
    // Reset player 2 position and score
    setPlayer2(prev => ({
      ...prev,
      x: 720,
      y: 200,
      score: 0
    }));
    
    // Clear all data points
    dataPointsRef.current = [];
    // Reset frame counter
    gameFrameRef.current = 0;
  };

  /**
   * Creates a new collectible data point at a random position
   * within the canvas boundaries.
   */
  const createDataPoint = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    // Create a new data point with random position
    const dataPoint: DataPoint = {
      // Random X position with margin from edges
      x: Math.random() * (canvas.width - 40) + 20,
      // Random Y position with margin from edges
      y: Math.random() * (canvas.height - 40) + 20,
      radius: 10,           // Size of data point
      color: '#f59e0b',     // Amber color
      collected: false      // Initially not collected
    };
    
    // Add to data points array
    dataPointsRef.current.push(dataPoint);
  };
  
  /**
   * Handles keyboard key down events for player controls
   * - WASD keys control Player 1
   * - Arrow keys control Player 2
   */
  const handleKeyDown = (e: KeyboardEvent) => {
    // Don't process keys if game is not active
    if (!gameActive) return;
    
    // Player 1 controls (WASD)
    if (e.key === 'w') setPlayer1(prev => ({ ...prev, moveUp: true }));
    if (e.key === 's') setPlayer1(prev => ({ ...prev, moveDown: true }));
    if (e.key === 'a') setPlayer1(prev => ({ ...prev, moveLeft: true }));
    if (e.key === 'd') setPlayer1(prev => ({ ...prev, moveRight: true }));
    
    // Player 2 controls (Arrow keys)
    if (e.key === 'ArrowUp') setPlayer2(prev => ({ ...prev, moveUp: true }));
    if (e.key === 'ArrowDown') setPlayer2(prev => ({ ...prev, moveDown: true }));
    if (e.key === 'ArrowLeft') setPlayer2(prev => ({ ...prev, moveLeft: true }));
    if (e.key === 'ArrowRight') setPlayer2(prev => ({ ...prev, moveRight: true }));
  };
  
  /**
   * Handles keyboard key up events for player controls
   * Resets movement flags when keys are released
   */
  const handleKeyUp = (e: KeyboardEvent) => {
    // Player 1 controls (WASD)
    if (e.key === 'w') setPlayer1(prev => ({ ...prev, moveUp: false }));
    if (e.key === 's') setPlayer1(prev => ({ ...prev, moveDown: false }));
    if (e.key === 'a') setPlayer1(prev => ({ ...prev, moveLeft: false }));
    if (e.key === 'd') setPlayer1(prev => ({ ...prev, moveRight: false }));
    
    // Player 2 controls (Arrow keys)
    if (e.key === 'ArrowUp') setPlayer2(prev => ({ ...prev, moveUp: false }));
    if (e.key === 'ArrowDown') setPlayer2(prev => ({ ...prev, moveDown: false }));
    if (e.key === 'ArrowLeft') setPlayer2(prev => ({ ...prev, moveLeft: false }));
    if (e.key === 'ArrowRight') setPlayer2(prev => ({ ...prev, moveRight: false }));
  };

  /**
   * Updates player position based on movement flags
   * - Handles boundary checking to keep player within canvas
   * - Applies player movement speed
   * 
   * @param player The player object to update
   * @param canvas The canvas element for boundary checking
   * @returns Updated player object with new position
   */
  const movePlayer = (player: Player, canvas: HTMLCanvasElement): Player => {
    const newPlayer = { ...player };
    
    // Apply movement based on direction flags
    if (player.moveUp && player.y > 0) {
      newPlayer.y -= player.speed; // Move up
    }
    if (player.moveDown && player.y < canvas.height - player.height) {
      newPlayer.y += player.speed; // Move down
    }
    if (player.moveLeft && player.x > 0) {
      newPlayer.x -= player.speed; // Move left
    }
    if (player.moveRight && player.x < canvas.width - player.width) {
      newPlayer.x += player.speed; // Move right
    }
    
    return newPlayer;
  };

  /**
   * Checks for collisions between players and data points
   * - Uses distance formula to detect collisions
   * - Updates player scores when data points are collected
   * - Marks collected data points
   */
  const checkCollision = () => {
    dataPointsRef.current.forEach(point => {
      // Only check uncollected points
      if (!point.collected) {
        // Check player1 collision using distance formula
        const dx1 = (player1.x + player1.width/2) - point.x;
        const dy1 = (player1.y + player1.height/2) - point.y;
        const distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        
        // If player1 collides with point
        if (distance1 < player1.width/2 + point.radius) {
          point.collected = true; // Mark as collected
          setPlayer1(prev => ({ ...prev, score: prev.score + 1 })); // Increase score
        }
        
        // Check player2 collision using distance formula
        const dx2 = (player2.x + player2.width/2) - point.x;
        const dy2 = (player2.y + player2.height/2) - point.y;
        const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        
        // If player2 collides with point
        if (distance2 < player2.width/2 + point.radius) {
          point.collected = true; // Mark as collected
          setPlayer2(prev => ({ ...prev, score: prev.score + 1 })); // Increase score
        }
      }
    });
  };

  /**
   * Renders the game on the canvas:
   * - Clears the canvas and draws background grid
   * - Draws all active data points
   * - Renders both players with their icons
   * - Displays scores at the top
   */
  const drawGame = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas with dark background
    ctx.fillStyle = '#0f172a'; // Dark blue background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid pattern (vertical lines)
    ctx.strokeStyle = '#1e293b'; // Slightly lighter grid lines
    ctx.lineWidth = 1;
    
    // Draw vertical grid lines
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    
    // Draw horizontal grid lines
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
    
    // Draw data points (only if not collected)
    dataPointsRef.current.forEach(point => {
      if (!point.collected) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = point.color;
        ctx.fill();
        ctx.closePath();
      }
    });
    
    // Draw player 1 (blue square with 'DB' text)
    ctx.fillStyle = player1.color;
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
    ctx.fillStyle = '#FFF'; // White text
    ctx.font = '14px Arial';
    ctx.fillText(player1.icon, player1.x + 7, player1.y + 20);
    
    // Draw player 2 (green square with 'AI' text)
    ctx.fillStyle = player2.color;
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
    ctx.fillStyle = '#FFF'; // White text
    ctx.font = '14px Arial';
    ctx.fillText(player2.icon, player2.x + 7, player2.y + 20);
    
    // Draw scores at the top
    ctx.fillStyle = '#FFF'; // White text
    ctx.font = '20px Arial';
    ctx.fillText(`Player 1: ${player1.score}`, 20, 30); // Left side
    ctx.fillText(`Player 2: ${player2.score}`, canvas.width - 150, 30); // Right side
  };

  /**
   * Main game loop that runs on each animation frame when game is active
   * - Creates new data points at intervals
   * - Updates player positions
   * - Checks for collisions
   * - Renders the game
   * - Requests the next animation frame
   */
  const gameLoop = () => {
    if (!gameActive || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    // Add new data point every 60 frames (about 1 second at 60 FPS)
    if (gameFrameRef.current % 60 === 0) {
      createDataPoint();
    }
    
    // Move players based on their movement flags
    setPlayer1(prev => movePlayer(prev, canvas));
    setPlayer2(prev => movePlayer(prev, canvas));
    
    // Check for collisions with data points
    checkCollision();
    
    // Render the game
    drawGame();
    
    // Increment frame counter
    gameFrameRef.current++;
    
    // Schedule next animation frame
    requestRef.current = requestAnimationFrame(gameLoop);
  };

  /**
   * Toggles the game active state (play/pause)
   */
  const toggleGame = () => {
    setGameActive(prev => !prev);
  };

  /**
   * Handles reset button click
   * - Resets game state
   * - Starts the game if not already active
   */
  const handleReset = () => {
    resetGame();
    if (!gameActive) {
      setGameActive(true);
    }
  };

  /**
   * Setup effect that runs once on component mount
   * - Initializes canvas dimensions
   * - Sets up keyboard event listeners
   * - Draws initial game state
   */
  useEffect(() => {
    // Set canvas dimensions
    if (canvasRef.current) {
      canvasRef.current.width = 800;
      canvasRef.current.height = 400;
      
      // Initial draw
      drawGame();
    }
    
    // Add keyboard event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Cleanup function to remove event listeners and cancel animations
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  /**
   * Effect that manages the game animation loop
   * - Starts/stops animation based on gameActive state
   * - Re-runs when player states change
   */
  useEffect(() => {
    // Start animation loop when game becomes active
    if (gameActive) {
      requestRef.current = requestAnimationFrame(gameLoop);
    } 
    // Cancel animation when game becomes inactive
    else if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    
    // Cleanup function to cancel animation frame
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [gameActive, player1, player2]);

  return (
    <>
      {/* Game header with title and controls */}
      <div className="bg-white text-slate-900 p-4 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div className="font-medium">Data Race - Local Multiplayer</div>
          <div className="flex space-x-3">
            {/* Play/Pause button */}
            <Button 
              size="sm"
              onClick={toggleGame}
              className="flex items-center gap-1"
            >
              <Play className="h-4 w-4" />
              {gameActive ? "Pause Game" : "Start Game"}
            </Button>
            {/* Reset button */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleReset}
              className="flex items-center gap-1"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </div>
      
      {/* Game canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full rounded-b-lg shadow-lg"
        style={{ backgroundColor: '#0f172a' }}
      ></canvas>
      
      {/* Controls display section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Player 1 controls */}
        <div className="bg-white bg-opacity-10 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-3">Player 1 Controls</h3>
          <div className="flex items-center justify-between">
            <div>
              {/* WASD key layout */}
              <div className="flex space-x-1 mb-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">W</div>
              </div>
              <div className="flex space-x-1">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">A</div>
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">S</div>
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">D</div>
              </div>
            </div>
            {/* Player 1 icon */}
            <div className="text-blue-300 text-4xl">
              <Database />
            </div>
          </div>
        </div>
        
        {/* Player 2 controls */}
        <div className="bg-white bg-opacity-10 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-3">Player 2 Controls</h3>
          <div className="flex items-center justify-between">
            <div>
              {/* Arrow keys layout */}
              <div className="flex space-x-1 mb-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">↑</div>
              </div>
              <div className="flex space-x-1">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">←</div>
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">↓</div>
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">→</div>
              </div>
            </div>
            {/* Player 2 icon */}
            <div className="text-green-300 text-4xl">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
