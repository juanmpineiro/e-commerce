const CART_INFO_URL_2 = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
let productList = []
let save_percent = 0

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(){
    getJSONData(CART_INFO_URL_2).then(function(resultObj){
        if (resultObj.status === "ok"){
            productList = resultObj.data
            productList = productList.articles
            productID = 0
            subtotal_1 = 0
            totalcost = 0
            
            for (let i=0; i<productList.length; i++){
                countID = "countID" + i
                buttonID = i

                if(productList[i].currency === "UYU"){
                    
                    document.getElementById("cart_products").innerHTML +=`
                    <tr class="">
                        <td><img src="${productList[i].src}" class = "img-fluid" style ="max-width:50px!important"></td>
                        <td class="align-middle">${productList[i].name}</td>
                        <td class="align-middle">UYU ${productList[i].unitCost.toLocaleString('en-US')}</td>
                        <td class="align-middle"><input type="number" min ="1" value="${productList[i].count}" onchange="subtotalChange()" id="${countID}"></td>
                        <td class="align-middle" id="${productID}">UYU ${(productList[i].unitCost * productList[i].count).toLocaleString('en-US')}</td>
                        <td class="align-middle"> <button type="button" class="close" onclick="deleteproduct(${buttonID})">&times;</button></td>
                    </tr>
                    `
                    subtotal_1 += (productList[i].unitCost * productList[i].count)
                    totalcost += (productList[i].unitCost * productList[i].count)
                }
                if(productList[i].currency === "USD"){
                    document.getElementById("cart_products").innerHTML +=`
                    <tr class="">
                        <td><img src="${productList[i].src}" class = "img-fluid" style ="max-width:50px!important"></td>
                        <td class="align-middle">${productList[i].name}</td>
                        <td class="align-middle">UYU ${(productList[i].unitCost * 40).toLocaleString('en-US')}</td>
                        <td class="align-middle"><input type="number" min ="1" value="${productList[i].count}" onchange="subtotalChange()" id="${countID}"></td>
                        <td class="align-middle" id="${productID}">UYU ${((productList[i].unitCost * 40) * productList[i].count).toLocaleString('en-US')}</td>
                        <td class="align-middle"> <button type="button" class="close" onclick="deleteproduct(${buttonID})">&times;</button></td>
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
                        <td class="align-middle"></td>
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
                        <input type="radio" name="ship_type" value="premium" onclick="ship_total_cost(15)" id="ship1"> Premium - Costo: 15%<br>
                        <input type="radio" name="ship_type" value="express" onclick="ship_total_cost(7)" id="ship2"> Express - Costo: 7%<br>
                        <input type="radio" name="ship_type" value="standard" onclick="ship_total_cost(5)" id="ship3"> Standard - Costo: 5%
                        </div>
                        </td>
                        <td class="align-middle"></td>
                    </tr>

                    <tr>
                        <td></td>
                        <td class="align-middle">Dirección de envío:</td>
                        <td class="align-middle" >Calle <input type="text" id="street"></td>
                        <td class="align-middle">Número <input type="text" id="street_number"></td>
                        <td class="align-middle">Esquina <input type="text" id="street_secondstreet"></td>
                        <td class="align-middle"></td>
                    </tr>
                    
                    <tr>
                        <td></td>
                        <td class="align-middle"></td>
                        <td class="align-middle"></td>
                        <td class="align-middle">Total</td>
                        <td class="align-middle" id="totalcost">UYU ${totalcost.toLocaleString('en-US')}</td>
                        <td class="align-middle"></td>
                    </tr>

                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><button type="button" class="btn btn-secondary float-right" data-toggle="modal" data-target="#modal_payout">Forma de pago</button></td>
                        <td><button type="button" class="btn btn-secondary float-right" onclick="finish_buy()">Finalizar compra</button></td>
                        <td class="align-middle"></td>
                    </tr>
                    <div id="modal_payout" class="modal fade" role="dialog">
                        <div class="modal-dialog">
                        
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">Elige tu forma de pago</h4>
                                        <button type="button" class="close" data-dismiss="modal">&times;</button> 
                                    </div>
                                
                                    <div class="modal-body creditcard_css">
                                        
                                        <div class="cc_input_div">
                                            <input id="credit_card_input" name="payment_input" class="cc_radio" type="radio" data-toggle="collapse" data-target="#cc_data" aria-expanded="false"/>
                                            <label for="credit_card_input" class="cc_radio">Tarjeta de credito</label>
                                        </div>

                                        <div id="cc_data" class="collapse multi-collapse">
                                            <input type="number" class="cc_input" placeholder="Numero de la tarjeta" id="cc_number">
                                            <input type="text" class="cc_input" placeholder="Nombre de la tarjeta" id="cc_name">
                                            <input type="date" class="cc_input" placeholder="Fecha de expiracion" id="cc_date">
                                            <input type="number" class="cc_input" placeholder="Digito verificador" id="cc_securitynumber">
                                        </div>
                                        
                                        
                                        <div class="bank_input_div">
                                            <input id="bank_input" name="payment_input" class="bank_radio" type="radio" data-toggle="collapse" data-target="#bank_data"/>
                                            <label for="bank_input" class="cc_radio">Transferencia bancaria</label>
                                        </div>

                                        <div id="bank_data" class="collapse multi-collapse">
                                            <input type="text" class="cc_input" placeholder="Nombre de la persona" id="bank_name">
                                            <input type="number" class="cc_input" placeholder="Numero de la cuenta bancaria" id="bank_number">
                                            <input type="number" class="cc_input" placeholder="Numero de transaccion" id="bank_trans">
                                        </div>

                                    

                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-info" onclick="validation_payment()">Confirmar</button>
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    </div>
                                
                                </div>
                        </div>
                    </div>

                    
                    
                    `
        
        }
    })
});

// Funcion que se ejecuta para cuando se quiere eliminar un articulo del carrito

function deleteproduct(itemID){
    document.getElementById("cart_products").innerHTML =`
    <tr>
          <th scope="col"></th>
          <th scope="col">Nombre</th>
          <th scope="col">Precio</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Subtotal</th>
    </tr>
    `
    productID = 0
    subtotal_1 = 0
    totalcost = 0
    

    for (let i=0; i<productList.length; i++){
        
        if(itemID !== i){
                countID = "countID" + i
                buttonID = 0

                if(productList[i].currency === "UYU"){
                    
                    document.getElementById("cart_products").innerHTML +=`
                    <tr class="">
                        <td><img src="${productList[i].src}" class = "img-fluid" style ="max-width:50px!important"></td>
                        <td class="align-middle">${productList[i].name}</td>
                        <td class="align-middle">UYU ${productList[i].unitCost.toLocaleString('en-US')}</td>
                        <td class="align-middle"><input type="number" min ="1" value="${productList[i].count}" onchange="subtotalChange()" id="${countID}"></td>
                        <td class="align-middle" id="${productID}">UYU ${(productList[i].unitCost * productList[i].count).toLocaleString('en-US')}</td>
                        <td class="align-middle"> <button type="button" class="close" onclick="deleteproduct(${buttonID})">&times;</button></td>
                    </tr>
                    `
                    subtotal_1 += (productList[i].unitCost * productList[i].count)
                    totalcost += (productList[i].unitCost * productList[i].count)
                }
                if(productList[i].currency === "USD"){
                    document.getElementById("cart_products").innerHTML +=`
                    <tr class="">
                        <td><img src="${productList[i].src}" class = "img-fluid" style ="max-width:50px!important"></td>
                        <td class="align-middle">${productList[i].name}</td>
                        <td class="align-middle">UYU ${(productList[i].unitCost * 40).toLocaleString('en-US')}</td>
                        <td class="align-middle"><input type="number" min ="1" value="${productList[i].count}" onchange="subtotalChange()" id="${countID}"></td>
                        <td class="align-middle" id="${productID}">UYU ${((productList[i].unitCost * 40) * productList[i].count).toLocaleString('en-US')} </td>
                        <td class="align-middle"> <button type="button" class="close" onclick="deleteproduct(${buttonID})">&times;</button></td>
                    </tr>
                    
                    `
                    subtotal_1 += ((productList[i].unitCost * 40) * productList[i].count)
                    totalcost += ((productList[i].unitCost * 40) * productList[i].count)
                }
                productID++
                buttonID++

            document.getElementById("subtotal_1").innerHTML =`
    
    `
        }


    }

    productList.splice(itemID, 1)
    console.log(productList)
    subtotalChange()
    if (productList.length == 0){
        subtotal_1 = 0
        totalcost = 0
        document.getElementById("subtotal_1").innerHTML =`
        UYU ${subtotal_1.toLocaleString('en-US')}
        `
        document.getElementById("totalcost").innerHTML =`
        UYU ${totalcost.toLocaleString('en-US')}
        `
    }
    
    
}


// Funcion que chquea que los datos de pago esten bien

function validation_payment(){
    if(document.getElementById("credit_card_input").checked){
        let number = document.getElementById("cc_number").value
        let name = document.getElementById("cc_name").value
        let date = document.getElementById("cc_date").value
        let securitynumber = document.getElementById("cc_securitynumber").value
        if(number == ""){
            alert("El numero de la tarjeta es incorrecto")
        }
        if(name == ""){
            alert("El nombre de la tarjeta es incorrecto")
        }
        if(date == ""){
            alert("La fecha de expiracion de la tarjeta es incorrecta")
        }
        if(securitynumber == ""){
            alert("El numero de seguridad de la tarjeta es incorrecto")
        }
    }

    if(document.getElementById("bank_input").checked){
        let name = document.getElementById("bank_name").value
        let number = document.getElementById("bank_number").value
        let trans = document.getElementById("bank_trans").value
        if(name == ""){
            alert("El nombre de la cuenta bancaria es incorrecto")
        }
        if(number == ""){
            alert("El numero de la cuenta bancaria es incorrecto")
        }
        if( trans == ""){
            alert("El numero de la transaccion es incorrecto")
        }
    }

    if(!(document.getElementById("bank_input").checked) && !(document.getElementById("credit_card_input").checked)){
        alert("Seleccione un metodo de pago")
    }

}

// Funcion que chequea que todos los datos necesarios estan antes de finalizar

function finish_buy() {

    validation_payment()

    for (let i=0; i< productList.length; i++){
        checking = "countID" + i
        if(document.getElementById(checking).value == ""){
            alert("La cantidad de articulos seleccionados es incorrecta")
        }
    }

    let street = document.getElementById("street").value
    let streetnumber = document.getElementById("street_number").value
    let secondstreet = document.getElementById("street_secondstreet").value
    if(street == ""){
        alert("La calle de la direccion de envio introducida es incorrecta")
    }
    if(streetnumber == ""){
        alert("El numero de la direccion de envio introducido es incorrecto")
    }
    if(secondstreet == ""){
        alert("La esquina de la direccion de envio introducida es incorrecta")
    }

    if(!(document.getElementById("ship1").checked) && !(document.getElementById("ship2").checked) && !(document.getElementById("ship3").checked)){
        alert("Seleccion un metodo de envio")
    }
}

// Funcion para calcular y mostrar el precio total de cada articulo del carrito, el subtotal (sin envio) y muestra el precio total (con envio pero sin uno seleccionado)

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

// Funcion que calcula el costo del envio

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




