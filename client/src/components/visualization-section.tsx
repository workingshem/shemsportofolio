import { SectionTitle } from "@/components/ui/section-title";
import { SkillBar } from "@/components/ui/skill-bar";
import GeospatialMap from "@/visualizations/geospatial-map";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function VisualizationSection() {
  const [visualizationActive, setVisualizationActive] = useState(false);

  return (
    <section id="visualizations" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle title="Interactive Visualizations" />
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10">
          Explore interactive visualizations showcasing my expertise in geospatial analysis and data science.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="rounded-lg shadow-md h-80 relative overflow-hidden border border-gray-200">
              <GeospatialMap active={visualizationActive} />
            </div>
            
            <div className="mt-6 p-5 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Visualization Features</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <span>Dynamic heatmap visualization of pedestrian traffic</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <span>Time-series analysis of movement patterns</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <span>Points of interest clustering and analysis</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <div className="bg-slate-50 p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl mb-5">Visualization Technologies</h3>
              
              <div className="space-y-5">
                <SkillBar 
                  name="Looker & BigQuery" 
                  percentage={90} 
                  color="bg-primary"
                  description="Using Google's powerful tools to process and visualize large geospatial datasets."
                />
                
                <SkillBar 
                  name="Interactive Python Libraries" 
                  percentage={95} 
                  color="bg-emerald-500"
                  description="Leveraging Folium, Plotly, and custom visualization libraries for interactive maps."
                />
                
                <SkillBar 
                  name="Data Processing Pipelines" 
                  percentage={85} 
                  color="bg-amber-500"
                  description="Creating efficient pipelines to transform and prepare geospatial data for visualization."
                />
                
                <SkillBar 
                  name="Frontend Visualization Tools" 
                  percentage={80} 
                  color="bg-indigo-500"
                  description="Using D3.js, Mapbox, and custom web interfaces for interactive dashboards."
                />
              </div>
              
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
