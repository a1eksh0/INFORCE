const btnTheme = document.getElementById("theme");
const intro = document.getElementById("intro");
const interesi = document.getElementById("interesi");
const uchastie = document.getElementById("uchastie");

let txtBox = document.getElementById("txt");
const btnAdd = document.getElementById("btnAdd");
let goals = document.getElementById("Goals");

const btnAll = document.getElementById("btnAll");
const btnActiveGoals = document.getElementById("btnActiveGoals");
const btnCompletedGoals = document.getElementById("btnCompletedGoals");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const progressPercent = document.getElementById("progressPercent")
const progressBar = document.getElementById("ProgressBar");

document.addEventListener("DOMContentLoaded", () => {
    let savedTheme = localStorage.getItem("Tema")

        if (savedTheme == "LightMode")
        {
            LightMode();
        }
        else
        {
            DarkMode();
        }



    
});

document.addEventListener("DOMContentLoaded", () => 
    {
    let savedGoals = localStorage.getItem("MyGoals")
    if(savedGoals)
    {
        celi = JSON.parse(savedGoals);
    }

    btnAll.classList.add("active");
    ShowGoals();
    })

function saveGoals()
{
    localStorage.setItem("MyGoals", JSON.stringify(celi));
}

btnTheme.onclick = function()
{
    switchTheme();
}

let count = 0;
function switchTheme()
{
    count++;
    if (count % 2 == 1)
    {
        LightMode();
        localStorage.setItem("Tema", "LightMode")

    }
    else
    {
        DarkMode();
        localStorage.setItem("Tema", "DarkMode")
    }
}

function LightMode()
{
    btnTheme.textContent = "Dark ⏾";
    btnTheme.style.backgroundColor = "rgb(207, 198, 177)";

    progressStats.style.color = "rgb(128, 0, 32)";
    zaglavieSekcii.style.color = "rgb(128, 0, 32)";
    zaglavieUchebenPlan.style.color = "rgb(128, 0, 32)";

    intro.style.backgroundColor = "rgb(128, 0, 32)";
    intro.style.color = "rgb(255, 249, 242)";

    interesi.style.backgroundColor = "rgb(128, 0, 32)";
    interesi.style.color = "rgb(255, 249, 242)";

    uchastie.style.backgroundColor = "rgb(128, 0, 32)";
    uchastie.style.color = "rgb(255, 249, 242)";

    btnAdd.style.backgroundColor = "rgb(128, 0, 32)";
    btnAdd.style.borderColor = "rgb(128, 0, 32)";
    btnAdd.style.color = "rgb(255, 249, 242)";

    btnAll.style.backgroundColor = "rgb(128, 0, 32)";
    btnAll.style.borderColor = "rgb(128, 0, 32)";
    btnAll.style.color = "rgb(255, 249, 242)";

    btnActiveGoals.style.backgroundColor = "rgb(128, 0, 32)";
    btnActiveGoals.style.borderColor = "rgb(128, 0, 32)";
    btnActiveGoals.style.color = "rgb(255, 249, 242)";

    btnCompletedGoals.style.backgroundColor = "rgb(128, 0, 32)";
    btnCompletedGoals.style.borderColor = "rgb(128, 0, 32)";
    btnCompletedGoals.style.color = "rgb(255, 249, 242)";

    progressBar.style.accentColor = "rgb(128, 0, 32)";

    document.body.style.backgroundColor = "rgb(243, 230, 213)";
    count = 1;
}

