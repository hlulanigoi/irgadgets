import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Filter, Search, Sparkles, Tag } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const categories = ["all", "saas", "hardware", "software", "service", "maintenance"];

const categoryIcons: Record<string, any> = {
  all: Sparkles,
  saas: Tag,
  hardware: Tag,
  software: Tag,
  service: Tag,
  maintenance: Tag,
};

export default function Products() {
  const { data: products, isLoading } = useProducts();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredProducts = products?.filter(product => {
    const matchesCategory = filter === "all" || product.category === filter;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                          product.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Premium Services</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">Service Catalog</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our range of technical services, software solutions, and maintenance packages designed to keep you operational.
            </p>
          </motion.div>

          {/* Filters & Search */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-card/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm sticky top-24 z-30 shadow-lg"
          >
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const Icon = categoryIcons[cat];
                return (
                  <motion.button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all relative overflow-hidden group ${
                      filter === cat 
                        ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-[0_0_20px_rgba(255,107,53,0.4)]" 
                        : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                    }`}
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                    </span>
                    {filter !== cat && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search services..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-background/80 border border-border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all backdrop-blur-sm"
              />
            </div>
          </motion.div>

          {/* Results Count */}
          <AnimatePresence mode="wait">
            {!isLoading && filteredProducts && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-6 text-sm text-muted-foreground"
              >
                Found <span className="text-primary font-bold">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'service' : 'services'}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={filter + search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {isLoading ? (
                // Enhanced Skeletons
                Array.from({ length: 8 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card rounded-2xl h-[380px] border border-white/5 overflow-hidden"
                  >
                    <div className="h-48 bg-gradient-to-br from-white/5 to-white/10 animate-pulse" />
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-white/5 rounded-lg w-3/4 animate-pulse" />
                      <div className="h-4 bg-white/5 rounded-lg w-full animate-pulse" />
                      <div className="h-4 bg-white/5 rounded-lg w-5/6 animate-pulse" />
                      <div className="h-4 bg-white/5 rounded-lg w-1/2 animate-pulse" />
                    </div>
                  </motion.div>
                ))
              ) : filteredProducts?.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="col-span-full py-24 text-center"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-card border-2 border-white/10 mb-6">
                    <Filter className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">No services found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms.</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setFilter("all"); setSearch(""); }}
                    className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                  >
                    Reset Filters
                  </motion.button>
                </motion.div>
              ) : (
                filteredProducts?.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    layout
                  >
                    <Link href={`/products/${product.id}`}>
                      <motion.div 
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="group h-full bg-card rounded-2xl border border-white/5 overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer flex flex-col relative"
                      >
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300 z-0" />
                        
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 z-10" />
                        
                        <div className="aspect-[4/3] overflow-hidden relative">
                          <motion.img 
                            whileHover={{ scale: 1.15 }}
                            transition={{ duration: 0.4 }}
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
                          <div className="absolute top-3 right-3 z-10">
                            <motion.span 
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-bold border border-white/20 uppercase tracking-wider text-accent shadow-lg"
                            >
                              {product.category}
                            </motion.span>
                          </div>
                        </div>
                        
                        <div className="p-5 flex-1 flex flex-col relative z-10">
                          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-tight">{product.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                            {product.description}
                          </p>
                          
                          <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between">
                            <span className="font-mono font-bold text-accent text-lg">{product.price}</span>
                            <motion.span 
                              whileHover={{ x: 5 }}
                              className="text-xs font-semibold text-primary flex items-center space-x-1"
                            >
                              <span>Details</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </motion.span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
