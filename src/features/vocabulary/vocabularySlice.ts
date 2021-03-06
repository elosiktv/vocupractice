import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import generateRandomId from '../../helpers/generateRandomId';
import { saveToLocalStorage } from '../../helpers/localStorageHandler';
import showNotification from '../../helpers/showNotification';

export interface Words {
    id: string;
    word: string;
    translation: string;
    reading?: string;
    important?: boolean;
    categoryId?: string;
}

export interface Categories {
    id: string;
    name: string;
    words: Words[]
}

interface VocabularyState {
    categories: {
        [key: string]: Categories
    },
    searchWords: Words[];
}

export const initialState: VocabularyState = {
    categories: {},
    searchWords: []
}

export const vocabularySlice = createSlice({
    name: 'vocubulary',
    initialState,
    reducers: {
        loadVocabulary: (state, action: PayloadAction<any>) => {
            state.categories = action.payload;
        },
        createCategory: (state, action: PayloadAction<string>) => {
            const randomId = generateRandomId();
            
            state.categories[randomId] = {
                id: randomId,
                name: action.payload,
                words: []
            }

            saveToLocalStorage('vocupractice', current(state).categories);

            showNotification('Success', 'Category has been created!', 'success');
        },
        createWord: (state, action: PayloadAction<{categoryId: string, word: Words}>) => {
            const { categoryId, word } = action.payload;

            state.categories[categoryId].words = [...state.categories[categoryId].words, word];

            saveToLocalStorage('vocupractice', current(state).categories);

            showNotification('Success', 'Word has been added!', 'success');
        },
        deleteCategory: (state, action: PayloadAction<string>) => {
            delete state.categories[action.payload];

            saveToLocalStorage('vocupractice', current(state).categories);

            showNotification('Success', 'Category has been deleted!', 'success');
        },
        deleteWord: (state, action: PayloadAction<{categoryId: string, wordId: string, notification: boolean}>) => {
            const { categoryId, wordId, notification } = action.payload;

            state.categories[categoryId].words = state.categories[categoryId].words.filter((item) => {
                return item.id !== wordId;
            });

            saveToLocalStorage('vocupractice', current(state).categories);

            if (notification) {
                showNotification('Success', 'Word has been deleted!', 'success');
            }
            
        },
        updateWord: (state, action: PayloadAction<{categoryId: string, word: Words}>) => {
            const { categoryId, word } = action.payload;
            
            state.categories[categoryId].words = state.categories[categoryId].words.map((item) => {
                return item.id === word.id ? {...item, ...word} : item;
            })

            state.categories['importantWords'].words = state.categories['importantWords'].words.map((item) => {
                return item.id === word.id ? {...item, ...word} : item;
            })

            saveToLocalStorage('vocupractice', current(state).categories);

            showNotification('Success', 'Word has been updated!', 'success');
        },
        searchWords: (state, action: PayloadAction<{query: string, categoryId: string}>) => {
            const { categoryId, query } = action.payload;

            if (query.trim().length === 0) {
                state.searchWords = [];
            } else {
                const foundWords = state.categories[categoryId].words.filter((item) => {
                    return item.word.includes(query) || item.translation.includes(query) || item.reading?.includes(query);
                });
    
                state.searchWords = foundWords;
            }
        },
        setImportant: (state, action: PayloadAction<{categoryId: string, wordId: string, important: boolean}>) => {
            const { categoryId, wordId, important } = action.payload;

            if (!state.categories['importantWords']) {
                state.categories['importantWords'] = {
                    id: 'importantwords',
                    name: 'important',
                    words: []
                }
            }
            
            state.categories[categoryId].words = state.categories[categoryId].words.map((item) => {
                if (item.id === wordId) {
                    if (important) {
                        const wordWithImportant = {...item, important: important, categoryId: categoryId};
                        state.categories['importantWords'].words.push(wordWithImportant);
                    } else {
                        state.categories['importantWords'].words = state.categories['importantWords'].words.filter((importantItem) => {                    
                            return importantItem.id !== wordId;
                        })
                    }
                }

                return item.id === wordId ? {...item, important: important} : item;
            })

            saveToLocalStorage('vocupractice', current(state).categories);
        },
        setImportantSearched: (state, action: PayloadAction<{wordId: string, important: boolean}>) => {
            const { wordId, important } = action.payload;

            state.searchWords = state.searchWords.map((item) => {
                return item.id === wordId ? {...item, important: important} : item;
            })
        },
        moveWord: (state, action: PayloadAction<{categoryIdFrom: string, categoryIdTo: string, word: Words}>) => {
            const { categoryIdFrom, categoryIdTo, word } = action.payload;

            state.categories[categoryIdFrom].words = state.categories[categoryIdFrom].words.filter((item) => {
                return item.id !== word.id
            });

            state.categories[categoryIdTo].words.push(word);

            saveToLocalStorage('vocupractice', current(state).categories);

            showNotification('Success', 'Word has been moved!', 'success');
        }
    }
})

export const { loadVocabulary, createCategory, createWord, deleteCategory, deleteWord, updateWord, searchWords, setImportant, setImportantSearched, moveWord } = vocabularySlice.actions;

export const selectVocabulary = (state: RootState) => state.vocabulary;

export default vocabularySlice.reducer;