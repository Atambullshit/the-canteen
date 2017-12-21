$(document).ready(() => {
    //dennee funktion tager udgangs punkt ii Jesper Bruun Hansens kode på Github:
    // https://github.com/Distribuerede-Systemer-2017/javascript-client
    //funktionen der opretter en bruger

    $("#submitButton").click(() => {

        console.log('test');


        const username = $("#input-username").val();
        const password = $("#input-password").val();


        SDK.User.createUser(username, password, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");

            }
            else if (err){
                console.log(err)

            } else {
                console.log(data);
                window.location.href = "index.html";
                SDK.Encryption.encryptDecrypt()
            }
        });

    });

});