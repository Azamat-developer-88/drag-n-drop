import { createSlice } from '@reduxjs/toolkit';

const cardsByIdSlice = createSlice({
  name: 'cardsById',
  initialState: {},
  reducers: {
    addCard: (state, action) => {
      const { cardText, cardId } = action.payload;
      state[cardId] = { text: cardText, _id: cardId };
    },
    changeCardText: (state, action) => {
      const { cardText, cardId } = action.payload;
      state[cardId].text = cardText;
    },
    deleteCard: (state, action) => {
      const { cardId } = action.payload;
      delete state[cardId];
    },
    deleteList: (state, action) => {
      const { cards: cardIds } = action.payload;
      return Object.keys(state)
        .filter(cardId => !cardIds.includes(cardId))
        .reduce((newState, cardId) => ({ ...newState, [cardId]: state[cardId] }), {});
    }
  }
});

export const { addCard, changeCardText, deleteCard, deleteList } = cardsByIdSlice.actions;
export default cardsByIdSlice.reducer;
