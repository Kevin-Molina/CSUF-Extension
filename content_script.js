// Handle page's frame (to allow DOM access)
var page = top.frames["TargetContent"].document;

// Reference every professor listed and modify the registration page
Array.from(page.querySelectorAll("[id^='MTG_INSTR$']") ).forEach( el => {
    if (el.textContent == "Staff") {
        return;
    }

    // For every professor found, search for RMP page
    searchProfessor(el)
  

});



/**
 * Search for professor on RMP, then pass along to pageCheck
 * 
 * @param {Reference to prof} professorEl 
 */
function searchProfessor(professorEl) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            pageCheck(this,professorEl);

        }
    }

    // Search RMP using CSUF + Prof Name 
    xhr.open('GET', 'https://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=california+state+university+fullerton&schoolID=&query=' + professorEl.textContent +'&_action_search=Search');
    xhr.responseType = 'document';
    xhr.send();
}



/**
 * Verify prof's page exists and modify registration page
 * 
 * @param {DOM Obj} page 
 * @param {Reference to prof} element 
 */
function pageCheck(page,element){

    var ProfURL = page.response.getElementsByClassName('listing PROFESSOR')[0].childNodes[1].href

    // If the element exists, we have a hit (and the prof's page!)
    if (ProfURL) {
        // Link to the prof's RMP page
        addAnchor(element, ProfURL);    

        // Access the prof's specific RMP page
        var xhr1 = new XMLHttpRequest();

        // Create box to display prof info on hover
        xhr1.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // TODO
            }
        }

        xhr1.open('GET', ProfURL);
        xhr1.responseType = 'document';
        xhr1.send();

    }
    
}



/**
 * Assign hyperlink to element 
 * 
 * @param {Element} wrapper 
 * @param {String} URL 
 */
function addAnchor (wrapper, URL) {
  var a = document.createElement('a');
  a.href = URL;
  a.textContent = wrapper.textContent;
  wrapper.replaceChild(a, wrapper.firstChild);
}

