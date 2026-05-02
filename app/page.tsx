import Navbar from "@/src/components/shared/navbar"
import Hero from "@/src/components/sections/Home/HomeHero"
import Project from "@/src/components/sections/Home/ProjectSection"
import Footer from "@/src/components/shared/footer"
import About from "@/src/components/sections/Home/About"
import TransitionSection from "@/src/components/sections/Home/TransitionSection.jsx"

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <TransitionSection/>
      <About/>
      <Project/>
      <Footer/>
    </>
  )
}