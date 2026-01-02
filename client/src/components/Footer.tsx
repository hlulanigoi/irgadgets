import { CircuitBoard, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <CircuitBoard className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tighter text-foreground">
                IRGADGETS
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering your digital existence. Expert diagnostics, software solutions, and hardware mastery for the modern age.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Solutions</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-primary transition-colors">Software as a Service</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Hardware Repair</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Web Development</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">System Maintenance</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Book Consultation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-primary hover:text-primary-foreground transition-all">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-primary hover:text-primary-foreground transition-all">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-primary hover:text-primary-foreground transition-all">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:support@irgadgets.com" className="p-2 rounded-full bg-white/5 hover:bg-primary hover:text-primary-foreground transition-all">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} IrGadgets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
