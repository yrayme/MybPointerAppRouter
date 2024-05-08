'use client';
import { ModalProps } from "@/interfaces";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useState } from "react";

const AlertContext = createContext<any>(undefined);

interface Props {
  children: ReactNode;
}

export function AlertContextProvider({ children }: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [stateAlert, setStateAlert] = useState<ModalProps>({
      isOpen: false,
      title: "",
      description: "",
      routeBack: "",
      titleStyles: "success",
      buttonAccept: false,
      buttonCancel: false,
      buttonAcceptLabel: "",
      buttonCancelLabel: "",        
      onButtonAcceptClicked: () => {},
      onButtonCancelClicked: () => {},  
      function: () => {}
  })
  
  const onDisabled = (bool: boolean) => {
    setDisabled(bool);
  }
  const onCloseAlertDialog = (route?: string, func?: any) => {
      // setStateAlert({
      //     isOpen: false,
      //     title: "",
      //     description: "",
      //     titleStyles: "success",
      //     buttonAccept: false,
      //     buttonCancel: false,
      //     buttonAcceptLabel: "",
      //     buttonCancelLabel: "",        
      //     onButtonAcceptClicked: () => {},
      //     onButtonCancelClicked: () => {},  
      // })
      setIsOpen(false);
      func && func;
      route && router.push(route);
  }

  
  const onOpenAlertDialog = (alertDetails: ModalProps) => {
    setIsOpen(true);
    setStateAlert(alertDetails);
  }

  const value = {
    stateAlert,
    isOpen,
    setIsOpen,
    onOpenAlertDialog,
    onCloseAlertDialog,
    onDisabled,
    disabled
  }

  return (
    <AlertContext.Provider value={value}>
      {children}  
    </AlertContext.Provider>
  );
}

export function useAlertContext() {
  return useContext(AlertContext);
}
