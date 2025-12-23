
// ================== DOM ==================
var addContact = document.getElementById("add-contact");
var bghk = document.querySelector(".bghk");
var cancelBtn = document.querySelector(".cancel-btn");
var cancelBtnID = document.getElementById("cancel-btn");

var contactName = document.getElementById("contactName");
var contactPhone = document.getElementById("contactPhone");
var contactEmail = document.getElementById("contactEmail");
var contactAddress = document.getElementById("contactAddress");
var contactGroup = document.getElementById("contactGroup");
var contactNotes = document.getElementById("contactNotes");
var noContactsMessage = document.getElementById("no-contacts-message");
var statInfo = document.querySelector(".stat-info");
var starInfo = document.querySelector(".star-info");
var heartInfo = document.querySelector(".heart-info");

var heartPhone = document.querySelector(".heart-phone");
var starPhone = document.querySelector(".star-phone");

var saveContact = document.getElementById("Save-Contact");
var rowContact = document.getElementById("rowContact");
var searchInput = document.getElementById("searchInput");


var ArrContacts = JSON.parse(localStorage.getItem("Contacts")) || [];
var ArrHeart = JSON.parse(localStorage.getItem("heart")) || [];
var ArrStar = JSON.parse(localStorage.getItem("star")) || [];

searchInput.addEventListener("input", function() {
    displayContacts(searchInput);
});

function updateNoContactsMessage() 
{
  if (ArrContacts.length === 0) {
    noContactsMessage.classList.remove("d-none"); 
  } else {
    noContactsMessage.classList.add("d-none"); 
  }
}

function ErrorMessage() { 
  Swal.fire({
  icon: "error",
  title: "Missing Name",
  text: "Please enter a name for the contact!",
  footer: '<a href="#">Why do I have this issue?</a>'
  });
}


function Total() {
  statInfo.innerHTML = `
    <h6>Total</h6>
    <h3>${ArrContacts.length}</h3>
  `;
}
function heartCount() {
  heartInfo.innerHTML = `
    <h6>Emergency</h6>
    <h3>${ArrHeart.length}</h3>
  `;
}
function starCount() {
  starInfo.innerHTML = `
    <h6>Favorites</h6>
    <h3>${ArrStar.length}</h3>
  `;
}


function closeModal() {
  bghk.classList.add("d-none");
}
cancelBtn.addEventListener("click", closeModal);
cancelBtnID.addEventListener("click", closeModal);



addContact.addEventListener("click", function () {
  bghk.classList.remove("d-none");
});
saveContact.addEventListener("click", function () {
  addNewContact();
});



