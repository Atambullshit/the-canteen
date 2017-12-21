$(document).ready(() => {

    //funktion der henter alle madvarer fra databasen
    const foodList = $("#food-list");


    SDK.Food.getAllFoods((err, data) => {

        console.log(err, data);
        let foods = JSON.parse(SDK.Encryption.encryptDecrypt(data));
        console.log(foods);

        foods.forEach(food => {
            console.log(1, food);
            //tabel
            foodList.append(`
                <tr>
                    <td>${food.id}</td>
                    <td>${food.productName}</td>
                    <td>${food.productPrice}</td>
                    <td><button class="btn btn-success order-button" data-order-id="${food.id}">Order</button></td>//ordre knappen
                </tr>
                `
            )
        });

        //funktion af ordre knap

        $(".order-button").click(function () {
            const orderId = $(this).data("order-id");
            //console.log('tester', (this));
            //console.log("orderId!", orderId);

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




