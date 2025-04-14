import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

/**
 * Props interface for the GeospatialMap component
 * @property active - Whether the visualization is currently active
 */
interface GeospatialMapProps {
  active: boolean;
}

/**
 * GeospatialMap Component
 * 
 * A simplified visualization component that demonstrates geospatial data mapping concepts.
 * The component creates a simulated heatmap and interactive data points to represent
 * movement patterns and points of interest in an urban environment.
 * 
 * This showcases the kind of geospatial analysis used in portfolio projects
 * but in a simplified browser-friendly implementation.
 * 
 * @param active - Boolean flag to toggle the active state of the visualization
 */
export default function GeospatialMap({ active }: GeospatialMapProps) {
  // Reference to the container div for the map
  const mapRef = useRef<HTMLDivElement>(null);

  /**
   * Effect that manages the creation and clearing of visualization elements
   * based on the 'active' prop
   */
  useEffect(() => {
    // Don't proceed if the component is inactive or the ref isn't set
    if (!active || !mapRef.current) return;

    // Clear any existing content when the state changes
    if (mapRef.current) {
      mapRef.current.innerHTML = '';
    }

    // Create the visualization elements when active
    if (active && mapRef.current) {
      // Create heatmap layer using CSS gradients
      // This simulates heat map visualization common in geospatial analysis
      const heatLayer = document.createElement('div');
      heatLayer.className = 'absolute inset-0 z-10';
      // Using radial gradients to create hotspot effect at two locations
      heatLayer.style.background = 'radial-gradient(circle at 30% 40%, rgba(16, 185, 129, 0.7) 0%, rgba(37, 99, 235, 0) 50%), radial-gradient(circle at 70% 60%, rgba(249, 115, 22, 0.7) 0%, rgba(37, 99, 235, 0) 40%)';
      // Adding animation to simulate data changes over time
      heatLayer.style.animation = 'pulse 3s infinite alternate';
      mapRef.current.appendChild(heatLayer);

      // Create data points to represent locations or movement metrics
      // In real geospatial analysis, these would be generated from geographic coordinates
      createPoints(mapRef.current, 20);

      // Create control panel to mimic a real GIS interface
      const controls = document.createElement('div');
      controls.className = 'absolute bottom-4 left-4 right-4 z-20 bg-white bg-opacity-90 p-3 rounded shadow-md flex justify-between';
      
      // Populate control panel with legends for the visualization
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
  }, [active]); // Dependency array ensures effect runs when 'active' changes

  /**
   * Helper function to create interactive data points
   * In a real geospatial application, these would represent:
   * - Points of interest (stores, landmarks, etc.)
   * - Movement data (pedestrian flow, traffic, etc.)
   * - Infrastructure elements (transit stops, bike stations, etc.)
   * 
   * @param container - The DOM element to append points to
   * @param count - Number of points to create
   */
  const createPoints = (container: HTMLElement, count: number) => {
    for (let i = 0; i < count; i++) {
      // Create a point element
      const point = document.createElement('div');
      point.className = 'absolute rounded-full z-20';
      point.style.width = '6px';
      point.style.height = '6px';
      
      // Alternate colors between blue (traffic) and green (POI)
      // In real applications, colors would indicate different data categories
      point.style.backgroundColor = i % 2 === 0 ? '#2563eb' : '#10b981';
      
      // Position randomly within the container
      // In real applications, positions would be based on lat/long coordinates
      point.style.left = `${Math.random() * 90 + 5}%`;
      point.style.top = `${Math.random() * 90 + 5}%`;
      
      // Add glow effect to make points more visible
      point.style.boxShadow = `0 0 5px ${i % 2 === 0 ? '#2563eb' : '#10b981'}`;
      point.style.transition = 'transform 0.3s ease';
      
      // Add interactivity - points grow on hover to indicate they're interactive
      // In real applications, this would display data about the point
      point.addEventListener('mouseenter', () => {
        point.style.transform = 'scale(1.5)';
      });
      
      point.addEventListener('mouseleave', () => {
        point.style.transform = 'scale(1)';
      });
      
      // Add the point to the container
      container.appendChild(point);
    }
  };

  return (
    <div 
      ref={mapRef} 
      className="absolute inset-0 bg-slate-50" 
      style={{
        // When inactive, show a dot pattern to hint at a map
        // When active, this is replaced by the visualization
        backgroundImage: active ? 'none' : 'radial-gradient(#10b981 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    >
      {/* Display placeholder content when the visualization is inactive */}
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
