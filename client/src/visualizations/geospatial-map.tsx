import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

interface GeospatialMapProps {
  active: boolean;
}

export default function GeospatialMap({ active }: GeospatialMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !mapRef.current) return;

    // Clear any existing content
    if (mapRef.current) {
      mapRef.current.innerHTML = '';
    }

    // Create the visualization elements when active
    if (active && mapRef.current) {
      // Create heatmap layer
      const heatLayer = document.createElement('div');
      heatLayer.className = 'absolute inset-0 z-10';
      heatLayer.style.background = 'radial-gradient(circle at 30% 40%, rgba(16, 185, 129, 0.7) 0%, rgba(37, 99, 235, 0) 50%), radial-gradient(circle at 70% 60%, rgba(249, 115, 22, 0.7) 0%, rgba(37, 99, 235, 0) 40%)';
      heatLayer.style.animation = 'pulse 3s infinite alternate';
      mapRef.current.appendChild(heatLayer);

      // Create data points
      createPoints(mapRef.current, 20);

      // Create control panel
      const controls = document.createElement('div');
      controls.className = 'absolute bottom-4 left-4 right-4 z-20 bg-white bg-opacity-90 p-3 rounded shadow-md flex justify-between';
      
      controls.innerHTML = `
        <div class="flex space-x-2">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-blue-600 rounded-full mr-1"></div>
            <span class="text-xs">Traffic</span>
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 bg-emerald-500 rounded-full mr-1"></div>
            <span class="text-xs">Points of Interest</span>
          </div>
        </div>
        <div class="text-xs">Sample Visualization</div>
      `;
      
      mapRef.current.appendChild(controls);
    }
  }, [active]);

  // Helper function to create data points
  const createPoints = (container: HTMLElement, count: number) => {
    for (let i = 0; i < count; i++) {
      const point = document.createElement('div');
      point.className = 'absolute rounded-full z-20';
      point.style.width = '6px';
      point.style.height = '6px';
      point.style.backgroundColor = i % 2 === 0 ? '#2563eb' : '#10b981';
      point.style.left = `${Math.random() * 90 + 5}%`;
      point.style.top = `${Math.random() * 90 + 5}%`;
      point.style.boxShadow = `0 0 5px ${i % 2 === 0 ? '#2563eb' : '#10b981'}`;
      point.style.transition = 'transform 0.3s ease';
      
      // Add slight movement on hover
      point.addEventListener('mouseenter', () => {
        point.style.transform = 'scale(1.5)';
      });
      
      point.addEventListener('mouseleave', () => {
        point.style.transform = 'scale(1)';
      });
      
      container.appendChild(point);
    }
  };

  return (
    <div 
      ref={mapRef} 
      className="absolute inset-0 bg-slate-50" 
      style={{
        backgroundImage: active ? 'none' : 'radial-gradient(#10b981 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    >
      {!active && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-6 bg-white bg-opacity-90 rounded-lg shadow-sm max-w-xs">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Geospatial Data Visualization</h3>
            <p className="text-sm text-gray-600">Interactive visualization demonstrating movement patterns and heat maps.</p>
          </div>
        </div>
      )}
    </div>
  );
}
