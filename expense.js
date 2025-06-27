import fs from 'node:fs/promises'
import { existsSync } from 'node:fs'

const nameFile = 'data.json'

async function readJson() {
  let allExpenses = []
  try {
    const data = await fs.readFile(nameFile, 'utf-8')
    allExpenses = JSON.parse(data)
  } catch (error) {
    console.log('e.f.')
  }
  return allExpenses
}

async function writeJson({ allExpenses }) {
  const jsonData = JSON.stringify(allExpenses, null, 2)
  try {
    await fs.writeFile(nameFile, jsonData, 'utf8')
    return true
  } catch (error) {
    console.log('Cannot create JSON')
    return false
  }
}

export async function addExpense({ amount, description }) {
  let allExpenses = []
  // read file json
  if (existsSync(nameFile)) {
    allExpenses = await readJson()
  }
  // find ID
  let id = 1
  if (allExpenses.length > 0) {
    for (const property in allExpenses) {
      if (allExpenses[property].id >= id) id = allExpenses[property].id + 1
    }
  }
  // push new task
  const newTask = {
    id,
    description,
    amount,
    createdAt: new Date()
  }
  allExpenses.push(newTask)
  // create json file
  const write = writeJson({ allExpenses })
  if (write) {
    console.log(`Expense added successfully (ID: ${id})`)
  }
}

export async function listExpenses() {
  if (existsSync(nameFile)) {
    let allExpenses = []
    allExpenses = await readJson()
    if (allExpenses.length !== 0) {
      const allRows = allExpenses.map((task) => {
        const id = `${task.id}`
        const amount = `$${task.amount}`
        const date = new Date(task.createdAt).toLocaleDateString()
        return ` ${id.padEnd(4)} ${date.padEnd(10)} ${task.description.padEnd(
          20
        )} ${amount.padStart(6)}`
      })
      const eID = 'ID'
      const eDate = 'Date'
      const eDes = 'Description'
      const eAmo = 'Amount'
      console.log(
        `\n ${eID.padEnd(4)} ${eDate.padEnd(10)} ${eDes.padEnd(
          20
        )} ${eAmo.padStart(6)}`
      )
      allRows.forEach((element) => {
        console.log(element)
      })
      console.log('\n')
    }
  }
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export async function totalSummary({ month }) {
  if (existsSync(nameFile)) {
    let allExpenses = []
    allExpenses = await readJson()
    if (allExpenses.length !== 0) {
      let summary = 0
      if (month) {
        const monthName = monthNames[month - 1]
        allExpenses.forEach((task) => {
          const dbMonth = new Date(task.createdAt).getMonth()
          if (parseInt(dbMonth, 10) + 1 === month) {
            summary += task.amount
          }
        })
        console.log(`\n Total expenses for ${monthName}: $${summary} \n`)
      } else {
        allExpenses.forEach((task) => {
          summary += task.amount
        })
        console.log(`\n Total expenses: $${summary} \n`)
      }
    }
  }
}

export async function deleteExpense({ idE }) {
  if (existsSync(nameFile)) {
    let allExpenses = []
    allExpenses = await readJson()
    if (allExpenses.length !== 0) {
      const expenseIndex = allExpenses.findIndex(({ id }) => id === idE)
      if (expenseIndex !== -1) {
        allExpenses.splice(expenseIndex, 1)
        // write json
        const write = writeJson({ allExpenses })
        if (write) console.log('Expense deleted successfully')
      } else console.log('error: not found')
    } else console.log('error: not found yet')
  }
}
