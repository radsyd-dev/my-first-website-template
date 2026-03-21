import { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Utensils,
  Cake,
  Calendar,
  MessageSquare,
  MapPin,
  Clock,
  Phone,
  Instagram,
  Facebook,
  ChevronRight,
  Star,
  Menu as MenuIcon,
  X,
  Send
} from 'lucide-react';

// --- Types ---
interface MenuItem {
  name: string;
  description: string;
  price: string;
  category: 'appetizers' | 'mains' | 'wines';
}

// --- Data ---
const MENU_DATA: MenuItem[] = [
  { name: "Beef Carpaccio", description: "Thinly sliced prime beef, arugula, capers, parmesan shavings, and truffle oil.", price: "$18.00", category: 'appetizers' },
  { name: "Scallops St. Jacques", description: "Pan-seared sea scallops with cauliflower purée and crispy pancetta.", price: "$22.00", category: 'appetizers' },
  { name: "Burrata & Heirloom Tomato", description: "Creamy burrata, balsamic glaze, fresh basil, and toasted pine nuts.", price: "$16.00", category: 'appetizers' },
  { name: "Herb-Crusted Rack of Lamb", description: "Roasted with rosemary and garlic, served with mint jus and fondant potatoes.", price: "$38.00", category: 'mains' },
  { name: "Truffle Mushroom Risotto", description: "Creamy arborio rice with wild forest mushrooms and white truffle oil.", price: "$28.00", category: 'mains' },
  { name: "Pan-Seared Sea Bass", description: "Fresh sea bass with saffron velouté, asparagus, and herb-infused oil.", price: "$34.00", category: 'mains' },
  { name: "Château Margaux 2015", description: "A legendary Bordeaux with notes of blackcurrant, violets, and cedar.", price: "$120.00", category: 'wines' },
  { name: "Cloudy Bay Sauvignon Blanc", description: "Vibrant and aromatic with notes of passionfruit and lime.", price: "$65.00", category: 'wines' },
  { name: "Veuve Clicquot Yellow Label", description: "Classic Brut Champagne with fine bubbles and toasted brioche notes.", price: "$95.00", category: 'wines' },
];

