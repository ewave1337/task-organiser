length = 0;
lastKey = 0;
keys = [];
values = [];
page = 1;

function currentDateString() {
	var date = new Date();
	return "" + (date.getMonth() + 1) + "-" + date.getDate() + "-" + (date.getYear() < 200 ? date.getYear() + 1900 : date.getYear()) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function addElem(id, name, description, date, isComplete) {
	var inner = "<span>" + id + "</span> <span>" + name + "</span> <span>" + description + "</span> " +
    "<span>" + date + "</span> <span>" + isComplete + "</span> " +
    "<span><input type='button' value='Edit' onclick='updateTask(\"" + id + "\")'>" +
    "<input type='button' value='Remove' onclick='removeTask(\"" + id + "\")'></span>";

  $('<div class="items" id="' + id + '" draggable>' + inner + '</div>').insertBefore(document.getElementById('add'))
}

$(document).ready(function () {
	$('#newtask').on("click", function () {
		$('#add').css("visibility", "visible");
		$('#whattodo').text("Добавить");
		$('id_field').val("el" + (lastKey + 1));
	});

	$('#confirm').on("click", function () {
		id = $("#id_field").val();
		name = $("#name_field").val();
		description = $("#description_field").val();
		isComplete = $("#complete_field").prop("checked");
		if (/*!localStorage[id]*/ true) {
			date = currentDateString();
			//jsonString = '{"id":"'+ id +'", "name":"' + name +'","description":"' + description + '","date":"'+date+'","iscomplete":"'+isComplete+'"}';
			//localStorage.setItem(id, jsonString);
			addElem(id, name, description, date, isComplete);
			hide();
			length++;
			lastKey++;
		} 
	});

	$('#hide').on("click", hide());
});

/*function confirm() {
	id = document.getElementById("id_field").value;
	name = document.getElementById("name_field").value;
	description = document.getElementById("description_field").value;
	isComplete = document.getElementById("complete_field").checked;
	if (/*!localStorage[id]*/ /*true) {
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
			el.innerHTML = "<span>" + id + "</span> <span>" + name + "</span> <span>" + description + "</span> <span>" + document.getElementById("date_field").value + "</span> <span>" + isComplete + "</span> <span><input type='button' value='Edit' onclick='updateTask(\"" + id + "\")'><input type='button' value='Remove' onclick='removeTask(\"" + id + "\")'></span>";
			hide();
		} else
			alert("Нельзя создать новый объект с существующим идентификатором!");
	}
}*/

function hide() {
	$("#id_field").val("");
	$("#name_field").val("");
	$("#description_field").val();
	$("#complete_field").prop("checked", false);
	$('#add').css("visibility", "hidden");
}

function removeTask(id) {
	//localStorage.removeItem(id);
	$("#" + id).remove();
	length--;
}

function updateTask(id) {
	$('#add').css("visibility", "visible");
	$("#whattodo").text("Изменить");
	$("#id_field").val(id);
	//elem = JSON.parse(localStorage.getItem(id));
	$("#name_field").val(elem.name);
	$("#description_field").val(elem.description);
	$("#date_field").val(elem.date);
	$("#complete_field").prop("checked", (elem.iscomplete == "true" ? true : false);
}