function displayHeart() {
  var cartona = "";
  for (var i = 0; i < ArrHeart.length; i++) { 
    cartona += `
      <div class="d-flex align-items-center mb-3">
        <div class="name-harf rounded-3 text-white d-flex align-items-center justify-content-center me-3">
          ${ArrHeart[i].name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h5 class="mb-0 fw-bold">${ArrHeart[i].name}</h5>
          <div class="text-secondary d-flex align-items-center">
            <span class="span-phone d-flex justify-content-center align-items-center me-1">
              <i class="fa-solid fa-phone"></i>
            </span>
            <span>${ArrHeart[i].phone}</span>
          </div>
        </div>
      </div>
    `;
  }
  heartPhone.innerHTML = cartona || "<p>No emergency contacts</p>";
}
function displayStar() {
  var cartona = "";
  for (var i = 0; i < ArrStar.length; i++) {
    cartona += `
      <div class="d-flex align-items-center mb-3">
        <div class="name-harf rounded-3 text-white d-flex align-items-center justify-content-center me-3">
          ${ArrStar[i].name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h5 class="mb-0 fw-bold">${ArrStar[i].name}</h5>
          <div class="text-secondary d-flex align-items-center">
            <span class="span-phone me-1">
              <i class="fa-solid fa-phone"></i>
            </span>
            <span>${ArrStar[i].phone}</span>
          </div>
        </div>
      </div>
    `;
  }
  starPhone.innerHTML = cartona || "<p>No favorites yet</p>";
}
function displayContacts(element) {
  var element = element ? element.value : "";
  var cartona = "";
  for (var i = 0; i < ArrContacts.length; i++) {

    var emailMatch = ArrContacts[i].email.toLowerCase().includes(element.toLowerCase());
    var phoneMatch= ArrContacts[i].phone.toLowerCase().includes(element.toLowerCase());
    var nameMatch = ArrContacts[i].name.toLowerCase().includes(element.toLowerCase());
    
    if (nameMatch || phoneMatch || emailMatch) {
      cartona += `
      <div class="col-md-6">
        <div class="card p-3 shadow-sm" style="max-width: 350px;">
          <div class="d-flex align-items-center mb-3">
            <div class="name-harf rounded-3 text-white d-flex align-items-center justify-content-center me-3">
              ${ArrContacts[i].name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h5 class="mb-0 fw-bold">${ArrContacts[i].name}</h5>
              <div class="text-secondary d-flex align-items-center">
                <span class="span-phone d-flex justify-content-center align-items-center me-1">
                  <i class="fa-solid fa-phone"></i>
                </span>
                <span>${ArrContacts[i].phone}</span>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <div class="d-flex align-items-center mb-2">
              <span class="envelope d-flex justify-content-center align-items-center me-1">
                <i class="fa-solid fa-envelope"></i>
              </span>
              <span>${ArrContacts[i].email}</span>
            </div>
            <div class="d-flex align-items-center mb-2">
              <span class="span-location d-flex justify-content-center align-items-center me-1">
                <i class="fa-solid fa-location-dot"></i>
              </span>
              <span>${ArrContacts[i].address}</span>
            </div>
          </div>
          <span class="School badge text-dark p-2 rounded-3 fw-normal mb-3">${ArrContacts[i].group}</span>
          <hr class="my-0">
          <div class="d-flex align-items-center pt-3">
            <a href="#" class="btn rounded-circle d-flex align-items-center justify-content-center me-3 icon-phone">
              <span><i class="fa-solid fa-phone"></i></span>
            </a>
            <a href="#" class="btn rounded-circle d-flex align-items-center justify-content-center me-3 icon-mail">
              <span><i class="fa-solid fa-envelope"></i></span>
            </a>
            <div class="ms-auto d-flex align-items-center text-secondary action-icons">
              <span class="mx-1">
                <i class="fa-star ${ArrContacts[i].star ? 'fa-solid text-warning' : 'fa-regular'}" onclick="toggleStar(${i})"></i>
              </span>
              <span class="mx-1">
                <i class="fa-heart ${ArrContacts[i].heart ? 'fa-solid text-danger' : 'fa-regular'}" onclick="toggleHeart(${i})"></i>
              </span>
              <span class="mx-1">
  <i class="fa-solid fa-pencil" onclick="setFormForUpdate(${i})"></i></span>
              <span class="mx-1"><i class="fa-solid fa-trash-can" onclick="deleteContact(${i})"></i></span>
            </div>
          </div>
        </div>
      </div>
    `;
    }
  }
      rowContact.innerHTML = cartona;
}


function toggleStar(index) {
  ArrContacts[index].star = !ArrContacts[index].star;

  if (ArrContacts[index].star) {
    ArrStar.push(ArrContacts[index]);
    starCount();
  } else {
    var phone_contact = ArrContacts[index].phone;

    for (var i = 0; i < ArrStar.length; i++) {
      if (ArrStar[i].phone === phone_contact) {
        ArrStar.splice(i, 1);
        starCount();
        break;
      }
    }
  }

  localStorage.setItem("Contacts", JSON.stringify(ArrContacts));
  localStorage.setItem("star", JSON.stringify(ArrStar));

  displayContacts();
  displayStar() 
}
function toggleHeart(index) {
  ArrContacts[index].heart = !ArrContacts[index].heart;
  if (ArrContacts[index].heart) {
    ArrHeart.push(ArrContacts[index]);
    heartCount();
  } else {
    var phone_contact = ArrContacts[index].phone;
    for (var i = 0; i < ArrHeart.length; i++) {
      if (ArrHeart[i].phone === phone_contact) {
        ArrHeart.splice(i, 1);
        heartCount();
        break;
      }
    }
  }
  localStorage.setItem("Contacts", JSON.stringify(ArrContacts));
  localStorage.setItem("heart", JSON.stringify(ArrHeart));
  displayContacts();
  displayHeart();
}


