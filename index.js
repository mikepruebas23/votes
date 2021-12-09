//Global vars/const/DOM
var bOnLoad = true;
const list = [];
const nameCollection = 'vote';
var divList = document.getElementById('list');
var contBtn = document.getElementById('contBtn');
var stock = document.getElementById('name');
var frase = document.getElementById('comment');
var onLoad = document.getElementById('onLoad');
var anuncio = document.getElementById('anuncio');
var isVoted = false;
var isOnDate;
var today;
var iCont = 0;
function verifyVoteByDate(){

    today = new Date() ; //Today Date 
    // today = new Date(today);
    // today.setDate(today.getDate() + 1);
    console.log(today);
    isOnDate = localStorage.getItem("yourLocalDate");

    // isVoted = true;
    if(isVoted){
        localStorage.setItem("yourLocalDate", today);
    }
    else if(isOnDate) {
        console.log(isOnDate);
        // isVoted = true;
        if(compareDates(today, isOnDate)){
            isVoted = false;
            localStorage.removeItem("yourLocalDate");
            verifyVoteByDate();
        }
    }
    else {
        //si puede dar un voto el dia de hoy
        // los botones deben estar desbloqueados
        console.log("Puede votar.");
    }

    // var yestarday = new Date(today);
    // yestarday.setDate(yestarday.getDate() - 1);
    // var tomorrow = new Date(today);
    // tomorrow.setDate(tomorrow.getDate() + 1);
}

function update(idCollection) {

    if(isVoted || isOnDate){
        createAlert("OOOPS!", "No puedes votar el dia de hoy, intentalo mañana.",2);
        return;
    }
    else {

        let matches = document.querySelector('button')
        let btn = document.getElementById('btn'+idCollection);
        divList.classList.remove("dflex");
        divList.classList.add("dnone");

        // newDiv.innerHTML = "Cargando...";
        // newDiv.classList.add("cargando");
        // divList.appendChild(newDiv);

        // btn.disabled = true;
        // matches.disabled = true;
        
        bOnLoad = true;
        checkLoad();
        
        // console.log("idCollection: ",idCollection);
        for(i = 0; i<list.length; i++){
            if(list[i].uid === idCollection){
                db.collection(nameCollection).doc(idCollection).update({
                    votes: list[i].votes +1 ,
                })
                .then(() => {
                    isVoted = true;
                    verifyVoteByDate();
                    createAlert("Excelente!", "tu voto se agrego correctamente.", 1);
                    for (let i = list.length; i > 0; i--) {
                        list.pop();
                    }
                    getData();
                })
                .catch((error) => {
                    console.error("Error al votar : ", error);
                });
                break;
            }
        }
    }
}
async function getData() {
    await db.collection(nameCollection).orderBy('votes', 'desc').get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
        list.push(doc.data());
        bOnLoad = false;
      })
    }).catch((error) => {
        console.error("Error | refesque la pagina o avise al desarrollador: ", error);
    });
    renderList();
}
function renderList(){
    if(getRandonNumber() == 43 ){
        createAlert("Felicidades","Has ganado el nuevo disco de SANTA RM, comunicate con mikerm para mas información",1)
    }
    checkLoad(); // revisa si esta cargado los datos
    divList.classList.remove("dnone");
    divList.classList.add("dflex");
    while ( divList.firstChild ) divList.removeChild( divList.firstChild );

    for(i = 0; i<list.length; i++){
        let newDiv = document.createElement("div");
        let newComent = document.createElement("div");
        let Img = document.createElement("img");
        let contentImg = document.createElement("div");
        let content = document.createElement("div");

        newDiv.innerHTML = list[i].name;
        newComent.innerHTML = list[i].votes;

        Img.setAttribute("src", "./kraken.jfif")
        content.setAttribute("id", list[i].uid);

        newDiv.classList.add("titulo");
        content.classList.add("w50");
        newComent.classList.add("votes");
        
        contentImg.appendChild(Img);
        content.appendChild(contentImg);
        content.appendChild(newComent);
        content.appendChild(newDiv);

        let button = document.createElement('button');
        button.innerHTML = 'Votar';
        button.classList.add("btn");
        button.setAttribute("id", 'btn'+list[i].uid);
        button.setAttribute("onClick", `update('${list[i].uid}')`);
        content.appendChild(button);

        divList.appendChild(content);
    }
}
function createAlert(title,message,typeMessage){
    let type;
    typeMessage == 1 ?  type = 'success' :  type = 'error';
    Swal.fire( title,message,  type );
}
function checkLoad(){
    if(!bOnLoad) {
        onLoad.classList.remove("block");
        onLoad.classList.add("dnone");
    }
    else {
        onLoad.classList.remove("dnone");
        onLoad.classList.add("block");
    }
}
const prhases = [
    '🔥 Vota por tu cancíon favorita! 🔥',
    'Un voto por día 👌',
    '👅 Instagram elmikerm 👅',
    '🦑 TEAM KRAKEN 🦑',
    '🙏 Invita a tus amigos a votar 🙏'
]
function changeNavText(){
    setInterval(()=> { contador() }, 5 * 1000);
}
function contador(){
    anuncio.innerHTML = prhases[iCont];
    iCont++;
    iCont == prhases.length ? iCont = 0 : null;
    // console.log(this.iCont);

}
function getRandonNumber() {  
    return Math.floor(Math.random() * 79) + 1;
}
function compareDates(today, yestarday){
    const date1 = new Date(today);
    const date2 = new Date(yestarday);
    let response = false;

    if(date1.getDay() > date2.getDay()){
        console.log(`${today} is greater than ${yestarday} in terms of days`);
        console.log(today, yestarday);
        response = true;
    } else {
        console.log(`ELSE`);
        console.log(today, yestarday);
    }
    return response;
}

changeNavText();
verifyVoteByDate();
getData();

// 211