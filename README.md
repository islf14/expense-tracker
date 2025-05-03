# EXPENSE TRACKER

JavaScript solution for [expense-tracker](https://roadmap.sh/projects/expense-tracker) from [roadmap.sh](https://roadmap.sh/).

## How to run

Run the following commands:

```bash

# Run on console
$ > npm run start

# To add
$ > node index add --amount 20 --description "Lunch" 
# Expense added successfully (ID: 1)

$ > node index add --amount 10 --description "Dinner" 
# Expense added successfully (ID: 2)

$ > node index list
# ID  Date       Description  Amount
# 1   2024-08-06  Lunch        $20
# 2   2024-08-06  Dinner       $10

$ > node index summary
# Total expenses: $30

$ > node index delete --id 2
# Expense deleted successfully

$ > node index summary
# Total expenses: $20

$ > node index summary --month 8
# Total expenses for August: $20

```
