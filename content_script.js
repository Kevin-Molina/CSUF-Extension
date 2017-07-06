var page = top.frames["TargetContent"].document;

Array.from(page.querySelectorAll("[id^='MTG_INSTR$']") ).forEach( el => {
    if (el.textContent == "Staff") {
        return;
    }

  el.textContent = "Test";
});
