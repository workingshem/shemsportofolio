import { SectionTitle } from "@/components/ui/section-title";
import { TimelineItem } from "@/components/ui/timeline-item";

const experiences = [
  {
    id: 1,
    date: "August 2023 – Present",
    title: "Data Scientist",
    company: "PT Indokoei International (Nippon Koei Group)",
    location: "Jakarta, Indonesia",
    responsibilities: [
      "Led geospatial AI initiatives, including Know Your Visitor People Movement and Comparative POI Analysis using Google Looker & BigQuery.",
      "Spearheaded the Good City (NYC Project) using Python and Causal Modeling for Transit-Oriented Development insights.",
      "Built an automated hydrology platform reducing workflow time by 50%, awarded most impactful product by ID&E Japan.",
      "Integrated GPT-4 for multi-layered geospatial analysis, enhancing automated insight generation."
    ]
  },
  {
    id: 2,
    date: "June 2020 – March 2022",
    title: "Data Scientist",
    company: "Ezeelink Indonesia",
    location: "Indonesia",
    responsibilities: [
      "Designed real-time interactive dashboards for transaction monitoring and user segmentation.",
      "Built recommendation engines using Turicreate and conducted sentiment analysis with NLP.",
      "Automated data scraping pipelines with BeautifulSoup for competitor analysis."
    ]
  },
  {
    id: 3,
    date: "April 2019 – May 2020",
    title: "Research & Development Engineer",
    company: "ABeam Lightstream Analytics",
    location: "Indonesia",
    responsibilities: [
      "Developed machine learning models for insurance product recommendations based on Fitbit data and presented in the Japanese Abeam Meeting.",
      "Explored Denodo (ETL tools) and Kinetica (BI tools) for real-time analytics."
    ]
  },
  {
    id: 4,
    date: "February 2018 – February 2019",
    title: "Data Scientist Intern",
    company: "Samsung Research and Development Indonesia",
    location: "Indonesia",
    responsibilities: [
      "Built predictive sales forecasting models using linear regression.",
      "Developed customer segmentation models using H2O and Dask for handling large datasets."
    ]
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Work Experience" />
        
        <div className="relative timeline before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gray-200">
          {experiences.map((experience) => (
            <TimelineItem
              key={experience.id}
              date={experience.date}
              title={experience.title}
              company={experience.company}
              location={experience.location}
              responsibilities={experience.responsibilities}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
