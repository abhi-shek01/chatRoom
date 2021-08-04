
//initial look of the data layer
export const initialState = {
    user: null,
};

//using the action we will trigger for go ahead and push this layer into the data layer
export const actionTypes = {
    SET_USER: "SET_USER",
    DELETE_USER: "DELETE_USER"
};


const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,   //keep the state of the data layer
                user: action.user, //now change the user to whatever we dispatched 
            };
        case actionTypes.DELETE_USER:
            return {
                ...state,   //keep the state of the data layer
                user: null, //now change the user to whatever we dispatched 
            };



        default:
            return state;
    }
};


export default reducer;