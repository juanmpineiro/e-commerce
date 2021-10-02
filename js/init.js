const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){


});



document.getElementById("nav").innerHTML =`
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="inicio.html">Inicio <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="categories.html">Categorias</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="products.html">Productos</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="sell.html">Vender</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="cart.html">Mi carrito</a>
          </li>

      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle bg-dark" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ${localStorage.getItem("nombreuser")}
        </button>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="nav-link" href="#" style="color: black;">Mi perfil</a>
          <a class="nav-link" href="cart.html" style="color: black;">Mi carrito</a>
          <a class="nav-link" href="index.html" style="color: black;" onclick="" id="closeuser">Cerrar sesión</a>
        </div>
      </div>

        </ul>
      </div>
    </nav>
`

document.getElementById("closeuser").addEventListener("click", function(){
  localStorage.clear("nombreuser")
})

function username(){
  if(localStorage.getItem("nombreuser")=== null){
    location.href="index.html"
  }
  else{
    return localStorage.getItem("nombreuser")
  }
}

document.addEventListener("DOMContentLoaded", function(){
  username()
})
