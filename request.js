function addTask(){
    let name_txt = document.getElementById("name").value;
    let date_txt = document.getElementById("date").value;
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
            let name = document.createTextNode(data[i]["name"]);
            let date = document.createTextNode(data[i]["date"]);
            let div_tag = document.createElement("div");
            let name_tag = document.createElement("p");
            let trash_tag = document.createElement("i");
            let date_tag = document.createElement("p");
            div_tag.classList.add("row");
            name_tag.classList.add("h3");
            trash_tag.id = data[i]["id"];
            trash_tag.classList.add("far","fa-trash-alt");
            trash_tag.setAttribute("onclick", "delTask(this.id)");
            date_tag.classList.add("h5");
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

function delTask(clicked_id){
    mainurl = 'http://localhost:8080/del/'
    suburl = clicked_id
    let url = mainurl+suburl;
    let httpRequest = new XMLHttpRequest();
    httpRequest.open("DELETE", url);
    httpRequest.send(null);
    location.reload();
}