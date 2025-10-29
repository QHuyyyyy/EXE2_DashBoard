"use client";

import { BookingItem } from "@/services/booking.service";

interface Props {
    bookings: BookingItem[];
    date: string | null;
    isOpen: boolean;
    onClose: () => void;
}

export function BookingDetailModal({ bookings, date, isOpen, onClose }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
            <div className="w-full max-w-2xl rounded bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between border-b px-4 py-3">
                    <h3 className="text-lg font-semibold">Bookings for {date}</h3>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-900">Close</button>
                </div>

                <div className="px-4 py-4">
                    {bookings.length === 0 ? (
                        <p className="text-sm text-gray-600">No bookings for this date.</p>
                    ) : (
                        <ul className="space-y-3">
                            {bookings.map(b => (
                                <li key={b.bookingId} className="rounded border p-3">
                                    <div className="flex justify-between">
                                        <div>
                                            <div className="font-semibold">{b.postTitle || 'Booking #' + b.bookingId}</div>
                                            <div className="text-sm text-gray-600">Renter: {b.renterName} ({b.renterEmail})</div>
                                            {b.renterPhone && <div className="text-sm text-gray-600">Phone: {b.renterPhone}</div>}
                                        </div>
                                        <div className="text-right text-sm text-gray-600">
                                            <div>{b.meetingTime ? new Date(b.meetingTime).toLocaleString() : ''}</div>
                                            <div className="mt-1">{b.status}</div>
                                        </div>
                                    </div>
                                    {b.placeMeet && <div className="mt-2 text-sm">Place: {b.placeMeet}</div>}
                                    {b.note && <div className="mt-2 text-sm text-gray-700">Note: {b.note}</div>}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="flex justify-end border-t p-3">
                    <button onClick={onClose} className="rounded bg-primary px-4 py-2 text-white">Close</button>
                </div>
            </div>
        </div>
    );
}

export default BookingDetailModal;
