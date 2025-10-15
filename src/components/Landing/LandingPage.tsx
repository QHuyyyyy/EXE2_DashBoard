'use client'

import { useRef } from 'react'
import HeroSearch from './HeroSearch'
import NewPostsSection from './NewPostsSection'
import FeaturesSection from './FeaturesSection'
import ReviewsSection from './ReviewsSection'
import PricingSection from './PricingSection'
import AppDownloadSection from './AppDownloadSection'
import ScrollToTop from './ScrollToTop'

export default function LandingPage() {
    const appDownloadRef = useRef<HTMLElement>(null)

    const scrollToAppDownload = () => {
        if (appDownloadRef.current) {
            appDownloadRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }

    return (
        <>
            <HeroSearch onScrollToDownload={scrollToAppDownload} />
            <NewPostsSection onScrollToDownload={scrollToAppDownload} />
            <FeaturesSection />
            <ReviewsSection />
            <PricingSection onScrollToDownload={scrollToAppDownload} />
            <AppDownloadSection ref={appDownloadRef} />
            <ScrollToTop />
        </>
    )
}