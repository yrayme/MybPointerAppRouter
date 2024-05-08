import { Error } from "@/interfaces";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

export const getApiError = async (error: Error) => {
    const errorObject = JSON.parse(error.message);
    switch (errorObject?.status) {
        case 401:
            toastError(errorObject?.message);
            return await signOut({ callbackUrl: '/' });
        default:
            toastError(errorObject?.message)
            break;
    }
}

const toastError = (message: string) => {
    toast.error(message, {
        position: "top-right",
    });
}