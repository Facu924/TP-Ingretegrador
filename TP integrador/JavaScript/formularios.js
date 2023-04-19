document.addEventListener('DOMContentLoaded', function() {
    $('#formularioContacto').validate({
        rules: {
            nombre: 'required',
            email: {
                required: true,
                email: true
            },
            mensaje: 'required'
        },
        messages: {
            nombre: 'Por favor ingrese su nombre',
            email: {
                required: 'Por favor ingrese su dirección de correo electrónico',
                email: 'Por favor ingrese una dirección de correo electrónico válida'
            },
            mensaje: 'Por favor ingrese un mensaje'
        },
        submitHandler: function(form) {
            var nombre = $('#nombre').val();
            var email = $('#email').val();
            var mensaje = $('#mensaje').val();

            $.ajax({
                url: 'https://reqres.in/api/users?page=2', 
                method: 'POST',
                data: {
                    nombre: nombre,
                    email: email,
                    mensaje: mensaje
                },
                success: function(response) {
                    console.log('Éxito:', response);
                    alert('¡Mensaje enviado con éxito!');
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                    alert('Error al enviar el mensaje. Por favor inténtelo nuevamente.');
                }
            });
        }
    });
    $('#formularioProceso').validate({
        rules: {
            nombreProceso: 'required',
            dni: 'required', 
            precio: 'required',
            cantidad: 'required'
        },
        messages: {
            nombreProceso: 'Por favor ingrese su nombre',
            dni: 'Por favor ingrese su dni',
            precio: 'Por favor ingrese el precio',
            cantidad: 'Por favor ingrese la cantidad'
        },
        submitHandler: function(form) {
            var nombre = document.getElementById('nombreProceso').value;
            var precio = document.getElementById('precio').value;
            var cantidad = document.getElementById('cantidad').value;
            var dni = document.getElementById('dni').value;

            var subtotal = precio * cantidad;
            var total = subtotal;

            var cotizacion = `Cotización:\n\nNombre: ${nombre}\nPrecio: \$${precio}\nDNI: ${dni}\nCantidad: ${cantidad}\nSubtotal: \$${subtotal}\nTotal: \$${total}`;

            alert(cotizacion);

            var pdf = new jsPDF();

            pdf.text(cotizacion, 10, 10);

            var pdfBlob = pdf.output('blob');

            var downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(pdfBlob);
            downloadLink.download = 'resumen.transaccion.pdf';
            downloadLink.click();

            URL.revokeObjectURL(pdfBlob);
        
        }
    });
});

  


