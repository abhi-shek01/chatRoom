import React, { useContext, useReducer } from 'react'

export const StateContext = React.createContext();


export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}

    </StateContext.Provider>
);


//below line allows us to pull the data layer
export const useStateValue = () => useContext(StateContext);
