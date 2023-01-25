//TODO: buttons for gallery view and slide view.
let roversData = {};
let camImages = {};
let solInput = 1000;

try {
    fetch(
        "https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=WeFvQLpKAkbQZVpTySYq2aVJjh4HqgIdJoXDHehm"
    )
        .then((x) => x.json())
        .then((data) => {
            roversData = data.rovers;
        })
        .then(() => {
            for (let i = 0; i < roversData.length; i++) {
                if (roversData[i].status == "active") {
                    $("#rovers").append(
                        `<option class="green" value="${roversData[i].id}">${roversData[i].name}</option>`
                    );
                } else if (roversData[i].status == "complete") {
                    $("#rovers").append(
                        `<option class="orange" value="${roversData[i].id}">${roversData[i].name}</option>`
                    );
                }
            }

            console.log(camImages);
        });
} catch (err) {
    console.log(err);
}

$(() => {
    $("#earth_date").hide();

    $("#solInput").on("keypress", (event) => {
        if (event.key == "Enter") {
            RoverCamImgHandler();
        }
    });
});

function CamHandler() {
    var selectedItem = $("#rovers")[0].value;

    if (selectedItem == "none") {
        $("#cams").empty();
        $("#cams").append(`<option value="none">None</option>`);
        $("#roverInfo").empty();
    } else {
        GetCams(parseInt(selectedItem));

        for (let i = 0; i < roversData.length; i++) {
            if (selectedItem == roversData[i].id) {
                $("#roverInfo")[0].innerHTML = `<strong>Name:</strong> ${roversData[i].name}
                                        <strong>Landing Date:</strong> ${roversData[i].landing_date}
                                        <strong>Launch Date:</strong> ${roversData[i].launch_date} 
                                        <strong>Status:</strong> ${roversData[i].status} 
                                        <br>
                                        <strong>Max sol:</strong> ${roversData[i].max_sol}
                                        <strong>Max Date:</strong> ${roversData[i].max_date}
                                        <strong>Total Photos:</strong> ${roversData[i].total_photos}`;
                break;
            }
        }
    }
}

function solHandler() {
    solInput = parseInt($("#solInput")[0].value);
}

function dateHandler() {
    if ($("#date")[0].value == "0") {
        $("#earth_date").hide();
        $("#solInput").show();
        RoverCamImgHandler();
    } else {
        $("#solInput").hide();
        $("#earth_date").show();
        RoverCamImgHandler();
    }
}

function RoverCamImgHandler() {
    var selectedCam = $("#cams")[0].value;
    var earthDate = $("#earth_date")[0].value;
    var selectedRover;
    $("#imageContainer")[0].innerHTML = "<p>No Data!</p>";
    for (let i = 0; i < roversData.length; i++) {
        if ($("#rovers")[0].value == roversData[i].id) {
            selectedRover = roversData[i].name;
        }
    }

    if ($("#date")[0].value == "0") {
        fetch(
            `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos?sol=${solInput}&camera=${selectedCam}&api_key=WeFvQLpKAkbQZVpTySYq2aVJjh4HqgIdJoXDHehm`
        )
            .then((x) => x.json())
            .then((data) => {
                camImages = data.photos;
                console.log(data.photos);
            })
            .then(() => {
                if (camImages.length > 0) $("#imageContainer").empty();

                for (let i = 0; i < camImages.length; i++) {
                    $("#imageContainer").append(
                        `<img src="${camImages[i].img_src}" class="size" />`
                    );
                }
            });
    } else {
        fetch(
            `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos?earth_date=${earthDate}&camera=${selectedCam}&api_key=WeFvQLpKAkbQZVpTySYq2aVJjh4HqgIdJoXDHehm`
        )
            .then((x) => x.json())
            .then((data) => {
                camImages = data.photos;
                console.log(data.photos);
            })
            .then(() => {
                if (camImages.length > 0) $("#imageContainer").empty();

                for (let i = 0; i < camImages.length; i++) {
                    $("#imageContainer").append(
                        `<img src="${camImages[i].img_src}" class="size" />`
                    );
                }
            });
    }
}

function GetCams(id) {
    $("#cams").empty();
    for (let i = 0; i < roversData.length; i++) {
        for (let y = 0; y < roversData[i].cameras.length; y++) {
            if (id == roversData[i].cameras[y].rover_id) {
                $("#cams").append(
                    `<option value="${roversData[i].cameras[y].name}">${roversData[i].cameras[y].full_name}</option>`
                );
            }
        }
    }
}
