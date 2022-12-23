let date, name, text, item, nothing,phone,type,balance;
let retainedData = {};
let items = window.localStorage.getItem("items");
let itemIdentified;
let createBtn = document.getElementById("submit-btn");
let transact=document.getElementById("transactions-table");
let bal=0;
let acc=[];
date = document.getElementById("date");
name = document.getElementById("text");
number = document.getElementById("number");
phone=document.getElementById("phone");      //added
type=document.getElementById("type");//added

nothing = document.getElementsByClassName("nothing")[0];
display = document.getElementsByClassName("show")[0];



//storing the value of the transaction mode
let mode=type.options[type.selectedIndex].value;
console.log(mode);




window.addEventListener("load", (event) => {
	seeItems();
});
window.addEventListener("reload", (event) => {
	seeItems();
});

createBtn.addEventListener("click", function () {
	addData();
	window.location.reload();
});

function readItem(m) {
	item = items.filter((element, index) => element === items[m])[0];
	date.value = item.date;
	number.value = item.number;
//	balance.value=bal;
	name.value = item.name;
	phone.value=item.phone;
	type.options[type.selectedIndex].value=item.type;
}
function updateItem(m) {
	item.date = date.value;
	item.number = number.value;
	//item.balance=balance.value;
	item.name = name.value;
	item.phone=phone.value;
	item.type=type.options[type.selectedIndex].value;

	items = items.filter((element, index) => {
		if (element === items[m]) {
			items[m] = { ...items[m], ...item };
		}
		return items;
	});
	window.localStorage.setItem("items", JSON.stringify(items));

	//force relaod after update
	window.location.reload();
}
function deleteItem(m) {
	items = items.filter((element, index) => element !== items[m]);

	console.log(items.length);

	window.localStorage.setItem("items", JSON.stringify(items));

	//force relaod after delete
	window.location.reload();
}
function seeItems() {
	let entry1,entry2,entry3,entry4,entry5,entry6,entry7;
	items = JSON.parse(window.localStorage.getItem("items"));
	if (items && items.length != 0) {
		nothing.style.visibility = "hidden";
		// for (let i = 0; i < items.length; i++) {
		// 	display.appendChild(item);
		// }
		for (let i = 0; i < items.length; i++) {
			//button variables
			let deleteBtn, readBtn, updateBtn;

			//creating div contents

			let item = document.createElement("div");
			item.setAttribute('class',"item");
			let itemInfo = document.createElement("div");
			let itemActions = document.createElement("div");

			//adding classes to divs

			itemInfo.setAttribute("class", "info");
			itemInfo.setAttribute("class", `${items[i]}`);

			itemActions.setAttribute("class", "actions");

			deleteBtn = document.createElement("button");
			deleteBtn.textContent = "Delete";
			deleteBtn.setAttribute("class", "deleteBtn");

			deleteBtn.addEventListener("click", function () {
				deleteItem(i);
			});

			readBtn = document.createElement("button");
			readBtn.textContent = "Read";
			readBtn.setAttribute("class", "readBtn");

			readBtn.addEventListener("click", function () {
				readItem(i);
			});

			updateBtn = document.createElement("button");
			updateBtn.textContent = "Update";
			updateBtn.setAttribute("class", "updateBtn");

			updateBtn.addEventListener("click", function () {
				updateItem(i);
			});

			//appending buttons to the parent div

			itemActions.appendChild(deleteBtn);
			itemActions.appendChild(readBtn);
			itemActions.appendChild(updateBtn);

			// item.appendChild(itemInfo);
			// item.appendChild(itemActions);

			//appending the div to show div

			//display.appendChild(item);
			item.setAttribute("id", `${i}`);

			// for (let i = 0; i < 4; i++) {
				//let p = document.createElement("p");
				let row=transact.insertRow(-1);

				//Adding new elements in the table
				 entry1=row.insertCell(0);
				 entry2=row.insertCell(1);
				 entry3=row.insertCell(2);
				 entry4=row.insertCell(3);
				 entry5=row.insertCell(4);
				 entry6=row.insertCell(5);
				 entry7=row.insertCell(6);
				
								// itemInfo.appendChild(p);
			// }
//itemInfo.getElementsByTagName("td")[0].innerHTML=items[i].date;

entry1.innerText=items[i].date;
entry2.innerText=items[i].number;
//entry3.innerText=status(item[i].balance);
entry4.innerText='User';
entry5.innerText='Receiver';
entry6.innerText=items[i].type;
entry7.appendChild(itemActions);
//itemInfo.getElementsByTagName("td")[2].innerHTML=items[i].phone;
//itemInfo.getElementsByTagName("td")[3].innerHTML=items[i].number;
//itemInfo.getElementsByTagName("td")[4].innerHTML=items[i].type;
			// itemInfo.getElementsByTagName("p")[0].innerHTML = items[i].name;
			// itemInfo.getElementsByTagName("p")[1].innerHTML = items[i].number;
			// itemInfo.getElementsByTagName("p")[2].innerHTML = items[i].date;

			console.log(items[i]);
		}
	}
}


function status(balc) {
	if(mode=="incoming"){
		balc=balc+number.value;
	}
	else{
      balc=balc-number.value;
	}
	acc.push(bal);
	acc.push(number);
return acc;
}

function addData() {
	retainedData.name = name.value;
	retainedData.date = date.value;
	retainedData.number = number.value;
	retainedData.type = type.options[type.selectedIndex].value;
	retainedData.phone = phone.value;
    //retainedData.balance=status(retainedData.number)[0];

	

	if (window.localStorage.getItem("items")) {
		items = JSON.parse(window.localStorage.getItem("items"));
		console.log("items", items);
		items.push(retainedData);
		localStorage.setItem("items", JSON.stringify(items));

		//resetting the form
		name.value = "";
		date.value = "";
		number.value = "";
		phone.value="";
		type.options[type.selectedIndex].value="";
	} else {
		localStorage.setItem("items", JSON.stringify([retainedData]));
	}
}
