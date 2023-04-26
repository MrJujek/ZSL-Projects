import { createSlice } from '@reduxjs/toolkit'

export const FormSlice = createSlice({
    name: 'FormSlice',
    initialState: {
        value: "tekst z FormSlice",
    },
    reducers: {
        change: (state, action) => {
            console.log(action.payload);
            state.value = action.payload
        },
        show: (state) => {
            alert(state.value)
        }
    },
})

export const { change, show } = FormSlice.actions
export default FormSlice.reducer
