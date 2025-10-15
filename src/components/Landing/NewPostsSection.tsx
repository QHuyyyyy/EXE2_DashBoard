import ListingCard from './ListingCard'

type NewPostsSectionProps = {
    onScrollToDownload?: () => void
}

const listings = [
    {
        image: '/1.png',
        title: 'The Origami, S10.01 20.08',
        meta: '2 pn+2wc | Đầy đủ nội thất | Điều khoản linh hoạt',
        price: '6.500.000 VND',
        note: 'Đặt cọc 2 tháng tiền thuê nhà',
        rating: 4.2,
        ekyc: true,
    },
    {
        image: '/2.png',
        title: 'The Rainbow, S7.02 22.22',
        meta: '3pn+ 2wc | Đầy đủ nội thất | Điều khoản linh hoạt',
        price: '9.000.000 VND',
        note: 'Đặt cọc 2 tháng tiền thuê nhà',
        rating: 4.5,
        ekyc: true,
    },
    {
        image: '/3.png',
        title: 'The Rainbow, S7.01 20.01',
        meta: '1pn+ 1wc | Đầy đủ nội thất',
        price: '5.500.000 VND',
        note: 'Đặt cọc 2 tháng tiền thuê nhà',
        rating: 4.7,
        ekyc: true,
    },
    {
        image: '/4.png',
        title: 'The Origami, S10.02 21.18',
        meta: '2pn+ 1wc | Đầy đủ nội thất',
        price: '6.000.000 VND',
        note: 'Đặt cọc 2 tháng tiền thuê nhà',
        rating: 4.3,
        ekyc: true,
    },
]

export default function NewPostsSection({ onScrollToDownload }: NewPostsSectionProps) {
    return (
        <section className="max-w-[1200px] mx-auto px-5 py-10">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-[22px] md:text-[24px] font-bold text-gray-900">Bài đăng mới</h2>
                <button
                    className="text-sm font-semibold text-gray-700 hover:text-gray-900 cursor-pointer"
                    onClick={onScrollToDownload}
                >
                    Xem tất cả
                </button>
            </div>            <div className="grid gap-6 md:gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {listings.map((item, i) => (
                    <ListingCard key={i} {...item} />
                ))}
            </div>
        </section>
    )
}