var currentIndex = null;
function setFormForUpdate(index) {
  currentIndex = index;

  contactName.value = ArrContacts[index].name;
  contactPhone.value = ArrContacts[index].phone;
  contactEmail.value = ArrContacts[index].email;
  contactAddress.value = ArrContacts[index].address;
  contactGroup.value = ArrContacts[index].group;
  contactNotes.value = ArrContacts[index].notes;

  bghk.classList.remove("d-none");
}
function addNewContact() {
  if (
    !validateAllInputs(contactName) ||
    !validateAllInputs(contactPhone) ||
    !validateAllInputs(contactEmail) ||
    !validateAllInputs(contactAddress) ||
    !validateAllInputs(contactNotes)
  ) {
    ErrorMessage();
    return;
  }
  if (currentIndex === null) {
    var newContact = {
      name: contactName.value,
      phone: contactPhone.value,
      email: contactEmail.value,
      address: contactAddress.value,
      group: contactGroup.value,
      notes: contactNotes.value,
      heart: false,
      star: false,
    };
    for (var i = 0; i < ArrContacts.length; i++) {
      if (ArrContacts[i].phone === newContact.phone) {
        ErrorMessage();
        return;
      }
    }
    ArrContacts.push(newContact);
      Swal.fire({
  title: "Drag me!",
  icon: "success",
  draggable: true
});
  }
    else {
      ArrContacts[currentIndex].name = contactName.value;
      ArrContacts[currentIndex].phone = contactPhone.value;
      ArrContacts[currentIndex].email = contactEmail.value;
      ArrContacts[currentIndex].address = contactAddress.value;
      ArrContacts[currentIndex].group = contactGroup.value;
      ArrContacts[currentIndex].notes = contactNotes.value;

      for (var i = 0; i < ArrStar.length; i++) {
        if (ArrStar[i].phone === ArrContacts[currentIndex].phone) {
          ArrStar[i] = ArrContacts[currentIndex];
        }
      }

      for (var i = 0; i < ArrHeart.length; i++) {
        if (ArrHeart[i].phone === ArrContacts[currentIndex].phone) {
          ArrHeart[i] = ArrContacts[currentIndex];
        }
      }

    currentIndex = null;
          Swal.fire({
  title: "Updated!",
  icon: "success",
  draggable: true
});
    }


  localStorage.setItem("Contacts", JSON.stringify(ArrContacts));
  localStorage.setItem("star", JSON.stringify(ArrStar));
  localStorage.setItem("heart", JSON.stringify(ArrHeart));


  clearForm();
  closeModal();
  displayContacts();
  displayStar() 
  displayHeart();
  Total();
  starCount();
  heartCount();
  updateNoContactsMessage();
}

function clearForm() {

  contactName.value = "";
  contactPhone.value = "";
  contactEmail.value = "";
  contactAddress.value = "";
  contactGroup.value = "";
  contactNotes.value = "";


contactName.classList.remove( "is-valid");
contactPhone.classList.remove( "is-valid");
contactEmail.classList.remove( "is-valid");
contactAddress.classList.remove( "is-valid");
contactGroup.classList.remove( "is-valid");
contactNotes.classList.remove( "is-valid");

}

function deleteContact(index) {
  var phone = ArrContacts[index].phone;
  ArrContacts.splice(index, 1);
  ArrStar = ArrStar.filter(c => c.phone !== phone);
  ArrHeart = ArrHeart.filter(c => c.phone !== phone);
  localStorage.setItem("Contacts", JSON.stringify(ArrContacts));
  localStorage.setItem("star", JSON.stringify(ArrStar));
  localStorage.setItem("heart", JSON.stringify(ArrHeart));

  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});

  updateNoContactsMessage();
  displayContacts();
  displayStar() 
  displayHeart();
  Total();
  starCount();
  heartCount();

}

function validateAllInputs(element) { 
  var text = element.value;
  var regex = {
    contactName: /^[a-zA-Z\s]{3,}$/,
    contactPhone: /^01[0-2,5]{1}[0-9]{8}$/,
    contactEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    contactAddress: /^.{5,}$/,
    contactNotes: /^.{0,}$/,  
  }
  if (regex[element.id].test(text)) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    return false;
  }
}

displayContacts();
displayHeart();
displayStar() 
Total();
starCount();
heartCount();
updateNoContactsMessage();


