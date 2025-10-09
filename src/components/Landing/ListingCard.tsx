import type { FC } from 'react'

type ListingCardProps = {
    image: string
    title: string
    meta: string
    price: string
    priceSuffix?: string
    note?: string
    rating?: number
    ekyc?: boolean
    favorite?: boolean
}

const IconHeart: FC<{ filled?: boolean }> = ({ filled }) => (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
        <path
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            d="M12.1 8.64l-.1.1-.1-.1C10.14 6.9 7.1 7.14 5.6 9.05 4.1 10.96 4.5 13.7 6.4 15.2l4.9 3.7a1 1 0 0 0 1.2 0l4.9-3.7c1.9-1.5 2.3-4.24.8-6.15-1.5-1.91-4.54-2.15-6.1-.36Z"
        />
    </svg>
)

const Star: FC = () => (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
        <path fill="currentColor" d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
)

export const ListingCard: FC<ListingCardProps> = ({
    image,
    title,
    meta,
    price,
    priceSuffix = '/ tháng',
    note,
    rating = 4.2,
    ekyc = true,
    favorite = false,
}) => {
    return (
        <article className="bg-white rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden border border-black/5">
            <div className="relative">
                <img src={image} alt={title} className="h-[200px] w-full object-cover" />
                {ekyc && (
                    <span className="absolute top-3 left-3 bg-[#13c27a] text-white text-xs font-semibold rounded-full px-2 py-[3px] shadow-[0_4px_8px_rgba(0,0,0,0.18)]">
                        eKYC
                    </span>
                )}
                <button
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow cursor-pointer"
                    aria-label="Yêu thích"
                >
                    <IconHeart filled={favorite} />
                </button>
                <div className="absolute bottom-3 left-3 bg-[rgba(89,98,68,0.6)] text-yellow-300 text-xs font-semibold rounded-full px-2 py-[3px] flex items-center gap-1 shadow">
                    <Star />
                    <span>{rating.toFixed(1)}</span>
                </div>
                {/*   className="bg-[rgba(89,98,68,0.6)] text-white rounded-full px-4 py-2 hover:brightness-110" */}
            </div>

            <div className="p-4">
                <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-1">{title}</h3>
                <p className="text-[13px] text-gray-500 line-clamp-1 mt-1">{meta}</p>

                <div className="mt-3">
                    <span className="text-[22px] font-bold text-gray-900">{price}</span>
                    <span className="text-[15px] text-gray-500"> {priceSuffix}</span>
                </div>
                {note && <div className="text-[13px] text-gray-500 mt-1">+ {note}</div>}
            </div>
        </article>
    )
}

export default ListingCard