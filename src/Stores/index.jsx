import { configureStore } from '@reduxjs/toolkit';
import listByIdReducer from './listByIdslice';
import cardsByIdReducer from './cardBiIdSlice';
import boardReducer from './boardSlice';
export const store = configureStore({
    reducer: {
        listsById: listByIdReducer,
        cardsById: cardsByIdReducer,
        board: boardReducer
    },
})

