import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../features/auth/stores/user.store';
import { RootState } from '../../types';
import Search from '../Search';
import { logout } from '../../plugins/axios';
import Modal from '../Modal';


const CartIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M6 9l6 6 6-6" />
    </svg>
);

const LogoutIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

const HeaderDesktop = () => {
    const userProfile = useSelector((state: RootState) => state.userProfile);
    const { getUserProfile } = useUserStore();
    const navigate = useNavigate();
    const [isShowModal, setIsShowModal] = useState(false);
    const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);

    useEffect(() => {
        getUserProfile();
    }, []);

    const handleLogout = () => {
        setIsShowModal(false);
        logout(true);
    };

    const closeModal = () => setIsShowModal(false);

    const isLoggedIn = userProfile?.email && userProfile.email !== '';

    return (
        <>
            <header className="w-full bg-white border-b border-[#fce8ee] shadow-[0_2px_16px_rgba(200,120,140,0.07)]">
                <div className="flex items-center justify-between px-8 h-[68px] gap-6">

                    <div className="flex items-center gap-6 shrink-0">
                        <Link to="/" className="flex items-center">
                            <img
                                src="/images/Logo.png"
                                alt="logo"
                                className="h-[44px] w-auto"
                            />
                        </Link>

                        <div className="h-5 w-px bg-[#fce8ee]" />

                        <nav className="flex items-center gap-1">
                            <button
                                type="button"
                                className="px-3 py-1.5 text-[14px] font-[500] text-[#c0768a] rounded-lg
                                    hover:bg-[#fce8ee] hover:text-[#d46080] transition-all duration-150 cursor-pointer
                                    border-none bg-transparent"
                            >
                                Sell on Shopka
                            </button>

                            <Link
                                to="/register"
                                className="px-3 py-1.5 text-[14px] font-[500] text-[#c0768a] rounded-lg no-underline
                                    hover:bg-[#fce8ee] hover:text-[#d46080] transition-all duration-150"
                            >
                                Register
                            </Link>

                            <button
                                type="button"
                                className="flex items-center gap-1 px-3 py-1.5 text-[14px] font-[500] text-[#c0768a] rounded-lg
                                    hover:bg-[#fce8ee] hover:text-[#d46080] transition-all duration-150 cursor-pointer
                                    border-none bg-transparent"
                            >
                                Consumer Electronics
                                <ChevronDownIcon />
                            </button>
                        </nav>
                    </div>
                    <div className="flex-1 max-w-[420px]">
                        <Search />
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            type="button"
                            onClick={() => navigate('/cart')}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#f0d0da]
                                text-[#d46080] text-[14px] font-[600] bg-white
                                hover:bg-[#fce8ee] hover:border-[#e87aab] transition-all duration-150
                                cursor-pointer shadow-[0_1px_4px_rgba(200,120,140,0.08)]"
                        >
                            <CartIcon />
                            <span>My Cart</span>
                        </button>

                        {userProfile && (
                            isLoggedIn ? (
                                <button
                                    type="button"
                                    onClick={() => setIsShowModal(true)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#f0d0da]
                                        text-[#d46080] text-[14px] font-[600] bg-white
                                        hover:bg-[#fce8ee] hover:border-[#e87aab] transition-all duration-150
                                        cursor-pointer shadow-[0_1px_4px_rgba(200,120,140,0.08)]"
                                >
                                    <LogoutIcon />
                                    <span>Sign Out</span>
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl no-underline
                                        text-white text-[14px] font-[600]
                                        bg-gradient-to-r from-[#f0a0bc] via-[#e87aab] to-[#f0a0bc]
                                        shadow-[0_3px_12px_rgba(220,100,150,0.25)]
                                        hover:shadow-[0_4px_16px_rgba(220,100,150,0.4)] hover:-translate-y-px
                                        transition-all duration-150"
                                >
                                    Sign In
                                </Link>
                            )
                        )}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
                                className="flex items-center gap-1.5 rounded-full border-2 border-[#f0d0da]
                                    hover:border-[#e87aab] transition-all duration-150 cursor-pointer bg-transparent p-0"
                            >
                                <div className="w-9 h-9 rounded-full overflow-hidden">
                                    {userProfile?.avatarUrl && userProfile.avatarUrl !== '' ? (
                                        <img
                                            src={userProfile.avatarUrl}
                                            alt="avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-[#f0a0bc] to-[#e87aab] flex items-center justify-center">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </button>
                            {isAvatarMenuOpen && (
                                <div className="absolute top-[calc(100%+8px)] right-0 w-[160px] bg-white rounded-xl
                                    border border-[#fce8ee] shadow-[0_8px_24px_rgba(200,120,140,0.15)] z-50 overflow-hidden">
                                    <div className="py-1">
                                        {isLoggedIn && (
                                            <div className="px-4 py-2.5 border-b border-[#fce8ee]">
                                                <p className="text-[12px] text-[#c0a0ac] truncate">{userProfile?.email}</p>
                                            </div>
                                        )}
                                        <Link
                                            to="/profile"
                                            onClick={() => setIsAvatarMenuOpen(false)}
                                            className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#5a3045]
                                                no-underline hover:bg-[#fce8ee] transition-colors"
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            to="/orders"
                                            onClick={() => setIsAvatarMenuOpen(false)}
                                            className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#5a3045]
                                                no-underline hover:bg-[#fce8ee] transition-colors"
                                        >
                                            My Orders
                                        </Link>
                                        {isLoggedIn && (
                                            <button
                                                type="button"
                                                onClick={() => { setIsAvatarMenuOpen(false); setIsShowModal(true); }}
                                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#e06080]
                                                    bg-transparent border-none cursor-pointer hover:bg-[#fce8ee] transition-colors text-left
                                                    border-t border-[#fce8ee]"
                                            >
                                                <LogoutIcon />
                                                Sign Out
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            {isShowModal && (
                <Modal open={isShowModal} onClose={closeModal}>
                    <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(200,120,140,0.18)] p-8 w-[340px]">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#fce8ee] flex items-center justify-center">
                                <LogoutIcon />
                            </div>
                            <div className="text-center">
                                <h3 className="text-[16px] font-bold text-[#5a3045] mb-1">Sign Out</h3>
                                <p className="text-[13px] text-[#c0a0ac]">Are you sure you want to sign out?</p>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-7">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="flex-1 h-[42px] rounded-xl border border-[#f0d0da] text-[#c0768a]
                                    text-[14px] font-[600] bg-white hover:bg-[#fce8ee] transition-all
                                    cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex-1 h-[42px] rounded-xl border-none text-white
                                    text-[14px] font-[600] cursor-pointer transition-all duration-150
                                    bg-gradient-to-r from-[#f0a0bc] via-[#e87aab] to-[#f0a0bc]
                                    shadow-[0_3px_12px_rgba(220,100,150,0.25)]
                                    hover:shadow-[0_4px_16px_rgba(220,100,150,0.4)] hover:-translate-y-px
                                    active:scale-[0.98]"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default HeaderDesktop;