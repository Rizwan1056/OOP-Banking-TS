#! /usr/bin/env node
import inquirer from "inquirer";

//BANK ACCOUNT INTERFACE
interface BankAccount{
    accountNumber : number;
    balance : number;
withdraw(amount: number): void
deposit(amount: number): void
checkBalance(): void
}

//BANK ACCOUNT CLASS
class BankAccount implements BankAccount{
    accountNumber : number;
    balance : number;

    constructor( accountNumber : number,balance : number){
        this.accountNumber = accountNumber;
        this.balance = balance
    }

    //DEBIT MONEY
    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -=amount;
            console.log(`withdrawal of $${amount} , successful!! Remaing balance $${this.balance}`);
        }else{
            console.log("Insufficient balance!!!");
        }
    }

    //CREDIT MONEY
    deposit(amount: number): void {
        if(amount >  100){
            amount - 1 //$1 fee charged if more than $100 is deposited
        }this.balance += amount ;
        console.log(`Deposite of $${amount} , successful!!!! Remaining balance : $${this.balance}`)
        
    }
       //CHECK BALANCE
       checkBalance() : void {
        console.log(`Current balance : $${this.balance}`);
    }
}

//creating custumers class
class Customer{
    firstName : string;
    lastName : string;
    gender : string;
    age : number;
    mobileNumber : number;
    account: BankAccount

    constructor( firstName : string,lastName : string,gender : string,age : number,  mobileNumber : number, account: BankAccount){
        this.firstName = firstName
        this.lastName =lastName
        this.gender = gender
        this.age = age
        this.mobileNumber = mobileNumber
        this.account = account 
    }
}
//CREATE BANK ACCOUNT
const accounts : BankAccount[] = [
    new BankAccount(1001 , 5000),
    new BankAccount(1002 , 1000),
    new BankAccount(1003 , 2000)
]

// CREATE CUSTOMERS
const customers: Customer[] = [
    new Customer ("Rizwan" , "Ahmed" , "Male" , 34 , 3163880497 , accounts[0]),
    new Customer ("Jalees" , "Akbar" , "Male" , 27 , 3165644444 , accounts[1]),
    new Customer ("Uzair" , "shah" , "Male" , 25 ,   3109555545 , accounts[2])
]

//FUNCTION TO INTERACT WITH BANK ACCOUNT
 async function service(){
    do{
        const accountNumberInput = await inquirer.prompt({
            name : "accountNumber",
            type : "number",
            message : "Enter your account number : "
        })

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`\n\tWELCOME, ${customer.firstName} ${customer.lastName}\t\n`);
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices : ["Deposit" , "Withdraw" , "Check Balance" , "Exit"]
                }
            ]);

            switch (ans.select){
case "Deposit" :
const depositAmount = await inquirer.prompt({
    name: "amount",
    type: "number",
    message: "Enter the amount to deposit: "
})
customer.account.deposit(depositAmount.amount)
break;
case "Withdraw" :
const withdrawAmount = await inquirer.prompt({
    name: "amount",
    type: "number",
    message: "Enter the amount to withdraw: "
})
customer.account.withdraw(withdrawAmount.amount)
break;
case "Check Balance":
    customer.account.checkBalance();
    break;
    case "Exit":
        console.log("EXITING BANK PROGRAM");
        console.log("\n Thank you for using our bank services. Have a great day");
        return;
            }    
        }else{
            console.log("Ivalid account number. Please try again !!!!");    
        }
    } while(true)
}
service()
