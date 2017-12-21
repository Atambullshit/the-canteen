
$(document).ready(() => {

    //funktion der burde hente hver enkelt ordre ned. Den virker dog ikke optimalt
    const $orderList = $("#order-tbody");


    SDK.History.FindMyOrders((err, data) => {

        if (err) {
            console.log("err")
        }
        //console.log(SDK.Encryption.encryptDecrypt(data));
        let orders = JSON.parse(SDK.Encryption.encryptDecrypt(data));

        console.log(orders);
        orders.forEach((order) => {


            let $productsOrdered = " ";

            let $productsTotalPrice = 0;

            for(let i = 0; i < order.items.length; i++) {

                $productsOrdered += " " + order.items[i].product.productName;

                $productsTotalPrice += parseInt(order.items[i].product.productPrice);

            }

            const OrdersHtml = `
            
            <tr>
                <td>${order.id}</td>
                <td>${order.date}</td>
                <td>${$productsOrdered}</td>
                <td>${$productsTotalPrice}</td>
                <td>${order.userId}</td>
            
            
            `;

            $orderList.append(OrdersHtml);


        // console.log('getAllOrder from history.js');
        //
        // let orders = JSON.parse(SDK.Encryption.encryptDecrypt(data));
        // console.log(orders);
        // //console.log(1, food);
        // orders.forEach(order => {
        //     console.log(orders);
        //     orderList.append(
        //         "<tr>" +
        //         "<td>" + order.id +  "</td>" +
        //         "<td>" + order.productPrice + "</td>" +
        //         "<td>" + order.productName + "</td>" +
        //         "<td>" + order.dateTime + "</td>" +
        //
        //         "</tr>"
        //     )

    });


    })

});