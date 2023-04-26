import { createSlice } from '@reduxjs/toolkit'
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

export const TextSlice = createSlice({
    name: 'text slice',
    initialState: {
        value: "tekst",
    },
    reducers: {
        onstart: (state) => {
            console.log("onstart");
            let x = state.value.split("")
            x.unshift(alphabet[Math.floor(Math.random() * alphabet.length)])
            state.value = x.join("")
        },
        onend: (state) => {
            console.log("onend");
            let x = state.value.split("")
            x.push(alphabet[Math.floor(Math.random() * alphabet.length)])
            state.value = x.join("")
        },
        deleteend: (state) => {
            console.log("deleteend");
            let x = state.value.split("")
            x.pop()
            state.value = x.join("")
        }
    },
})

export const { onstart, onend, deleteend } = TextSlice.actions
export default TextSlice.reducer
