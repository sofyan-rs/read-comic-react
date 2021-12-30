export const BookmarkReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_BOOKMARK':
            return [...state, {
                id: action.series.id,
                title: action.series.title,
                cover: action.series.cover,
                date: action.series.date_time
            }];
        case 'REMOVE_BOOKMARK':
            return state.filter(series => series.id !== action.id);
        default:
            return state;
    }
}