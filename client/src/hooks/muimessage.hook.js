import {useCallback} from "react";

export const useMuiMessage = () => {
    return useCallback((text) => {
        if (window.M && text) {
            window.M.toast({html: text})
        }
    }, [])
}