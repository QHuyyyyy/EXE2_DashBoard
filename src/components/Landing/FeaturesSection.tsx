export default function FeaturesSection() {
    return (
        <section className="max-w-[1200px] mx-auto px-5 py-12">
            <h2 className="text-[20px] md:text-[22px] font-bold mb-6 text-gray-900">Tính năng của chúng tôi</h2>            {/* 1. VNPay */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
                <div className="order-1">
                    <img src="/vnpay.svg" alt="VNPay" className="w-full max-w-[420px] md:max-w-[480px]" />
                </div>
                <div className="order-2">
                    <h3 className="font-semibold text-[16px] md:text-[18px] mb-2 text-gray-900">Thanh toán an toàn với VNPay</h3>
                    <div className="border-2 w-full border-amber-300 rounded-md h-1 bg-amber-300 mb-4"></div>
                    <p className="text-sm text-gray-700 leading-6">
                        Chúng tôi hiểu rằng thông tin tài chính của bạn rất nhạy cảm. Đó là lý do tại sao chúng tôi hợp tác với VNPAY. Với VNPAY, bạn có thể yên tâm rằng các khoản thanh toán của mình được an toàn và bảo mật, cho phép bạn tập trung vào việc tận hưởng trải nghiệm thuê xe mà không phải lo lắng.
                    </p>
                </div>
            </div>

            {/* 2. Điều khoản thuê linh hoạt */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
                <div className="order-2 md:order-1">
                    <h3 className="font-semibold text-[16px] md:text-[18px] mb-2 text-gray-900">Điều khoản thuê linh hoạt</h3>
                    <div className="border-2 w-full border-amber-300 rounded-md h-1 bg-amber-300 mb-4"></div>
                    <p className="text-sm text-gray-700 leading-6">
                        Lựa chọn từ nhiều tùy chọn thuê khác nhau, bao gồm thuê theo tháng cho các kỳ nghỉ ngắn hạn hoặc hợp đồng dài hạn để cư trú ổn định. Các điều khoản tùy chỉnh của chúng tôi cho phép bạn điều chỉnh thỏa thuận thuê theo nhu cầu cụ thể của bạn, đảm bảo bạn có được sự linh hoạt và sự an tâm mà bạn xứng đáng có.
                    </p>
                </div>
                <div className="order-1 md:order-2">
                    <img src="/contract.svg" alt="Contract" className="w-full max-w-[420px] md:max-w-[480px] ml-auto" />
                </div>
            </div>

            {/* 3. Hỗ trợ khách hàng 24/7 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-1">
                    <img src="/service.svg" alt="Service 24/7" className="w-full max-w-[420px] md:max-w-[480px]" />
                </div>
                <div className="order-2">
                    <h3 className="font-semibold text-[16px] md:text-[18px] mb-2 text-gray-900">Hỗ trợ khách hàng 24/7</h3>
                    <div className="border-2 w-full border-amber-300 rounded-md h-1 bg-amber-300 mb-4"></div>
                    <p className="text-sm text-gray-700 leading-6">
                        Đội ngũ hỗ trợ khách hàng tận tâm của chúng tôi luôn sẵn sàng 24/7 để hỗ trợ bạn về bất kỳ câu hỏi hoặc mối quan tâm nào. Dù bạn cần giúp đỡ tìm căn phòng hoàn hảo, gặp vấn đề với việc đặt phòng, hay cần hỗ trợ với bất kỳ vấn đề nào khác, chúng tôi chỉ cách bạn một cuộc gọi hoặc tin nhắn.
                    </p>
                </div>
            </div>
        </section>
    )
}