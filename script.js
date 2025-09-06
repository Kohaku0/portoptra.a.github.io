const audio = document.getElementById('bgAudio');
  // play muted dulu
  audio.play().catch(()=>{});

  // unmute setelah interaksi pertama
  const enableAudio = () => {
    audio.muted = false;
    audio.play().catch(()=>{});
    window.removeEventListener('click', enableAudio);
  };
  window.addEventListener('click', enableAudio);
  
// Typing effect highlight
document.addEventListener("DOMContentLoaded", () => {
  const options = {
    strings: [
      "Halo 👋, saya Putra Andriansyah",
      "Pelajar kelas 10 di SMKN 1 Jakarta",
      "Minat besar pada IT 💻 dan Microsoft Office 📊",
      "Hobi bermain gitar 🎸 dan belajar coding",
      "Bercita-cita jadi profesional IT 🚀"
    ],
    typeSpeed: 40,
    backSpeed: 20,
    backDelay: 2000,
    loop: true
  };
  new Typed("#about-text", options);
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});
observer.observe(document.querySelector(".about-card"));
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar a");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href").substring(1) === entry.target.id) {
            link.classList.add("active");
          }
        });
      }
    });
  }, { threshold: 0.6 });

  sections.forEach(section => observer.observe(section));
});

const revealNodes = document.querySelectorAll('#skills-contact-wrapper .reveal');
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('in');
        // animate any progress bars within
        entry.target.querySelectorAll('.progress').forEach(p => {
          const val = parseInt(p.getAttribute('data-value') || '0',10);
          const bar = p.querySelector('i');
          bar.style.width = val + '%';
        });
      }
    });
  }, {threshold: 0.18});
  revealNodes.forEach(n => revealIO.observe(n));

  // Tiny tilt effect (mouse)
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      const dx = (e.clientX - cx) / (rect.width/2);
      const dy = (e.clientY - cy) / (rect.height/2);
      card.style.transform = `translateY(-8px) rotateX(${(-dy*4)}deg) rotateY(${(dx*6)}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Contact form demo behavior + toast
  const form = document.getElementById('contactFormMini');
  const toast = document.getElementById('toast');
  form?.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // simple validation
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const msg = form.querySelector('#message').value.trim();
    if(!name || !email || !msg) {
      showToast('Mohon isi semua kolom');
      return;
    }
    // simulate sending
    showToast('Pesan terkirim — terima kasih!', 3000);
    form.reset();
  });

  function showToast(text, timeout=2200) {
    toast.textContent = text;
    toast.classList.remove('hidden');
    toast.style.display = 'block';
    setTimeout(()=> {
      toast.style.opacity = '1';
    },20);
    setTimeout(()=> {
      toast.style.opacity = '0';
      setTimeout(()=> { toast.classList.add('hidden'); toast.style.display='none'; }, 300);
    }, timeout);
  }

  // Quick copy email
  document.getElementById('quickCopy')?.addEventListener('click', ()=>{
    navigator.clipboard?.writeText('putra@example.com').then(()=> showToast('Email disalin ke clipboard',1500)).catch(()=> showToast('Gagal menyalin'));
  });

  // small: animate progress on load for visible area
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.progress').forEach(p => {
      const rect = p.getBoundingClientRect();
      if(rect.top < window.innerHeight) {
        p.querySelector('i').style.width = (p.getAttribute('data-value') || '0') + '%';
      }
    });
  });