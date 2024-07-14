import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Budget, expenseSource, incomeSource, newUser, transHistory } from '../../utils/interface/types';
import { saveBudgetToSession, saveExpenseToSession, saveIncomeToSession, saveTransactionToSession } from '../../utils/SaveUserDataSession';

const initialState: newUser = {
    user: {
        name: '',
        email: '',
        password: ''
    },
    incomeDetails: [],
    expenseDetails: [],
    budgetDetails: [],
    transDetails: []
}

export const userSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setInitialState: (state, action: PayloadAction<newUser>) => {
            // initialise state here on login
            // console.log('before', state.user)
            state.user = action.payload.user,
            state.incomeDetails = action.payload.incomeDetails,
            state.expenseDetails = action.payload.expenseDetails,
            state.budgetDetails = action.payload.budgetDetails,
            state.transDetails = action.payload.transDetails
            // console.log('after', state.user)
        },
        addToIncomeArray: (state, action: PayloadAction<incomeSource>) => {
            // update initial state here
            // console.log(action.payload)
            state.incomeDetails?.push(action.payload)
            // console.log('income-array', JSON.parse(JSON.stringify(state.incomeDetails)))
            saveIncomeToSession(action.payload)
        },
        addToExpenseArray: (state, action: PayloadAction<expenseSource>) => {
            // update initial state here
            // console.log(action.payload)
            state.expenseDetails?.push(action.payload)
            // console.log('expense-array', JSON.parse(JSON.stringify(state.expenseDetails)))
            saveExpenseToSession(action.payload)
        },
        addToBudgetArray: (state, action: PayloadAction<Budget>) => {
            // update initial state here
            // console.log(action.payload)
            state.budgetDetails?.push(action.payload)
            // console.log('budget-array', JSON.parse(JSON.stringify(state.budgetDetails)))
            saveBudgetToSession(action.payload)
        },
        addIncomeToTansactionArray: (state, action: PayloadAction<transHistory>) => {
            // update initial state here
            // console.log(action.payload)
            state.transDetails?.push(action.payload)
            // console.log('history-array', JSON.parse(JSON.stringify(state.transDetails)))
            saveTransactionToSession(action.payload)
        },
        addExpenseToTansactionArray: (state, action: PayloadAction<transHistory>) => {
            // update initial state here
            // console.log(action.payload)
            state.transDetails?.push(action.payload)
            // console.log('history-array', JSON.parse(JSON.stringify(state.transDetails)))
            saveTransactionToSession(action.payload)
        }
    }
})

export const { setInitialState, addToIncomeArray, addToExpenseArray, addToBudgetArray, addIncomeToTansactionArray, addExpenseToTansactionArray } = userSlice.actions

export default userSlice.reducer