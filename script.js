// 1. LOADER
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => { loader.style.display = 'none'; }, 1000);
    }, 1500);
});

// 2. TEXT SCRAMBLE EFFECT
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
document.querySelector(".hero-title").onmouseover = event => {
    let iterations = 0;
    const interval = setInterval(() => {
        event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if(index < iterations) { return event.target.dataset.value[index]; }
                return letters[Math.floor(Math.random() * 36)];
            })
            .join("");
        if(iterations >= event.target.dataset.value.length){ clearInterval(interval); }
        iterations += 1 / 3;
    }, 30);
};

// 3. TILT EFFECT INIT
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.5
});

// 4. STARFIELD ANIMATION
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let width, height;
let stars = [];

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
window.addEventListener('resize', resize);
resize();

class Star {
    constructor() {
        this.x = Math.random() * width - width / 2;
        this.y = Math.random() * height - height / 2;
        this.z = Math.random() * width;
    }
    update() {
        this.z -= 10; // Speed of warp
        if (this.z <= 0) {
            this.z = width;
            this.x = Math.random() * width - width / 2;
            this.y = Math.random() * height - height / 2;
        }
    }
    draw() {
        let x = (this.x / this.z) * width + width / 2;
        let y = (this.y / this.z) * height + height / 2;
        let radius = (1 - this.z / width) * 3; // Size based on depth

        if (x < 0 || x > width || y < 0 || y > height) return;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    }
}

// Create Stars
for (let i = 0; i < 800; i++) {
    stars.push(new Star());
}

function animate() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}
animate();
