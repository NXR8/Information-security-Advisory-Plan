// zoom parameter to determine what is the zoom size and to select the coures by click not by hover when zoom 
var z = 1; 

function remove_highlights_normal_mode() { //Remove highlight from items
    if(z < 1.01)
        [...document.getElementsByTagName('div'), ...document.getElementsByTagName('section')].forEach(
            course => {if(/course/.test(course.className)) course.className = 'course'});
}
function get_requirements(me) {
    [...document.getElementsByTagName('div'), ...document.getElementsByTagName('section')].forEach(
        course => {if(/course/.test(course.className)) course.className = 'course transparent'});
    me.className = 'course course_to_get_requisites appear'; //highlight the item
    let direct_requisites = courses.find((course) => course[1] === me.id)[2]; //find direct requisites items
    //highlight direct requisites items
    direct_requisites.forEach(req => {document.getElementById(req).className = 'course direct_requisites appear';});
    //find indirect requisites items
    let indirect_requisites = [];
    let preReqs = direct_requisites;
    let newReqs = [''];
    while(newReqs.length > 0){    
        newReqs = [];
        preReqs.forEach(req => newReqs.push(...courses.find((course) => course[1] === req)[2]));
        newReqs = [...new Set(newReqs.filter(course => !direct_requisites.includes(course)))];
        preReqs = newReqs;
        indirect_requisites.push(...newReqs);
    }
    //highlight indirect requisites items
    indirect_requisites.forEach(req => {document.getElementById(req).className = 'course indirect_requisites appear';});
    //find requisite for items
    let requisite_for = [];
    preReqs = [me.id];
    newReqs = [''];
    while(newReqs.length > 0){    
        newReqs = [];
        preReqs.forEach(req => newReqs.push(...courses.filter((course) => 
            course[2].includes(req)).map(course => course[1])));
        preReqs = newReqs = [...new Set(newReqs)];
        requisite_for.push(...newReqs);
    }
    //highlight requisite for items
    requisite_for.forEach(req => {document.getElementById(req).className = 'course requisite_for appear';});
}
function get_and_remove_normal_mode(me) {
    if(z < 1.01) {
        [...document.getElementsByTagName('div'), ...document.getElementsByTagName('section')].forEach(
            course => {if(/course/.test(course.className)) course.className = 'course'});
        get_requirements(me);
    }
}
function get_and_remove_zoom_mode(me) {
    if(z >= 1.01) {
        [...document.getElementsByTagName('div'), ...document.getElementsByTagName('section')].forEach(
            course => {if(/course/.test(course.className)) course.className = 'course'});
        get_requirements(me);
    }
}
function zoomin() {
    if(z < 2) {
        z = (z+.1)*1.1;
        document.getElementsByTagName('html')[0].style.fontSize = `${z*9}vw`;
        if(z > 2.2) document.getElementById('magnifier').style.textDecoration = 'line-through';
    } 
    if(z < 1.3) document.getElementById('smagnifier').style.textDecoration = 'none';
}
function zoomout() {
    if(z > 1.2) {
        z = z/1.1 - .1;
        document.getElementsByTagName('html')[0].style.fontSize = `${z*9}vw`;
        if(z < 1.02) document.getElementById('smagnifier').style.textDecoration = 'line-through';
    } 
    if(z > 1.9) document.getElementById('magnifier').style.textDecoration = 'none';
}
// function dbclick(me) {
//     me.lastChild.style.display = "block";
//     document.getElementById('dbclickInfo').style.textShadow = `0 0 .1rem red, 0 0 .2rem red, 0 0 .3rem red, 
//         0 0 .4rem red, 0 0 2rem red, 0 0 1.1rem red, 0 0 1.2rem red, 0 0 1.3rem red, 0 0 1.4rem red`;
//     setTimeout(() => { 
//         me.lastChild.style.display = "none"; 
//         document.getElementById('dbclickInfo').style.textShadow = "0 0 .5rem black";
//     }, 500);
// }
// function search_on_google(me) {
//     const coures = me.parentElement;
//     window.open("https://www.bzu-hub.com/_/search?query=" + coures.firstChild.innerText.replaceAll(' ', '+')
//         + "+" + coures.id);
// }
var timer = null;
const bgig = "repeating-linear-gradient(-45deg, transparent 0, transparent 4vw, lightgreen 4vw, lightgreen 5vw)";
const bsg = "0 0 .1rem lightgreen, 0 0 .2rem lightgreen, 0 0 .3rem lightgreen, 0 0 .4rem green";
const bgib = "repeating-linear-gradient(-45deg, transparent 0, transparent 4vw, lightskyblue 4vw, lightskyblue 5vw)";
const bsb = "0 0 .1rem lightskyblue, 0 0 .2rem lightskyblue, 0 0 .3rem lightskyblue, 0 0 .4rem green";

