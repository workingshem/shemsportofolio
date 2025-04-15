import { Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-primary text-sm font-bold">
                SL
              </div>
              <span className="font-bold">Shem Lim</span>
            </div>
            <p className="text-sm text-gray-400">Data Scientist & Geospatial AI Expert</p>
          </div>
          
          <div className="flex space-x-3">
            <a 
              href="https://www.linkedin.com/in/shem-lim-3b9620147/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white rounded-full w-10 h-10 flex items-center justify-center transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="https://github.com/workingshem" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white rounded-full w-10 h-10 flex items-center justify-center transition"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="mailto:working.shem26@gmail.com"
              className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white rounded-full w-10 h-10 flex items-center justify-center transition"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Shem Lim. All rights reserved.
            <br />
            This website is built with the help of{" "}
            Replit AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
