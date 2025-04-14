import { SectionTitle } from "@/components/ui/section-title";
import { SkillBar } from "@/components/ui/skill-bar";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Technical Skills" />
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-xl mb-6">Programming & Data Engineering</h3>
            
            <div className="space-y-5">
              <SkillBar 
                name="Python" 
                percentage={95} 
              />
              
              <SkillBar 
                name="SQL & BigQuery" 
                percentage={95} 
              />
              
              <SkillBar 
                name="Flask" 
                percentage={90} 
              />
              
              <SkillBar 
                name="AWS & Google Cloud" 
                percentage={80} 
              />
            </div>
            
            <h3 className="font-semibold text-xl mt-10 mb-6">Data Visualization & Analytics</h3>
            
            <div className="space-y-5">
              <SkillBar 
                name="Kepler (Geospatial Intelligence)" 
                percentage={90} 
                color="bg-emerald-500"
              />

              <SkillBar 
                name="Matplotlib, Seaborn and Plotly" 
                percentage={90} 
                color="bg-emerald-500"
              />
              
              <SkillBar 
                name="Google Looker" 
                percentage={90} 
                color="bg-emerald-500"
              />
              <SkillBar 
                name="ESRI StoryMaps" 
                percentage={85} 
                color="bg-emerald-500"
              />
              
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-xl mb-6">Machine Learning & AI</h3>
            
            <div className="space-y-5">
              <SkillBar 
                name="Statistics & Predictive Modeling" 
                percentage={85} 
                color="bg-amber-500"
              />
              
              <SkillBar 
                name="Deep Learning" 
                percentage={80} 
                color="bg-amber-500"
              />
              
              <SkillBar 
                name="LLM - Generative AI - GPT" 
                percentage={70} 
                color="bg-amber-500"
              />
              
              <SkillBar 
                name="Causal Inference" 
                percentage={60} 
                color="bg-amber-500"
              />
            </div>
            
            <h3 className="font-semibold text-xl mt-10 mb-6">Geospatial Analysis</h3>
            
            <div className="space-y-5">
              <SkillBar 
                name="Google Looker & BigQuery GIS" 
                percentage={95} 
                color="bg-indigo-500"
              />
              
              <SkillBar 
                name="AWS Geospatial Function with Athena" 
                percentage={90} 
                color="bg-indigo-500"
              />
              
              <SkillBar 
                name="Geospatial Visualization and Insight" 
                percentage={85} 
                color="bg-indigo-500"
              />
              
              <SkillBar 
                name="Spatial Pattern Recognition" 
                percentage={90}
                color="bg-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