function setAsTaken(me) {
    if(takenMode) {
        console.log("setAsTaken Function\n-----------------");
        if(me.id.length > 2) { ;
            timer = setTimeout(function() { 
                if(coursesTaken.indexOf(me.id)>=0) coursesTaken.splice(coursesTaken.indexOf(me.id), 1);
                else coursesTaken.push(me.id);
                setCoursesTaken();
                console.log("= " + coursesTaken);
            }, 250);
        }
    }
}
function uuu() {
    if(takenMode) {
        clearInterval(timer);
        console.log("UP");
    }
}
var timer2 = null;
let isdb = false;
function cdbclick() {
    clearInterval(timer2);
    if(isdb) {
        clearAllCourses();
        isdb = false;
    }
    else {
        isdb = true;
        timer2 = setTimeout(() => { 
            isdb = false;
        }, 500);
    }
}
function clearAllCourses() {
    if(takenMode) {
        coursesTaken = [];
        setCoursesTaken();
    }
}
function setCoursesTaken() {
    if(takenMode) {
        console.log("courses: " + courses.map(c => c[1]).filter(cid => cid.length > 2));
        courses.map(c => c[1]).filter(cid => cid.length > 2).forEach(cid => {
            document.getElementById(cid).style.backgroundImage = "";
            document.getElementById(cid).style.boxShadow = "";
        });
        let requisite_for = [];
        requisite_for.push(...courses.filter(c => Array.isArray(c[2])).filter(course =>
            course[2].length>0 ? course[2][0]!=='-' && course[2].every(req => coursesTaken.includes(req)) : true).map(course => course[1]));
        requisite_for = requisite_for.filter(reqForId => !coursesTaken.includes(reqForId));
        requisite_for.forEach(req => {
            document.getElementById(req).style.backgroundImage = bgib;
            document.getElementById(req).style.boxShadow = bsb;
        });
        coursesTaken.forEach(cid => {
            document.getElementById(cid).style.backgroundImage = bgig;
            document.getElementById(cid).style.boxShadow = bsg;
        });
    }
}

var takenMode = false;
function changeTakenCoursesMode() {
    if(takenMode) {
        courses.map(c => c[1]).filter(cid => cid.length > 2).forEach(cid => {
            document.getElementById(cid).style.backgroundImage = "";
            document.getElementById(cid).style.boxShadow = "";
        });
        takenMode = false;
        takenCoursesMode.innerHTML = '&#x1F534;<div class="note">وضع تثبيت المواد المأخوذة (<b style="color:lightgreen">أخضر</b>: مأخوذة، <b style="color:lightskyblue">أزرق</b>: تستطيع تسجيلها)</div>';
    }
    else {
        takenMode = true;
        setCoursesTaken();
        takenCoursesMode.innerHTML = '&#x1F7E2;<div class="note">وضع تثبيت المواد المأخوذة (<b style="color:lightgreen">أخضر</b>: مأخوذة، <b style="color:lightskyblue">أزرق</b>: تستطيع تسجيلها)</div>';
    }
}

if(!localStorage.getItem("bzu-hub Advisory Plan")) localStorage.setItem("bzu-hub Advisory Plan", "[]");
let coursesTaken = JSON.parse(localStorage.getItem("bzu-hub Advisory Plan"));
// setTimeout(() => {setCoursesTaken()}, 50);

window.onbeforeunload = function() {
    localStorage.setItem("bzu-hub Advisory Plan", JSON.stringify(coursesTaken));
}