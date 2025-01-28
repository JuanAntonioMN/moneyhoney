const menuToggle = document.getElementById("menu-toggle");
 
	const mobileMenu = document.getElementById("mobile-menu");
	const icono=document.getElementById("icono");

	menuToggle.addEventListener("click", () => {
		mobileMenu.classList.toggle("hidden");
		
	if (icono.classList.contains("fa-bars")) {
    icono.classList.replace("fa-bars", "fa-xmark");
   
    } else {
      icono.classList.replace("fa-xmark", "fa-bars");
     
    }
		
		
});
