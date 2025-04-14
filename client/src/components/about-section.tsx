import { SectionTitle } from "@/components/ui/section-title";
import { GraduationCap, Mail, Phone, Linkedin, Github, Award, Bot, Building, ChartLine } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle title="About Me" />
        
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-4">
            <p className="leading-relaxed">
              A data scientist with expertise in geospatial AI, machine learning, and data analytics. I have developed AI-driven solutions for urban planning, hydrology automation, and large-scale geospatial analysis.
            </p>
            <p className="leading-relaxed">
              I'm skilled in Python, BigQuery, and NLP, with a focus on predictive modeling and automation. My work involves creating intelligent systems that extract actionable insights from complex spatial data.
            </p>
            <p className="leading-relaxed">
              I've led award-winning projects, such as the hydrology automation platform that reduced workflow time by 50% and the first-ever integration of GPT-4 for multi-layered geospatial analysis.
            </p>
            
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Education</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <GraduationCap className="h-5 w-5 mt-1 mr-2 text-primary" />
                    <div>
                      <p className="font-medium">Master's in Artificial Intelligence</p>
                      <p className="text-sm text-gray-600">Asia Pacific University (2022-2023)</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <GraduationCap className="h-5 w-5 mt-1 mr-2 text-primary" />
                    <div>
                      <p className="font-medium">Bachelor's in Information Technology</p>
                      <p className="text-sm text-gray-600">Bina Nusantara University (2015-2019)</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Contact Info</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Mail className="h-5 w-5 mt-1 mr-2 text-primary" />
                    <span>working.shem26@gmail.com</span>
                  </li>
                  <li className="flex items-start">
                    <Phone className="h-5 w-5 mt-1 mr-2 text-primary" />
                    <span>+62 85219550728</span>
                  </li>
                  <li className="flex items-start">
                    <Linkedin className="h-5 w-5 mt-1 mr-2 text-primary" />
                    <a href="https://www.linkedin.com/in/shem-lim-3b9620147/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn</a>
                  </li>
                  <li className="flex items-start">
                    <Github className="h-5 w-5 mt-1 mr-2 text-primary" />
                    <a href="https://github.com/LimShem" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-slate-50 p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl mb-4">Key Highlights</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Award-Winning Hydrology Platform</p>
                    <p className="text-sm text-gray-600">Recognized as the most impactful product by ID&E Japan</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Bot className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-medium">GPT-4 Geospatial Integration</p>
                    <p className="text-sm text-gray-600">First-ever integration for automated insight generation</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                    <Building className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium">Urban Planning & Development</p>
                    <p className="text-sm text-gray-600">Led geospatial projects for major corporations like Mitsubishi</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <ChartLine className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Transportation Analytics</p>
                    <p className="text-sm text-gray-600">Analyzed millions of OD records for optimal market entry</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
