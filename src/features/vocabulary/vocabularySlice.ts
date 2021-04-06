import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import generateRandomId from '../../helpers/generateRandomId';
import { saveToLocalStorage } from '../../helpers/localStorageHandler';

export interface Words {
    id: string;
    word: string;
    translation: string;
    reading?: string;
}

export interface Categories {
    id: string;
    name: string;
    words: Words[]
}


interface VocabularyState {
    categories: {
        [key: string]: Categories
    }
}

export const initialState: VocabularyState = {
    categories: {}
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

            saveToLocalStorage(current(state).categories);
        },
        createWord: (state, action: PayloadAction<{categoryId: string, word: Words}>) => {
            const { categoryId, word } = action.payload;

            state.categories[categoryId].words = [...state.categories[categoryId].words, word];

            saveToLocalStorage(current(state).categories);
        },
        deleteCategory: (state, action: PayloadAction<string>) => {
            delete state.categories[action.payload];

            saveToLocalStorage(current(state).categories);
        },
        deleteWord: (state, action: PayloadAction<{categoryId: string, wordId: string}>) => {
            const { categoryId, wordId } = action.payload;

            state.categories[categoryId].words = state.categories[categoryId].words.filter((item) => {
                return item.id !== wordId;
            });

            saveToLocalStorage(current(state).categories);
        },
        updateWord: (state, action: PayloadAction<{categoryId: string, word: Words}>) => {
            const { categoryId, word } = action.payload;

            const selectedWord = state.categories[categoryId].words.filter((item) => {
                return item.id === word.id;
            })[0] = word;

            state.categories[categoryId].words = state.categories[categoryId].words.map((item) => {
                return item.id === word.id ? selectedWord : item;
            })

            saveToLocalStorage(current(state).categories);
        }
    }
})

export const { loadVocabulary, createCategory, createWord, deleteCategory, deleteWord, updateWord } = vocabularySlice.actions;

export const selectVocabulary = (state: RootState) => state.vocabulary;

export default vocabularySlice.reducer;