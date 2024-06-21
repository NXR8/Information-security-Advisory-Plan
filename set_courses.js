document.getElementById('title').innerHTML = title;
document.getElementById('link').children[0].innerHTML = link_title;
document.getElementById('link').children[0].href = url;
document.getElementById('link').title = link_more_info;

//new
document.getElementById('magnifier').className = 'top_corner';
document.getElementById('smagnifier').className = 'top_corner';

// new!
const dbclickInfo = document.createElement('span');
dbclickInfo.id = 'dbclickInfo';
// dbclickInfo.className = 'top_corner';
// dbclickInfo.innerHTML = '&#x1F5B1;<div class="note">أنقر مرتين على المساق للمزيد من المعلومات عنه</div>';
document.getElementById('mContainer').insertBefore(dbclickInfo, document.getElementById('magnifier'));

// new!
const clearCourses = document.createElement('span');
clearCourses.id = 'clearCourses';
clearCourses.className = 'top_corner';
clearCourses.addEventListener('click', () => cdbclick(this));
clearCourses.innerHTML = '&#x1F327;<div class="note">أنقر هنا مرتين لمسح المساقات المسجلة</div>';
document.getElementById('mContainer').insertBefore(clearCourses, document.getElementById('dbclickInfo'));

// new!
const takenCoursesMode = document.createElement('span');
takenCoursesMode.id = 'takenCoursesMode';
takenCoursesMode.className = 'top_corner';
takenCoursesMode.addEventListener('click', () => changeTakenCoursesMode(this));
takenCoursesMode.innerHTML = '&#x1F534;<div class="note">أنقر لتفعيل/إزالة نمط تحديد المواد المأخوذة (<b style="color:lightgreen">أخضر</b>: مأخوذة، <b style="color:lightskyblue">أزرق</b>: تستطيع تسجيلها)<br>ضغطة طويلة لتحديد المادة المأخوذة أو إزالتها</div>';
document.getElementById('mContainer').insertBefore(takenCoursesMode, document.getElementById('clearCourses'));

let str = '<h3 class="year">Year 1</h3><div class="semester1"><h4>Semester 1</h4>';
let str2 = '', i = 2;
for(let course of courses) {
    if(typeof(course) === 'string') {
        i++;
        str2 += str + '</div>';
        str = i%2 === 1 ? `<div class="semester${i%2 + 1}"><h4>Semester 2</h4>` : '<h3 class="year">Year ' 
            + parseInt(i/2) + `</h3><div class="semester${i%2 + 1}"><h4>Semester 1</h4>`;
    }
    else {
        str += `<${typeof(course[course.length - 1]) === 'number' ? 'section' : 'div'} id="${course[1]}" 
        class="course" onmouseleave="remove_highlights_normal_mode()" 
        onmouseover="get_and_remove_normal_mode(this)" onclick="get_and_remove_zoom_mode(this) 
        dbclick(this)" onmousedown="setAsTaken(this)" ontouchstart="setAsTaken(this)" ontouchend="uuu()" 
        onmouseup="uuu()"><div>${course[0]}</div><div>${course[1]}</div>${course[3] ? 
        `<div class="note">${course[3]}</div>`:''} <div class="dbclicked" onclick="search_on_google(this)">
        </div></${typeof(course[course.length - 1]) === 'number' ? 'section' : 'div'}>`;
    }
}
document.getElementById('schedule').innerHTML = str2 + str + '</div>' 
    + document.getElementById('schedule').innerHTML;

document.getElementsByTagName('html')[0].style.transform = `scale(${1.1/i})`;
document.getElementsByTagName('body')[0].style.left = `-${(i*22.5 - 33.5)*2}%`;
document.getElementById('guide').style.gridColumn = `1/${i}`;
document.getElementById('guide').style.fontSize = `${i/11}rem`;