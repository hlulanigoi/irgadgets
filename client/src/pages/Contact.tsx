import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema } from "@shared/schema";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Loader2, Mail, MapPin, Phone } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const { mutate, isPending } = useCreateInquiry();
  
  const form = useForm({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      serviceOfInterest: "",
    },
  });

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Info Side */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Initialize Connection</h1>
                <p className="text-lg text-muted-foreground">
                  Ready to upgrade your digital infrastructure? Fill out the form or reach us through standard protocols.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 rounded-2xl bg-card border border-white/5 hover:border-primary/30 transition-colors">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email Protocol</h3>
                    <p className="text-muted-foreground">support@irgadgets.com</p>
                    <p className="text-sm text-primary mt-1">Response time: ~2 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 rounded-2xl bg-card border border-white/5 hover:border-primary/30 transition-colors">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Voice Protocol</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-sm text-primary mt-1">Mon-Fri, 9am - 6pm EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 rounded-2xl bg-card border border-white/5 hover:border-primary/30 transition-colors">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Physical Base</h3>
                    <p className="text-muted-foreground">
                      123 Tech Boulevard, Suite 404<br />
                      Silicon Valley, CA 94000
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form Side */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card/30 p-8 rounded-3xl border border-white/10 backdrop-blur-sm"
            >
              <h2 className="text-2xl font-bold mb-6">Submit Inquiry</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Identity</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your Name" 
                            {...field} 
                            className="bg-background/50 border-border focus:border-primary h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Communication Frequency (Email)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="you@example.com" 
                            {...field} 
                            className="bg-background/50 border-border focus:border-primary h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceOfInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Service (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. Web Dev, Hardware Repair" 
                            {...field}
                            value={field.value || ""} // handle null
                            className="bg-background/50 border-border focus:border-primary h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payload (Message)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your technical requirements..." 
                            {...field} 
                            className="bg-background/50 border-border focus:border-primary min-h-[150px] resize-none p-4"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-14 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {isPending ? (
                      <span className="flex items-center justify-center space-x-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Transmitting...</span>
                      </span>
                    ) : (
                      "Transmit Inquiry"
                    )}
                  </button>
                </form>
              </Form>
            </motion.div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
