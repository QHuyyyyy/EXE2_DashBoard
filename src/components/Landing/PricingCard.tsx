type Feature = { text: string; available?: boolean }

type Props = {
    title: string
    subtitle?: string
    priceMain?: string
    priceSub?: string
    cta: string
    features: Feature[]
    highlighted?: boolean
    badge?: string
    onScrollToDownload?: () => void
}

const Check = ({ ok = true }: { ok?: boolean }) => (
    <span
        className={`inline-flex items-center justify-center rounded-full w-4 h-4 text-[10px] mt-[2px] ${ok ? 'bg-[#f7c600] text-black' : 'bg-gray-300 text-gray-500'
            }`}
    >
        {ok ? '✓' : '✕'}
    </span>
)

export default function PricingCard({
    title,
    subtitle,
    priceMain,
    priceSub,
    cta,
    features,
    highlighted,
    badge,
    onScrollToDownload,
}: Props) {
    return (

        <article
            className={`relative flex flex-col rounded-[16px] border shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-5 md:p-6 ${highlighted ? 'border-[#f7c600]' : 'border-gray-200'
                } bg-white`}
        >
            {badge && (
                <span className="absolute -top-3 right-4 bg-[#f7c600] text-black text-xs font-semibold rounded-full px-3 py-1 shadow">
                    {badge}
                </span>
            )}

            <h3 className="text-[18px] font-bold mb-1 text-gray-900">{title}</h3>
            {subtitle && <div className="text-[28px] font-bold leading-tight mb-2 text-gray-900">{subtitle}</div>}
            {(priceMain || priceSub) && (
                <div className="mb-2">
                    {priceMain && <div className="text-[28px] font-bold text-gray-900">{priceMain}</div>}
                    {priceSub && <div className="text-[16px] font-semibold text-gray-600">{priceSub}</div>}
                </div>
            )}

            <ul className="mt-2 space-y-2 text-[14px] text-gray-800 flex-1">
                {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <Check ok={f.available !== false} />
                        <span className={`${f.available === false ? 'text-gray-400' : 'text-gray-800'}`}>{f.text}</span>
                    </li>
                ))}
            </ul>

            <button
                className={`mt-8 w-full rounded-full font-semibold py-3 shadow cursor-pointer ${highlighted
                    ? 'bg-[#f7c600] text-black hover:bg-[#e5b700]'
                    : 'border border-[#f7c600] text-[#b8860b] hover:bg-yellow-50'
                    }`}
                onClick={onScrollToDownload}
            >
                {cta}
            </button>
        </article>

    )
}