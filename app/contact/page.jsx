import Navbar from "@/src/components/shared/navbar";
import HeroSection from "@/src/components/sections/Contact/HeroSection";
import ContactForm from "@/src/components/sections/Contact/ContactForm";
//import Footer from "@/src/components/shared/footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <section id="contact">
        <HeroSection />
        <ContactForm />
      </section>

      
    </>
  );
}