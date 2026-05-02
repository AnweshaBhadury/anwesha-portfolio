import Navbar from "@/src/components/shared/navbar"
import Hero from "@/src/components/sections/Home/HomeHero"
import Project from "@/src/components/sections/Home/ProjectSection"
import Footer from "@/src/components/shared/footer"
import About from "@/src/components/sections/Home/About"

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <About/>
      <Project/>
      <Footer/>
    </>
  )
}