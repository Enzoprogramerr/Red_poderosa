let body = document.getElementsByTagName("body");
let page = body[0];
let subbody = document.getElementsByClassName("navegation");
let subpage = subbody[0];

function change(){
    page.classList.toggle("lightMode")
    subpage.classList.toggle("lightMode")
};