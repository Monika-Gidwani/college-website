'use strict';

document.addEventListener('DOMContentLoaded',function(){

const links=document.querySelectorAll('.syllabus-sidebar__nav a');

const sections=document.querySelectorAll('.syllabus-section');

links.forEach(link=>{

link.addEventListener('click',function(e){

e.preventDefault();

const id=this.dataset.section;

/* hide sections */

sections.forEach(s=>s.classList.remove('sy-visible'));

/* show target */

document.getElementById(id).classList.add('sy-visible');

/* update active */

links.forEach(l=>l.classList.remove('sy-active'));

this.classList.add('sy-active');

});

});

});