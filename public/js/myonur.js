$(function () {
    $.ajaxSetup({ cache: false });
    $(".editDialog").on("click", function (e) {
        $('#myModalContent').load(this.href, function () {
            $('#myModal').modal({
                keyboard: true
            }, 'show');

            bindForm(this);
        });
        return false;
    });


});

function bindForm(dialog) {
    $('form', dialog).submit(function () {
        $('#progress').show();
        $.ajax({
            url: this.action,
            type: this.method,
            data: $(this).serialize(),
            success: function (result) {
                
                if (result.success) {                                        
                    $('#myModal').modal('hide');
                    $('#progress').hide();
                   // location.reload();
                } else {
                   
                    $('#progress').hide();
                   // $('#myModalContent').html(result);
                    location.reload();
                   // bindForm();
                }
            }
        });
        return false;
    });
}




$(function () {
    $.ajaxSetup({ cache: false });
    $(".editDialog2").on("click", function (e) {
        $('#myModalContent').load(this.href, function () {
            $('#myModal').modal({
                keyboard: true
            }, 'show');

            bindForm2(this);
        });
        return false;
    });


});

function bindForm2(dialog) {
    $('form', dialog).submit(function () {
        $('#progress').show();
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: this.action,
            type: this.method,
            contentType: this.enctype, //'application/x-www-form-urlencoded; charset=UTF-8',
            data: formData,//$(this).serialize(),                             
            success: function (result) {
                if (result.success) {
                    $('#myModal').modal('hide');
                    $('#progress').hide();
                    location.reload();
                } else {
                    $('#progress').hide();
                    $('#myModalContent').html(result);
                    bindForm2();
                }
            }
        });
        return false;
    });
}


function showContent(mesaj) {
    toastr.options = {
    
      "closeButton": false, //Kapama butonu durumu
      "debug": false,
      "progressBar": false,
      "preventDuplicates": true,
      "positionClass": "toast-top-center", //Ekran görüntü seçenekleri: top-left(Yukarı Sol), top(yukari orta), bottom-left(aşağı sol), bottom(aşağı orta), bottom-right(aşağı sağ)
      "showDuration": "200",
      "hideDuration": "2000",
      "timeOut": "1200", //Gözükme süresi.
      "extendedTimeOut": "2000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
      
    }
   
   if (mesaj !== '') {
    
    toastr["error"](mesaj);
   
   }
    
}