var listaAutos = []

// Función que muestra cada producto de la lista.
function showProductList(){
    let htmlContentToAppend = "";
    for (let i = 0; i < listaAutos.length; i++) {


        // Codigo HTML para cada producto de la lista.     
        htmlContentToAppend += `
        <div class="container mt-5 mb-5 col-md-10">
            <div class="row p-2 bg-white border rounded">
                <div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image" src="`+listaAutos[i].imgSrc +`"></div>
                <div class="col-md-6 mt-1">
                    <h5>`+listaAutos[i].name +`</h5>
                    <div class="mt-1 mb-1 spec-1"><span>`+listaAutos[i].description +`</span></div>
                    <br><br>
                </div>
                <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                    <div class="d-flex flex-row align-items-center">
                        <h4 class="mr-1">$`+listaAutos[i].cost +`</h4>
                    </div>
                    <div class="d-flex flex-column mt-4"><button class="btn btn-primary btn-sm" type="button">Detalles</button>
                    <button class="btn btn-outline-primary btn-sm mt-2" type="button">Añadir al carrito</button></div>
                </div>
            </div>
        </div>    
        `

    }
        document.getElementById("listaproductos").innerHTML = htmlContentToAppend;
    }


// Cuando la página termina de cargar se ejecuta y muestra lo primero que vemos cuando entramos
// lo muestra en orden alfabético.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            listaAutos = resultObj.data;
            showProductList()

        } 
    }   
    )})