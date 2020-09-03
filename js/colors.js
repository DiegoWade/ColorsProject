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
            data.forEach(colorData => {
                colorsContainer.appendChild(buildGridCard(colorData));
            });            
        });

}

function buildGridCard(data) {
    //Create Card Container
    let card = document.createElement("div");
    //Create Card id   
    let cardId = "cardContainer" + data.id;
    //Set Card Id for uniqueness
    card.id = cardId;
    //Add css properties
    card.classList.add("cardContainer");
    //Create color container
    let colorContainer = document.createElement("div");
    //Set Background color
    colorContainer.style.backgroundColor = data.color;
    colorContainer.classList.add("innerColorContainer");
    //Create text name paragraph
    let nameContainer = document.createElement("p");
    //Set css class
    nameContainer.classList.add("colorNameContainer");
    //Set text name value
    nameContainer.innerHTML = data.name;
    //Set onClick Event 
    colorContainer.addEventListener("click", copyToClipBoard, false);
    //Append nameContainer to card 
    colorContainer.appendChild(nameContainer);
    //Append colorContainer to card
    card.appendChild(colorContainer);
    //Create year release paragraph
    let yearReleaseContainer = document.createElement("p");
    //Set year value
    yearReleaseContainer.innerHTML = "Year release " + data.year;
    yearReleaseContainer.classList.add("yearReleaseContainer");
    //Append yearReleaseContainer to card
    card.appendChild(yearReleaseContainer);
    //Create hex code paragraph
    let hexCodeContainer = document.createElement("p");
    //Set hex value
    hexCodeContainer.innerHTML = data.color;
    hexCodeContainer.classList.add("hexCodeContainer");
    //Append hexCodeContainer to card
    card.appendChild(hexCodeContainer);
    //Create pantone name paragraph
    let pantoneContainer = document.createElement("p");
    //Set pantone value
    pantoneContainer.innerHTML = data.pantone_value;
    pantoneContainer.classList.add("pantoneContainer");
    //Append nameContainer to card
    card.appendChild(pantoneContainer);
    return card;
}