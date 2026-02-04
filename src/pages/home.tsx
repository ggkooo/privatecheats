import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import VideoSection from '../components/VideoSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-dark">
      <Header />
      <HeroSection />
      <VideoSection />
      <FeaturesSection />
      <Footer />
    </div>
  )
}
