function calculateChar(){
    var len = ($("#newPost #PostMessage").val().length);
    $("#newPost #count").text(len);
};

function getSectionID(){
    $('section').click(function(e){
        var id = this.id;
        return id;
    });
};

function sendSectionIdToServer(){
    var id = getSectionID();

    //send AJAX request to the server
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            alert(xhr.response);
        }
    }
    xhr.open('POST', '/edit_post', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.send('id ='+ encodeURIComponent(id));
};