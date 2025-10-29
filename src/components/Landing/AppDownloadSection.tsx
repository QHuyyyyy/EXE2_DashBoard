'use client'

import { forwardRef } from 'react'
import Image from 'next/image'
import { logo } from '@/assets/logos'

const AppDownloadSection = forwardRef<HTMLElement>((props, ref) => {
    return (
        <section ref={ref} className="py-16 bg-gradient-to-br">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Tải Ứng Dụng Di Động
                    </h2>
                    <div className="border-2 w-1/2 border-gold rounded-md h-1 bg-gold mb-4 mx-auto"></div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Quản lý căn hộ của bạn mọi lúc, mọi nơi với ứng dụng di động của chúng tôi.
                        Trải nghiệm đầy đủ tính năng ngay trên điện thoại.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* App Screenshots */}
                    <div className="flex-1 relative">
                        <div className="relative max-w-md mx-auto">
                            {/* Phone mockup */}
                            <div className="relative bg-black rounded-[2.5rem] p-2 shadow-2xl">
                                <div className="bg-white rounded-[2rem] overflow-hidden">
                                    <div className="aspect-[9/19.5] bg-gradient-to-b flex items-center justify-center">
                                        <div className=" text-center p-8">
                                            <div className=" w-20 h-20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                                                <Image
                                                    src={logo}
                                                    alt="V-Living Logo"
                                                    width={100}
                                                    height={100}
                                                    className="object-contain"
                                                />
                                            </div>
                                            <h3 className="font-bold text-xl mb-2 text-black">V-LIVING</h3>
                                            <p className="text-sm opacity-90">Quản lý căn hộ thông minh</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating elements */}
                            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 animate-bounce">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green rounded-full"></div>
                                    <span className="text-xs font-medium">Online</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Download content */}
                    <div className="flex-1 text-center lg:text-left">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Trải Nghiệm Đầy Đủ Trên Mobile

                        </h3>


                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-10 h-3 text-gold-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Quản lý mọi lúc mọi nơi</h4>
                                    <p className="text-gray-600 text-sm">Theo dõi và sử dụng V-living ngay trên điện thoại</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-3 h-3 text-gold-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Thông báo real-time</h4>
                                    <p className="text-gray-600 text-sm">Nhận thông báo ngay khi có cập nhật mới</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-3 h-3 text-gold-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Giao diện thân thiện</h4>
                                    <p className="text-gray-600 text-sm">Thiết kế tối ưu cho thiết bị di động</p>
                                </div>
                            </div>
                        </div>

                        {/* Download buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            {/* Google Play Store Button */}
                            <a
                                href="/app-debug.apk"
                                download="app-debug.apk"
                                className="inline-flex items-center justify-center bg-black text-white rounded-lg px-6 py-3 hover:bg-gray-800 transition-colors duration-200 group"
                            >
                                <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-xs opacity-75">Tải về từ</div>
                                    <div className="text-sm font-semibold">Google Play</div>
                                </div>
                            </a>

                            {/* App Store Button (for future) */}
                            <a
                                href="#"
                                className="inline-flex items-center justify-center bg-black text-white rounded-lg px-6 py-3 hover:bg-gray-800 transition-colors duration-200 group opacity-50 cursor-not-allowed"
                                onClick={(e) => e.preventDefault()}
                            >
                                <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-xs opacity-75">Sắp có trên</div>
                                    <div className="text-sm font-semibold">App Store</div>
                                </div>
                            </a>
                        </div>

                        <p className="text-sm text-gray-500 mt-4 text-center lg:text-left">
                            * Ứng dụng iOS sẽ được phát hành trong thời gian tới
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
})

AppDownloadSection.displayName = 'AppDownloadSection'

export default AppDownloadSection