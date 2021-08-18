const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_PRICE_ASC = "Precio";
var listaAutos = []
var currentSortCriteria = undefined;
var currentProductArray = [];
var minPrice = undefined;
var maxPrice = undefined;

// Función para ordenar los productos según el filtro elegido.
function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if (a.name < b.name){ return -1; }
            if (a.name > b.name){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if (a.name > b.name){ return -1; }
            if (a.name < b.name){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_PRICE_ASC){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if (aCount > bCount){ return -1; }
            if (aCount < bCount){ return 1; }
            return 0;
        });
    }

    return result;
}

// Función que muestra cada producto de la lista.
function showProductList(){
    let htmlContentToAppend = "";
    for (let i = 0; i < listaAutos.length; i++) {
        let product = listaAutos[i];

        // Filtra los productos por precio.
        if (((minPrice == undefined) || (minPrice != undefined && parseInt(listaAutos[i].cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(listaAutos[i].cost) <= maxPrice))){

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
            
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });
    
    // Detecta cuando hacemos click en el botón y ejecuta la funcion 'sortAndShowProducts' con el filtro que hayamos elegido.
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByPrice").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_PRICE_ASC);
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function(){
        

        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minPrice = parseInt(minCount);
        }
        else{
            minPrice = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxPrice = parseInt(maxCount);
        }
        else{
            maxPrice = undefined;
        }

        showProductList();
    });

    // Borra lo que escribimos en el apartado 'Filtrar por precio' y nos muestra la pagina con la lista de productos original.
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductList();
    });

    
});



