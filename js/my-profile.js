let userdata = []

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("userdata").innerHTML = `
    
    <form id="formdata" onsubmit="savedatauser()">
        <div class="container my_border">
            <div class="row">

                <div class="input-group mb-3 image d-flex flex-column justify-content-center align-items-center">
                    <img scr="" id="show_pfp" class="img-fluid img-thumbnail rounded mx-auto d-block pfp_css" height="250" width="250">
                </div>

                <div class="input-group mb-3">
                    <input class="form-control" type="file" id="upload_pfp">
                </div>
                
                <div class="input-group mb-3">
                    <span class="input-group-text" id="style_username">Nombre:</span>
                    <input type="text" class="form-control" id="username" aria-describedby="style_username">
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text" id="style_usersurname">Apellido:</span>
                    <input type="text" id="usersurname" class="form-control" aria-describedby="style_usersurname">
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text" id="style_userbirth">Fecha de nacimiento:</span>
                    <input type="date" id="userbirth" class="form-control" aria-describedby="style_userbirth">
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text" id="style_userphone">Numero de telefono:</span>
                    <input type="number" id="userphone" class="form-control" aria-describedby="style_userphone">
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text" id="style_useremail">Correo electronico:</span>
                    <input type="number" id="useremail" class="form-control" aria-describedby="style_useremail">
                </div>

                <button type="submit" class="btn btn-dark">Guardar</button>
                        

            </div>
        </div>
    </form>
    
    
    `

    /* Guardo los datos del usuario */

    document.getElementById("formdata").addEventListener("submit", function(){
        let name= document.getElementById("username").value;
        let surname = document.getElementById("usersurname").value;
        let birth = document.getElementById("userbirth").value;
        let phone = document.getElementById("userphone").value;
        let email = document.getElementById("useremail").value
        let data4json = {user_name: name, user_surname: surname, user_birth: birth, user_phone: phone, user_email: email}
        let userdata = JSON.stringify(data4json)
        localStorage.setItem("userdatasave", userdata)
    })

    /* Si hay datos previamente guardados los muestra */

    let userdata2 = JSON.parse(localStorage.getItem("userdatasave"))

    document.getElementById("username").value = userdata2.user_name
    document.getElementById("usersurname").value = userdata2.user_surname
    document.getElementById("userbirth").value = userdata2.user_birth
    document.getElementById("userphone").value = userdata2.user_phone
    document.getElementById("useremail").value = userdata2.user_email

    /* Guardo la foto de perfil y la muestro */


    document.getElementById("upload_pfp").addEventListener("change", function(){
        const reader = new FileReader()

        reader.addEventListener("load", function(){
            localStorage.setItem("save_pfp", reader.result)
        })

        reader.readAsDataURL(this.files[0])
    })

    document.getElementById("show_pfp").setAttribute("src", localStorage.getItem("save_pfp"))

});
