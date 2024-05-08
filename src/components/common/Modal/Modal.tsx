'use client';
import React, { Fragment, useContext } from 'react'
import { Dialog, Transition  } from '@headlessui/react'
import { ModalProps } from '@/interfaces'
import { ModalTitleStyles } from '../../../interfaces/general';
import clsx from 'clsx';
import { Button } from '../Button'
import AllIcons from '../Icons';
import { useAlertContext } from '@/contexts/AlertContext';

export const Modal = ({}) => {    
    const {onCloseAlertDialog, isOpen, setIsOpen, stateAlert, disabled } = useAlertContext();
    
    const ModalTitleStyles = (ModalStyle: ModalTitleStyles) => {
        switch (ModalStyle) {
          case "success":
            return "text-primary";
          case "error":
            return "text-red-primary";
          default:
            break;
        }
    }; 
    
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {}}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all">
                                <div className='flex justify-between items-center'>
                                    <Dialog.Title
                                        as="h3"
                                        className={clsx("text-xl font-medium",
                                            ModalTitleStyles(stateAlert.titleStyles)
                                        )}
                                    >
                                        {stateAlert.title}
                                    </Dialog.Title>
                                    <div onClick={() => onCloseAlertDialog(stateAlert.routeBack, stateAlert.function)}>
                                        <AllIcons name="CloseIcon" className="h-4 w-4 text-gray-4 cursor-pointer"/>
                                    </div>
                                </div>
                                <hr className='mt-2 mb-4'/>
                                <div className="mt-2">
                                    <p className="text-base text-black font-medium text-center">
                                        {stateAlert.description}
                                    </p>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    {stateAlert.buttonAccept && (
                                        <Button
                                            ButtonStyle="secondary"
                                            className="py-3 px-4"
                                            title={stateAlert.buttonAcceptLabel}  
                                            onClick={stateAlert.onButtonAcceptClicked}   
                                            disabled={disabled}                                  
                                        />
                                    )}
                                    {stateAlert.buttonCancel && (
                                        <Button
                                            ButtonStyle="red"
                                            className="py-3 px-4 ml-3"
                                            title={stateAlert.buttonCancelLabel}  
                                            onClick={stateAlert.onButtonCancelClicked}       
                                            disabled={disabled}                                                         
                                        />
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}