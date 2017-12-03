$(document).ready(() => {

    //SDK.User.loadNav();
    const foodList = $("#food-list");


    SDK.Food.getAllFoods((err, data) => {
        console.log('getAllFoods from food.js');
        console.log(err, data);
        let foods = JSON.parse(SDK.Encryption.encryptDecrypt(data));
        console.log(foods);
        //console.log(1, food);
        foods.forEach(food => {
            console.log(1, food);
            foodList.append(
                "<tr>" +
                    "<td>"+food.id+"</td>" +
                    "<td>"+food.productName+"</td>" +
                    "<td>"+food.productPrice+"</td>" +
                    "<td><button class=\"btn btn-success order-button\" data-order-id=\"${History.orderId}\">Order</button></td>"+
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
        $(".order-button").click(function () {
            const orderId = $(this).data("order-id");
            const orders = history.find((orders) => orders.orderId === orderId);
            console.log();
            SDK.History.orderProduct(orderId, orders.productName, orders.productPrice, (err) => {
                if (err && err.xhr.status === 401) {
                    $(".margin-bottom").addClass("Error")
                }
                else if (err) {
                    console.log("Something went wrong");
                    window.alert("Was not able to delete the event - Try again")
                } else {
                    window.location.href = "History.html";
                }


            });


        });





        });




    });




