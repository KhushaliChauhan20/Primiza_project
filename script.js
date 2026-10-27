gsap.registerPlugin(ScrollTrigger);

//   LOAD HEADER

fetch("header.html")
    .then(response => response.text())
    .then(data => {
        const header = document.getElementById("header");

        if (header) {
            header.innerHTML = data;
        }
    })
    .catch(error => console.error("Error loading header:", error));


//   LOAD FOOTER

fetch("footer.html")
    .then(response => response.text())
    .then(data => {
        const footer = document.getElementById("footer");

        if (footer) {
            footer.innerHTML = data;
        }
    })
    .catch(error => console.error("Error loading footer:", error));


//   REVIEW IMAGE SLIDER

const imageScroll = document.getElementById("imageScroll");

function autoScrollImages() {
    if (!imageScroll) return;

    const maxScroll =
        imageScroll.scrollWidth - imageScroll.clientWidth;

    if (maxScroll <= 0) return;

    if (imageScroll.scrollLeft >= maxScroll - 2) {
        imageScroll.scrollTo({
            left: 0,
            behavior: "smooth"
        });
    } else {
        imageScroll.scrollBy({
            left: 300,
            behavior: "smooth"
        });
    }
}

// Scroll automatically every 3 seconds only if the slider exists
if (imageScroll) {
    setInterval(autoScrollImages, 3000);
}

// Existing left/right buttons
function scrollImages(direction) {
    if (!imageScroll) return;

    imageScroll.scrollBy({
        left: direction * 300,
        behavior: "smooth"
    });
}



//   BLOG CAROUSEL

const images = document.querySelectorAll(".slide-image");
const dots = document.querySelectorAll(".carousel-dot");

const titles = [
    "Why Every Child Needs a Tent House: Benefits, Creativity & Smart Play Ideas",
    "Simple Ways to Maintain Your Cookware for Long Life",
    "Why You Shouldn’t Keep Your Kitchen Knives in a Wooden Block",
    "Why Quality Cookware Matters in Every Indian Kitchen",
    "Top Toy Storage Ideas to Keep Your Kids’ Room Clean",
    "6 Kitchen Cleaning Tips That Make Cooking Easier"
];

let currentSlide = 0;

function updateCarousel() {
    const total = images.length;

    // Stop if this page has no blog carousel
    if (total === 0) return;

    images.forEach((image, index) => {
        image.classList.remove(
            "active",
            "side-left",
            "side-middle-left",
            "side-middle-right",
            "side-right"
        );

        const position =
            (index - currentSlide + total) % total;

        if (position === 0) {
            image.classList.add("active");
        } else if (position === 1) {
            image.classList.add("side-middle-right");
        } else if (position === 2) {
            image.classList.add("side-right");
        } else if (position === total - 1) {
            image.classList.add("side-middle-left");
        } else if (position === total - 2) {
            image.classList.add("side-left");
        }
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle(
            "active-dot",
            index === currentSlide
        );
    });

    // Update title only if the blog title exists
    const blogTitle = document.querySelector(".blog-title");

    if (blogTitle) {
        blogTitle.textContent =
            titles[currentSlide] || titles[0];
    }
}

function changeSlide(direction) {
    if (images.length === 0) return;

    currentSlide =
        (currentSlide + direction + images.length) %
        images.length;

    updateCarousel();
}

function goToSlide(index) {
    if (images.length === 0) return;

    currentSlide = index % images.length;

    updateCarousel();
}

// Initialize only when blog carousel images exist
if (images.length > 0) {
    updateCarousel();
}

//   ZOOM IN / ZOOM OUT
const image = document.querySelector(".scroll-zoom");

if (image) {
    window.addEventListener("scroll", function () {

        const rect = image.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        let progress =
            (windowHeight - rect.top) /
            (windowHeight + rect.height);

        progress = Math.max(0, Math.min(1, progress));

        const zoom = 1 + progress * 0.5;

        image.style.transform = `scale(${zoom})`;
    });
}



//   NUMBER COUNTER

function startCount(target, elementId, speed) {
    const element = document.getElementById(elementId);

    // Skip if the counter does not exist on this page
    if (!element) return;

    let count = 0;

    ScrollTrigger.create({
        trigger: element,
        start: "top 85%",
        once: true,

        onEnter: function () {
            const counter = setInterval(function () {
                count += Math.ceil(target / 100);

                if (count >= target) {
                    count = target;
                    clearInterval(counter);
                }

                element.innerText =
                    (target === 10 ? count + "K" : count) + "+";

            }, speed);
        }
    });
}




gsap.from(".animate-text", {
    y: 60,
    autoAlpha: 0,
    duration: 1,
    ease: "power3.out"
});
// 1. Animate from bottom to top
gsap.utils.toArray(".animate-scroll").forEach(function (element) {
    gsap.from(element, {
        y: 60,
        autoAlpha: 0,
        duration: 2,
        ease: "power3.out",

        scrollTrigger: {
            trigger: element,
            start: "top 32%",
            once: true
        }
    });
});

// 2. Left to right + bottom to top
gsap.utils.toArray(".animate-left").forEach(function (element) {
    gsap.from(element, {
        x: -80,
        y: 60,
        autoAlpha: 0,
        duration: 2,
        ease: "power3.out",

        scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true
        }
    });
});

// 3. Right to left + bottom to top
gsap.utils.toArray(".animate-right").forEach(function (element) {
    gsap.from(element, {
        x: 80,
        y: 60,
        autoAlpha: 0,
        duration: 2,
        ease: "power3.out",

        scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true
        }
    });
});



window.addEventListener("load", function () {
    // Number counters
    startCount(1000, "clientCount", 20);
    startCount(40, "Range", 30);
    startCount(10, "Customer", 70);
    startCount(10, "deliver", 70);

    // Recalculate scroll positions
    ScrollTrigger.refresh();
});

// Refresh when images finish loading
document.querySelectorAll("img").forEach(function (img) {
    if (!img.complete) {
        img.addEventListener("load", function () {
            ScrollTrigger.refresh();
        }, { once: true });
    }
});

//product image scroll



function changeImage(thumbnail) {
    const mainImage = document.getElementById("mainImage");

    if (mainImage.src === thumbnail.src) return;

    // Slide the current image out to the left
    mainImage.style.transition = "transform 0.4s ease";
    mainImage.style.transform = "translateX(-100%)";

    setTimeout(function () {
        // Change to the clicked thumbnail's image
        mainImage.src = thumbnail.src;

        // Put the new image on the right
        mainImage.style.transition = "none";
        mainImage.style.transform = "translateX(100%)";

        // Start the slide-in animation
        mainImage.offsetHeight;

        mainImage.style.transition = "transform 0.4s ease";
        mainImage.style.transform = "translateX(0)";
    }, 400);

    // Highlight the clicked thumbnail
    document.querySelectorAll(".thumbnail").forEach(function (img) {
        img.classList.remove("active");
    });

    thumbnail.classList.add("active");
}


