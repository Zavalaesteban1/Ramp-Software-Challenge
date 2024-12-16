import { Employee, PaginatedResponse, Transaction } from "../utils/types"



type UseTypeBaseAllResult<TValue> = UseTypeBaseResult<TValue> & {
  fetchAll: () => Promise<void>
}

type UseTypeBaseByIdResult<TValue> = UseTypeBaseResult<TValue> & {
  fetchById: (id: string) => Promise<void>
}


export type TransactionsByEmployeeResult = UseTypeBaseByIdResult<Transaction[] | null>


type UseTypeBaseResult<TValue> = {
  data: TValue
  loading: boolean
  invalidateData: () => void
}

export type EmployeeResult = UseTypeBaseResult<Employee[] | null> & {
  fetchAll: () => Promise<void>
}

export type PaginatedTransactionsResult = UseTypeBaseResult<PaginatedResponse<Transaction[]> | null> & {
  fetchAll: () => Promise<void>
  loading: boolean
}