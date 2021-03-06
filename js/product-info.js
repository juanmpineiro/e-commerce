var product = []
var valueimg = 0
var comentarios = []
listaAutos = []


function showImages(array) {
    i = valueimg

    document.getElementById("show-images").innerHTML = `
        <div class="imagewrap">
        <img class="responsiveimg" src="${array[i]}" id="imagen-swap img-fluid">

        <input type="button" class="button1" value="<" onclick="before()"/>
        <input type="button" class="button2" value=">" onclick="after()"/>
        </div>
        `
}





//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function () {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        product = resultObj.data
        document.getElementById("product-info").innerHTML = `
        <h1 class="title">${product.name}</h1>
        <br>
        <h2 class="price">$${product.cost} </h2>
        <br>
        <h5 class="description"> ${product.description}</h5>
        `
        showImages(product.images)

    })
})

function after() {
    if (valueimg < product.images.length - 1) {
        valueimg++
        showImages(product.images)
    }

}

function before() {
    if (valueimg > 0) {
        valueimg--
        showImages(product.images)
    }

}



// Recomendaciones

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            listaAutos = resultObj.data
        }
        showRecommendedProducts()
    })
});

function showRecommendedProducts() {
    for (let i = 0; i < listaAutos.length; i++) {
        if (product.relatedProducts.includes(i)) {
            document.getElementById("recommended").innerHTML += `
            <div class="productrelated">
                <div class="relatedInfo">
                    <a href="#"> <img src="${listaAutos[i].imgSrc}" class="relatedImg" onmouseover="this.style.opacity=0.7" onmouseout="this.style.opacity=1"> </a>
                    <div class="relatedText">
                        <a href="#"> <p class="relatedProductName" onmouseover="this.style.opacity=0.7" onmouseout="this.style.opacity=1" >${listaAutos[i].name}</p> </a>
                        <a href="#"> <p class="relatedProductPrice" onmouseover="this.style.opacity=0.7" onmouseout="this.style.opacity=1">$ ${listaAutos[i].cost}</p> </a>
                    </div>
                </div>
            </div>
            `
        }

    }
}



// COMENTARIOS


function scoreStars(value) {

    if (value === 1) {
        return `
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
    
         `
    }

    if (value === 2) {
        return `
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
    
         `
    }

    else if (value === 3) {
        return `
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>

        `
    }

    else if (value === 4) {
        return `
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>

        `
    }

    else if (value === 5) {
        return `
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>

        `
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {

        comments = resultObj

        comentarios = resultObj.data

        for (let i = 0; i < comments.data.length; i++) {

            document.getElementById("commentaries").innerHTML += `
            
                <div class="commented-section mt-2">
                    <div class="d-flex flex-row align-items-center commented-user">
                        <h5 class="mr-2">${comments.data[i].user}</h5><span class="dot mb-1"></span><span class="mb-1 ml-2">${comments.data[i].dateTime}</span>
                    </div>
                    <div id="score">${scoreStars(comments.data[i].score)}</div>
                    <div class="comment-text-sm"><span>${comments.data[i].description}</span></div>
                </div>
                <br>
                <div class="division"></div>
        `


        }




    })
})


document.getElementById("commentform").addEventListener("submit", function () {
    var commenttext = document.getElementById("commenttext").value
    var commentstars = document.getElementById("commentpoststars").value
    localStorage.setItem("commenttext", commenttext)
    localStorage.setItem("commentstars", commentstars)
})



document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("commentaries").innerHTML += `
            
    <div class="commented-section mt-2">
        <div class="d-flex flex-row align-items-center commented-user">
            <h5 class="mr-2">${localStorage.getItem("nombreuser")}</h5><span class="dot mb-1"></span><span class="mb-1 ml-2">${new Date()}</span>
        </div>
        <div id="score">${scoreStars(parseInt(localStorage.getItem("commentstars")))}</div>
        <div class="comment-text-sm"><span>${localStorage.getItem("commenttext")}</span></div>
    </div>
    <br>
    <div class="division"></div>
`
})






