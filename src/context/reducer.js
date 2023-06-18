export const initialState = {
    user : null,
    isLoading: true
};
    
export const actionTypes = {
    SET_USER : "SET_USER",
    SET_LOADING_STATE: "SET_LOADING_STATE"
}

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {...state, user:action.user};
        case actionTypes.SET_LOADING_STATE:
            return {...state, isLoading:action.isLoading};
        default:
            return state;
    }
}