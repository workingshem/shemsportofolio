import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Linkedin, Github, Download } from "lucide-react";
import { FormEvent, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you shortly.",
      });
      
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Get In Touch" />
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10">
          Interested in working together or have questions about my expertise? Feel free to reach out!
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="font-semibold text-xl mb-5">Contact Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary text-white rounded-full p-3 mr-4">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium mb-1">Email</p>
                  <a href="mailto:working.shem26@gmail.com" className="text-primary hover:underline">working.shem26@gmail.com</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary text-white rounded-full p-3 mr-4">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium mb-1">Phone</p>
                  <a href="tel:+6285219550728" className="text-primary hover:underline">+62 85219550728</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary text-white rounded-full p-3 mr-4">
                  <Linkedin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium mb-1">LinkedIn</p>
                  <a href="https://www.linkedin.com/in/shem-lim-3b9620147/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">linkedin.com/in/shem-lim-3b9620147</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary text-white rounded-full p-3 mr-4">
                  <Github className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium mb-1">GitHub</p>
                  <a href="https://github.com/LimShem" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">github.com/LimShem</a>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button variant="secondary" asChild>
                <a href="attached_assets/Curriculum Vitae (CV)_Shem Lim.pdf" download className="flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download My CV
                </a>
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-xl mb-5">Send Me a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formState.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formState.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  name="subject" 
                  value={formState.subject}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  value={formState.message}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
