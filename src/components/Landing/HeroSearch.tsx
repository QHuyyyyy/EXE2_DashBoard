import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Select from './ui/Select';
import { useAuth } from '@/contexts/auth-context';

// Add SpeechRecognition type declarations
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

interface SpeechRecognitionEvent {
    results: {
        [key: number]: {
            [key: number]: {
                transcript: string;
            };
        };
    };
}

interface SpeechRecognition {
    lang: string;
    interimResults: boolean;
    maxAlternatives: number;
    onresult: (event: SpeechRecognitionEvent) => void;
    onend: () => void;
    onerror: () => void;
    start: () => void;
}

type SearchParams = {
    location: string
    type: string
    price: string
}

type HeroSearchProps = {
    backgroundImage?: string
    tabs?: string[]
    activeTabDefault?: string
    trending?: string[]
    onSearch?: (params: SearchParams) => void
    onScrollToDownload?: () => void
}

// Inline icons
const IconSearch = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
    >
        <circle cx="11" cy="11" r="7" />
        <line x1="16.65" y1="16.65" x2="21" y2="21" />
    </svg>
)

const IconMic = () => (
    <svg viewBox="0 0 24 24" className={`w-9 h-9`} width="20" height="20" aria-hidden>
        <path fill="currentColor" d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2Z" />
    </svg>

)
const IconUser = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
        <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5 0-9 2.5-9 5.5V22h18v-2.5C21 16.5 17 14 12 14Z" />
    </svg>
)
const IconMenu = () => (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
        <path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
    </svg>
)
// Removed inline chevron icon; custom Select renders its own chevron


