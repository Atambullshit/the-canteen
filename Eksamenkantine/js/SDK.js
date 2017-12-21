//Dette Javascript dokument tager udgangspunkt i Jesper Bruun Hansens kode på Github:
// https://github.com/Distribuerede-Systemer-2017/javascript-client

const SDK = {

    //serverns adresse
    serverURL: "http://localhost:8080/api/",
    request: (options, cb) => {


        let token = SDK.Storage.load("token");

        //Parametre for ajax kald til serveren

        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: {'Authorization': token},
            accept: "application/json",
            dataType: options.dataType || "json",
            data: JSON.stringify(options.data),
            success: (data, status, xhr) => {
                console.log('success!');
                cb(null, data, status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                console.log('error!');
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });

        //finder alle madvarer
    },
    Food: {
        getAllFoods: (cb) => {

            SDK.request({
                method: "GET",
                url: "food",
            }, (err, food) => {
                if (err) return cb(err);

                cb(null, food)


            }, cb);
        }
    },

    //Finder alle drikkevarer

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

    //finder ordre

    History: {
        FindMyOrders: (cb) => {

            SDK.request({
                method: "GET",
                url: "history",
                headers: {
                    Authorization: SDK.Storage.load("token")
                }
            }, cb)


        },

    //opretter en ordre, med

        orderProduct: (id, data, cb) => {

            SDK.request({
                method: "POST",
                url: "users/order/" + id,
                data: data,


                headers: {Authorization: SDK.Storage.load("token")}
            }, cb);
        }
    },


    //brugeren bliver tildelt token
    User: {

        current: () => {
            return SDK.Storage.load("token");
        }, //brugeren får fjernet sin token ved logud
        logOut: () => {
            SDK.Storage.remove("token");
            SDK.Storage.remove("id");
            SDK.Storage.remove("username");
            window.location.href = "Login.html";

        //login funktion
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


                SDK.Storage.persist("token", SDK.Encryption.encryptDecrypt(data));

                cb(null, data);


            });

        //funktion til at oprette bruger
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
    //krypterings metoden der er brugt
    Encryption: {
        encryptDecrypt(input) {
            let key = ['L', 'O', 'L']; //encryption code
            let output = [];

            for (let i = 0; i < input.length; i++) {
                let charCode = input.charCodeAt(i) ^ key[i % key.length].charCodeAt(0);
                output.push(String.fromCharCode(charCode));
            }
            return output.join("");
        }

    },
    //navigationsbaren på hver side
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
    //storage metoden der gør at en token bliver persistet
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
