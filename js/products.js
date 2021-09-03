var listaAutos = []
var minPrice = undefined
var maxPrice = undefined
const order_by_minor_price = "1.9"
const order_by_major_price = "9.1"
const order_by_relevance = "rel"
var currentProductArray = []
var currentSortCriteria = undefined

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



})
