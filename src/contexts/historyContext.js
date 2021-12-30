import { createContext, useReducer, useEffect } from "react";
import { HistoryReducer } from "../reducers/historyReducers";

export const HistoryContext = createContext();

const HistoryContextProvider = (props) => {
    const [history, dispatch] = useReducer(HistoryReducer, [], () => {
        const localData = localStorage.getItem('history');
        return localData ? JSON.parse(localData) : []
    });
    useEffect(() => {
        localStorage.setItem('history', JSON.stringify(history))
    }, [history]);
    return (
        <HistoryContext.Provider value={{history, dispatch}}>
            {props.children}
        </HistoryContext.Provider>
    )
}

export default HistoryContextProvider;