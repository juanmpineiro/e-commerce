var listaAutos = []

function showProductList(listaAutos){
    let htmlContentToAppend = "";
    for (let i = 0; i < listaAutos.length; i++) {
        let product = listaAutos[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + listaAutos[i].imgSrc + `" alt="` + listaAutos[i].description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ listaAutos[i].name + `</h4>
                        <small class="text-muted">` + listaAutos[i].soldCount + ` artículos</small>
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("hola").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            listaAutos = resultObj.data;
            //Muestro las categorías ordenadas
            showProductList(listaAutos);
        }
    });
});