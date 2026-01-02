import { useState } from "react";
import { Link, useRoute } from "wouter";
import { useProduct } from "@/hooks/use-products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, CheckCircle, MessageSquare, Sparkles, Shield, Zap, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetails() {
  const [, params] = useRoute("/products/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: product, isLoading, error } = useProduct(id);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
        <p className="mt-4 text-muted-foreground">Loading service details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="w-20 h-20 rounded-full bg-destructive/20 flex items-center justify-center mb-6"
        >
          <span className="text-4xl">⚠️</span>
        </motion.div>
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The service you're looking for doesn't exist.</p>
        <Link href="/products">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold"
          >
            Return to Catalog
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link href="/products" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
              <span>Back to Catalog</span>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="sticky top-32">
                <motion.div 
                  layoutId={`product-image-${product.id}`}
                  className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-card group cursor-zoom-in"
                  onClick={() => setIsImageZoomed(!isImageZoomed)}
                  whileHover={{ scale: 1.02 }}
                >
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 animate-pulse" />
                  )}
                  <motion.img 
                    src={product.imageUrl} 
                    alt={product.name}
                    onLoad={() => setImageLoaded(true)}
                    className="w-full h-full object-cover min-h-[400px] lg:min-h-[600px]"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80" />
                  
                  {/* Overlay info */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm font-bold uppercase tracking-wide shadow-lg"
                    >
                      {product.category}
                    </motion.span>
                  </div>
                  
                  {/* Zoom hint */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to zoom
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Details Column */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              {/* Header */}
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-4">
                  <Sparkles className="w-3 h-3" />
                  <span>Premium Service</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {product.name}
                </h1>
                <div className="flex items-baseline space-x-3 mb-6">
                  <span className="text-3xl md:text-4xl font-mono font-bold text-accent">{product.price}</span>
                  <span className="text-sm text-muted-foreground">per service</span>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              {/* Features */}
              <div className="bg-gradient-to-br from-card/80 to-card/40 rounded-2xl p-6 border border-white/10 backdrop-blur-sm space-y-4">
                <h3 className="font-bold text-xl flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>What's included:</span>
                </h3>
                <ul className="space-y-3">
                  {[
                    { icon: Shield, text: "Professional assessment and consultation" },
                    { icon: Zap, text: "Expert implementation and setup" },
                    { icon: Clock, text: "Ongoing support and maintenance" },
                  ].map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-start group"
                    >
                      <div className="bg-primary/10 p-2 rounded-lg mr-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <item.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors pt-1">{item.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Benefits badges */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Shield, label: "Guaranteed Quality" },
                  { icon: Zap, label: "Fast Turnaround" },
                  { icon: Clock, label: "24/7 Support" },
                ].map((badge, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-secondary border border-white/10 text-sm font-medium hover:border-primary/30 transition-colors"
                  >
                    <badge.icon className="w-4 h-4 text-primary" />
                    <span>{badge.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="pt-6 space-y-4"
              >
                <Link href="/contact">
                  <motion.button 
                    whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255, 107, 53, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-5 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-200 flex items-center justify-center space-x-3 group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5" />
                      <span>Inquire About This Service</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </motion.button>
                </Link>
                <p className="text-sm text-muted-foreground text-center flex items-center justify-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Our technical team typically responds within 2 hours</span>
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-24 grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Shield,
                title: "Quality Guarantee",
                description: "We stand behind our work with a satisfaction guarantee on all services.",
                color: "from-green-500/20 to-emerald-500/20"
              },
              {
                icon: Zap,
                title: "Fast Delivery",
                description: "Quick turnaround times without compromising on quality or attention to detail.",
                color: "from-yellow-500/20 to-orange-500/20"
              },
              {
                icon: Clock,
                title: "Ongoing Support",
                description: "Continuous support and maintenance to ensure everything runs smoothly.",
                color: "from-blue-500/20 to-cyan-500/20"
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <item.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {isImageZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setIsImageZoomed(false)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={product.imageUrl}
              alt={product.name}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            />
            <button
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors text-white"
              onClick={() => setIsImageZoomed(false)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
