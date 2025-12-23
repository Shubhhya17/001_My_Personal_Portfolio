$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Frontend Developer ", "MERN Stack Developer", "Web Developer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Frontend Developer ", "MERN Stack Developer", "Web Developer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});


//form validation 

//const form = document.querySelector("form");
// const fullName = document.getElementById("name");
// const email =document.getElementById("email");
// const subject =document.getElementById("subject");
// const textArea =document.getElementById("text");

// var bodyMessage ="Name :" +fullName +
// "<br>email :" +email +
// "<br>subject :" +subject +
// "<br>textArea :" +textArea ;

// function sendEmail(){
//     // const bodyMessage =`full Name :${fullName.value}<br>Email :${email.value}<br>
//     // subject :${subject.value}<br>textArea :${textArea.value}`;

//     Email.send({
//         secureToken :"92219810-8904-4323-a70c-6363a08d815c",
//        Host : "smtp.elasticemail.com",
//         Username : "shubhpawar1703@gmail.com",
//         Password : "4D193FA411CE84766B33358D678429EC7D91",
//         To : 'shubhpawar1703@gmail.com',
//         From :"shubhpawar1703@gmail.com",
//         Subject :subject.value,
//         Body : bodyMessage
//     }).then(
//       message =>{  
//         if(message =="OK"){
//             swal("Success!", "Message send you successfully..!", "success");
//         }
//         else{
//             swal("Error !", "You clicked the button!", "error");
//         }
//       }
//     );
// }
// form.addEventListener("submit",(e) => {
//     e.preventDefault();

//     sendEmail();
// });

// ====== Contact form handling (robust) ======
(function () {
    const form = document.getElementById("contactForm");
    const fullName = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const textArea = document.getElementById("text");
  
    if (!form) {
      console.error("Contact form not found (#contactForm)");
      return;
    }
  
    // Wait for Email (SMTPJS) to be available. Retries up to ~2.5s total.
    function waitForEmailReady(attempt = 0) {
      if (typeof Email !== "undefined") {
        attachHandler();
        return;
      }
      if (attempt > 25) { // ~25 * 100ms = 2.5s
        console.error("SMTPJS 'Email' did not load. Check network/adblock.");
        return;
      }
      setTimeout(() => waitForEmailReady(attempt + 1), 100);
    }
  
    function attachHandler() {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
  
        // basic validation
        if (!fullName.value.trim() || !email.value.trim() || !subject.value.trim() || !textArea.value.trim()) {
          swal("Error", "Please fill all fields", "error");
          return;
        }
  
        const bodyMessage = `
          Name: ${escapeHtml(fullName.value)}<br>
          Email: ${escapeHtml(email.value)}<br>
          Subject: ${escapeHtml(subject.value)}<br>
          Message: ${escapeHtml(textArea.value)}
        `;
  
        Email.send({
          SecureToken: "92219810-8904-4323-a70c-6363a08d815c", // keep your secure token
          To: "shubhpawar1703@gmail.com",
          From: "shubhpawar1703@gmail.com",
          Subject: subject.value,
          Body: bodyMessage
        }).then(function (message) {
          if (message === "OK") {
            swal("Success!", "Message sent successfully!", "success");
            form.reset();
          } else {
            console.error("SMTPJS response:", message);
            swal("Error!", "Could not send message. Try again later.", "error");
          }
        }).catch(function (err) {
          console.error("Email.send error:", err);
          swal("Error!", "Sending failed. Check console.", "error");
        });
      });
    }
  
    // small helper to avoid HTML injection in message (keeps basic text)
    function escapeHtml(str) {
      return str.replace(/[&<>"'`]/g, function (m) {
        return ({
          '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '`': '&#96;'
        })[m];
      });
    }
  
    // start waiting
    waitForEmailReady();
  })();
  