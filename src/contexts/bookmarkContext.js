import { createContext, useReducer, useEffect } from "react";
import { BookmarkReducer } from "../reducers/bookmarkReducers";

export const BookmarkContext = createContext();

const BookmarkContextProvider = (props) => {
    const [bookmark, dispatch] = useReducer(BookmarkReducer, [], () => {
        const localData = localStorage.getItem('bookmark');
        return localData ? JSON.parse(localData) : []
    });
    useEffect(() => {
        localStorage.setItem('bookmark', JSON.stringify(bookmark))
    }, [bookmark]);
    return (
        <BookmarkContext.Provider value={{bookmark, dispatch}}>
            {props.children}
        </BookmarkContext.Provider>
    )
}

export default BookmarkContextProvider;