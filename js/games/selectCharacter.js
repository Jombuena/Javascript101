
function setContent(id, content) {
    return document.getElementById(id).innerHTML = content;
}

arrActors = [];
arrActors[0] = [];
arrActors[1] = [];

arrActors[0][0] =  {id: 1, name: 'Takuma', str: "7", def:"7", vit:"6"};
arrActors[0][1] =  {id: 2, name: 'Kortes', str: "10", def:"8", vit:"9"};
arrActors[0][2] =  {id: 3, name: 'Kiddy', str: "2", def:"3", vit:"6"};
arrActors[0][3] =  {id: 4, name: 'Kebab', str: "3", def:"2", vit:"2"};
arrActors[1][0] =  {id: 5, name: 'Kim Kalpert', str: "2", def:"3", vit:"6"};
arrActors[1][1] =  {id: 6, name: 'Kindows3.1', str: "3", def:"3", vit:"3"};
arrActors[1][2] =  {id: 7, name: 'Dr Kidwel', str: "4", def:"7", vit:"6"};
arrActors[1][3] =  {id: 8, name: 'Kindows Original', str: "4", def:"4", vit:"4"};

characters = [];
arrActors.forEach(row => {
    row.forEach(champ  => {
        characters.push(champ);
    });
});

const totalRows = 2;
const totalCols = 4;
let activeActor = 1;

setActiveActor(1);

function setActiveActor(index) {

    activeActor = index;
    let urlMarquee = "res/characters/p1marquee.gif";
    const $selectedActorCell = $(`.characterSelector td[actorId="${index}"]`);
    $selectedActorCell.css('background-image', 'url("'+ urlMarquee +'")');
    setActorStats();
}

let content = '<table class="characterSelector">';
for (let row=0; row<totalRows; row++) {
    content += '<tr>';
    for (let col=0; col<totalCols; col++) {

        let actor = arrActors[row][col];
        content +=
            `
            <td actorId="${actor.id}">
                <img src="res/characters/${actor.id}.jpg"/>
            </td>
            `
    }
    content += '</tr>';
}
content += '</table>';

setContent('characterSelection',content);

setActiveActor(1);

function setActorStats() {
    setContent('characterName', characters.find(x => x.id === activeActor).name);

    ['str','def','vit'].forEach(stat => {
        setContent(`p1${stat}`,`<img src="res/characters/stats${characters.find(x=> x.id === activeActor)[stat]}.png" style="margin-top: -33px;" />`);
    });
}

function disableActiveActor() {
    let urlMarquee = "res/characters/marquee.png";
    const $selectedActorCell = $(`.characterSelector td[actorId="${activeActor}"]`);
    $selectedActorCell.css('background-image','url("'+ urlMarquee + '")');
}

$("body").keydown(function(e) {
    var zap = createAudio();

    switch (e.keyCode){
        case 87: // up
            if (activeActor >= 5) {
                disableActiveActor();
                activeActor -= 4;
                zap.play();
                setActiveActor(activeActor);
            }
            break;
        case 65: // left
            if (activeActor > 1) {

                disableActiveActor();
                activeActor--;
                zap.play();
                setActiveActor(activeActor);
            }
            break;
        case 83: //down
            if (activeActor <= 4) {
                disableActiveActor();
                activeActor += 4;
                zap.play();
                setActiveActor(activeActor);
            }
            break;
        case 68: // right
            if (activeActor < 8) {
                disableActiveActor();
                activeActor++;
                zap.play();
                setActiveActor(activeActor);
            }
            break;
    }
});

function createAudio() {

    var audio = document.createElement('audio');
    audio.volume = 0.25;
    audio.loop;
    audio.src    = 'res/sounds/charactersound.mp3';
    return audio;
}

// function createBacktrack() {
//     var audio = document.createElement('audio');
//     audio.volume = 0.15;
//     audio.loop;
//     audio.src  = 'res/sounds/echovalley.mp3';
//     return audio;
//
// }
// var test = createBacktrack();
// test.play();
