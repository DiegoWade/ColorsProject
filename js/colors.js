function include(filename, onload) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = filename;
    script.type = 'text/javascript';
    script.onload = script.onreadystatechange = function () {
        if (script.readyState) {
            if (script.readyState === 'complete' || script.readyState === 'loaded') {
                script.onreadystatechange = null;
                onload();
            }
        } else {
            onload();
        }
    };
    head.appendChild(script);
}



include('http://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js', function () {
    $(document).ready(function () {
        //alert('the DOM is ready');
        loadPage(1);

        $("#leftButton").click(function (e) {
            e.preventDefault();
            loadPage(1);
        });
        $("#rightButton").click(function (e) {
            e.preventDefault();
            loadPage(2);
        });
    });
});


function loadPage(page) {
    
    fetch('https://reqres.in/api/colors?page=' + page)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            data = myJson.data;
            let colorsContainer = document.getElementById("colors-container");
            colorsContainer.innerHTML = "";
            
        });

}