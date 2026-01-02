import { Link, useRoute } from "wouter";
import { useProduct } from "@/hooks/use-products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, CheckCircle, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const [, params] = useRoute("/products/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: product, isLoading, error } = useProduct(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link href="/products" className="text-primary hover:underline">Return to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/products" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Catalog
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Column */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-card"
            >
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover min-h-[400px]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wide">
                  {product.category}
                </span>
              </div>
            </motion.div>

            {/* Details Column */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{product.name}</h1>
                <p className="text-2xl font-mono text-accent">{product.price}</p>
              </div>

              <div className="prose prose-invert prose-lg text-muted-foreground">
                <p>{product.description}</p>
              </div>

              <div className="bg-card/50 rounded-xl p-6 border border-white/5 space-y-4">
                <h3 className="font-bold text-lg">What's included:</h3>
                <ul className="space-y-3">
                  {[1, 2, 3].map((_, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 shrink-0" />
                      <span className="text-muted-foreground">Professional assessment and implementation</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <Link href="/contact">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Inquire About This Service</span>
                  </button>
                </Link>
                <p className="mt-4 text-sm text-muted-foreground text-center sm:text-left">
                  Questions? Our technical team typically responds within 2 hours.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
