import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface Props {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    size?: 'sm' | 'lg';
}

const Modal = ({ open, onClose, children, size = 'lg' }: Props) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className={`relative transform rounded-2xl text-left
                                shadow-xl transition-all sm:my-8
                                ${size === 'sm' ? 'w-full max-w-sm' : 'w-full max-w-5xl'}`}>

                                {/* Nút X chỉ hiện với modal lớn */}
                                {size === 'lg' && (
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="absolute right-3 top-3 z-20 rounded-full p-1.5
                                            bg-white/80 hover:bg-white text-gray-400 hover:text-gray-600
                                            shadow-sm transition-all outline-none"
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                )}

                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal;