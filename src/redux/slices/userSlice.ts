import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { newUser } from '../../interfaces/UserInterface'

const initialState: newUser = {
    user: {
        name: '',
        email: '',
        password: ''
    },
    incomeDetails: [],
    expenseDetails: [],
    transDetails: []
}

export const userSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setInitialState: (state, action: PayloadAction<newUser>) => {
            // initialise state here on login
            state.user = action.payload.user,
                state.incomeDetails = action.payload.incomeDetails,
                state.expenseDetails = action.payload.expenseDetails,
                state.budgetDetails = action.payload.budgetDetails,
                state.transDetails = action.payload.transDetails
        },
        updateIncomeArray: (_state, _action: PayloadAction<any>) => {
            // update initial state here
            // state.incomeDetails = [...state.incomeDetails, action.payload]
        },
        updateExpenseArray: (_state, _action: PayloadAction<any>) => {
            // update initial state here
            // state.expenseDetails = [...state.expenseDetails, action.payload]
        },
        updateBudgetArray: (_state, _action: PayloadAction<any>) => {
            // update initial state here
            // state.budgetDetails = [...state.budgetDetails, action.payload]
        },
        updateTansactionArray: (_state, _action: PayloadAction<any>) => {
            // update initial state here
            // state.transDetails = [...state.transDetails, action.payload]
        }
    }
})

export const { setInitialState, updateIncomeArray, updateExpenseArray, updateBudgetArray, updateTansactionArray } = userSlice.actions

export default userSlice.reducer