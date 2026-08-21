import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, GraduationCap, Send } from "lucide-react";

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="relative w-full bg-black py-24 md:py-32 overflow-hidden border-t border-neutral-900">
      
      {/* Background radial highlight */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-left mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <span className="text-xs uppercase tracking-widest text-white/60 font-semibold font-outfit">
              Get In Touch
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter font-outfit"
          >
            Let's build something <span className="text-brand-red">together.</span>
          </motion.h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-[#080808] border border-white/10 rounded-3xl p-8 shadow-2xl relative"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-widest text-white/55 font-bold mb-2 font-outfit">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formState.name}
                  onChange={handleInputChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-red focus:shadow-[0_0_15px_rgba(255,42,42,0.15)] transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-widest text-white/55 font-bold mb-2 font-outfit">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formState.email}
                  onChange={handleInputChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-red focus:shadow-[0_0_15px_rgba(255,42,42,0.15)] transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-widest text-white/55 font-bold mb-2 font-outfit">
                  Your Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows="5"
                  value={formState.message}
                  onChange={handleInputChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-red focus:shadow-[0_0_15px_rgba(255,42,42,0.15)] transition-all resize-none"
                  placeholder="Hi Badal, I'd like to work with you on..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black py-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.01] hover:bg-brand-red hover:text-white transition-all shadow-[0_4px_20px_rgba(255,255,255,0.05)] cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-xs font-bold text-green-400 font-outfit"
                >
                  ✔ Message sent successfully! I'll get back to you shortly.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Right Column: Contact Details (Resume-derived) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col space-y-10"
          >
            {/* Info Cards */}
            <div className="space-y-6">
              
              {/* Phone */}
              <div className="flex items-start gap-4 p-5 bg-[#080808] border border-white/5 rounded-2xl">
                <div className="p-3 bg-neutral-900 border border-white/5 rounded-xl text-brand-red">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold font-outfit">Phone</h4>
                  <p className="text-base font-semibold text-white mt-1">+91 8617832572</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-5 bg-[#080808] border border-white/5 rounded-2xl">
                <div className="p-3 bg-neutral-900 border border-white/5 rounded-xl text-brand-red">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold font-outfit">Email</h4>
                  <a href="mailto:badalmahata46@gmail.com" className="text-base font-semibold text-white mt-1 hover:text-brand-red transition-colors block">
                    badalmahata46@gmail.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 p-5 bg-[#080808] border border-white/5 rounded-2xl">
                <div className="p-3 bg-neutral-900 border border-white/5 rounded-xl text-brand-red">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold font-outfit">Location</h4>
                  <p className="text-sm font-semibold text-white mt-1 leading-relaxed">
                    Vill-kendubani, post-BALIGERIA, PS-NAYAGARAM, DIST-Jhargram, West Bengal, India
                  </p>
                </div>
              </div>

              {/* Education */}
              <div className="flex items-start gap-4 p-5 bg-[#080808] border border-white/5 rounded-2xl">
                <div className="p-3 bg-neutral-900 border border-white/5 rounded-xl text-brand-red">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold font-outfit">Education</h4>
                  <div className="mt-1 space-y-2">
                    <div>
                      <p className="text-sm font-semibold text-white">M.Sc in Remote Sensing &amp; GIS</p>
                      <p className="text-[10px] text-white/50">JIS University (2024 - 2026)</p>
                    </div>
                    <div className="pt-1.5 border-t border-white/5">
                      <p className="text-sm font-semibold text-white">B.Sc in Geography (Honours)</p>
                      <p className="text-[10px] text-white/50">Vidyasagar University (2021 - 2024)</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
