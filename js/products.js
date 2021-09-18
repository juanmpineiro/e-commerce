var listaAutos = []
var minPrice = undefined
var maxPrice = undefined
const order_by_minor_price = "1.9"
const order_by_major_price = "9.1"
const order_by_relevance = "rel"
const busqueda = "buscar"
var currentProductArray = []
var currentSortCriteria = undefined
//Buscador
const buscador_texto = document.querySelector("#buscador_texto")
const buscador_boton = document.querySelector("#buscador_boton")
const filtrado = document.querySelector('#listaproductos')

function sortProducts(criteria, array){
    let result = []
    if(criteria === order_by_minor_price){
        result = array.sort(function(a, b) {
            if (a.cost < b.cost){return -1}
            if (a.cost > b.cost){return 1}
            return 0;
        });
    }
    else if(criteria === order_by_major_price){
        result = array.sort(function(a, b) {
            if (a.cost < b.cost){ return 1}
            if (a.cost > b.cost){ return -1}
            return 0;
        });
    }
    else if(criteria === order_by_relevance){
        result = array.sort(function(a, b) {
            if (a.soldCount < b.soldCount){return 1}
            if (a.soldCount > b.soldCount){ return -1}
            return 0;
        });
    }
    return result
}





// Función que muestra cada producto de la lista.
function showProductList(){
    let htmlContentToAppend = "";
    for (let i = 0; i < listaAutos.length; i++) {
        let product = listaAutos[i]


        // Filtra los productos por precio.
        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))){

        
        
        // Codigo HTML para cada producto de la lista.     
        htmlContentToAppend += `
        <div class="container mt-5 mb-5 col-md-10">
            <div class="row p-2 bg-white border rounded">
                <div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image" src="`+product.imgSrc +`"></div>
                <div class="col-md-6 mt-1">
                    <h5>`+product.name +`</h5>
                    <div class="mt-1 mb-1 spec-1"><span>`+product.description +`</span></div>
                    <br><br>
                </div>
                <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                    <div class="d-flex flex-row align-items-center">
                        <h4 class="mr-1">$`+product.cost +`</h4>
                    </div>
                    <div class="d-flex flex-column mt-4"><a class="btn btn-primary btn-sm" type="button" href="product-info.html">Detalles</a>
                    <a class="btn btn-outline-primary btn-sm mt-2" type="button" href="">Añadir al carrito</a></div>
                </div>
            </div>
        </div>    
        `
        }
        document.getElementById("listaproductos").innerHTML = htmlContentToAppend;

    }
        
    }


// Función que filtra y luego muestra la lista.
function sortAndShowProducts(sortCriteria, productArray){

    currentSortCriteria = sortCriteria;

    if(productArray != undefined){
        currentProductArray = productArray;
    }

    currentProductArray = sortProducts(currentSortCriteria, currentProductArray);


    showProductList();
}


// Cuando la página termina de cargar se ejecuta y muestra lo primero que vemos cuando entramos
// lo muestra en orden alfabético.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            listaAutos = resultObj.data;
            sortAndShowProducts(order_by_minor_price, resultObj.data)

        }
    });

document.getElementById("rangeFilterPrice").addEventListener("click", function(){
        

    minPrice = document.getElementById("rangeFilterPriceMin").value;
    maxPrice = document.getElementById("rangeFilterPriceMax").value;

    if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
        minPrice = parseInt(minPrice);
    }
    else{
        minPrice = undefined;
    }

    if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
        maxPrice = parseInt(maxPrice);
    }
    else{
        maxPrice = undefined;
    }

    showProductList();
});

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterPriceMin").value = "";
    document.getElementById("rangeFilterPriceMax").value = "";

    minPrice = undefined
    maxPrice = undefined

    showProductList();
});

// Detecta cuando hacemos click en el botón y ejecuta la funcion 'sortAndShowProducts' con el filtro que hayamos elegido.
    document.getElementById("sortByPriceAsc").addEventListener("click", function(){
    sortAndShowProducts(order_by_minor_price, listaAutos);
});

    document.getElementById("sortByPriceDesc").addEventListener("click", function(){
    sortAndShowProducts(order_by_major_price, listaAutos);
});

    document.getElementById("sortByRelevance").addEventListener("click", function(){
    sortAndShowProducts(order_by_relevance, listaAutos);
});
    
    document.getElementById("buscador_boton").addEventListener("click", filtrar)
})

const filtrar = () =>{
    const texto = document.getElementById("buscador_texto").value.toLowerCase()
    for (let producto of listaAutos){
        const names = producto.name.toLowerCase()
        if(document.getElementById("buscador_texto").value === ''){
            sortAndShowProducts(order_by_minor_price, listaAutos)
        }
        if(names.indexOf(texto) !== -1 && document.getElementById("buscador_texto").value !== ''){
            document.getElementById("listaproductos").innerHTML = `
            <div class="container mt-5 mb-5 col-md-10">
                <div class="row p-2 bg-white border rounded">
                    <div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image" src="`+producto.imgSrc +`"></div>
                    <div class="col-md-6 mt-1">
                        <h5>`+producto.name +`</h5>
                        <div class="mt-1 mb-1 spec-1"><span>`+producto.description +`</span></div>
                        <br><br>
                    </div>
                    <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                        <div class="d-flex flex-row align-items-center">
                            <h4 class="mr-1">$`+producto.cost +`</h4>
                        </div>
                        <div class="d-flex flex-column mt-4"><button class="btn btn-primary btn-sm" type="button">Detalles</button>
                        <button class="btn btn-outline-primary btn-sm mt-2" type="button">Añadir al carrito</button></div>
                    </div>
                </div>
            </div>    
            `
        }
    }
}

