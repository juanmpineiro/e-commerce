function showPassword() {
    var password = document.getElementById('password');
    if (password.type === 'password') {
    password.type = "text";
    }
    else {
    password.type = "password";
    }
}


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login").addEventListener('click', validarFormulario); 
  });
  function validarFormulario(evento) {
    evento.preventDefault();
    var usuario = document.getElementById('user').value;
    if(usuario.length == 0) {
      alert('No has escrito nada en el usuario');
      return;
    }
    var clave = document.getElementById('password').value;
    if (clave.length < 6) {
      alert('La clave no es válida');
      return;
    }
    window.location.replace('inicio.html');
  }

  function setUsername(){
    let username = document.getElementById("user").value
    localStorage.setItem("nombreuser", username)
  }
