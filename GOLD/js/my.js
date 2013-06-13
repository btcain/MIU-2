//Filter Function
if (localStorage.length <= 1) {
    var myJSON = confirm("Would you like to create sample signees?");
    if (myJSON === true) {

        for (var i = 0; i < objItems.length; i++) {
            localStorage.setItem(objItems[i].id, JSON.stringify(objItems[i]));
        }
    } else {
        alert("Ok, I won't add any signees for you.");
    }
}




var CMS = {
    pHead: document.getElementById("petitionHead").innerText,
    pContent: document.getElementById("petitionMain").innerText,
}


if (localStorage.getItem("petition") === null) {
    var petition = {
        name: "My Petition",
        content: "This is your petition! Make sure you add lots of details about what you're standing for, so others are encouraged to sign. You can edit the contents of this petition in the Settings menu from the home page!",
        sNeeded: 10000,
        sVal: 0
    }

    localStorage.setItem("petition", JSON.stringify(petition));
    console.log(petition);
} else {
    var loader = JSON.parse(localStorage.getItem("petition"));
    console.log(loader);
    console.log("It's reading this!");
    document.getElementById("petitionHead").innerText = loader.name;
    document.getElementById("petitionMain").innerText = loader.content;
}

function updatr() {
    var nPetition = {
        name: document.getElementById("pTitle").value,
        content: document.getElementById("pDetails").value,
        sNeeded: document.getElementById("maxSign").value,
        sVal: 0
    }
    var c = confirm("Warning! Changing the petition will delete all of your current signatures. Are you sure you wish to continue?");

    if (c === true) {
        localStorage.clear();
        localStorage.setItem("petition", JSON.stringify(nPetition));

        document.getElementById("petitionHead").innerText = nPetition.name;
        document.getElementById("petitionMain").innerText = nPetition.content;
    }

    caller();
    console.log(localStorage);
    console.log(nPetition);
}


function signMe() {
    var nSign = {
        id: localStorage.length,
        name: document.getElementById("pName").value,
        address: document.getElementById("pAddress").value,
        email: document.getElementById("pEmail").value,
        phone: document.getElementById("pPhone").value,
        feel: document.getElementById("pFeel").value,
        agree: document.getElementById("pAgree").value
    }
    localStorage.setItem(nSign.id, JSON.stringify(nSign));
    console.log(localStorage);
    console.log(nSign);
    caller();
}

function caller() {
    var nPetition = {
        name: document.getElementById("pTitle"),
        content: document.getElementById("pDetails"),
        sNeeded: document.getElementById("maxSign"),
        sVal: 0
    }
    var loader = JSON.parse(localStorage.getItem("petition"));

    nPetition.name.value = loader.name;
    nPetition.content.value = loader.content;
    nPetition.sNeeded.value = loader.sNeeded;

    document.getElementById("signers").innerHTML = "";


    if (localStorage.length === 1) {
        document.getElementById("signers").innerHTML = "<p>No one has signed yet!</p>";
    } else {
        for (var i = 0, j = localStorage.length; i < j; i++) {
            var container = document.getElementById("signers");
            var homeSign = document.getElementById("homeSign");
            var key = localStorage.key(i);
            if (!(key === "petition")) {
                var retrievedObject = localStorage.getItem(key);
                container.innerHTML = (container.innerHTML + ("<li id='" + JSON.parse(retrievedObject).id + "'><h3>" + JSON.parse(retrievedObject).name + "</h3>" + "<br><p>" + "Address: " + JSON.parse(retrievedObject).address + "<br>" + "Email: " + JSON.parse(retrievedObject).email + "<br>" + "Phone: " + JSON.parse(retrievedObject).phone + "<br>" + "Feel" + JSON.parse(retrievedObject).feel + "<br></p></li>"));
                homeSign.innerHTML = (container.innerHTML + ("<li id='" + JSON.parse(retrievedObject).id + "'><h3>" + JSON.parse(retrievedObject).name + "</h3>" + "<br><p>" + "Address: " + JSON.parse(retrievedObject).address + "<br>" + "Email: " + JSON.parse(retrievedObject).email + "<br>" + "Phone: " + JSON.parse(retrievedObject).phone + "<br>" + "Feel" + JSON.parse(retrievedObject).feel + "<br></p></li>"));
            }
        }
    }
}


window.onload = caller();