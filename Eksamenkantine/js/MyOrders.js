$(document).ready(() => {

    //SDK.User.loadNav();
    const orderList = $("#order-list");


    SDK.History.getAllOrders((err, data) => {
        console.log('getAllOrder from history.js');
        console.log(err, data);
        let orders = JSON.parse(SDK.Encryption.encryptDecrypt(data));
        console.log(orders);
        //console.log(1, food);
        orders.forEach(order => {
            console.log(orders);
            orderList.append(
                "<tr>" +
                "<td>" + order.id +  "</td>" +
                "<td>" + order.items + "</td>" +
                "<td>" + order.productName + "</td>" +
                "<td>" + order.dateTime + "</td>" +

                "</tr>"
            )
        })
    });




});