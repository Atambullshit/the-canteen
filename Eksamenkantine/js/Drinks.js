$(document).ready(() => {

    //SDK.User.loadNav();
    const drinkList = $("#drink-list");


    SDK.Drink.getAllDrinks((err, data) => {
        console.log('getAllFoods from food.js');
        console.log(err, data);
        let drinks = JSON.parse(SDK.Encryption.encryptDecrypt(data));
        console.log(drinks);
        //console.log(1, food);
        drinks.forEach(drink => {
            console.log(1, drink);
            drinkList.append(
                "<tr>" +
                "<td>"+drink.id+"</td>" +
                "<td>"+drink.productName+"</td>" +
                "<td>"+drink.productPrice+"</td>" +
                "<td><button class=\"btn btn-success addToHistory-button\" data-event-id=\"${event.idEvent}\">Order</button></td>"+
                "</tr>"
            )
        })
        /* $.each(food, function (i, cb) {

             var tr = '<tr>';
             tr += '<td>' + food[i].id +'</td>';
             tr += '<td>' + food[i].name +'</td>';
             tr += '<td>' + food[i].price +'</td>';


            tr += '</tr>';
            i + 1
             foodList.append(tr);


         });*/

        //SDK.Encryption.encryptDecrypt();





    });




});




