// ha az input valid, a hozzá tartozó indexű tagot átbillenti true-ra - ha mind true, engedélyezi a gombot
var validations = [false, false, false];

$(document).ready(function () {
	// oldal betöltődés után létrehozok timereket minden mezőhöz
    var emailTimer;
    var phoneTimer;
    var passwordTimer;
    var cPasswordTimer;


    $("#email").keydown(function () {
        validate(function () { return isEmail($("#email").val()); }, "#email-error", emailTimer, 0);
    });

    $("#phone").keydown(function () {
        validate(function () { return $.isNumeric($("#phone").val()); }, "#phone-error", phoneTimer, 1);
    });

    $("#password").keydown(function () {
        if ($("#c-password").val() != "")
            validate(function () { return $("#password").val() == $("#c-password").val(); }, "#password-error", passwordTimer, 2);
    });

    $("#c-password").keydown(function () {
        if ($("#password").val() != "")
            validate(function () { return $("#password").val() == $("#c-password").val(); }, "#password-error", cPasswordTimer, 2);
    });

    $("#submit-btn").click(function () {
    });
});

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
};
	
// minden billentyű leütésre indít egy időzítőt és ha lejárt, validál
function validate(condition, errorId, timer, index) {
    clearTimeout(timer);
    timer = setTimeout(function () {
        if (!condition()) {
            $(errorId).show();
            validations[index] = false;
        } else {
            $(errorId).hide();
            validations[index] = true;
        }
		// gomb engedélyezése vagy letiltása a validálások eredményének függvényében
        if ($.inArray(false, validations) > -1) {
            $("#submit-btn").attr("disabled", "disabled");
        } else {

            $("#submit-btn").removeAttr("disabled");
        }
    }, 800)
}