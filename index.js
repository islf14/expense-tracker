import { Command } from 'commander'
import { addExpense } from './expense.js'
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
      }
    } else {
      console.log('error: amount and description are required')
    }
  })

program
  .command('list')
  .description('List all expenses')
  .action((options) => {
    console.log(options)
  })

program
  .command('summary')
  .description('Summary of all expenses')
  .action((options) => {
    console.log(options)
  })

program
  .command('delete')
  .description('Eliminate a expense')
  .option('--id <number>', 'Expense ID')
  .action((options) => {
    console.log(options)
  })

program.parse()

function myParseInt (value) {
  // parseInt takes a string and a radix
  const parsedValue = parseInt(value, 10)
  if (isNaN(parsedValue)) {
    return false
  }
  return parsedValue
}
