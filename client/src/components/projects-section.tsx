import { SectionTitle } from "@/components/ui/section-title";
import { Card, CardContent } from "@/components/ui/card";
import { Droplet, Bot, Landmark, ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Hydrology Automation Platform",
    description: "Developed an automated hydrology analysis system reducing workflow time by up to 50%, recognized as the most impactful product by ID&E Japan.",
    icon: <Droplet className="h-12 w-12 text-white" />,
    gradient: "from-blue-400 to-blue-600",
    badgeText: "Award-Winning",
    badgeColor: "bg-blue-100 text-primary",
    skills: ["Python", "Automation", "Data Analysis"]
  },
  {
    id: 2,
    title: "GPT-4 Geospatial Integration",
    description: "Developed the first-ever integration of GPT-4 for geospatial analysis, automating insight extraction from complex spatial data.",
    icon: <Bot className="h-12 w-12 text-white" />,
    gradient: "from-green-400 to-green-600",
    badgeText: "AI Integration",
    badgeColor: "bg-green-100 text-green-700",
    skills: ["GPT-4", "GeoSpatial AI", "BigQuery"]
  },
  {
    id: 3,
    title: "Urban Health Predictions",
    description: "Led the development of a causal model predicting neighborhood health based on amenities, enhancing urban health predictions.",
    icon: <Landmark className="h-12 w-12 text-white" />,
    gradient: "from-amber-400 to-amber-600",
    badgeText: "Urban Planning",
    badgeColor: "bg-amber-100 text-amber-700",
    skills: ["Causal Modeling", "Python", "Urban Planning"]
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle title="Featured Projects" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden border border-gray-100 transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className={`h-48 bg-gradient-to-r ${project.gradient} flex items-center justify-center`}>
                {project.icon}
              </div>
              <CardContent className="p-6">
                <span className={`inline-block ${project.badgeColor} text-xs px-2 py-1 rounded-full mb-2`}>
                  {project.badgeText}
                </span>
                <h3 className="font-semibold text-xl mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
                {/* <a href="#" className="text-primary font-medium hover:underline inline-flex items-center">
                  View Details <ArrowRight className="ml-1 h-4 w-4" />
                </a> */}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* <div className="mt-10 text-center">
          <a href="#" className="inline-flex items-center text-primary hover:text-blue-700 font-medium">
            View All Projects <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div> */}
      </div>
    </section>
  );
}
