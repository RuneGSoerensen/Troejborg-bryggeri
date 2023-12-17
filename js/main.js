
// Navigations javascript

/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)
 
    toggle.addEventListener('click', () =>{
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu')
 
        // Add show-icon to show and hide the menu icon
        toggle.classList.toggle('show-icon')
    })
 }
 
 showMenu('nav-toggle','nav-menu')


// Slider css starter her.
 
 const carousel = document.querySelector(".carousel"),
 firstImg = carousel.querySelectorAll("img")[0],
 arrowIcons = document.querySelectorAll(".wrapper i");
 
 let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
 
 const showHideIcons = () => {
     // Viser og skjuler "prev/next" ikonner henholdsvis til ".carousel" scroll left værdi.
     let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
     arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
     arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
 }
 
 arrowIcons.forEach(icon => {
    // Et eventlistner der lytter efter et museklik.
     icon.addEventListener("click", () => {
         let firstImgWidth = firstImg.clientWidth + 14;
         // if clicked icon is left, reduce width value from the carousel scroll left else add to it
         // når der et klik reducere width værdi fra .carousel scroll left, ellers tilføjere den.
         carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
         setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
     });
 });
 
 const autoSlide = () => {
     // Hvis der ikke er et billede at scrolle hentil, stopper den her.
     if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;
 
     positionDiff = Math.abs(positionDiff); // Laver posistionDuff værdi til posistive.
     let firstImgWidth = firstImg.clientWidth + 14;
     // Får forskelle i værdi som der bruges til at øge eller reducere .carousel left, for at centere det midterste billede.
     let valDifference = firstImgWidth - positionDiff;
 
     if(carousel.scrollLeft > prevScrollLeft) { // hvis brugeren scroller til højre.
         return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
     }
     // hvis brugeren scroller til venstre.
     carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
 }
 
 const dragStart = (e) => {
     // opdatere global variable's værdi når mouse knappe holdens nede.
     isDragStart = true;
     prevPageX = e.pageX || e.touches[0].pageX;
     prevScrollLeft = carousel.scrollLeft;
 }
 
 const dragging = (e) => {
     // Scroller billeder/carousel til venstre henholdsvis med musen
     if(!isDragStart) return;
     e.preventDefault();
     isDragging = true;
     carousel.classList.add("dragging");
     positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
     carousel.scrollLeft = prevScrollLeft - positionDiff;
     showHideIcons();
 }
 
 const dragStop = () => {
     isDragStart = false;
     carousel.classList.remove("dragging");
 
     if(!isDragging) return;
     isDragging = false;
     autoSlide();
 }
 
// Her er alle event listeners, som er dem som lytter hvornår noget bliver triggeret
// feks når du trykker musen ned.

 carousel.addEventListener("mousedown", dragStart);
 carousel.addEventListener("touchstart", dragStart);
 
 document.addEventListener("mousemove", dragging);
 carousel.addEventListener("touchmove", dragging);
 
 document.addEventListener("mouseup", dragStop);
 carousel.addEventListener("touchend", dragStop);