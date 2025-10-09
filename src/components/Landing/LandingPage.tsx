'use client'

import HeroSearch from './HeroSearch'
import NewPostsSection from './NewPostsSection'
import FeaturesSection from './FeaturesSection'
import ReviewsSection from './ReviewsSection'
import PricingSection from './PricingSection'
import ScrollToTop from './ScrollToTop'

export default function LandingPage() {
    return (
        <>
            <HeroSearch />
            <NewPostsSection />
            <FeaturesSection />
            <ReviewsSection />
            <PricingSection />
            <ScrollToTop />
        </>
    )
}