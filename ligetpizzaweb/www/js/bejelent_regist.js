    function myMenuFunction() {
     var i = document.getElementById("navMenu");
     if(i.className === "nav-menu") {
         i.className += " responsive";
     } else {
         i.className = "nav-menu";
     }
    }
     const a = document.getElementById("loginBtn");
     const b = document.getElementById("registerBtn");
     const x = document.getElementById("login");
     const y = document.getElementById("register");
     function login() {
         x.style.left = "4px";
         y.style.right = "-520px";
         a.className += " white-btn";
         b.className = "btn";
         x.style.opacity = 1;
         y.style.opacity = 0;
     }
     function register() {
         x.style.left = "-560px";
         y.style.right = "5px";
         a.className = "btn";
         b.className += " white-btn";
         x.style.opacity = 0;
         y.style.opacity = 1;
     }