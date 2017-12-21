$(document).ready(() => {

    //funktion der henter drikkevarer fra databasen og ind i tabellen
    const drinkList = $("#drink-list");


    SDK.Drink.getAllDrinks((err, data) => {

        console.log(err, data);
        let drinks = JSON.parse(SDK.Encryption.encryptDecrypt(data));
        console.log(drinks);

        drinks.forEach(drink => {
            console.log(1, drink);

            drinkList.append(`
                <tr>
                    <td>${drink.id}</td>
                    <td>${drink.productName}</td>
                    <td>${drink.productPrice}</td>
                    <td><button class="btn btn-success order-button" data-order-id="${drink.id}">Order</button></td>//Ordre knap tilføjet
                </tr>
                `
            )
        })
        //odre knappens funktion
        $(".order-button").click(function () {
            const orderId = $(this).data("order-id");


            SDK.History.FindMyOrders((error, data) => {
                const orders = JSON.parse(SDK.Encryption.encryptDecrypt(data));
                let currentOrder = null;

                orders.forEach((order) => {

                    if (order.id === orderId) {
                        currentOrder = order;
                    }
                });
                console.log('tester', currentOrder);
                console.log(currentOrder.id);
                console.log(orderId);

                SDK.History.orderProduct(currentOrder.id, orderId, (err, data) => {
                    console.log(data);
                })
            });

        });






    });




});




