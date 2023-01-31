console.log("linked")

const submit = document.querySelector("#signin");
const display = document.querySelector("#error-display");
const guest = document.querySelector("#guest");

function signin(event){
    //prevent default form clear
    event.preventDefault();
    //Get values from form
    const nameEl = document.querySelector("#name")
    const emailEl = document.querySelector("#email")
    const usernameEl = document.querySelector("#username")
    const passwordEl = document.querySelector("#password")

    const name = nameEl.value;
    const email = emailEl.value;
    const username = usernameEl.value;
    const password = passwordEl.value;



    const userObj = {
        name: name,
        email: email,
        username: username,
        password: password,
    }

    if(name){
        if(email){
            const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            let emailCheck = emailRegex.test(email)
            if(emailCheck){
                if(username){
                    if(password){
                        localStorage.setItem("user-info", JSON.stringify(userObj))
                        window.location = "./views/journal.html"
                    } else {
                        alert("Please enter a password")
                    }
                } else {
                    alert("Please enter a username")
                }
            } else {
                alert("Please Enter a Valid Email")
            }
        } else {
            alert("Please enter an email")
        }
    } else {
        alert("Please enter a name")
    }

    
}

function guestEntry(){
    const emptyArray = [];
    window.localStorage.setItem("entry-list", emptyArray);
    const emptyObject = "noUser";
    window.localStorage.setItem("user-info",emptyObject)

    window.location = "./views/journal.html"
}

guest.addEventListener("click", guestEntry)
submit.addEventListener("click", signin)