const REVIEWS = [
  { name: "Elena Gilbert", text: "The dining experience here is unmatched. The dark wood and warm lighting make it the perfect spot for an intimate dinner.", rating: 5 },
  { name: "Marcus Thorne", text: "Exceptional wine list and the Rack of Lamb was cooked to perfection. A true gem for fine dining enthusiasts.", rating: 5 },
  { name: "Sarah Jenkins", text: "Hosted a family anniversary dinner here and it was spectacular. The service was impeccable and the ambiance is divine.", rating: 5 },
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop", // Restaurant Interior
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop", // Gourmet Dish
  "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop", // Wine Cellar
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop", // Fine Dining Table
  "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1964&auto=format&fit=crop", // Dessert/Plating
  "https://images.unsplash.com/photo-1550966842-2849a2208869?q=80&w=2070&auto=format&fit=crop", // Chef at work
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Events', href: '#events' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = targetId ? document.getElementById(targetId) : document.body;

    if (element) {
      const offset = 80; // Navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-cafe-dark/95 py-4 shadow-xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" onClick={(e) => handleNavClick(e, '#')} className="text-2xl font-serif font-bold text-cafe-gold tracking-widest">
          L'AMBIANCE
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm uppercase tracking-widest hover:text-cafe-gold transition-colors duration-300 cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-cafe-cream"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-cafe-dark border-t border-cafe-gold/10 py-8 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-6 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg uppercase tracking-widest hover:text-cafe-gold transition-colors duration-300 cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="text-center mb-16">
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="text-cafe-gold uppercase tracking-[0.3em] text-xs font-semibold mb-4 block"
    >
      {subtitle}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-5xl font-serif"
    >
      {title}
    </motion.h2>
    <div className="w-24 h-px bg-cafe-gold/30 mx-auto mt-8"></div>
  </div>
);

export default function App() {
  const [activeMenuTab, setActiveMenuTab] = useState<'appetizers' | 'mains' | 'wines'>('appetizers');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);
  const nextImage = () => setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null));
  const prevImage = () => setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null));

  return (
    <div className="min-h-screen selection:bg-cafe-gold selection:text-cafe-dark">
      <Navbar />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-cafe-dark/95 flex items-center justify-center p-4 md:p-10"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 text-cafe-cream hover:text-cafe-gold transition-colors z-[110]"
              onClick={closeLightbox}
            >
              <X size={40} />
            </button>

            <button
              className="absolute left-4 md:left-10 text-cafe-cream hover:text-cafe-gold transition-colors z-[110]"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <ChevronRight size={40} className="rotate-180" />
            </button>

            <button
              className="absolute right-4 md:right-10 text-cafe-cream hover:text-cafe-gold transition-colors z-[110]"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <ChevronRight size={40} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY_IMAGES[selectedImageIndex]}
                alt="Gallery Preview"
                className="max-w-full max-h-full object-contain rounded-sm shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-[-40px] left-0 w-full text-center text-cafe-cream/60 text-sm tracking-widest uppercase">
                Image {selectedImageIndex + 1} of {GALLERY_IMAGES.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop"
            alt="Restaurant Dining Room"
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cafe-dark/70 via-cafe-dark/40 to-cafe-dark"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-cafe-gold uppercase tracking-[0.5em] text-sm font-semibold mb-6 block"
          >
            Fine Dining Since 2014
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-8xl font-serif mb-8 leading-tight"
          >
            A Symphony of <br />
            <span className="italic text-cafe-gold">Culinary Excellence</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-cafe-cream/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            Indulge in an exquisite journey of flavors, where traditional techniques meet modern innovation in a warm, dark-wood sanctuary. Experience the magic of L'Ambiance.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#menu" className="px-10 py-4 bg-cafe-gold text-cafe-dark font-semibold uppercase tracking-widest hover:bg-cafe-cream transition-colors duration-300 rounded-sm">
              Explore Menu
            </a>
            <a href="#contact" className="px-10 py-4 border border-cafe-gold text-cafe-gold font-semibold uppercase tracking-widest hover:bg-cafe-gold hover:text-cafe-dark transition-all duration-300 rounded-sm">
              Reserve a Table
            </a>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cafe-gold/50"
        >
          <div className="w-px h-12 bg-gradient-to-b from-cafe-gold/50 to-transparent mx-auto"></div>
        </motion.div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-cafe-dark relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="The Gourmette Collection" subtitle="A Curated Experience" />

          {/* Menu Tabs */}
          <div className="flex justify-center space-x-4 md:space-x-12 mb-16">
            {(['appetizers', 'mains', 'wines'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveMenuTab(tab)}
                className={`relative pb-2 text-sm uppercase tracking-[0.2em] transition-all duration-300 ${activeMenuTab === tab ? 'text-cafe-gold' : 'text-cafe-cream/40 hover:text-cafe-cream'
                  }`}
              >
                {tab}
                {activeMenuTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-px bg-cafe-gold"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            <AnimatePresence mode="wait">
              {MENU_DATA.filter(item => item.category === activeMenuTab).map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="flex justify-between items-end mb-2">
                    <h3 className="text-xl font-serif group-hover:text-cafe-gold transition-colors duration-300">{item.name}</h3>
                    <div className="flex-grow border-b border-dotted border-cafe-gold/20 mx-4 mb-1"></div>
                    <span className="text-cafe-gold font-medium">{item.price}</span>
                  </div>
                  <p className="text-cafe-cream/60 text-sm font-light italic">{item.description}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-cafe-wood/20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Visual Journey" subtitle="The Ambiance" />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {GALLERY_IMAGES.map((img, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                onClick={() => openLightbox(idx)}
                className={`relative overflow-hidden rounded-sm aspect-square cursor-pointer group ${idx === 1 ? 'md:col-span-2 md:aspect-auto' : ''}`}
              >
                <img
                  src={img}
                  alt={`Gallery ${idx}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-cafe-dark/20 group-hover:bg-cafe-dark/0 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-12 h-12 rounded-full bg-cafe-gold/80 flex items-center justify-center text-cafe-dark">
                    <ChevronRight size={24} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 bg-cafe-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-cafe-gold uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">Private Gatherings</span>
              <h2 className="text-5xl font-serif mb-8">Celebrate Your Moments With Us</h2>
              <p className="text-cafe-cream/70 text-lg mb-10 leading-relaxed">
                From intimate birthday celebrations to elegant family gatherings, our space provides the perfect backdrop for your most cherished memories. Our dedicated events team will ensure every detail is tailored to your vision.
              </p>

              <ul className="space-y-6 mb-12">
                {[
                  { icon: <Cake className="text-cafe-gold" />, title: "Birthdays & Anniversaries", desc: "Customized menus and private seating areas." },
                  { icon: <Utensils className="text-cafe-gold" />, title: "Corporate Dinners", desc: "Professional service in a sophisticated atmosphere." },
                  { icon: <Calendar className="text-cafe-gold" />, title: "Seasonal Workshops", desc: "Join our coffee tasting and baking sessions." },
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-4">
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h4 className="text-cafe-cream font-medium">{item.title}</h4>
                      <p className="text-cafe-cream/50 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <button className="flex items-center space-x-2 text-cafe-gold font-semibold uppercase tracking-widest hover:translate-x-2 transition-transform duration-300">
                <span>Inquire About Events</span>
                <ChevronRight size={20} />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-sm overflow-hidden border border-cafe-gold/20 p-4">
                <img
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
                  alt="Event Setup"
                  className="w-full h-full object-cover rounded-sm"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 glass-panel p-8 rounded-sm hidden md:block">
                <p className="text-cafe-gold text-3xl font-serif mb-1">50+</p>
                <p className="text-cafe-cream/60 text-xs uppercase tracking-widest">Events Hosted Monthly</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-cafe-wood/10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Guest Experiences" subtitle="Testimonials" />

          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="glass-panel p-10 rounded-sm relative"
              >
                <MessageSquare className="absolute top-6 right-6 text-cafe-gold/10" size={40} />
                <div className="flex mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-cafe-gold fill-cafe-gold" />
                  ))}
                </div>
                <p className="text-cafe-cream/80 italic mb-8 leading-relaxed">"{review.text}"</p>
                <p className="text-cafe-gold font-serif text-lg">— {review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <footer id="contact" className="bg-cafe-dark pt-24 pb-12 border-t border-cafe-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-12 mb-24">
            {/* Brand & Social */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-serif font-bold text-cafe-gold tracking-widest mb-6">L'AMBIANCE</h2>
              <p className="text-cafe-cream/50 mb-8 leading-relaxed">
                A sanctuary for coffee lovers and food enthusiasts. Join us for an unforgettable culinary journey.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full border border-cafe-gold/30 flex items-center justify-center text-cafe-gold hover:bg-cafe-gold hover:text-cafe-dark transition-all duration-300">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-cafe-gold/30 flex items-center justify-center text-cafe-gold hover:bg-cafe-gold hover:text-cafe-dark transition-all duration-300">
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-cafe-gold uppercase tracking-widest text-sm font-bold mb-8">Navigation</h4>
              <ul className="space-y-4">
                {['Home', 'Menu', 'Gallery', 'Events', 'Reservations'].map(link => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-cafe-cream/60 hover:text-cafe-gold transition-colors duration-300 text-sm">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-cafe-gold uppercase tracking-widest text-sm font-bold mb-8">Contact Us</h4>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <MapPin size={20} className="text-cafe-gold shrink-0" />
                  <span className="text-cafe-cream/60 text-sm">123 Dark Wood Lane, <br />Gourmet District, NY 10001</span>
                </li>
                <li className="flex items-center space-x-4">
                  <Phone size={20} className="text-cafe-gold shrink-0" />
                  <span className="text-cafe-cream/60 text-sm">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start space-x-4">
                  <Clock size={20} className="text-cafe-gold shrink-0" />
                  <div className="text-cafe-cream/60 text-sm">
                    <p>Mon - Fri: 08:00 - 22:00</p>
                    <p>Sat - Sun: 09:00 - 23:00</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Newsletter/WhatsApp */}
            <div>
              <h4 className="text-cafe-gold uppercase tracking-widest text-sm font-bold mb-8">Stay Connected</h4>
              <p className="text-cafe-cream/60 text-sm mb-6">Join our newsletter for exclusive offers and event updates.</p>
              <div className="flex mb-8">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="bg-cafe-wood/20 border border-cafe-gold/20 px-4 py-2 text-sm focus:outline-none focus:border-cafe-gold w-full rounded-l-sm"
                />
                <button className="bg-cafe-gold text-cafe-dark px-4 py-2 rounded-r-sm hover:bg-cafe-cream transition-colors duration-300">
                  <Send size={18} />
                </button>
              </div>
              <a
                href="https://wa.me/15551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 w-full py-3 bg-cafe-gold text-cafe-dark rounded-sm font-semibold hover:opacity-90 transition-opacity duration-300"
              >
                <MessageSquare size={20} />
                <span>Book a Table via WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="pt-12 border-t border-cafe-gold/5 text-center">
            <p className="text-cafe-cream/30 text-xs uppercase tracking-[0.2em]">
              &copy; {new Date().getFullYear()} L'Ambiance Café & Bistro. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
