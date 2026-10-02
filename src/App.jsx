import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import BusinessCarousel from './components/BusinessCarousel.jsx'
import Testimonials from './components/Testimonials.jsx'
import Platform from './components/Platform.jsx'
import Ecosystem from './components/Ecosystem.jsx'
import Showcase from './components/Showcase.jsx'
import Why from './components/Why.jsx'
import Solutions from './components/Solutions.jsx'
import Faq from './components/Faq.jsx'
import Cta from './components/Cta.jsx'
import Footer from './components/Footer.jsx'
import PricingPage from './pages/PricingPage.jsx'

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BusinessCarousel />
        <Testimonials />
        <Platform />
        <Ecosystem />
        <Showcase />
        <Why />
        <Solutions />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pricing" element={<PricingPage />} />
    </Routes>
  )
}

