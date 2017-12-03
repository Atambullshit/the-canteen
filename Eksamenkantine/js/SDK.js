const SDK = {
    serverURL: "http://localhost:8080/api/",
    request: (options, cb) => {

        // let headers = {};
        // if (options.headers) {
        //     Object.keys(options.headers).forEach((h) => {
        //         headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
        //     });
        //
        //
        // }

        let token = SDK.Storage.load("token");

        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: {'Authorization': token}, //headers
            //contentType: "application/json;charset=utf-8",
            accept: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),
            success: (data, status, xhr) => {
                cb(null, data, status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });

    },
    Food: {
        getAllFoods: (cb) => {
            console.log('before request')
            SDK.request({
                method: "GET",
                url: "food",
            }, (err, food) => {
                if (err) return cb(err);
                console.log(2, food);
                cb(null, food)


            }, cb);
        }
    },

    Drink: {
        getAllDrinks: (cb) => {
            SDK.request({
                method: "GET",
                url: "drink",
            }, (err, drink) => {
                if (err) return cb(err);
                cb(null, drink)
            }, cb);
        }
    },

    History: {
        getAllOrders: (cb) => {
            SDK.request({
                method: "GET",
                url: "history", //+ SDK.User.current().username,
                headers: {}
            }, cb)


        },
        orderProduct: (orderId, id, productName, productPrice, cb) => {

            SDK.request({
                data: {
                    orderId: orderId,
                    id: id,
                    productName: productName,
                    productPrice: productPrice
                },

                method: "POST",
                url: "users/order" + orderId,

                headers: {authorization: SDK.Storage.load("token")}
            }, (err, data) => {

                cb(null, data);
            });
        },
    },


    //     create: (data, cb) => {
    //         SDK.request({
    //             method: "POST",
    //             url: "/books",
    //             data: data,
    //             headers: {authorization: SDK.Storage.load("tokenId")}
    //         }, cb);
    //     }
    // },
    // Author: {
    //     findAll: (cb) => {
    //         SDK.request({method: "GET", url: "/authors"}, cb);
    //     }
    // },
    // Order: {
    //     create: (data, cb) => {
    //         SDK.request({
    //             method: "POST",
    //             url: "/orders",
    //             data: data,
    //             headers: {authorization: SDK.Storage.load("tokenId")}
    //         }, cb);
    //     },
    //     findMine: (cb) => {
    //         SDK.request({
    //             method: "GET",
    //             url: "/orders/" + SDK.User.current().id + "/allorders",
    //             headers: {
    //                 authorization: SDK.Storage.load("tokenId")
    //             }
    //         }, cb);
    //     }
    // },
    User: {
        findAll: (cb) => {
            SDK.request({method: "GET", url: "/users/"}, cb);
        },
        current: () => {
            return SDK.Storage.load("token");
        },
        logOut: () => {
            SDK.Storage.remove("token");
            SDK.Storage.remove("id");
            SDK.Storage.remove("username");
            window.location.href = "Login.html";


        },
        login: (username, password, cb) => {

            SDK.request({
                data: {
                    username: username,
                    password: password
                },
                url: "users/login/",
                method: "POST"

            }, (err, data) => {


                //On login-error
                if (err) return cb(err);

                // SDK.Storage.persist("token", data.id);
                // SDK.Storage.persist("id", data.User);
                // SDK.Storage.persist("username", data.username);
                //
                // cb(null, data);
                SDK.Storage.persist("token", SDK.Encryption.encryptDecrypt(data));

                cb(null, data);


            });


        },
        createUser: (username, password, cb) => {
            SDK.request({
                    data: {
                        username: username,
                        password: password
                    },
                    url: "users/create/",
                    method: "POST"
                }, (err, data) => {

                    //on submit error
                    if (err) return cb(err);

                    SDK.Storage.persist("token", SDK.Encryption.encryptDecrypt(data));

                    cb(null, data);
                }
            );
        },
    },

    Encryption: {
        encryptDecrypt(input) {
            let key = ['L', 'O', 'L']; //Can be any chars, and any size array
            let output = [];

            for (let i = 0; i < input.length; i++) {
                let charCode = input.charCodeAt(i) ^ key[i % key.length].charCodeAt(0);
                output.push(String.fromCharCode(charCode));
            }
            return output.join("");
        }

    },

    loadNav: (cb) => {
        $("#nav-container").load("nav.html", () => {
            const currentUser = SDK.User.current();
            if (currentUser) {
                $(".navbar-right").html(`
      
      <li><a href="#" id="logout-link">Logout</a></li>
    `);
            } else {
                $(".navbar-right").html(`
      <li><a href="Login.html">Logout <span class="sr-only">(current)</span></a></li>
    `);
            }
            $("#logout-link").click(() => SDK.User.logOut());
            cb && cb();
        });
    },

    Storage: {
        prefix: "canteenSDK",
        persist:
            (key, value) => {
                window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
            },
        load:
            (key) => {
                const val = window.localStorage.getItem(SDK.Storage.prefix + key);
                try {
                    return JSON.parse(val);
                }
                catch (e) {
                    return val;
                }
            },
        remove:
            (key) => {
                window.localStorage.removeItem(SDK.Storage.prefix + key);
            }
    }
};
