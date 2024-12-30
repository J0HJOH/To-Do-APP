import React, { createContext, useContext, useState } from "react";

//global context for authentication
const AuthContext = createContext();


export default function ModalProvider({ children }) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <AuthContext.Provider value={{
            isModalVisible,
            setIsModalVisible
        }}>

            {children}
        </AuthContext.Provider>
    )
};
ModalProvider.propTypes = {
    children : React.ReactNode
};

export function useModal() {
    return useContext(AuthContext);
}
