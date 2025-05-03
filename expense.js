import fs from 'node:fs/promises'
import { existsSync } from 'node:fs'

const nameFile = 'data.json'

async function readJson () {
  let allExpenses = []
  try {
    const data = await fs.readFile(nameFile, 'utf-8')
    allExpenses = JSON.parse(data)
  } catch (error) { console.log('e.f.') }
  return allExpenses
}

async function writeJson ({ allExpenses }) {
  const jsonData = JSON.stringify(allExpenses, null, 2)
  try {
    await fs.writeFile(nameFile, jsonData, 'utf8')
    return true
  } catch (error) {
    console.log('Cannot create JSON')
    return false
  }
}

export async function addExpense ({ amount, description }) {
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
    console.log(`Expense added successfully (ID: ${id}) \n`)
  }
}
