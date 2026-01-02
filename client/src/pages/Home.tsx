import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Cpu, Globe, ShieldCheck, Wrench } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Home() {
  const { data: products } = useProducts();
  const featuredProducts = products?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-primary font-tech tracking-widest text-sm md:text-base mb-4 uppercase">
              System Status: Online
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-none mb-6">
              DIGITAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-accent text-glow">
                MASTERY
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              We fix, build, and optimize your digital world. From complex hardware repair to scalable SaaS deployment.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/products">
                <button className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                  Explore Solutions
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-all duration-300 w-full sm:w-auto">
                  Get Support
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2">
            <div className="w-1 h-1 bg-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-secondary/30 relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Cpu, title: "Hardware Repair", desc: "Expert component level diagnostics and repair." },
              { icon: Globe, title: "Web Solutions", desc: "Scalable web apps and maintenance services." },
              { icon: ShieldCheck, title: "Cyber Security", desc: "Protecting your digital assets from threats." },
              { icon: Wrench, title: "Tech Support", desc: "24/7 assistance for critical systems." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-card border border-white/5 hover:border-primary/50 hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-primary">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Tech Guy Spotlight */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-3xl blur-2xl opacity-30" />
              {/* unsplash photo of a tech specialist working on servers */}
              <img 
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80" 
                alt="Tech Specialist"
                className="relative rounded-3xl border border-white/10 shadow-2xl"
              />
            </div>
            
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>The Specialist</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">Fixing your digital world, one byte at a time.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Meet the mind behind IrGadgets. With over a decade of experience in everything from soldering motherboards to deploying cloud infrastructure, our lead technician bridges the gap between hardware and software.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div>
                  <h4 className="text-3xl font-bold text-white font-mono">10+</h4>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-white font-mono">5k+</h4>
                  <p className="text-sm text-muted-foreground">Devices Fixed</p>
                </div>
              </div>

              <div className="pt-8">
                <Link href="/about">
                  <button className="flex items-center space-x-2 text-primary font-bold hover:text-accent transition-colors">
                    <span>Read Full Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products CTA */}
      <section className="py-24 bg-secondary/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Popular Solutions</h2>
              <p className="text-muted-foreground">Top rated services requested by our clients.</p>
            </div>
            <Link href="/products">
              <button className="hidden sm:flex items-center space-x-2 text-sm font-semibold border border-white/10 px-4 py-2 rounded-full hover:bg-white/5 transition-colors">
                <span>View Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="group rounded-2xl overflow-hidden bg-card border border-white/5 hover:border-primary/50 transition-all duration-300 cursor-pointer h-full flex flex-col"
                  >
                    <div className="aspect-video bg-black/50 relative overflow-hidden">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />
                      <div className="absolute bottom-4 left-4">
                        <span className="px-2 py-1 rounded bg-primary text-primary-foreground text-xs font-bold uppercase">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">{product.description}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-mono text-lg font-bold text-accent">{product.price}</span>
                        <span className="text-xs text-muted-foreground group-hover:translate-x-1 transition-transform">Learn more →</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))
            ) : (
              // Loading/Empty skeletons
              [1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl bg-white/5 h-[400px] animate-pulse" />
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
