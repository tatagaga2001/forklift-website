import Hero from '../components/sections/Hero'
import Promotions from '../components/sections/Promotions'
import Categories from '../components/sections/Categories'
import Services from '../components/sections/Services'
import WhyUs from '../components/sections/WhyUs'
import ContactCTA from '../components/sections/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Promotions />
      <Categories />
      <Services />
      <WhyUs />
      <ContactCTA />
    </>
  )
}
