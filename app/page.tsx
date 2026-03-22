import Navbar from "@/src/components/shared/navbar"
import Hero from "@/src/components/sections/Home/HomeHero"
import Project from "@/src/components/sections/Home/ProjectSection"
import Footer from "@/src/components/shared/footer"

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <Project/>
      <Footer/>
    </>
  )
}