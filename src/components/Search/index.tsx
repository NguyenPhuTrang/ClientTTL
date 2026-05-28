import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import * as ProductApi from '../../hooks';
import { Product } from '../../types';
import ProductOverview from '../ProductOverView';

const DEBOUNCE_MS = 400;

function useDebounce<T>(value: T, delay: number): T {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debounced;
}

/* ── Modal overlay hiển thị ProductOverview ─────────────────────── */
interface ProductModalProps {
    product: Product;
    onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
    // Đóng khi nhấn Escape
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);

    return createPortal(
        <div
            className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
            onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="relative">
                {/* Nút đóng */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-white
                        border border-[#f0d0da] shadow-md flex items-center justify-center
                        hover:bg-[#fdf0f4] transition-colors"
                >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                        stroke="#c0768a" strokeWidth="3" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
                <ProductOverview product={product} />
            </div>
        </div>,
        document.body
    );
};

/* ── Search component ────────────────────────────────────────────── */
const Search = () => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [results, setResults] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const debouncedQuery = useDebounce(query.trim(), DEBOUNCE_MS);

    const fetchResults = useCallback(async (q: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await ProductApi.getAllProducts({ page: 1, limit: 8, keyword: q });
            if (response.success) {
                setResults(response.data?.items || []);
            } else {
                setError('Không thể tải kết quả.');
                setResults([]);
            }
        } catch {
            setError('Không thể tải kết quả. Vui lòng thử lại.');
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (debouncedQuery.length < 2) { setResults([]); setError(null); return; }
        fetchResults(debouncedQuery);
    }, [debouncedQuery, fetchResults]);

    useEffect(() => {
        if (!query) { setResults([]); setError(null); setSelectedIndex(-1); }
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
                !inputRef.current?.contains(e.target as Node)
            ) setResults([]);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!results.length) return;
        if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex((i) => Math.min(i + 1, results.length - 1)); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex((i) => Math.max(i - 1, -1)); }
        else if (e.key === 'Enter' && selectedIndex >= 0) handleSelect(results[selectedIndex]);
        else if (e.key === 'Escape') { setResults([]); setSelectedIndex(-1); }
    };

    const handleSelect = (item: Product) => {
        setResults([]);
        setSelectedIndex(-1);
        setSelectedProduct(item); // mở modal
    };

    const handleClear = () => {
        setQuery('');
        setResults([]);
        setError(null);
        inputRef.current?.focus();
    };

    const showDropdown = isFocused && (isLoading || !!error || results.length > 0 || debouncedQuery.length >= 2);

    return (
        <>
            {/* Modal chi tiết sản phẩm */}
            {selectedProduct && (
                <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
            )}

            <div className="relative w-full max-w-md">
                {/* Input bar */}
                <div className={`flex items-center h-[42px] px-3 rounded-xl border bg-white transition-all duration-200
                    ${isFocused
                        ? 'border-[#e87aab] shadow-[0_0_0_3px_rgba(232,122,171,0.12)]'
                        : 'border-[#f0d0da] shadow-[0_1px_4px_rgba(200,120,140,0.08)]'}`}
                >
                    {isLoading ? (
                        <svg className="shrink-0 animate-spin" width="16" height="16"
                            viewBox="0 0 24 24" fill="none" stroke="#e87aab" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M12 2a10 10 0 0 1 10 10" />
                        </svg>
                    ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke={isFocused ? '#e87aab' : '#c0a0ac'}
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="shrink-0 transition-colors duration-200">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    )}

                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setSelectedIndex(-1); }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search..."
                        autoComplete="off"
                        className="flex-1 mx-2.5 bg-transparent outline-none text-[14px] text-[#5a3045]
                            placeholder:text-[#c0a0ac] min-w-0"
                    />

                    {query && (
                        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={handleClear}
                            className="shrink-0 w-5 h-5 rounded-full bg-[#f0d0da] flex items-center justify-center
                                hover:bg-[#e87aab] transition-colors duration-150 cursor-pointer border-none p-0 group">
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                                stroke="#c0768a" strokeWidth="3" strokeLinecap="round"
                                className="group-hover:stroke-white transition-colors">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Dropdown */}
                {showDropdown && (
                    <div ref={dropdownRef}
                        className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-white rounded-xl
                            border border-[#f0d0da] shadow-[0_4px_20px_rgba(200,120,140,0.15)] overflow-hidden">

                        {isLoading && (
                            <div className="p-3 space-y-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-4 rounded-md bg-[#fdf0f4] animate-pulse" />
                                ))}
                            </div>
                        )}

                        {!isLoading && error && (
                            <div className="px-4 py-3 text-[13px] text-[#c0768a] flex items-center gap-2">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                {error}
                            </div>
                        )}

                        {!isLoading && !error && results.length === 0 && debouncedQuery.length >= 2 && (
                            <div className="px-4 py-3 text-[13px] text-[#c0a0ac]">
                                Không tìm thấy "<span className="text-[#5a3045]">{debouncedQuery}</span>"
                            </div>
                        )}

                        {!isLoading && results.map((item, idx) => (
                            <button
                                key={item.id}
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleSelect(item)}
                                onMouseEnter={() => setSelectedIndex(idx)}
                                className={`w-full text-left px-4 py-2.5 flex items-center gap-3
                                    transition-colors duration-100 border-b border-[#fdf0f4] last:border-0
                                    ${selectedIndex === idx ? 'bg-[#fdf0f4]' : 'hover:bg-[#fdf0f4]'}`}
                            >
                                {item.image && (
                                    <img src={item.image} alt={item.name}
                                        className="w-8 h-8 rounded-md object-cover shrink-0 border border-[#f0d0da]" />
                                )}
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[13px] text-[#5a3045] truncate">{item.name}</span>
                                    {item.price !== undefined && (
                                        <span className="text-[11px] text-[#e87aab]">
                                            {item.price.toLocaleString('vi-VN')}₫
                                        </span>
                                    )}
                                </div>
                                {/* Hint xem chi tiết */}
                                <svg className="ml-auto shrink-0" width="12" height="12" viewBox="0 0 24 24"
                                    fill="none" stroke="#c0a0ac" strokeWidth="2.5" strokeLinecap="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Search;