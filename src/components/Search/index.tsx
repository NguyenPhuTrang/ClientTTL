import React, { useState, useRef } from 'react';

const Search = () => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClear = () => {
        setQuery('');
        inputRef.current?.focus();
    };

    return (
        <div
            className={`flex items-center h-[42px] px-3 rounded-xl border bg-white transition-all duration-200
                ${isFocused
                    ? 'border-[#e87aab] shadow-[0_0_0_3px_rgba(232,122,171,0.12)]'
                    : 'border-[#f0d0da] shadow-[0_1px_4px_rgba(200,120,140,0.08)]'
                }`}
        >
            <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke={isFocused ? '#e87aab' : '#c0a0ac'}
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="shrink-0 transition-colors duration-200"
            >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search..."
                className="flex-1 mx-2.5 bg-transparent outline-none text-[14px] text-[#5a3045]
                    placeholder:text-[#c0a0ac] min-w-0"
            />

            {query && (
                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleClear}
                    className="shrink-0 w-5 h-5 rounded-full bg-[#f0d0da] flex items-center justify-center
                        hover:bg-[#e87aab] transition-colors duration-150 cursor-pointer border-none p-0 group"
                >
                    <svg
                        width="9" height="9" viewBox="0 0 24 24" fill="none"
                        stroke="#c0768a" strokeWidth="3" strokeLinecap="round"
                        className="group-hover:stroke-white transition-colors"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default Search;
