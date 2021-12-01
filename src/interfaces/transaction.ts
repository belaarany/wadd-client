import { Expense } from "@wadd/models/expense";
import { Income } from "@wadd/models/income";
import { Transfer } from "@wadd/models/transfer";

export type Transaction = Income | Expense | Transfer
