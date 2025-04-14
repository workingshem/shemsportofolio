import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to serve resume data
  app.get("/api/resume", (req, res) => {
    // This data would typically come from storage/database
    // For demonstration, we'll return a simplified structure
    res.json({
      name: "Shem Lim",
      title: "Data Scientist & Geospatial AI Expert",
      experience: "4+ years",
      email: "working.shem26@gmail.com",
      phone: "+62 85219550728",
      linkedin: "https://www.linkedin.com/in/shem-lim-3b9620147/",
      github: "https://github.com/LimShem"
    });
  });

  // Serve the CV file
  app.get("/api/download-cv", (req, res) => {
    const cvPath = path.resolve(
      process.cwd(), 
      "attached_assets", 
      "Curriculum Vitae (CV)_Shem Lim.pdf"
    );
    res.download(cvPath, "Shem_Lim_CV.pdf");
  });

  const httpServer = createServer(app);

  return httpServer;
}
