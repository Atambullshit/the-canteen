$(document).ready(() => {
    //dette funktion tager udgangs punkt ii Jesper Bruun Hansens kode på Github:
    // https://github.com/Distribuerede-Systemer-2017/javascript-client
    //funktionen der logger en bruger ind

    $("#login-button").click(() => {

        const username = $("#inputUsername").val();
        const password = $("#inputPassword").val();

        SDK.User.login(username, password, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");

            }
            else if (err){
                console.log(err)
                console.log("stuff happened")

            } else {
                console.log(data);
                window.location.href = "index.html";

            }
        });

    });

});
