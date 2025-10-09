import ReviewCard from './ReviewCard'

const reviews = [
    {
        avatar: '/avatar_1.png',
        name: 'Nguyễn Thị Lan',
        role: 'Sinh viên',
        title: 'Nơi lý tưởng để gọi là nhà khi đang học tập',
        content:
            'Là một sinh viên, tôi cảm một nơi ở an toàn và gần cả phải chăng khi theo học tại trường đại học. V‑Living đã giúp tôi dễ dàng tìm được một phòng phù hợp với ngân sách của mình và gần trường học.',
    },
    {
        avatar: '/avatar_2.png',
        name: 'Trần Văn Đức',
        role: 'Bác sĩ',
        title: 'Kết nối người thuê nhà hiệu quả và đáng tin cậy',
        content:
            'Chúng tôi đang tìm kiếm một nơi ở rộng rãi và thoải mái cho cả gia đình, và RentBro đã giúp chúng tôi tìm được ngôi nhà hoàn hảo. Nền tảng này rất dễ sử dụng, cho phép chúng tôi lọc theo nhu cầu của mình và tìm thấy một ngôi nhà phù hợp nhanh chóng.',
    },
    {
        avatar: '/avatar_3.png',
        name: 'Lê Minh Tuấn',
        role: 'Giáo viên',
        title: 'Kết nối người thuê nhà hiệu quả và đáng tin cậy',
        content:
            'Với một chủ nhà, tôi đang tìm kiếm một nền tảng có thể giúp tôi tìm được người thuê nhà đáng tin cậy một cách nhanh chóng. RentBro đã làm đúng điều này. Tôi đã cho thuê nhà của mình nhiều lần thông qua nền tảng này và luôn có những trải nghiệm tuyệt vời.',
    },
    {
        avatar: '/avatar_4.png',
        name: 'Võ Tấn Sơn',
        role: 'Kế toán',
        title: 'Một sự tiện lợi trong cuộc sống',
        content:
            'Nền tảng giúp tôi kết nối nhanh với người thuê phù hợp, tiết kiệm thời gian và công sức. Quy trình đơn giản, hỗ trợ tận tâm, và kết quả vượt mong đợi.',
    },
]

export default function ReviewsSection() {
    return (
        <section className="max-w-[1200px] mx-auto px-5 py-12">
            <h2 className="text-[20px] md:text-[22px] font-bold mb-6 text-gray-900">Các Đánh Giá Của Khách Hàng</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                {reviews.map((r, idx) => (
                    <ReviewCard key={idx} {...r} />
                ))}
            </div>
        </section>
    )
}