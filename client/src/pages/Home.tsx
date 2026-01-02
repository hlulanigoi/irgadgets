import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Cpu, Globe, ShieldCheck, Wrench, Sparkles, Zap, TrendingUp } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: products } = useProducts();
  const featuredProducts = products?.slice(0, 3) || [];
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full pointer-events-none"
          style={{
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 blur-[120px] rounded-full pointer-events-none animate-pulse" />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-widest mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>Operational Status: Efficient</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight leading-none mb-6">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="block"
              >
                TECH
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient"
                style={{ backgroundSize: '200% auto' }}
              >
                SOLUTIONS
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Making complex technology simple for everyone. We provide the tools and expertise to help you find exactly what you need, when you need it.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/products">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 107, 53, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold text-lg transition-all duration-300 w-full sm:w-auto relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Explore Solutions</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-lg bg-transparent border-2 border-white/20 text-white font-bold text-lg hover:bg-white/10 hover:border-accent transition-all duration-300 w-full sm:w-auto backdrop-blur-sm"
                >
                  Get Started
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2">
            <motion.div 
              className="w-1 h-2 bg-accent rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-secondary/30 relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground">Comprehensive solutions for all your tech needs</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Cpu, title: "Precision Logistics", desc: "Advanced component tracking and supply chain management.", color: "from-orange-500 to-red-500" },
              { icon: Globe, title: "Global Distribution", desc: "Reliable international shipping and storage solutions.", color: "from-blue-500 to-cyan-500" },
              { icon: ShieldCheck, title: "Secure Storage", desc: "State-of-the-art warehousing for your valuable assets.", color: "from-green-500 to-emerald-500" },
              { icon: Wrench, title: "Technical Support", desc: "On-site maintenance for logistics hardware.", color: "from-purple-500 to-pink-500" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative p-6 rounded-xl bg-card border border-white/5 hover:border-primary/50 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-110 transition-all duration-300 text-accent">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, value: "10+", label: "Years Experience", color: "text-orange-500" },
              { icon: Zap, value: "5k+", label: "Devices Fixed", color: "text-cyan-500" },
              { icon: ShieldCheck, value: "99%", label: "Success Rate", color: "text-green-500" },
              { icon: Sparkles, value: "24/7", label: "Support Available", color: "text-purple-500" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className="text-center group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-card border-2 border-white/10 mb-4 group-hover:scale-110 transition-transform ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <h4 className="text-4xl font-bold text-white font-mono mb-2 group-hover:scale-110 transition-transform">{stat.value}</h4>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Tech Guy Spotlight */}
      <section className="py-24 relative overflow-hidden bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <motion.img 
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80" 
                alt="Logistics Specialist"
                className="relative rounded-3xl border border-white/10 shadow-2xl"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>The Gadget Experts</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">Fixing your technology, one gadget at a time.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Meet the minds behind IR Gadgets. We specialize in precision electronics repair, custom software development, and specialized IT solutions, bridging the gap between broken hardware and peak performance.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-xl bg-card border border-white/5 hover:border-primary/30 transition-colors"
                >
                  <h4 className="text-3xl font-bold text-white font-mono">15+</h4>
                  <p className="text-sm text-muted-foreground">Years Combined Experience</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-xl bg-card border border-white/5 hover:border-primary/30 transition-colors"
                >
                  <h4 className="text-3xl font-bold text-white font-mono">10k+</h4>
                  <p className="text-sm text-muted-foreground">Repairs Completed</p>
                </motion.div>
              </div>

              <div className="pt-8">
                <Link href="/about">
                  <motion.button 
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-2 text-primary font-bold hover:text-accent transition-colors group"
                  >
                    <span>Our Full Story</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products CTA */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Solutions</h2>
              <p className="text-muted-foreground">Top rated services requested by our clients.</p>
            </motion.div>
            <Link href="/products">
              <motion.button 
                whileHover={{ x: 5 }}
                className="hidden sm:flex items-center space-x-2 text-sm font-semibold border border-white/10 px-6 py-3 rounded-full hover:bg-white/5 transition-colors group"
              >
                <span>View Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product, index) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group rounded-xl overflow-hidden bg-card border border-white/5 hover:border-primary/50 transition-all duration-300 cursor-pointer h-full flex flex-col relative"
                  >
                    {/* Shine effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 z-10 pointer-events-none" />
                    
                    <div className="aspect-video bg-black/50 relative overflow-hidden">
                      <motion.img 
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80" />
                      <div className="absolute bottom-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase shadow-lg">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">{product.description}</p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <span className="font-mono text-lg font-bold text-accent">{product.price}</span>
                        <motion.span 
                          whileHover={{ x: 5 }}
                          className="text-xs text-primary font-semibold flex items-center space-x-1"
                        >
                          <span>Learn more</span>
                          <ArrowRight className="w-3 h-3" />
                        </motion.span>
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
