1. //Targeting the input area :

let input = document.querySelector('.searchBox')
input.addEventListener('click', function (e) {
    console.log(e.target)
});
//2. Targeting the search button : 
let search = document.querySelector('.search');
let defBox = document.querySelector('.def');
const result = document.querySelector('.result');
const result2 = document.querySelector('.result2');
const result3 = document.querySelector('.result3');

const audiodiv = document.querySelector('.audio1')
// 3. Targeting the not found data : 

let nodata = document.querySelector('.notFound');

search.addEventListener('click', (e) => {

    // console.log("Button is clicked !!")
    // e.preventDefault() ;

    // 4. Grab the input field by input.value : 
    let string = input.value;
    // console.log(string)
    //5 . Checking the condition of empty string: 
    if (string === '') {
        alert('Type any word to search');
        return;
    }
    else {
        getData(string);
    }

})
async function getData(string) {
    const res = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${string}?key=${`6c8f1203-f2d3-422d-871a-cb80b88ce667`}`)

    const data = await res.json();
    // if no data : 

    if (!data.length) {
        nodata.innerHTML = `<h6> Oops..... :( No Data Found !! Try Another word</h6>`
        return;
    }

    // If results are suggestions : 
    if (typeof data[0] === 'string') {
        let heading = document.createElement('h4');
        heading.innerHTML = `No words like this..Some suggestions for you : `;
        nodata.appendChild(heading);

        data.forEach(element => {
            let suggestions = document.createElement('span');
            suggestions.classList.add('suggestBox');
            suggestions.innerText = element;
            nodata.appendChild(suggestions);
        });
        return;
    }
    console.log(data)

    let defination1 = data[0].shortdef[0];
    // let defination2 = data[0].shortdef[1];
    // let defination3 = data[0].shortdef[2];

    result.innerText = `Definition : ${defination1} `;
    // result2.innerText = `Definition : ${defination2} `;
    // result3.innerText = `Definition : ${defination3} `;
    const sounddata = data[0].hwi.prs[0].sound.audio;

    if(sounddata){
        renderSound(sounddata) ;
    }
}
function renderSound(sounddata){
    // https://media.merriam-webster.com/soundc11

    let subFolder = sounddata.charAt(0) ;
    let soundsrc = `https://media.merriam-webster.com/soundc11/${subFolder}/${sounddata}.wav?key=${`6c8f1203-f2d3-422d-871a-cb80b88ce66`}` ;

    let aud = document.createElement('audio') ;
    aud.src = soundsrc ;
    aud.controls = true ; 
    aud.autoplay = true ;
    result.appendChild(aud) ;
}

