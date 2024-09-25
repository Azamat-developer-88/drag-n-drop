import { createSlice } from '@reduxjs/toolkit';

const listsByIdSlice = createSlice({
  name: 'listsById',
  initialState: {},
  reducers: {
    addList: (state, action) => {
      const { listId, listTitle } = action.payload;
      state[listId] = { _id: listId, title: listTitle, cards: [] };
    },
    changeListTitle: (state, action) => {
      const { listId, listTitle } = action.payload;
      state[listId].title = listTitle;
    },
    deleteList: (state, action) => {
      const { listId } = action.payload;
      delete state[listId];
    },
    addCard: (state, action) => {
      const { listId, cardId } = action.payload;
      state[listId].cards.push(cardId);
    },
    moveCard: (state, action) => {
      if (action.payload.sourceListId === action.payload.destListId) {
        const newCards = [...state[action.payload.sourceListId].cards];
        const [removedCard] = newCards.splice(action.payload.oldCardIndex, 1);
        newCards.splice(action.payload.newCardIndex, 0, removedCard);
        state[action.payload.sourceListId].cards = newCards;
      }
      else {
        const sourceCards = [...state[action.payload.sourceListId].cards];
        const [removedCard] = sourceCards.splice(action.payload.oldCardIndex, 1);
        const destinationCards = [...state[action.payload.destListId].cards];
        destinationCards.splice(action.payload.newCardIndex, 0, removedCard);
        state[action.payload.sourceListId].cards = sourceCards;
        state[action.payload.destListId].cards = destinationCards;
      }
    },
    deleteCard: (state, action) => {
      const { cardId, listId } = action.payload;
      state[listId].cards = state[listId].cards.filter(cardId => cardId !== action.payload.cardId);
    }
  }
});

export const {
  addList,
  changeListTitle,
  deleteList,
  addCard,
  moveCard,
  deleteCard
} = listsByIdSlice.actions;
export default listsByIdSlice.reducer;
