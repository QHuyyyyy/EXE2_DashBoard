type Props = {
    avatar: string
    name: string
    role: string
    title: string
    content: string
    rating?: number
}

const Star = ({ filled = true }: { filled?: boolean }) => (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
        <path
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={filled ? 0 : 2}
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
    </svg>
)

export default function ReviewCard({ avatar, name, role, title, content, rating = 5 }: Props) {
    return (
        <article className="rounded-[12px] bg-[#f4f9ec] border border-gray-200 shadow-sm p-4 md:p-5">
            {/* Header: avatar + name + role */}
            <div className="flex items-center gap-3 mb-2">
                <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
                <div className="leading-tight">
                    <div className="font-semibold text-[14px] md:text-[15px] text-gray-900">{name}</div>
                    <div className="text-xs text-gray-600">{role}</div>
                </div>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 text-red-500 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} filled={i < rating} />
                ))}
            </div>

            {/* Title */}
            <h4 className="text-[14px] md:text-[15px] font-semibold uppercase tracking-[.3px] leading-6 mb-1 text-gray-900">
                &quot;{title}&quot;
            </h4>

            {/* Content */}
            <p className="text-[13px] text-gray-800 leading-6">{content}</p>
        </article>
    )
}