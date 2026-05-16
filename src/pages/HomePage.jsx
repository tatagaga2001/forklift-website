import Hero from '../components/sections/Hero'
import Promotions from '../components/sections/Promotions'
import FeaturedProducts from '../components/sections/FeaturedProducts'
import Categories from '../components/sections/Categories'
import Services from '../components/sections/Services'
import WhyUs from '../components/sections/WhyUs'
import ContactCTA from '../components/sections/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Promotions />
      <FeaturedProducts />
      <Categories />
      <Services />
      <WhyUs />
      <ContactCTA />
    </>
  )
}
