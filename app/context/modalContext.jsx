import { createContext, useContext, useState } from "react";

//global declare the context you want to create
const ModalContext = createContext();


export default function ModalProvider({ children }) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <ModalContext.Provider value={{
            isModalVisible,
            setIsModalVisible
        }}>

            {children}
        </ModalContext.Provider>
    )
};

export function useModal() {
    return useContext(ModalContext);
}
