/*
 Jquery Validation using jqBootstrapValidation
 example is taken from jqBootstrapValidation docs 
 */
$(function () {
var myform = $("form#contactForm");
    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // something to have when submit produces an error ?
            // Not decided if I need it yet
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var phone = $("input#phone").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            debugger;
            
            emailjs.send("default_service", "template_mTQxeMHd", {from_name:name,reply_to:email, name:name, notes: "<p>Telefono : "+phone+" <BR>Correo: "+email+"<BR>"+"Mensaje:"+message+"</p>"})
                    .then(function () {
                        debugger;
                        $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Su Mensaje a sido Enviado. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                    }, function (err) {
                             $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Disculpe " + firstName + " en estos momentos no se pudo enviar el mensaje.</strong> Puede enviarnos un correo a <a href='mailto:lodgingmarti@gmail.com?Subject=Message_Me from myprogrammingblog.com;>me@example.com</a> ? Disculpe los incovenientes!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                    });

//            $.ajax({
//                url: "#",
//                type: "POST",
//                data: {
//                    name: name,
//                    phone: phone,
//                    email: email,
//                    message: message
//                },
//                cache: false,
//                success: function() {
//                    // Success message
//                    $('#success').html("<div class='alert alert-success'>");
//                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
//                        .append("</button>");
//                    $('#success > .alert-success')
//                        .append("<strong>Your message has been sent. </strong>");
//                    $('#success > .alert-success')
//                        .append('</div>');
//
//                    //clear all fields
//                    $('#contactForm').trigger("reset");
//                },
//                error: function() {
//                    // Fail message
//                    $('#success').html("<div class='alert alert-danger'>");
//                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
//                        .append("</button>");
//                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + " it seems that my mail server is not responding...</strong> Could you please email me directly to <a href='mailto:me@example.com?Subject=Message_Me from myprogrammingblog.com;>me@example.com</a> ? Sorry for the inconvenience!");
//                    $('#success > .alert-danger').append('</div>');
//                    //clear all fields
//                    $('#contactForm').trigger("reset");
//                },
//            })
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function () {
    $('#success').html('');
});
