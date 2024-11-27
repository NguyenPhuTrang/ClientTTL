import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useUserStore } from '../../features/auth/stores/user.store';
import { RootState } from '../../types';
import Search from '../Search';
import { logout } from '../../plugins/axios';
import Modal from '../Modal';

const HeaderDesktop = () => {
    const userProfile = useSelector((state: RootState) => state.userProfile);
    const { getUserProfile } = useUserStore();
    useEffect(() => {
        getUserProfile();
    }, []);

    const [isShowModal, setIsShowModal] = useState(false);
    const handleLogout = () => {
        setIsShowModal(false);
        logout(true);
    }

    const closeModal = () => {
        setIsShowModal(false);
    }

    return (
        <div className='flex flex-col mb-4'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-between'>
                    <div className='mr-[6px]'>
                        <img src="./icons/ic-logo-desktop.svg" alt="logo" className="w-[208px] h-[88px]" />
                    </div>
                    <div className='px-4'>
                        <p className='text-[#5A5B6A] text-[20px] cursor-pointer font-[400] leading-[32px]'>Sell on Shopka</p>
                    </div>
                    <div className='px-4'>
                        <p className='text-[#5A5B6A] text-[20px] font-[400] leading-[32px] cursor-pointer hover:text-[#9DC2FF]'>
                            <Link to='/register'>
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
                <div className='flex items-center justify-between py-5'>
                    <Search />
                    <div className='py-[6px] px-4 ml-[14px]'>
                        <h3 className='text-[20px] text-[#2264D1] font-[400] leading-[32px] cursor-pointer'>
                            Consumer Electronics
                        </h3>
                    </div>
                </div>
                <div className='flex items-center justify-between py-5'>
                    {userProfile && (
                        <div className='flex items-center justify-center px-3 py-2 rounded border-[1px] border-solid border-[#9DC2FF] mr-[21px]
                        hover:bg-[#9DC2FF] cursor-pointer'>
                            {userProfile.email !== "" ? (
                                <button onClick={() => setIsShowModal(true)} type='button'>
                                    <p className='text-[#2264D1] text-[20px] font-[700] leading-[30px] select-none quicksand-font'>Sign out</p>
                                </button>
                            ) : (
                                <Link to='/login'>
                                    <p className='text-[#2264D1] text-[20px] font-[700] leading-[30px] select-none quicksand-font'>Sign in</p>
                                </Link>
                            )}
                        </div>
                    )}
                    <div className='flex items-center justify-center px-3 py-2 rounded bg-[#fff] shadow-blue mr-[16px]
                    hover:bg-[#9DC2FF] cursor-pointer'>
                        <p className='text-[#2264D1] text-[20px] font-[700] leading-[30px] select-none quicksand-font'>My cart</p>
                    </div>
                    <div className='flex items-center justify-center rounded-full overflow-hidden mr-[16px] relative'>
                        <div className='w-10 h-10'>
                            {userProfile.avatarUrl !== "" ? (
                                <img src={userProfile.avatarUrl} alt="avatar" className=' w-10 h-10' />
                            ) : (
                                <img src="./icons/ic-avatar-svgrepo.svg" alt="avatar" className=' w-10 h-10' />
                            )}
                        </div>

                        <ul className='absolute top-[100%] w-[100px] right-0 shadow-dark bg-black'>
                            <li className='text-[#000]'>1</li>
                            <li className='text-[#000]'>2</li>
                            <li className='text-[#000]'>3</li>
                        </ul>
                    </div>
                </div>
            </div>
            {
                isShowModal && (
                    <Modal open={isShowModal} onClose={closeModal}>
                        <div className="transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all p-10">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-1 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <p className="text-sm text-red-600">Bạn muốn đăng xuất?</p>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                    onClick={handleLogout}
                                >
                                    Đăng xuất
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={() => setIsShowModal(false)}
                                >
                                    Hủy
                                </button>

                            </div>
                        </div>
                    </Modal>
                )
            }
        </div>
    );
};

export default HeaderDesktop;