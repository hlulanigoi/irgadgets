import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Filter, Search } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const categories = ["all", "saas", "hardware", "software", "service", "maintenance"];

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
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Service Catalog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Explore our range of technical services, software solutions, and maintenance packages designed to keep you operational.
            </p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-card/50 p-4 rounded-xl border border-white/5 backdrop-blur-sm sticky top-24 z-30">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === cat 
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(6,182,212,0.3)]" 
                      : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search services..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              // Skeletons
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-card rounded-2xl h-[350px] animate-pulse border border-white/5">
                  <div className="h-48 bg-white/5 rounded-t-2xl" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-white/5 rounded w-3/4" />
                    <div className="h-4 bg-white/5 rounded w-full" />
                    <div className="h-4 bg-white/5 rounded w-1/2" />
                  </div>
                </div>
              ))
            ) : filteredProducts?.length === 0 ? (
              <div className="col-span-full py-24 text-center">
                <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No services found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              filteredProducts?.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="group h-full bg-card rounded-2xl border border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 cursor-pointer flex flex-col">
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-2 right-2">
                          <span className="px-2 py-1 rounded bg-black/60 backdrop-blur-md text-xs font-bold border border-white/10 uppercase tracking-wider">
                            {product.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                          {product.description}
                        </p>
                        
                        <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between">
                          <span className="font-mono font-bold text-accent">{product.price}</span>
                          <span className="text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                            Details &rarr;
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
