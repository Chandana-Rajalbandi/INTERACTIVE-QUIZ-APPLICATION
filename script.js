function register() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please enter both name and password");
    return;
  }

  localStorage.setItem("username", username);
  localStorage.setItem("password", password);
  alert("Registered successfully! You can now login.");
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  const storedUser = localStorage.getItem("username");
  const storedPass = localStorage.getItem("password");

  if (username === storedUser && password === storedPass) {
    window.location.href = "home.html";
  } else {
    alert("Incorrect username or password");
  }
}