function DarkMode()
{
    btnTheme.textContent = "Light ☀︎";
    btnTheme.style.backgroundColor = "rgb(207, 198, 177)";

    progressStats.style.color = "rgb(224, 248, 199)";
    zaglavieSekcii.style.color = "rgb(224, 248, 199)";
    zaglavieUchebenPlan.style.color = "rgb(224, 248, 199)";

    intro.style.backgroundColor = "rgb(54, 65, 90)";
    intro.style.color = "rgb(224, 248, 199)";

    interesi.style.backgroundColor = "rgb(54, 65, 90)";
    interesi.style.color = "rgb(224, 248, 199)";

    uchastie.style.backgroundColor = "rgb(54, 65, 90)";
    uchastie.style.color = "rgb(224, 248, 199)";

    btnAdd.style.backgroundColor = "rgb(54, 65, 90)";
    btnAdd.style.borderColor = "rgb(54, 65, 90)";
    btnAdd.style.color = "rgb(224, 248, 199)";

    btnAll.style.backgroundColor = "rgb(54, 65, 90)";
    btnAll.style.borderColor = "rgb(54, 65, 90)";
    btnAll.style.color = "rgb(224, 248, 199)";

    btnActiveGoals.style.backgroundColor = "rgb(54, 65, 90)";
    btnActiveGoals.style.borderColor = "rgb(54, 65, 90)";
    btnActiveGoals.style.color = "rgb(224, 248, 199)";

    btnCompletedGoals.style.backgroundColor = "rgb(54, 65, 90)";
    btnCompletedGoals.style.borderColor = "rgb(54, 65, 90)";
    btnCompletedGoals.style.color = "rgb(224, 248, 199)";

    progressBar.style.accentColor = "rgb(224, 248, 199)";

    document.body.style.backgroundColor = "rgb(32, 39, 52)";
    count = 0;
}

btnAdd.onclick = function()
{
    AddGoal();
}

let celi = [];
let selectedFilter = "all";

function AddGoal()
{
    let txt = txtBox.value.trim();
    if(txt === "")
    {
        alert("Моля въведете цел!");
        return;
    }
    let Duplicate = celi.some(x => x.text.trim().toLowerCase() == txt.toLowerCase());
    if (Duplicate)
    {
        alert("Вече има такава съществуваща цел!");
        return;
    }
    celi.push({text: txt,completed: false});
    txtBox.value = "";
    saveGoals();
    ShowGoals();
}

function ShowGoals()
{
    goalsList.innerHTML = "";

    let total = celi.length;
    let completed = celi.filter(x => x.completed).length;
    let percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    totalCount.textContent = total;
    completedCount.textContent = completed;
    progressPercent.textContent = percent + "%";
    progressBar.value = percent;

    let filteredGoals = celi.filter(x => { if(selectedFilter === "active") return !x.completed; 
        if (selectedFilter === "completed")  return x.completed; 
        return true;
    })

    filteredGoals.forEach((goal, tempIndex) => 
    {
        

        const plan = document.createElement("li");
        plan.style.listStyle = "none";

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = goal.completed;
        checkBox.onclick = () => GoalToggle(tempIndex);
        
        const txtSpan = document.createElement("span");
        txtSpan.textContent = goal.text;

        if (goal.completed)
        {
            txtSpan.style.textDecoration = "line-through";
            txtSpan.style.color = "gray";
        }
        const btnDel = document.createElement("button");
        btnDel.textContent = "Delete";
        btnDel.onclick = function() 
        { 
            let Confirmed = confirm("Найстина ли искате да изтриете тази цел?")
            if (Confirmed) 
            {
                celi.splice(tempIndex, 1);
                saveGoals();
                ShowGoals();
            }

        }
        plan.appendChild(checkBox);
        plan.appendChild(txtSpan);
        plan.appendChild(btnDel);
        goalsList.append(plan);
    })
}

function GoalToggle (index)
{
    celi[index].completed = !celi[index].completed;
    saveGoals();
    ShowGoals();
}

btnAll.onclick = function() 
{
    selectedFilter = "all";
    ShowGoals();
}

btnActiveGoals.onclick = function() 
{
    selectedFilter = "active";
    ShowGoals();
}

btnCompletedGoals.onclick = function() 
{
    selectedFilter = "completed";
    ShowGoals();
}