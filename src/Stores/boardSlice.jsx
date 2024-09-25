import { createSlice } from '@reduxjs/toolkit';

const boardSlice = createSlice({
  name: 'board',
  initialState: { lists: [] },
  reducers: {
    addList: (state, action) => {
      state.lists.push(action.payload.listId);
    },
    moveList: (state, action) => {
      const { oldListIndex, newListIndex } = action.payload;
      const newLists = [...state.lists];
      const [removedList] = newLists.splice(oldListIndex, 1);
      newLists.splice(newListIndex, 0, removedList);
      state.lists = newLists;
    },
    deleteList: (state, action) => {
      const { listId } = action.payload;
      state.lists = state.lists.filter(tmpListId => tmpListId !== listId);
    }
  }
});

export const { addList, moveList, deleteList } = boardSlice.actions;
export default boardSlice.reducer;
