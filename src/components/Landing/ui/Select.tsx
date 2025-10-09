import { useEffect, useMemo, useRef, useState } from 'react'

export type Option = { label: string; value: string }

type Props = {
    value: string
    onChange: (val: string) => void
    placeholder?: string
    options: Option[]
    className?: string
    dropdownClassName?: string
}

const ChevronDown = ({ className = 'w-4 h-4 text-neutral-500' }) => (
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
        <polyline points="6 9 12 15 18 9" />
    </svg>
)

export default function Select({ value, onChange, placeholder, options, className = '', dropdownClassName = '' }: Props) {
    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number>(-1)
    const ref = useRef<HTMLDivElement | null>(null)
    const id = useMemo(() => `sl-${Math.random().toString(36).slice(2, 8)}`, [])

    const selected = options.find((o) => o.value === value)

    useEffect(() => {
        const onDoc = (e: MouseEvent) => {
            if (!ref.current) return
            if (!ref.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener('mousedown', onDoc)
        return () => document.removeEventListener('mousedown', onDoc)
    }, [])

    const commit = (val: string) => {
        onChange(val)
        setOpen(false)
    }

    const onKey = (e: React.KeyboardEvent) => {
        if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            setOpen(true)
            setActiveIndex(Math.max(0, options.findIndex((o) => o.value === value)))
            return
        }
        if (!open) return
        if (e.key === 'Escape') {
            setOpen(false)
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActiveIndex((i) => (i < options.length - 1 ? i + 1 : 0))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActiveIndex((i) => (i > 0 ? i - 1 : options.length - 1))
        } else if (e.key === 'Enter') {
            e.preventDefault()
            const opt = options[activeIndex]
            if (opt) commit(opt.value)
        } else if (e.key === 'Tab') {
            setOpen(false)
        }
    }

    return (
        <div ref={ref} className={`relative ${className}`} onKeyDown={onKey}>
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={id}
                onClick={() => setOpen((o) => !o)}
                className="inline-flex items-center gap-2 text-[15px] text-neutral-700 px-2 py-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 cursor-pointer"
            >
                <span className={`min-w-[120px] text-left ${selected ? 'text-neutral-700' : 'text-neutral-500'}`}>
                    {selected ? selected.label : placeholder}
                </span>
                <ChevronDown />
            </button>

            {open && (
                <div
                    id={id}
                    role="listbox"
                    className={`absolute z-50 mt-2 w-[220px] max-h-60 overflow-auto rounded-xl border border-black/10 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] ${dropdownClassName}`}
                >
                    {options.map((opt, i) => {
                        const selected = opt.value === value
                        const active = i === activeIndex
                        return (
                            <button
                                key={opt.value}
                                role="option"
                                aria-selected={selected}
                                className={`w-full text-left px-4 py-2 text-[15px] cursor-pointer ${active ? 'bg-yellow-50' : ''
                                    } ${selected ? 'font-semibold text-neutral-900' : 'text-neutral-700'} hover:bg-yellow-50`}
                                onMouseEnter={() => setActiveIndex(i)}
                                onClick={() => commit(opt.value)}
                            >
                                {opt.label}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}