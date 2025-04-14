import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Database, PieChart, Play, RotateCcw } from "lucide-react";

interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  speed: number;
  score: number;
  moveUp: boolean;
  moveDown: boolean;
  moveLeft: boolean;
  moveRight: boolean;
  icon: string;
}

interface DataPoint {
  x: number;
  y: number;
  radius: number;
  color: string;
  collected: boolean;
}

export default function MultiplayerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameActive, setGameActive] = useState(false);
  const requestRef = useRef<number>();
  const gameFrameRef = useRef(0);
  const dataPointsRef = useRef<DataPoint[]>([]);
  
  const [player1, setPlayer1] = useState<Player>({
    x: 50,
    y: 200,
    width: 30,
    height: 30,
    color: '#2563eb',
    speed: 5,
    score: 0,
    moveUp: false,
    moveDown: false,
    moveLeft: false,
    moveRight: false,
    icon: 'DB'
  });
  
  const [player2, setPlayer2] = useState<Player>({
    x: 720,
    y: 200,
    width: 30,
    height: 30,
    color: '#10b981',
    speed: 5,
    score: 0,
    moveUp: false,
    moveDown: false,
    moveLeft: false,
    moveRight: false,
    icon: 'AI'
  });

  const resetGame = () => {
    setPlayer1(prev => ({
      ...prev,
      x: 50,
      y: 200,
      score: 0
    }));
    
    setPlayer2(prev => ({
      ...prev,
      x: 720,
      y: 200,
      score: 0
    }));
    
    dataPointsRef.current = [];
    gameFrameRef.current = 0;
  };

  const createDataPoint = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const dataPoint: DataPoint = {
      x: Math.random() * (canvas.width - 40) + 20,
      y: Math.random() * (canvas.height - 40) + 20,
      radius: 10,
      color: '#f59e0b',
      collected: false
    };
    
    dataPointsRef.current.push(dataPoint);
  };
  
  const handleKeyDown = (e: KeyboardEvent) => {
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

  const movePlayer = (player: Player, canvas: HTMLCanvasElement): Player => {
    const newPlayer = { ...player };
    
    if (player.moveUp && player.y > 0) newPlayer.y -= player.speed;
    if (player.moveDown && player.y < canvas.height - player.height) newPlayer.y += player.speed;
    if (player.moveLeft && player.x > 0) newPlayer.x -= player.speed;
    if (player.moveRight && player.x < canvas.width - player.width) newPlayer.x += player.speed;
    
    return newPlayer;
  };

  const checkCollision = () => {
    dataPointsRef.current.forEach(point => {
      if (!point.collected) {
        // Check player1 collision
        const dx1 = (player1.x + player1.width/2) - point.x;
        const dy1 = (player1.y + player1.height/2) - point.y;
        const distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        
        if (distance1 < player1.width/2 + point.radius) {
          point.collected = true;
          setPlayer1(prev => ({ ...prev, score: prev.score + 1 }));
        }
        
        // Check player2 collision
        const dx2 = (player2.x + player2.width/2) - point.x;
        const dy2 = (player2.y + player2.height/2) - point.y;
        const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        
        if (distance2 < player2.width/2 + point.radius) {
          point.collected = true;
          setPlayer2(prev => ({ ...prev, score: prev.score + 1 }));
        }
      }
    });
  };

  const drawGame = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid pattern
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
    
    // Draw data points
    dataPointsRef.current.forEach(point => {
      if (!point.collected) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = point.color;
        ctx.fill();
        ctx.closePath();
      }
    });
    
    // Draw players
    ctx.fillStyle = player1.color;
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
    ctx.fillStyle = '#FFF';
    ctx.font = '14px Arial';
    ctx.fillText(player1.icon, player1.x + 7, player1.y + 20);
    
    ctx.fillStyle = player2.color;
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
    ctx.fillStyle = '#FFF';
    ctx.font = '14px Arial';
    ctx.fillText(player2.icon, player2.x + 7, player2.y + 20);
    
    // Draw scores
    ctx.fillStyle = '#FFF';
    ctx.font = '20px Arial';
    ctx.fillText(`Player 1: ${player1.score}`, 20, 30);
    ctx.fillText(`Player 2: ${player2.score}`, canvas.width - 150, 30);
  };

  const gameLoop = () => {
    if (!gameActive || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    // Add new data point every 60 frames
    if (gameFrameRef.current % 60 === 0) {
      createDataPoint();
    }
    
    // Move players
    setPlayer1(prev => movePlayer(prev, canvas));
    setPlayer2(prev => movePlayer(prev, canvas));
    
    // Check for collisions
    checkCollision();
    
    // Draw game elements
    drawGame();
    
    gameFrameRef.current++;
    requestRef.current = requestAnimationFrame(gameLoop);
  };

  const toggleGame = () => {
    setGameActive(prev => !prev);
  };

  const handleReset = () => {
    resetGame();
    if (!gameActive) {
      setGameActive(true);
    }
  };

  useEffect(() => {
    // Set canvas dimensions
    if (canvasRef.current) {
      canvasRef.current.width = 800;
      canvasRef.current.height = 400;
      
      // Initial draw
      drawGame();
    }
    
    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (gameActive) {
      requestRef.current = requestAnimationFrame(gameLoop);
    } else if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [gameActive, player1, player2]);

  return (
    <>
      <div className="bg-white text-slate-900 p-4 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div className="font-medium">Data Race - Local Multiplayer</div>
          <div className="flex space-x-3">
            <Button 
              size="sm"
              onClick={toggleGame}
              className="flex items-center gap-1"
            >
              <Play className="h-4 w-4" />
              {gameActive ? "Pause Game" : "Start Game"}
            </Button>
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
      
      <canvas 
        ref={canvasRef} 
        className="w-full rounded-b-lg shadow-lg"
        style={{ backgroundColor: '#0f172a' }}
      ></canvas>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white bg-opacity-10 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-3">Player 1 Controls</h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex space-x-1 mb-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">W</div>
              </div>
              <div className="flex space-x-1">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">A</div>
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">S</div>
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">D</div>
              </div>
            </div>
            <div className="text-blue-300 text-4xl">
              <Database />
            </div>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-10 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-3">Player 2 Controls</h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex space-x-1 mb-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">↑</div>
              </div>
              <div className="flex space-x-1">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">←</div>
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">↓</div>
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">→</div>
              </div>
            </div>
            <div className="text-green-300 text-4xl">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
