import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import myPhoto from "@assets/profile_photo.jpg";

export default function HeroSection() {
  return (
    <section id="home" className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            <span className="text-primary">Data Scientist</span> & <span className="text-emerald-500">AI Expert</span>
          </h1>
          <p className="text-lg mb-6">
            A passionate data scientist with <span className="font-bold">4+ years of experience</span> developing AI-driven solutions for urban planning, hydrology automation, and large-scale geospatial analysis and many more.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="bg-blue-100 text-primary py-1 px-3 rounded-full text-sm font-medium">Python</span>
            <span className="bg-green-100 text-emerald-600 py-1 px-3 rounded-full text-sm font-medium">Statistics & Machine Learning</span>
            <span className="bg-amber-100 text-amber-600 py-1 px-3 rounded-full text-sm font-medium">BigQuery</span>
            <span className="bg-indigo-100 text-indigo-600 py-1 px-3 rounded-full text-sm font-medium">Geospatial Analysis & Insight</span>
            <span className="bg-purple-100 text-purple-600 py-1 px-3 rounded-full text-sm font-medium">LLM</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <a href="#contact">Contact Me</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#projects" className="flex items-center gap-1">
                View Projects <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" asChild className="border-gray-300">
              <a href="attached_assets/Curriculum Vitae (CV)_Shem Lim.pdf" download className="flex items-center gap-1">
                <Download className="h-4 w-4" /> Download CV
              </a>
            </Button>
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute w-full h-full rounded-full bg-blue-300 opacity-10 animate-pulse"></div>
            <div className="absolute w-full h-full rounded-full border-4 border-dashed border-primary animate-spin" style={{animationDuration: '15s'}}></div>
            <div className="absolute inset-4 rounded-full bg-white shadow-xl overflow-hidden">
              {/* Placeholder for profile image */}
              <img
                src={myPhoto} // replace with actual path
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
