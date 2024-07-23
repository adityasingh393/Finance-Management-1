/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Budget, expenseSource, incomeSource, newUser, transHistory } from "./interface/types";
import { saveToIndexedDB } from "./SaveUserInDB";

export function saveIncomeToSession (data:incomeSource) {
    const currentUser:newUser = JSON.parse(sessionStorage.getItem('currentUser')!)
    // console.log('before', currentUser)

    const newIncomeArray = currentUser?.incomeDetails! // assign currentUser array to test array
    let indx = -1
    indx = newIncomeArray?.findIndex((i)=>i.incomeType === data.incomeType)! // search if income type already exists
    if(indx !== -1){
        newIncomeArray[indx].amount = data.amount  // if it exists just replace new amount with the old
    }
    else newIncomeArray?.push(data)  // else push the whole data {incomeType, amount}

    currentUser.incomeDetails = newIncomeArray  // replace currentUser income array with newIncomeArray
    // console.log('after', currentUser)
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser)) // save current user in session

    // call a function to save current user in IndexedDB
    saveToIndexedDB(currentUser)
}

export function saveExpenseToSession (data:expenseSource) {
    const currentUser:newUser = JSON.parse(sessionStorage.getItem('currentUser')!)
    // console.log('before', currentUser)

    const newExpenseArray = currentUser?.expenseDetails! // assign currentUser array to test array
    let indx = -1
    indx = newExpenseArray?.findIndex((i)=>i.expenseType === data.expenseType)! // search if expense type already exists
    if(indx !== -1){
        console.log(indx)
        newExpenseArray[indx].amount = data.amount  // if it exists just replace new amount with the old
    }
    else newExpenseArray?.push(data)  // else push the whole data {expenseType, amount}

    currentUser.expenseDetails = newExpenseArray  // replace currentUser expense array with newExpenseArray
    // console.log('after', currentUser)
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser)) // save current user in session
        
    // call a function to save current user in IndexedDB
    saveToIndexedDB(currentUser)
}

export function saveBudgetToSession (data:Budget) {
    const currentUser:newUser = JSON.parse(sessionStorage.getItem('currentUser')!)
    // console.log('before', currentUser)

    const newBudgetArray = currentUser?.budgetDetails! // assign currentUser array to test array
    let indx = -1
    indx = newBudgetArray?.findIndex((i)=>i.type === data.type)! // search if budget type already exists
    if(indx !== -1){
        newBudgetArray[indx].amount = data.amount  // if it exists just replace new amount with the old
    }
    else newBudgetArray?.push(data)  // else push the whole data {type, amount}

    currentUser.budgetDetails = newBudgetArray  // replace currentUser budget array with newBudgetArray
    // console.log('after', currentUser)
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser)) // save current user in session
        
    // call a function to save current user in IndexedDB
    saveToIndexedDB(currentUser)
}

export function saveTransactionToSession (data:transHistory) {

    // console.log('function "saveTransactionToSession" called')
    let currentUser:newUser = JSON.parse(sessionStorage.getItem('currentUser')!)
    // console.log('bcu', currentUser)

    currentUser.transDetails?.push(data)
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser))
    currentUser = JSON.parse(sessionStorage.getItem('currentUser')!)
    // console.log('acu', currentUser)

    // call a function to save current user in IndexedDB
    saveToIndexedDB(currentUser)
}

export function deleteIncomeSession (data: incomeSource[]){
    const currentUser:newUser = JSON.parse(sessionStorage.getItem('currentUser')!)

    currentUser.incomeDetails = data

    sessionStorage.setItem('currentUser', JSON.stringify(currentUser))

    // save to IndexedDB
    saveToIndexedDB(currentUser)
}

export function deleteExpenseSession (data: expenseSource[]){
    const currentUser:newUser = JSON.parse(sessionStorage.getItem('currentUser')!)

    currentUser.expenseDetails = data

    sessionStorage.setItem('currentUser', JSON.stringify(currentUser))

    // save to IndexedDB
    saveToIndexedDB(currentUser)
}

export function deleteBudgetSession (data: Budget[]){
    const currentUser:newUser = JSON.parse(sessionStorage.getItem('currentUser')!)

    currentUser.budgetDetails = data

    sessionStorage.setItem('currentUser', JSON.stringify(currentUser))

    // save to IndexedDB
    saveToIndexedDB(currentUser)
}