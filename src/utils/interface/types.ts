export interface userDetails{
    name:string;
    email:string;
    password:string;
}


export interface incomeSource{
    incomeType:string;
    amount:string;
}
export interface expenseSource{
    expenseType:string;
    amount:string;
}
export interface transHistory{
    date:string;
    type:string;
    amount:string;

}
export interface Budget{
    type:string;
    amount:string;
}

export interface newUser{
    user:userDetails;
    incomeDetails?:incomeSource[];
    expenseDetails?:expenseSource[];
    transDetails?:transHistory[];
    budgetDetails?:Budget[];
}
export interface LoginFormInput {
    email: string;
    password: string;
}