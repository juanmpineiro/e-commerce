const CART_INFO_URL_2 = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
let productList = []
let save_percent = 0


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL_2).then(function(resultObj){
        if (resultObj.status === "ok"){
            productList = resultObj.data
            productList = productList.articles
            productID = 0
            subtotal_1 = 0
            totalcost = 0
            for (let i=0; i<productList.length; i++){
                if(productList[i].currency === "UYU"){
                    document.getElementById("cart-items").innerHTML +=`
                    

                    <tr class="">
                        <td><img src="${productList[i].src}" class = "img-fluid" style ="max-width:50px!important"></td>
                        <td class="align-middle">${productList[i].name}</td>
                        <td class="align-middle">UYU ${productList[i].unitCost.toLocaleString('en-US')}</td>
                        <td class="align-middle"><input type="number" min ="1" value=${productList[i].count} onchange="subtotalChange()"></td>
                        <td class="align-middle" id="${productID}">UYU ${(productList[i].unitCost * productList[i].count).toLocaleString('en-US')} </td>
                    </tr>
                    `
                    subtotal_1 += (productList[i].unitCost * productList[i].count)
                    totalcost += (productList[i].unitCost * productList[i].count)
                }
                if(productList[i].currency === "USD"){
                    document.getElementById("cart-items").innerHTML +=`
                    <tr class="">
                        <td><img src="${productList[i].src}" class = "img-fluid" style ="max-width:50px!important"></td>
                        <td class="align-middle">${productList[i].name}</td>
                        <td class="align-middle">UYU ${productList[i].unitCost.toLocaleString('en-US')}</td>
                        <td class="align-middle"><input type="number" min ="1" value=${productList[i].count} onchange="subtotalChange()"></td>
                        <td class="align-middle" id="${productID}">UYU ${(productList[i].unitCost * productList[i].count).toLocaleString('en-US')} </td>
                    </tr>
                    
                    `
                    subtotal_1 += ((productList[i].unitCost * 40) * productList[i].count)
                    totalcost += ((productList[i].unitCost * 40) * productList[i].count)
                }
                
            productID++  
            }
                document.getElementById("cart-items").innerHTML +=`
                    <tr>
                        <td></td>
                        <td class="align-middle"></td>
                        <td class="align-middle"></td>
                        <td class="align-middle">Subtotal</td>
                        <td class="align-middle" id="subtotal_1">UYU ${subtotal_1.toLocaleString('en-US')}</td>
                    </tr>
                    `
                    document.getElementById("cart-items").innerHTML +=`
                    <tr>
                        <td></td>
                        <td class="align-middle"></td>
                        <td class="align-middle"></td>
                        <td class="align-middle">Tipo de envio:</td>
                        <td class="align-middle">
                        <div  id="a">
                        <input type="radio" name="ship_type" value="premium" onclick="ship_total_cost(15)"> Premium - Costo: 15%<br>
                        <input type="radio" name="ship_type" value="express" onclick="ship_total_cost(7)"> Express - Costo: 7%<br>
                        <input type="radio" name="ship_type" value="standard" onclick="ship_total_cost(5)"> Standard - Costo: 5%
                        </div>
                        </td>
                    </tr>
                    
                    
                    
                    <tr>
                        <td></td>
                        <td class="align-middle"></td>
                        <td class="align-middle"></td>
                        <td class="align-middle">Total</td>
                        <td class="align-middle" id="totalcost">UYU ${totalcost.toLocaleString('en-US')}</td>
                    </tr>
                    `
            
        }
    })
});


function subtotalChange(){
    resultado = 0
    subtotal_1 = 0
    totalcost = 0
    for(let i=0; i<productList.length; i++){
        let count = document.getElementsByTagName("input")[i].value
        if(productList[i].currency === "UYU"){
            resultado = count * productList[i].unitCost
            subtotal_1 += resultado
            totalcost += resultado
        }
        if(productList[i].currency === "USD"){
            resultado = count * (productList[i].unitCost * 40)
            subtotal_1 += resultado
            totalcost += resultado    
        }
        document.getElementById(i).innerHTML =`
        UYU ${resultado.toLocaleString('en-US')}
        `
        document.getElementById("subtotal_1").innerHTML =`
        UYU ${subtotal_1.toLocaleString('en-US')}
        `
        document.getElementById("totalcost").innerHTML =`
        UYU ${totalcost.toLocaleString('en-US')}
        `

        ship_total_cost(save_percent)
    }
    
}


function ship_total_cost(percent){
    totalcost_final = 0
    save_percent = percent
    uno = percent * totalcost
    dos = uno/100
    totalcost_final = dos + totalcost
    if(percent !== 0){
    document.getElementById("totalcost").innerHTML =`
        UYU ${totalcost_final.toLocaleString('en-US')}
        `
    }
}


//                     <tr>
//                        <td><img src="${productList[i].src}" class = "img-fluid" style ="max-width:50px!important"></td>
 //                       <td class="align-middle">${productList[i].name}</td>
   //                     <td class="align-middle">UYU ${productList[i].unitCost.toLocaleString('en-US')}</td>
     //                   <td class="align-middle"><input type="number" min ="1" value=${productList[i].count} onchange="subtotalChange()"></td>
       //                 <td class="align-middle" id="${productID}">UYU ${(productList[i].unitCost * productList[i].count).toLocaleString('en-US')} </td>
         //           </tr>


 //        <tr>
   //                     <td><img src="${productList[i].src}" class = "img-fluid" style ="max-width:50px!important"></td>
    //                    <td class="align-middle">${productList[i].name}</td>
     //                   <td class="align-middle">UYU ${(productList[i].unitCost * 40).toLocaleString('en-US')}</td>
      //                  <td class="align-middle"><input type="number" min ="1" value=${productList[i].count} onchange="subtotalChange()"></td>
       //                 <td class="align-middle" id="${productID}">UYU ${((productList[i].unitCost * 40) * productList[i].count).toLocaleString('en-US')} </td>
        //            </tr>