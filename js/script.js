$(document).ready(function(){

    getData();
    $(document).on('click', 'span.delete', function(){
        var elemento = $(this);
        var idToDo = elemento.parent().attr('data-id');
        deleteElement(idToDo);
    });

    $('.inserisci').click(function(){
        var newElement = $('#nuova-voce').val();
        createElement(newElement);
    });
//funzione per far scomparire il testo e apparire la casella input al click
    $(document).on('click', 'span.text', function(){
        var spanText = $(this);
        $(this).siblings().show();
        $(this).hide();
    });

// al doppio click modifico il testo
    $(document).on('dblclick', 'input.input-add', function(){
        var inputText = $(this).val();
        var idToDo = $(this).parent().attr('data-id');
          updateElement(inputText, idToDo);
          $(this).hide();
          $(this).siblings().show();
    });

    $('input.input-add').keydown(function(){
        if(event.which == 13 || event.keyCode == 13){
            var inputText = $(this).val();
            var idToDo = $(this).parent().attr('data-id');
              updateElement(inputText, idToDo);
              $(this).hide();
              $(this).siblings().show();
        }
    });

});


//funzione per aggiornare oggetto
function updateElement(data, id){
    $.ajax(
        {
            url: 'http://157.230.17.132:3022/todos/' + id,
            method: 'PUT',
            data: {
                text: data

            },
            success: function(risposta){

                $('.todos').html('');
                getData();
            },
            error: function(){
                alert('Errore');
            }
        }
    );
}

function createElement(elemento){
    $.ajax(
        {
            url: 'http://157.230.17.132:3022/todos/',
            method: 'POST',
            data: {
                text: elemento

            },
            success: function(risposta){

                $('.todos').html('');
                getData();
            },
            error: function(){
                alert('Errore');
            }
        }
    );
}



function deleteElement(id){
    $.ajax(
        {
            url: 'http://157.230.17.132:3022/todos/' + id,
            method: 'DELETE',
            success: function(risposta){
                $('.todos').html('');
                getData();
            },
            error: function(){
                alert('Errore');
            }
        }
    );
}

function getData(){
    $.ajax(
        {
        url: 'http://157.230.17.132:3022/todos',
        method: 'GET',
        success: function(risposta){
            getElement(risposta);

        },
        error: function(){
            alert('Errore');
        }
    }
);
}


function getElement(data){
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    for (var i = 0; i < data.length; i++) {
        var context = /*risposta[i];*/ {
            text: data[i].text,
            id: data[i].id
        };
        var html = template(context);
        $('.todos').append(html);

    }
}
