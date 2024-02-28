var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 50;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

function changeCard1() {

  var website = document.getElementById("website");
  var webapp = document.getElementById("webapp");
  var button1 = document.getElementById("toggle1");
  var button2 = document.getElementById("toggle2");

  website.classList.remove('d-none');
  webapp.classList.add('d-none');
  button1.classList.add('active');
  button2.classList.remove('active');
  button1.classList.add('text-warning');
  button2.classList.remove('text-warning');

}


function changeCard2() {

  var website = document.getElementById("website");
  var webapp = document.getElementById("webapp");
  var button1 = document.getElementById("toggle1");
  var button2 = document.getElementById("toggle2");

  website.classList.add('d-none');
  webapp.classList.remove('d-none');
  button2.classList.add('active');
  button1.classList.remove('active');
  button2.classList.add('text-warning');
  button1.classList.remove('text-warning');

}

function sendMessage() {

  var name = document.getElementById("name");
  var mobile = document.getElementById("mobile");
  var email = document.getElementById("email");
  var subject = document.getElementById("subject");
  var message = document.getElementById("message");

  var form = new FormData();

  form.append('n', name.value);
  form.append('m', mobile.value);
  form.append('e', email.value);
  form.append('s', subject.value);
  form.append('msg', message.value);

  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      var response = request.responseText;
      if (response == "success") {
        alert("Message Sent Successfully");
        window.location.reload();
      } else {
        
      }
    }
  }

  request.open('POST', 'send-message.php', true);
  request.send(form);

}