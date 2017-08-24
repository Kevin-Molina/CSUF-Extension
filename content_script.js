// Handle page's frame (to allow DOM access)
var page = top.frames["TargetContent"].document;


// Use CDN instead of local file
var style = document.createElement('link');
style.href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
style.rel = 'stylesheet';

// Append to head of frame
top.frames["TargetContent"].document.head.appendChild(style);

// Add custom styling (Done this way due to insertCSS bug)
var popoverStyle = document.createElement('style');
popoverStyle.innerHTML = ".popover-title { color: white; background-color: #e17000;} " + 
                         ".popover { color: white; background-color: #00274C;";
page.head.appendChild(popoverStyle);



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
            pageCheck(this.response,professorEl);

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
    var ProfURL = page.getElementsByClassName('listing PROFESSOR')[0].childNodes[1].href

    // If the element exists, we have a hit (and the prof's page!)
    if (ProfURL) {
        // Link to the prof's RMP page
        addAnchor(element, ProfURL);    

        // Access the prof's specific RMP page
        var xhr1 = new XMLHttpRequest();

        // Create box to display prof info on hover
        xhr1.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                addPopover(this.response,element);
            }
        }

        xhr1.open('GET', ProfURL);
        xhr1.responseType = 'document';
        xhr1.send();

    }
    
}

function addPopover(profPage,profElement) {

    // Retrieve & Format Professor Data
    var name = profElement.textContent;
    var quality = profPage.getElementsByClassName('grade')[0].textContent;    
    var difficulty = profPage.getElementsByClassName('grade')[2].textContent;
    var ratings = profPage.getElementsByClassName('table-toggle rating-count active')[0].textContent;
    ratings = ratings.trim();
    
    // Concatenate into 1 string
    var content = "Overall Quality: " + quality + "<br />" + "Difficulty: " + difficulty + "<br />" + ratings;
   
    // Set attributes for popover
    profElement.setAttribute("data-toggle","popover");
    profElement.setAttribute("data-trigger","hover");
    profElement.setAttribute("title",name);
    profElement.setAttribute("data-content",content);
    profElement.setAttribute("data-html",true);
    

    $(profElement).popover();
   

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

    // Opens in new window/tab
    a.setAttribute('target', '_blank');
    wrapper.replaceChild(a, wrapper.firstChild);
}


