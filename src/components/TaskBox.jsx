import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addList,
  deleteList,
  addCard,
  moveCard,
  deleteCard,
  changeListTitle
} from '../Stores/listByIdslice';
import {
  addCard as addCardToCards,
  deleteCard as deleteCardFromCards,
  changeCardText
} from '../Stores/cardBiIdSlice';

const TaskBox = () => {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.listsById);
  const cards = useSelector(state => state.cardsById);

  const [newListTitle, setNewListTitle] = useState('');
  const [cardTextByList, setCardTextByList] = useState({});
  const [draggingCard, setDraggingCard] = useState(null);

  const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

  const handleAddList = useCallback(() => {
    if (!newListTitle.trim()) return;
    const newListId = generateUniqueId();
    dispatch(addList({ listId: newListId, listTitle: newListTitle }));
    setNewListTitle('');
  }, [dispatch, newListTitle]);

  const handleAddCard = useCallback((listId) => {
    const cardText = cardTextByList[listId] || '';
    if (!cardText.trim()) return;
    const newCardId = generateUniqueId();
    dispatch(addCardToCards({ cardText, cardId: newCardId }));
    dispatch(addCard({ listId, cardId: newCardId }));
    setCardTextByList(prev => ({ ...prev, [listId]: '' }));
  }, [dispatch, cardTextByList]);

  const handleDeleteCard = useCallback((listId, cardId) => {
    dispatch(deleteCardFromCards({ cardId }));
    dispatch(deleteCard({ listId, cardId }));
  }, [dispatch]);

  const handleDeleteList = useCallback((listId) => {
    const cardIds = lists[listId].cards;
    dispatch(deleteList({ cards: cardIds }));
    dispatch(deleteList({ listId }));
  }, [dispatch, lists]);

  const handleChangeListTitle = useCallback((listId, newTitle) => {
    dispatch(changeListTitle({ listId, newTitle }));
  }, [dispatch]);

  const handleChangeCardText = useCallback((cardId, newText) => {
    dispatch(changeCardText({ cardId, newText }));
  }, [dispatch]);

  const handleDragStart = (cardId) => setDraggingCard(cardId);

  const handleDragOver = (e, destListId, cardId) => {
    e.dataTransfer.dropEffect = 'move';
    e.preventDefault();
    if (!draggingCard || destListId === draggingCard) return;

    const sourceListId = Object.keys(lists).find(listId => lists[listId].cards.includes(draggingCard));
    const oldCardIndex = lists[sourceListId].cards.indexOf(draggingCard);
    const newCardIndex = lists[destListId].cards.indexOf(cardId);

    if (newCardIndex !== -1) {
      dispatch(moveCard({ sourceListId, destListId, oldCardIndex, newCardIndex }));
    }
  };

  const handleDrop = () => setDraggingCard(null);

  return (
    <div className="flex flex-wrap space-x-4 items-start p-4 min-h-screen">
      <div className="bg-white p-4 rounded-lg shadow-md w-64">
        <input
          type="text"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          placeholder="New List Title"
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
        />
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddList}
        >
          + Add List
        </button>
      </div>

      {Object.keys(lists).map(listId => (
        <div key={listId} className="bg-white p-4 rounded-lg shadow-md w-64">
          <input
            type="text"
            value={lists[listId].title}
            onChange={(e) => handleChangeListTitle(listId, e.target.value)}
            className="w-full text-lg font-bold mb-2 p-2 border border-gray-300 rounded-md"
          />

          <div className="mb-4">
            <input
              type="text"
              value={cardTextByList[listId] || ''}
              onChange={(e) => setCardTextByList(prev => ({ ...prev, [listId]: e.target.value }))}
              placeholder="New Card Text"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <button
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleAddCard(listId)}
            >
              + Add Task
            </button>
          </div>

          <ul className="list-none mb-4">
            {lists[listId].cards.map((cardId) => (
              <li
                key={cardId}
                className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded-md"
                draggable
                onDragStart={() => handleDragStart(cardId)}
                onDragOver={(e) => handleDragOver(e, listId, cardId)}
                onDrop={handleDrop}
              >
                <input
                  type="text"
                  value={cards[cardId]?.text || ''}
                  onChange={(e) => handleChangeCardText(cardId, e.target.value)}
                  className="text-gray-700 w-full bg-transparent p-1 border border-transparent focus:border-blue-500 rounded-md"
                />
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleDeleteCard(listId, cardId)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <button
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDeleteList(listId)}
          >
            Delete List
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskBox;
