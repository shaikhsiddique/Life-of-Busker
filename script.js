// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
});

scroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("body", {
  scrollTop(value) {
    return arguments.length
      ? scroll.scrollTo(value, 0, 0)
      : scroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.querySelector("body").style.transform
    ? "transform"
    : "fixed",
});

ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();

let lastScrollY = 0;
const navbar = document.querySelector("#navbar");

gsap.registerPlugin(ScrollTrigger);

const timeLine = gsap.timeline();

const page1Animation = () => {
  gsap.to("#screen1", {
    y: "-100%",
    duration: 0.9,
    delay: 2,
    ease: "power2.inOut",
  });

  gsap.to("#screen2", {
    y: "-100%",
    duration: 1,
    delay: 2,
    ease: "power2.inOut",
  });

  gsap.from("#hero-text1", {
    y: 300,
    duration: 0.8,
    opacity: 0,
    delay: 3,
    ease: "power2.inOut",
  });
  gsap.from("#hero-text2", {
    y: 300,
    opacity: 0,
    duration: 0.8,
    delay: 3.2,
    ease: "power2.inOut",
  });

  gsap.from("#navbar", {
    y: -200,
    duration: 1,
    delay: 3.5,
    ease: "power2.inOut",
  });
};

const page3Animation = () =>{
    gsap.from(".page3 div ", {
        y: 120,
        scale: 0.3,
        opacity:0,
        scrollTrigger: {
          trigger: ".body",
          scroller: "body",
          start: "top -30%",
          end: "bottom 0%",
          scrub: 2,
        },
      });
        
}

const page4Animation = () => {
  const canvas = document.querySelector('.page4');
  const htext1 = document.getElementById('hover-text1');
  const htext2 = document.getElementById('hover-text2');
  const htext3 = document.getElementById('hover-text3');
  const shades = document.querySelectorAll('.shade');

  const hoverEffect = (bgImage, textsToFadeOut) => {
    canvas.style.backgroundImage = bgImage;
    textsToFadeOut.forEach(text => {
      gsap.to(text, {
        opacity: 0.70,
        ease: "power1.out"
      });
    });
    gsap.to(shades, {
      yPercent: -100,
      height: '0%',
      opacity: 0,
      duration: 1,
      ease: "power1.out"
    });
  };

  const resetTextAndShades = () => {
    gsap.to([htext1, htext2, htext3], {
      opacity: 1,
      ease: "power1.out"
    });
    gsap.to(shades, {
      yPercent: 0,
      height: '100%',
      opacity: 1,
      duration: 0.5,
      ease: "power1.out"
    });
  };

  htext1.addEventListener('mouseenter', () => hoverEffect("url('./Assets/hover-img1.jpg')", [htext2, htext3]));
  htext2.addEventListener('mouseenter', () => hoverEffect("url('./Assets/hover-img2.jpg')", [htext1, htext3]));
  htext3.addEventListener('mouseenter', () => hoverEffect("url('./Assets/hover-img3.jpg')", [htext1, htext2]));

  htext1.addEventListener('mouseleave', resetTextAndShades);
  htext2.addEventListener('mouseleave', resetTextAndShades);
  htext3.addEventListener('mouseleave', resetTextAndShades);
  resetTextAndShades();
  gsap.to(shades, {
    yPercent: 0,
    height: '100%',
    opacity: 1,
    duration: 0.5,
    ease: "power1.out"
  });
};

scroll.on("scroll", (obj) => {
  if (obj.scroll.y >= lastScrollY) {
    gsap.to(navbar, {
      y: -300,
      duration: 0.7,
    });
  } 
  if(obj.scroll.y < lastScrollY)
  {
    gsap.to(navbar, {
      y: 0,
      duration: 0.7,
    });
  }
  lastScrollY = obj.scroll.y;
});

const page5Animation = () => {
  const card1 = document.getElementById("card1");
  const card2 = document.getElementById("card2");
  const card3 = document.getElementById("card3");

  const animateCard = (card, title) => {
    const images = card.querySelectorAll(".img");

    gsap.to(images[0], {
      zIndex: 0,
      delay: 0.2,
      rotate: 15,
      ease: "power2.out",
    });

    gsap.to(images[1], {
      zIndex: 10,
      delay: 0.2,
      rotate: -15,
      ease: "power2.out",
    });

    gsap.to(images[2], {
      zIndex: 20,
      delay: 0.3,
      ease: "power2.out",
    });

    gsap.to(title, {
      color: "#B3614F",
      textDecoration: "underline",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const resetCard = (card, title) => {
    const images = card.querySelectorAll(".img");

    gsap.to(images, {
      zIndex: "auto",
      rotate: 0,
      ease: "power2.out",
    });

    gsap.to(title, {
      color: "black",
      textDecoration: "none",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  [
    { card: card1, title: document.querySelectorAll("#card1 .title h2") },
    { card: card2, title: document.querySelectorAll("#card2 .title h2") },
    { card: card3, title: document.querySelectorAll("#card3 .title h2") },
  ].forEach(({ card, title }) => {
    if (card) {
      card.addEventListener("mouseenter", () => animateCard(card, title));
      card.addEventListener("mouseleave", () => resetCard(card, title));
    }
  });
};



let audio = new Audio('./Assets/music.mp3');

// audio.play();

page1Animation();
page3Animation();
page4Animation();
page5Animation();
