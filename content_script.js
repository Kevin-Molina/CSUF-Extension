var xhr = new XMLHttpRequest();
// TODO: Use names pulled from CSUF's page (In an array)
var name = "alan ken";

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        pageLoaded(this);
    }
}

// Search RMP using CSUF + Prof Name 
// TODO: Add inside Array loop (search for every prof)
xhr.open('GET', 'https://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=california+state+university+fullerton&schoolID=&query=' + name +'&_action_search=Search');
xhr.responseType = 'document';
xhr.send();


function pageLoaded(page){

    var ProfURL = page.response.getElementsByClassName('listing PROFESSOR')[0].childNodes[1].href
    // If the node exists, we have a hit (and the prof's page!)
    if (ProfURL) {
        // TODO
    }
    
}

/*

// Handle page's frame (to allow DOM access)
var page = top.frames["TargetContent"].document;

// Reference every professor listed
Array.from(page.querySelectorAll("[id^='MTG_INSTR$']") ).forEach( el => {
    if (el.textContent == "Staff") {
        return;
    }

  el.textContent = "Test";
});

*/
