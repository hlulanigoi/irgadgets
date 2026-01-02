import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Award, Code, Cpu, Server } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-24">
        {/* Header */}
        <div className="relative py-24 bg-secondary/20 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">THE TECH GUY</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Behind every line of code and every repaired circuit is a passion for perfection.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="prose prose-invert prose-lg mx-auto">
            <p className="lead text-2xl font-light leading-relaxed text-foreground">
              IrGadgets wasn't founded in a boardroom. It started on a workbench covered in soldering irons, motherboards, and coffee cups.
            </p>
            <p>
              I'm the "Tech Guy." For over 10 years, I've been obsessed with how things work. What started as fixing neighbors' computers grew into a full-scale operation handling enterprise SaaS deployments and complex hardware diagnostics.
            </p>
            <p>
              My philosophy is simple: <strong>Technology should serve you, not frustrate you.</strong> Whether it's a slow laptop or a complex cloud architecture, I approach every problem with the same level of detailed analysis and dedication.
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="bg-secondary/10 py-24 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Core Competencies</h2>
              <p className="text-muted-foreground">Mastery across the full technology stack.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Cpu, title: "Hardware Engineering", desc: "Component-level repair, custom PC building, server maintenance." },
                { icon: Code, title: "Full Stack Dev", desc: "React, Node.js, Python, Database architecture." },
                { icon: Server, title: "DevOps & Cloud", desc: "AWS deployment, Docker containerization, CI/CD pipelines." },
                { icon: Award, title: "Certifications", desc: "CompTIA A+, AWS Certified Solutions Architect, Cisco CCNA." },
              ].map((skill, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-card p-8 rounded-2xl border border-white/5 shadow-lg"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                    <skill.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                  <p className="text-muted-foreground">{skill.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
