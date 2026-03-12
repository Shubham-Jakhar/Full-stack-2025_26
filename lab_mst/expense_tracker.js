let expenses = [];
let editIndex = -1;
function addExpense(){
    let name = document.getElementById("name").value;
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;
    if(name=="" || amount==""){
        alert("Enter all fields");
        return;
    }
    expenses.push({name, amount, category});
    displayExpenses();
    clearFields();
}
function displayExpenses(){
    let list = document.getElementById("expenseList");
    list.innerHTML = "";
    expenses.forEach((exp, index)=>{
        list.innerHTML += `
        <tr>
            <td>${exp.name}</td>
            <td>${exp.amount}</td>
            <td>${exp.category}</td>
            <td>
                <button onclick="editExpense(${index})">Edit</button>
            </td>
        </tr>`;
    });
}

function editExpense(index){
    let exp = expenses[index];
    document.getElementById("name").value = exp.name;
    document.getElementById("amount").value = exp.amount;
    document.getElementById("category").value = exp.category;
    editIndex = index;
}

function updateExpense(){
    if(editIndex === -1){
        alert("Select expense to update");
        return;
    }
    expenses[editIndex].name = document.getElementById("name").value;
    expenses[editIndex].amount = document.getElementById("amount").value;
    expenses[editIndex].category = document.getElementById("category").value;
    editIndex = -1;
    displayExpenses();
    clearFields();
}

function clearFields(){
    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
}