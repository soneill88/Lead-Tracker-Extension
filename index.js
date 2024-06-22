import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js"
const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-3c828-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDb = ref(database, "leads")





const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")


function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='https://${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDb, function(snapshot){
    if(snapshot.exists()){
        const snapshotValues = snapshot.val()
    const  leads = Object.values(snapshotValues)
    console.log(leads)
    render(leads)
}


    })
    

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDb)
    ulEl.innerHTML =''
    
})

inputBtn.addEventListener("click", function() {
    push(referenceInDb, inputEl.value)
    inputEl.value = ""
   
})