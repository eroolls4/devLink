export const addUniqueItems = (state, action, idField = "_id") => {
    const existingIds = state.map(item => item[idField]);
    const newItems = action.payload.filter(item => !existingIds.includes(item[idField]));
    return [...state, ...newItems];
};

export const removeItem = (state, action, idField = "_id") => {
    return state.filter(item => item[idField] !== action.payload);
};

export const clearState = () => [];
