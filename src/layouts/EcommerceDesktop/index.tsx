import React from 'react';
import Sidebar from '../../components/Sidebar';
import HeaderDesktop from '../../components/HeaderDesktop';
import HeaderListCategory from '../../components/HeaderListCategory';
interface Props {
    children: React.ReactNode,
}
const EcommerceDesktopLayout = ({
    children,
}: Props) => {
    return (
        <div className='w-full h-full flex flex-col'>
            <HeaderDesktop />
            <div className='2xl:px-[214px] xl:px-[60px] lg:px-[20xp] md:px-[10px] sm:px-[5px]'>
                <HeaderListCategory />
                <div className='flex items-center justify-between gap-6 h-full mt-[44px]'>
                    <Sidebar />
                    <div className='flex-1 h-full'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EcommerceDesktopLayout;