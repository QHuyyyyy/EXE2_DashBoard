import PricingCard from './PricingCard'

export default function PricingSection() {
    return (
        <section className="max-w-[960px] mx-auto px-5 py-12">
            <h2 className="text-[20px] md:text-[22px] font-bold mb-6 text-gray-900" data-section="pricing">Các Gói Dịch Vụ</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Row 1 */}
                <PricingCard
                    title="Gói Cơ Bản"
                    subtitle="Miễn phí"
                    cta="Bắt đầu ngay"
                    features={[
                        { text: 'Tìm phòng, so sánh giá', available: true },
                        { text: 'Xem thông tin phòng & chủ nhà', available: true },
                        { text: 'Gửi tin nhắn miễn phí không giới hạn', available: true },
                        { text: 'Đăng tin tìm người ở ghép', available: true },
                        { text: 'Không được đẩy tin', available: false },
                        { text: 'Gợi ý bạn cùng phòng bằng AI Matching', available: false },
                        { text: 'Đăng tin căn hộ cần cho thuê', available: false },
                    ]}
                />

                <PricingCard
                    title="Gói Đăng Tin Nâng Cao"
                    priceMain="99.000vnd/tháng"
                    priceSub="249.000vnd/3 tháng"
                    cta="Chọn Gói Nâng Cao"
                    badge="Phổ biến nhất"
                    highlighted
                    features={[
                        { text: 'Làm nổi bật bài đăng', available: true },
                        { text: 'Tự động làm mới bài đăng', available: true },
                        { text: 'Đăng tin căn hộ cần cho thuê', available: true },
                        { text: 'Được xác minh (huy hiệu tin cậy)', available: true },
                        { text: 'Thống kê lượt xem', available: true },
                        { text: 'Tin của bạn được gợi ý cho sinh viên phù hợp', available: true },
                    ]}
                />

                {/* Row 2 */}
                <PricingCard
                    title="Gói Theo Lượt (Tùy chọn mở rộng)"
                    subtitle="Từ 3.000vnd/lần sử dụng"
                    cta="Dùng Khi Cần"
                    features={[
                        { text: 'Gợi ý bạn cùng phòng (AI) – đ10.000/lượt', available: true },
                        { text: 'Đẩy tin ưu tiên – đ10.000/ngày', available: true },
                        { text: 'Đăng tin căn hộ cần cho thuê – đ5.000/1 lần post', available: true },
                    ]}
                />

                <PricingCard
                    title="Gói Dịch vụ liên kết đối tác"
                    subtitle="Từ 70.000vnd/lần"
                    cta="Đặt Dịch Vụ Ngay"
                    features={[
                        { text: 'Vận chuyển – từ đ500.000 trở lên', available: true },
                        { text: 'Vệ sinh – từ đ70.000/giờ', available: true },
                        { text: 'Sửa chữa đồ dùng điện nước (liên kết thợ uy tín)', available: true },
                        { text: 'Bảo hiểm thuê nhà', available: true },
                        { text: 'Hỗ trợ pháp lý', available: true },
                    ]}
                />
            </div>
        </section>
    )
}