const open = document.getElementById('open')
const nav = document.getElementById('nav')
const close = document.getElementById('close')
const links = document.getElementById('links')
const linkItems = links.querySelectorAll('li a');

const liItems = links.querySelectorAll('li');

const openSvg = document.getElementById('open-svg')
const checkbox = document.getElementById('darkmode-toggle');
const checkboxLanguages = document.getElementById('languages-toggle');

const logo = document.getElementById('logo')
const spanElement = document.getElementById('span');


// event listener para abrir modal
open.addEventListener('click', ()=> {
	links.classList.add('view-links')
	document.body.style.overflow = 'hidden'
})

// event listener para cerrar modal
close.addEventListener('click', ()=> {
	links.classList.remove('view-links')
	document.body.style.overflow = 'auto'
})

// event listener para cerrar modal al desplazarce hacia una seccion
liItems.forEach(li => {
  li.addEventListener('click', () => {
    links.classList.remove('view-links')
    document.body.style.overflow = 'auto'
  });
});


// event listener para el header
window.addEventListener('scroll', function() {
    var scrollY = window.scrollY || window.pageYOffset;

    // Calcula la opacidad en función del desplazamiento
    var alpha = Math.min(1.0, scrollY / 100);

    // Calcula la opacidad para el box-shadow y el desenfoque (puedes ajustar estos valores según tus necesidades)
    var shadowOpacity = Math.min(0.3, scrollY / 200);
    var blurAmount = Math.min(10, scrollY / 50);

    // Ajusta los valores de la box-shadow para reducir la intensidad
    var boxShadowIntensity = 0.1; // Ajusta según sea necesario

    // Establece el color de fondo, el box-shadow y el efecto de vidrio esmerilado del nav con las opacidades y desenfoque calculados
    nav.style.backgroundColor = 'rgba(255, 255, 255, ' + alpha + ')';
    nav.style.boxShadow = '0 2px 4px rgba(0, 0, 0, ' + (shadowOpacity * boxShadowIntensity) + ')';
    nav.style.backdropFilter = 'blur(' + blurAmount + 'px)';

    if (scrollY > 0) {
      logo.classList.add('black-color');
      openSvg.style.color = 'rgba(0, 0, 0)';
      spanElement.classList.add('black-background');
      
     // Selecciona los elementos li dentro de links y luego selecciona los enlaces dentro de ellos
      linkItems.forEach(link => {
        link.classList.add('black-color');
      });

    } else {
      logo.classList.remove('black-color');
      spanElement.classList.remove('black-background');
      openSvg.style.color = 'var(--black)';

      linkItems.forEach(link => {
        link.classList.remove('black-color');
      });

    }
});


// event listener para el darkmode
checkbox.addEventListener('change', function() {
  // Cuando el checkbox es marcado, cambia el estilo del body
  if(this.checked) {
    document.documentElement.style.setProperty('--white', '#000');
    document.documentElement.style.setProperty('--background', '#333');
    document.documentElement.style.setProperty('--black', 'white');
  } else {
    // Cuando el checkbox no está marcado, vuelve a los estilos originales
    document.documentElement.style.setProperty('--black', '#000');
    document.documentElement.style.setProperty('--background', '#eee');
    document.documentElement.style.setProperty('--white', '#fff');
  }
});


function parallax(e) {
  if (e) {
    const svgElements = document.querySelectorAll('.container-absolute svg');

    svgElements.forEach((svg, index) => {
      const speed = svg.getAttribute('data-speed') || 2; // Puedes ajustar la velocidad predeterminada según sea necesario
      const rect = svg.getBoundingClientRect();

      if (index % 2 !== 0) {
        // Aplica la lógica de parallax a los elementos impares
        const x = (rect.width - e.pageX * speed) / 100;
        const y = (rect.height - e.pageY * speed) / 100;
        svg.style.transform = `translateX(${x}px) translateY(${y}px)`;
      } else {
        // Aplica la lógica de parallax inversa a los elementos pares
        const x = -(rect.width - e.pageX * speed) / 100;
        const y = -(rect.height - e.pageY * speed) / 100;
        svg.style.transform = `translateX(${x}px) translateY(${y}px)`;
      }
    });
  }
}

// event listener para los iconos de fondo
document.addEventListener('mousemove', parallax);

checkboxLanguages.addEventListener('change', function() {
  if(this.checked) {
    setTimeout(function() {
      // Almacenar la posición actual antes de cambiar de archivo
      const scrollPosition = window.scrollY || window.pageYOffset;
      localStorage.setItem('scrollPosition', scrollPosition);

      location.href = 'en/index.html';
    }, 500);
  } else {
    setTimeout(function() {
       // Almacenar la posición actual antes de cambiar de archivo
      const scrollPosition = window.scrollY || window.pageYOffset;
      localStorage.setItem('scrollPosition', scrollPosition);

      location.href='../index.html';
    }, 500);
  }
})

// Restaurar la posición almacenada cuando se carga la nueva página
document.addEventListener('DOMContentLoaded', function() {
  const storedPosition = localStorage.getItem('scrollPosition');
  if (storedPosition) {
    window.scrollTo(0, storedPosition);
  }
});



const btn = document.getElementById('button');
const message = document.getElementById('message');
const inputName = document.getElementById('from_name');
const inputEmail = document.getElementById('email');
const inputAsunto = document.getElementById('asunto');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

    const msj = message.value;
    const fromName = inputName.value;
    const email = inputEmail.value;
    const asunto = inputAsunto.value;

    emailjs.send("service_ry44dd6","template_44tnyen",{
      message: msj,
      from_name: fromName,
      email: email,
      asunto: asunto
    })
    .then(() => {
      btn.value = 'Send Email';
      message.value = ''
      inputName.value = ''
    }, (err) => {
      btn.value = 'Send Email';
    });   
});

// animacion para el titulo principal
document.addEventListener('DOMContentLoaded', function () {
  const typewriterText = document.getElementById('h1');

  // Función para manejar el evento de finalización de la animación inicial
  function handleAnimationEnd() {
    // Aplica una nueva animación al elemento h1 (la animación inicial)
    typewriterText.style.animation = 'typing-reverse 2s steps(40) forwards, blink-caret .5s steps(2) infinite';
  }

  function handleAnimationStart() {
    // Aplica una nueva animación al elemento h1 (la animación inicial)
    typewriterText.style.animation = 'typing 2s steps(40) forwards, blink-caret .5s steps(2) infinite';
  }

  // Agrega un oyente de eventos para el evento de finalización de la animación
  typewriterText.addEventListener('animationend', function() {
    // Envuelve la llamada a setTimeout para que funcione correctamente
    setTimeout(handleAnimationEnd, 1000);
    typewriterText.addEventListener('animationend', function() {
      setTimeout(handleAnimationStart, 1000);
    })
  });
});

