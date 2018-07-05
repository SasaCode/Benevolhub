$(function() {

    var is_error = false;

    $.validator.setDefaults({
        errorClass: 'invalid-feedback',
        highlight: function(element) {
            $(element)
                .closest('.form-control')
                .addClass('is-invalid');
        },
        unhighlight: function(element) {
            $(element)
                .closest('.form-control')
                .removeClass('is-invalid');
        },
        errorPlacement: function(error, element) {
            if (element.prop('type') === 'radio') {
                error.insertAfter(element.parent().parent());
                element.parent().parent().parent().addClass('hasError');
            } else {
                error.insertAfter(element);
            }
        }
    });

    $.validator.addMethod('strongPassword', function(value, element) {
        return this.optional(element) ||
            value.length >= 6 &&
            /\d/.test(value) &&
            /[a-z]/i.test(value);
    }, 'Votre mot de passe doit avoir au moins 6 caractères et contenir au moins un chiffre et une lettre');

    $.validator.addMethod("nowhitespace", function(value, element) {
        return this.optional(element) ||
            /^\S+$/i.test(value);
    }, "Pas d'éspace SVP !");

    $.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) ||
            /^[a-z]+$/i.test(value);
    }, "Saisissez seulement des lettres");

    $.validator.addMethod("maxlenght", function(value, element, params) {
        return this.optional(element) ||
            value.length == 4;
    }, 'message'); ///[0-9]{4}/i.test(value)

    $("#inscription-form").validate({
        rules: {
            mail: {
                required: true,
                email: true,
                remote: {
                    url: "index.php?id=9",
                    type: "post",
                    //contentType: "application/json; charset=utf-8",
                    //dataType:"json",  
                    data: {
                        mail: function() {
                            return $( "#mail" ).val();
                        }
                    },
                }
                //remote: 'http://localhost:3306/'
            },
            pass: {
                required: true,
                strongPassword: true

            },
           pass_conf: {
                required: true,
                equalTo: "#pass"
            },
           
            name: {
                required: true,
                nowhitespace: true,
                lettersonly: true
            },
            naissance: {
                required: true,
                maxlenght: 4,
                number: true
            },
            tel: {
                required: true,
            },
             prenom: {
                required: true,
                nowhitespace: true,
                lettersonly: true
            },
             adresse: {
                required: true,
                nowhitespace: true,
                lettersonly: true
            },
            messag: {
                required: true,
                
            },
             message: {
                required: true,
               
            },
            civil: {
                required: true
            }
        },
        messages: {
            name: {
                required: 'Ce champ est requis'
            },

            naissance: {
                required: 'Ce champ est requis',
                maxlenght: 'la date doit contenir 4 chiffres',
                number: 'Veuillez saisir un nombre '
            },
           messag: {
                required: 'Ce champ est requis',
            },
             message: {
                required: 'Ce champ est requis',
            },
             adresse: {
                required: 'Ce champ est requis',
            },
            prenom : {
                required: 'Ce champ est requis',
                
            },
            mail: {
                required: 'Ce champ est requis',
                 email: 'entrer un email valide: a@b.c',
                 remote: $.validator.format("{0} est déjà associé a un compte.")
            },
            tel: {
                required: 'Ce champ est requis'
            },
            pass: {
                required: 'Ce champ est requis'
            },
            pass_conf: {
                required: 'Ce champ est requis',                
                equalTo: 'Veuillez saisir le même mot de passe'
            },
            civil: {
                required: 'Veuillez cocher une de ces cases'
            }
        }
    });
});