import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import BusinessCarousel from './components/BusinessCarousel.jsx'
import Platform from './components/Platform.jsx'
import Ecosystem from './components/Ecosystem.jsx'
import Showcase from './components/Showcase.jsx'
import Why from './components/Why.jsx'
import Solutions from './components/Solutions.jsx'
import Cta from './components/Cta.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BusinessCarousel />
        <Platform />
        <Ecosystem />
        <Showcase />
        <Why />
        <Solutions />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