export default function HeroSearch({
    backgroundImage =
    "/background.png",
    tabs = ['Mua', 'Thuê', 'Kết nối bạn ở ghép', 'Thương mại'],
    activeTabDefault = 'Thuê',
    trending = ['S7.02', 'S10.01', 'Masteri', 'Origami', 'Rainbow'],
    onSearch,
    onScrollToDownload,
}: HeroSearchProps) {
    const { user, isAuthenticated, isAdmin, logout } = useAuth()
    const [activeTab, setActiveTab] = useState(
        tabs.includes(activeTabDefault) ? activeTabDefault : tabs[0]
    )
    const [location, setLocation] = useState('')
    const [type, setType] = useState('')
    const [price, setPrice] = useState('')
    const [listening, setListening] = useState(false)
    const recRef = useRef<SpeechRecognition | null>(null)

    type SRConstructor = (new () => SpeechRecognition) | null
    const SpeechRecognitionCtor = useMemo<SRConstructor>(() => {
        if (typeof window === 'undefined') return null
        return window.SpeechRecognition || window.webkitSpeechRecognition || null
    }, [])

    useEffect(() => {
        if (!SpeechRecognitionCtor) return
        const rec = new SpeechRecognitionCtor()
        rec.lang = 'vi-VN'
        rec.interimResults = false
        rec.maxAlternatives = 1
        rec.onresult = (e: SpeechRecognitionEvent) => {
            const transcript = e.results[0][0].transcript
            setLocation(transcript)
        }
        rec.onend = () => setListening(false)
        rec.onerror = () => setListening(false)
        recRef.current = rec
    }, [SpeechRecognitionCtor])

    const startVoice = () => {
        if (!recRef.current) return
        try {
            setListening(true)
            recRef.current.start()
        } catch {
            setListening(false)
        }
    }

    const submit = (e?: React.FormEvent) => {
        e?.preventDefault()
        onSearch?.({ location, type, price })
        if (!onSearch) console.log({ location, type, price, activeTab })

        // Scroll to app download section when search is performed
        onScrollToDownload?.()
    }

    const scrollToPricingSection = () => {
        const pricingSection = document.querySelector('h2[data-section="pricing"]')
        if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section className="relative min-h-[78vh] w-full text-white overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center saturate-105 "
                style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.45) 0%, rgba(0,0,0,.25) 40%, rgba(0,0,0,.6) 100%), url(${backgroundImage})`,
                }}
            />

            <header className="relative z-10 flex items-center justify-between py-5 px-8" aria-label="Site header">
                <div className="font-extrabold text-[22px] tracking-[.2px]">V-Living</div>
                <div className="flex items-center gap-3">
                    <button
                        className="inline-flex items-center gap-2 bg-transparent/20 text-white border border-white px-5 py-2 rounded-full backdrop-blur-[2px] cursor-pointer"
                        aria-label="Danh sách dịch vụ"
                        onClick={scrollToPricingSection}
                    >
                        Danh sách dịch vụ
                        <span className="ml-2 bg-[#f7c600] text-black font-bold rounded-full px-2 py-[2px] text-[12px] border border-[#ffe680]" aria-label="free">FREE</span>
                    </button>

                    {/* User section */}
                    {isAuthenticated && user ? (
                        <div className="flex items-center gap-2">
                            <span className="text-white text-sm font-medium">
                                {user.fullName || user.name || user.username}
                            </span>
                            {isAdmin ? (
                                <Link href="/dashboard" className="inline-flex items-center justify-center text-white bg-black/35 border border-white/25 rounded-[10px] px-3 py-2 cursor-pointer" aria-label="Dashboard">
                                    <IconUser />
                                </Link>
                            ) : (
                                <button
                                    onClick={logout}
                                    className="inline-flex items-center justify-center text-white bg-red-500/80 border border-red-400/50 rounded-[10px] px-3 py-2 cursor-pointer hover:bg-red-600/80 transition-colors"
                                    aria-label="Logout"
                                >
                                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
                                        <path fill="currentColor" d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 0 1 2 2v2h-2V4H4v16h10v-2h2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10Z" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    ) : (
                        <Link href="/auth/sign-in" className="inline-flex items-center justify-center text-white bg-black/35 border border-white/25 rounded-[10px] px-3 py-2 cursor-pointer" aria-label="Sign In">
                            <IconUser />
                        </Link>
                    )}

                    <button className="inline-flex items-center justify-center text-white bg-black/35 border border-white/25 rounded-[10px] px-3 py-2 cursor-pointer" aria-label="Mở menu">
                        <IconMenu />
                    </button>
                </div>
            </header>

            <div className="relative z-10 max-w-[1120px] mx-auto mt-20 md:mt-24 pb-10 px-5">
                <h1 className="text-center font-bold tracking-tight leading-tight text-5xl md:text-3xl lg:text-[38px] mb-5">
                    Tìm kiếm hàng nghìn căn hộ tốt tại V-Living
                </h1>

                <nav className="flex justify-center gap-10 mt-1 mb-3" aria-label="Chế độ tìm kiếm">
                    {tabs.map((t) => (
                        <button
                            key={t}
                            className="group flex flex-col items-center gap-2 px-1 py-2 font-semibold cursor-pointer"
                            aria-pressed={t === activeTab}
                            onClick={() => setActiveTab(t)}
                        >
                            <span className={`${t === activeTab ? 'text-white' : 'text-white/85 group-hover:text-white'}`}>{t}</span>
                            <span className={`${t === activeTab ? 'block h-[3px] w-16 bg-white rounded-full' : 'hidden'}`} />
                        </button>
                    ))}
                </nav>

                <form className="my-4 mx-auto max-w-[860px]" role="search" onSubmit={submit}>
                    <div className="relative">
                        <div className="flex items-center bg-white/95 rounded-[38px] p-2 pr-32 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">

                            {/* Ô nhập vị trí */}
                            <input
                                type="text"
                                placeholder="Tìm theo vị trí"
                                aria-label="Tìm theo vị trí"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="flex-1 px-6 py-4 text-[16px] text-neutral-800 bg-transparent outline-none rounded-[30px] placeholder:text-neutral-400"
                            />

                            {/* Loại căn hộ */}
                            <div className="hidden md:flex items-center relative mx-3">
                                <div className="w-px h-8 bg-black/10 mx-3" />
                                <div className="pr-2">
                                    <Select
                                        value={type}
                                        onChange={setType}
                                        placeholder="Loại căn hộ"
                                        options={[
                                            { label: 'Studio', value: 'studio' },
                                            { label: '1 phòng ngủ', value: '1pn' },
                                            { label: '2 phòng ngủ', value: '2pn' },
                                            { label: '3+ phòng ngủ', value: '3pn' },
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Giá */}
                            <div className="hidden md:flex items-center relative mx-3">
                                <div className="w-px h-8 bg-black/10 mx-3" />
                                <div className="pr-2">
                                    <Select
                                        value={price}
                                        onChange={setPrice}
                                        placeholder="Giá"
                                        options={[
                                            { label: '< 5 triệu', value: '<5' },
                                            { label: '5 - 10 triệu', value: '5-10' },
                                            { label: '10 - 20 triệu', value: '10-20' },
                                            { label: '> 20 triệu', value: '>20' },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Nút mic */}
                        <button
                            type="button"
                            className={`absolute right-24 top-1/2 -translate-y-1/2 rounded-full w-14 h-14 inline-flex items-center justify-center text-yellow-500 bg-blue-50 hover:bg-blue-100 transition cursor-pointer ${listening ? 'ring-2 ring-white/70' : ''
                                }`}
                            aria-pressed={listening}
                            aria-label="Tìm kiếm bằng giọng nói"
                            onClick={startVoice}
                            title={SpeechRecognitionCtor ? 'Nhấn để nói' : 'Trình duyệt không hỗ trợ voice'}
                            disabled={!SpeechRecognitionCtor}
                        >
                            <IconMic />
                        </button>

                        {/* Nút tìm kiếm */}
                        <button
                            type="submit"
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full w-14 h-14 inline-flex items-center justify-center bg-[#f7c600] hover:bg-[#e5b700] transition text-white shadow-lg cursor-pointer"
                            aria-label="Tìm kiếm"
                        >
                            <IconSearch className="w-7 h-7" />
                        </button>
                    </div>
                </form>


                <div className="flex justify-center  items-center gap-3 mt-3" aria-label="Xu hướng tìm kiếm">
                    <span className="opacity-80">Xu hướng tìm kiếm –</span>
                    <div className="flex gap-2 flex-wrap">
                        {trending.map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                className="bg-[rgba(89,98,68,0.6)] text-white rounded-full px-4 py-2 hover:brightness-110 cursor-pointer"
                                onClick={() => setLocation(tag)}
                            >
                                {tag}
                            </button>

                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}