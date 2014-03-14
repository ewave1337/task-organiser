length = 0;
lastKey = 0;
keys = [];
values = [];
page = 1;

function currentDateString() {
	date = new Date();
	return "" + (date.getMonth() + 1) + "-" + date.getDate() + "-" + (date.getYear() < 200 ? date.getYear() + 1900 : date.getYear()) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function addElem(id, name, description, date, isComplete) {
	var inner = "<span>" + id + "</span> <span>" + name + "</span> <span>" + description + "</span>" +
    "<span>" + date + "</span> <span>" + isComplete + "</span>" +
    "<span><input type='button' value='Edit' onclick='updateTask(\"" + id + "\")'>" +
    "<input type='button' value='Remove' onclick='removeTask(\"" + id + "\")'></span>";

  $('<div class="items" id="' + id + '" draggable>' + inner + '</div>').insertBefore(document.getElementById('add'))
}

function addTask() {
	document.getElementById("add").style.visibility = "visible";
	document.getElementById("whattodo").innerText = "Добавить";
	document.getElementById("id_field").value = "el" + (lastKey + 1);
}

function confirm() {
	id = document.getElementById("id_field").value;
	name = document.getElementById("name_field").value;
	description = document.getElementById("description_field").value;
	isComplete = document.getElementById("complete_field").checked;
	if (!localStorage[id]) {
		date = currentDateString();
		//jsonString = '{"id":"'+ id +'", "name":"' + name +'","description":"' + description + '","date":"'+date+'","iscomplete":"'+isComplete+'"}';
		//localStorage.setItem(id, jsonString);
		addElem(id, name, description, date, isComplete);
		hide();
		length++;
		lastKey++;
	} else {
		if (document.getElementById("date_field").value) {
			//jsonString = '{"id":"'+ id +'","name":"' + name +'","description":"' + description + '","date":"'+document.getElementById("date_field").value +'","iscomplete":"'+isComplete+'"}';
			//localStorage.setItem(id, jsonString);
			el = document.getElementById(id);
			el.innerHTML = "<li>" + id + "</li> <li>" + name + "</li> <li>" + description + "</li> <li>" + document.getElementById("date_field").value + "</li> <li>" + isComplete + "</li> <li><input type='button' value='Edit' onclick='updateTask(\"" + id + "\")'><input type='button' value='Remove' onclick='removeTask(\"" + id + "\")'></li>";
			hide();
		} else
			alert("Нельзя создать новый объект с существующим идентификатором!");
	}
}

function hide() {
	document.getElementById("id_field").value = "";
	document.getElementById("name_field").value = "";
	document.getElementById("description_field").value = "";
	document.getElementById("complete_field").checked = false;
	document.getElementById('add').style.visibility = 'hidden';
}

function removeTask(id) {
	el = document.getElementById(id);
	el.parentNode.removeChild(el);
	//localStorage.removeItem(id);
	length--;
}

function updateTask(id) {
	document.getElementById("add").style.visibility = "visible";
	document.getElementById("whattodo").innerText = "Изменить";
	document.getElementById("id_field").value = id;
	//elem = JSON.parse(localStorage.getItem(id));
	document.getElementById("name_field").value = elem.name;
	document.getElementById("description_field").value = elem.description;
	document.getElementById("date_field").value = elem.date;
	document.getElementById("complete_field").checked = (elem.iscomplete == "true" ? true : false);
}