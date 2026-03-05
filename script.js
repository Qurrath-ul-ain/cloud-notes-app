// Firebase configuration (your config)
var firebaseConfig = {
  apiKey: "AIzaSyCD6UObkyVgmojAMgIXGJBGC2CCLJTz86I",
  authDomain: "cloud-notes-app-85783.firebaseapp.com",
  projectId: "cloud-notes-app-85783",
  storageBucket: "cloud-notes-app-85783.firebasestorage.app",
  messagingSenderId: "1041636035599",
  appId: "1:1041636035599:web:f7d44d2806338e5fbbe77a",
  measurementId: "G-QKMSGH6YYH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();


// ADD NOTE
function addNote(){

let note = document.getElementById("noteInput").value;

if(note.trim() === ""){
alert("Write something first");
return;
}

db.collection("notes").add({
text: note
});

document.getElementById("noteInput").value="";

loadNotes();
}



// LOAD NOTES
function loadNotes(){

let list = document.getElementById("notesList");
list.innerHTML="";

db.collection("notes").get().then((querySnapshot)=>{

querySnapshot.forEach((doc)=>{

let li = document.createElement("li");

li.innerHTML = `
${doc.data().text}
<br><br>
<button onclick="editNote('${doc.id}','${doc.data().text}')">Edit</button>
<button onclick="deleteNote('${doc.id}')">Delete</button>
`;

list.appendChild(li);

});

});

}



// DELETE NOTE
function deleteNote(id){

db.collection("notes").doc(id).delete();

loadNotes();

}



// EDIT NOTE
function editNote(id, oldText){

let newText = prompt("Edit your note:", oldText);

if(newText){

db.collection("notes").doc(id).update({
text: newText
});

loadNotes();

}

}


loadNotes();