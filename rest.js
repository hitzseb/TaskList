function rowTrash(){
    let trash_tag = document.createElement("button");
    trash_tag.classList.add("far","fa-trash-alt");
    let element = document.getElementById("row");
    element.appendChild(trash_tag);
}

function addTask(){
    let div_tag = document.createElement("div");
    let name_tag = document.createElement("p");
    let date_tag = document.createElement("p");
    div_tag.classList.add("row");
    name_tag.classList.add("h3");
    date_tag.classList.add("h5");
    let name_txt = document.getElementById("name").value;
    let date_txt = document.getElementById("date").value;
    let name = document.createTextNode(name_txt);
    let date = document.createTextNode(date_txt);
    name_tag.appendChild(name);
    date_tag.appendChild(date);
    div_tag.appendChild(name_tag);
    div_tag.appendChild(date_tag);
    let element = document.getElementById("list");
    element.appendChild(div_tag);
    let httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", 'http://localhost:8080/new', true);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(JSON.stringify({name:name_txt, date:date_txt}));
    location.reload();
}

function listTask(){
    let httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", 'http://localhost:8080/all');
    httpRequest.send();
    httpRequest.onload=function(){
        let data = JSON.parse(httpRequest.responseText);
        for(let i=0;i<data.length;i++){
            let div_tag = document.createElement("div");
            let name_tag = document.createElement("p");
            let trash_tag = document.createElement("i");
            let date_tag = document.createElement("p");
            div_tag.classList.add("row");
            name_tag.classList.add("h3");
            trash_tag.classList.add("far","fa-trash-alt");
            date_tag.classList.add("h5");
            let name = document.createTextNode(data[i]["name"]);
            let date = document.createTextNode(data[i]["date"]);
            name_tag.appendChild(name);
            date_tag.appendChild(date);
            div_tag.appendChild(name_tag);
            div_tag.appendChild(trash_tag);
            div_tag.appendChild(date_tag);
            let element = document.getElementById("list");
            element.appendChild(div_tag);
        }
    }
}