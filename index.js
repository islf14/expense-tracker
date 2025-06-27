import { Command } from 'commander'
import {
  addExpense,
  deleteExpense,
  listExpenses,
  totalSummary
} from './expense.js'
const program = new Command()

program
  .name('expense-tracker')
  .description('CLI to manage your finances')
  .version('0.0.1')

program
  .command('add')
  .description('Add new expense')
  .option('-a, --amount <number>', 'Amount spent')
  .option('-d, --description <string>', 'Name of the expense')
  .action((options) => {
    if (options.amount && options.description) {
      const amount = myParseInt(options.amount)
      if (amount !== false) {
        addExpense({ amount, description: options.description })
      } else console.log('error: amount must be a number')
    } else console.log('error: amount and description are required')
  })

program
  .command('list')
  .description('List all expenses')
  .action(() => {
    listExpenses()
  })

program
  .command('summary')
  .description('Summary of all expenses')
  .option('-m, --month <number>', 'Month number')
  .action((options) => {
    if (options.month) {
      const number = myParseInt(options.month)
      if (number && number > 0 && number < 13) {
        totalSummary({ month: number })
      } else console.log('error: must be a number from 1 to 12')
    } else totalSummary({ month: null })
  })

program
  .command('delete')
  .description('Eliminate a expense')
  .option('-i, --id <number>', 'Expense ID')
  .action((options) => {
    if (options.id) {
      const number = myParseInt(options.id)
      if (number && number > 0) {
        deleteExpense({ idE: number })
      } else console.log('error: must be a positive number')
    } else console.log('error: id is required')
  })

program.parse()

function myParseInt(value) {
  const parsedValue = parseInt(value, 10)
  if (isNaN(parsedValue)) return false
  return parsedValue
}
