import { SectionTitle } from "@/components/ui/section-title";
import { SkillBar } from "@/components/ui/skill-bar";
import GeospatialMap from "@/visualizations/geospatial-map";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEffect, useRef } from 'react';

/**
 * VisualizationSection Component
 * 
 * This section showcases interactive data visualizations that highlight
 * the portfolio owner's expertise in geospatial analysis and data science.
 * 
 * It includes:
 * 1. An interactive demo of a geospatial heatmap visualization
 * 2. A list of key visualization features
 * 3. A breakdown of visualization technologies with skill proficiency levels
 * 4. Interactive controls to toggle the visualization
 * 
 * The section serves to demonstrate both technical skill and the ability to
 * create engaging visual representations of complex data.
 */
export default function VisualizationSection() {
  // State to control whether the visualization is active
  const [visualizationActive, setVisualizationActive] = useState(false);
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.addEventListener('load', () => {
        setIsLoading(false);
      });
    }
    // Clean up the event listener
    return () => {
      if (iframeRef.current) {
        iframeRef.current.removeEventListener('load', () => {
          setIsLoading(false);
        });
      }
    };
  }, []);
    
  return (
    <section id="visualizations" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle title="Interactive Visualizations" />
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10">
          Explore interactive visualizations showcasing my expertise in geospatial analysis and data science.
          
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left column: Visualization display and features */}
          <div>
            {/* Visualization container */}
            <div className="rounded-lg shadow-md h-80 relative overflow-hidden border border-gray-200">
              {/* <GeospatialMap active={visualizationActive} /> */}
              {!visualizationActive && <GeospatialMap active={visualizationActive}/>}
              {visualizationActive && (
                <div className="absolute inset-0">
                  {/* Show spinner based on isLoading state */}
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/50">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                    </div>
                  )}
                  <iframe
                    ref={iframeRef}
                    // Use a relative path that includes the repository name
                    src={`${process.env.PUBLIC_URL}/IncidentTraffic.html`}
                    width="100%"
                    height="100%"
                    className="relative z-0"
                    onLoad={() => setIsLoading(false)}
                  />
                </div>
              )}
            </div>
            
            {/* Visualization features list */}
            <div className="mt-6 p-5 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Visualization Features</h3>
              <ul className="space-y-2">
                {/* Feature 1: Heatmap visualization */}
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <span>Blue Line Shows Road in Jakarta</span>
                </li>
                {/* Feature 2: Time-series analysis */}
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <span>H3-3D Shows Incident Happens in Jakarta</span>
                </li>
                {/* Feature 3: POI clustering */}
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <span>Insight Driven: Many Potential Risk Incident in Jakarta</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right column: Technologies and controls */}
          <div>
            <div className="bg-slate-50 p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl mb-5">Visualization Technologies</h3>
              
              <div className="space-y-5">
                {/* Technology 2: Python Libraries */}
                <SkillBar 
                  name="Interactive Python Libraries" 
                  percentage={95} 
                  color="bg-emerald-500"
                  description="Leveraging Folium, Plotly, and custom visualization libraries for interactive maps."
                />

                {/* Technology 1: Looker & BigQuery */}
                <SkillBar 
                  name="Looker & BigQuery" 
                  percentage={90} 
                  color="bg-primary"
                  description="Using Google's powerful tools to process and visualize large geospatial datasets."
                />
                
                {/* Technology 3: Data Processing */}
                <SkillBar 
                  name="Data Processing Pipelines" 
                  percentage={85} 
                  color="bg-amber-500"
                  description="Creating efficient pipelines to transform and prepare geospatial data for visualization."
                />
                
                {/* Technology 4: Frontend Visualization */}
                <SkillBar 
                  name="Frontend Visualization Tools" 
                  percentage={80} 
                  color="bg-indigo-500"
                  description="Using D3.js, Mapbox, and custom web interfaces for interactive dashboards."
                />
              </div>
              
              {/* Visualization control button */}
              <div className="mt-6">
                <Button 
                  onClick={() => setVisualizationActive(!visualizationActive)} 
                  className="w-full"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {visualizationActive ? "Visualization Active" : "Start Visualization"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
