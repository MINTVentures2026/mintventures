import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhySection from "@/components/WhySection";
import GainsSection from "@/components/GainsSection";
import LernstufenSection from "@/components/LernstufenSection";
import HowItWorks from "@/components/HowItWorks";
import ProgramDetails from "@/components/ProgramDetails";
import AboutSection from "@/components/AboutSection";

import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <WhySection />
      <GainsSection />
      <LernstufenSection />
      <HowItWorks />
      <ProgramDetails />
      <AboutSection />
      
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
