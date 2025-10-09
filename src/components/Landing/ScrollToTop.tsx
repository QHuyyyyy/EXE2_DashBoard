import { useEffect, useState } from 'react'

const IconArrowUp = () => (
    <svg
        viewBox="0 0 24 24"
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
    >
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5,12 12,5 19,12" />
    </svg>
)

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <button
                className={`relative p-4 rounded-full bg-gradient-to-r from-[#f7c600] to-[#e5b700] text-white shadow-2xl transform transition-all duration-300 ease-out cursor-pointer ${isVisible
                        ? 'opacity-100 translate-y-0 scale-100'
                        : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                    } hover:scale-110 hover:from-[#e5b700] hover:to-[#d4a600] hover:shadow-3xl active:scale-95 group`}
                onClick={scrollToTop}
                aria-label="Scroll to top"
                title="Scroll to top"
            >
                {/* Main icon */}
                <div className="relative z-10 transform transition-transform duration-200 group-hover:-translate-y-0.5">
                    <IconArrowUp />
                </div>

                {/* Animated background glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ffe680] to-[#ffd700] opacity-0 group-hover:opacity-60 blur-lg transition-opacity duration-300 -z-10 scale-110" />

                {/* Ripple effect - only shows on hover */}
                <div className="absolute inset-0 rounded-full bg-white/30 opacity-0 group-hover:opacity-100 animate-ping-slow" />

                {/* Border highlight */}
                <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-300" />
            </button>
        </div>
    )
}