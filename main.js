// TABS LOGIC
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function () {
        document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.style.display = (panel.id === tabId) ? 'block' : 'none';
        });
    });
});

// SMART: Form submission demo
document.querySelector('.contact-form')?.addEventListener('submit', function(e){
    e.preventDefault();
    alert("Thanks for contacting us!\nWe'll get back to you soon.");
    this.reset();
});

// RESIZABLE GLASS CONTAINER
const container = document.getElementById('glass-container');
const handle = container.querySelector('.resize-handle');
let resizing = false;
let startX, startY, startW, startH;

handle.addEventListener('mousedown', function(e){
    e.preventDefault();
    resizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startW = container.offsetWidth;
    startH = container.offsetHeight;
    container.classList.add('resizing');
    window.addEventListener('mousemove', resizeGlass);
    window.addEventListener('mouseup', stopResizeGlass);
});

function resizeGlass(e){
    if (!resizing) return;
    let newW = Math.max(370, startW + (e.clientX - startX));
    let newH = Math.max(325, startH + (e.clientY - startY));
    newW = Math.min(newW, window.innerWidth - 16);
    newH = Math.min(newH, window.innerHeight - 16);
    container.style.width = newW + 'px';
    container.style.height = newH + 'px';
}
function stopResizeGlass(e){
    resizing = false;
    container.classList.remove('resizing');
    window.removeEventListener('mousemove', resizeGlass);
    window.removeEventListener('mouseup', stopResizeGlass);
}

// CURSOR TRACKING — 3D tilt/glow/cursor-glow
container.addEventListener('mousemove', function(e){
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    // Tilt:
    container.style.transform = `perspective(1400px) rotateX(${(y-0.5)*14}deg) rotateY(${(x-0.5)*-17}deg) scale(1.007)`;
    // Mouse-over shadow:
    container.setAttribute('data-mouse-over','true');
});
container.addEventListener('mouseleave', function(){
    container.style.transform = 'none';
    container.removeAttribute('data-mouse-over');
});

// Fancy cursor glow
let cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

document.body.addEventListener('mousemove', function(e){
    cursorGlow.style.left = (e.clientX - 70) + 'px';
    cursorGlow.style.top = (e.clientY - 70) + 'px';
    cursorGlow.style.opacity = window.innerWidth < 700 ? 0.08 : 0.48;
});

container.addEventListener('mouseenter', () => cursorGlow.style.opacity='0.99');
container.addEventListener('mouseleave', () => cursorGlow.style.opacity='0.48');

// Extra glow to text on mouse move
container.addEventListener('mousemove', function(e){
    const homeMsg = document.querySelector('.message-text');
    if(homeMsg) homeMsg.style.color = `rgb(${120+Math.floor((e.pageX/innerWidth)*90)},${71+Math.floor((e.pageY/innerHeight)*100)},249)`;
});

// Touch events (for resizing on tablets)
handle.addEventListener('touchstart', (ev)=>{
    ev.preventDefault();
    resizing = true;
    let touch = ev.touches[0];
    startX = touch.clientX; startY = touch.clientY;
    startW = container.offsetWidth; startH = container.offsetHeight;
    container.classList.add('resizing');
    window.addEventListener('touchmove', resizeGlassTouch);
    window.addEventListener('touchend', stopResizeGlassTouch);
});
function resizeGlassTouch(ev){
    if(!resizing) return;
    let touch = ev.touches[0];
    let newW = Math.max(370, startW + (touch.clientX - startX));
    let newH = Math.max(325, startH + (touch.clientY - startY));
    newW = Math.min(newW, window.innerWidth - 10);
    newH = Math.min(newH, window.innerHeight - 10);
    container.style.width = newW + 'px';
    container.style.height = newH + 'px';
}
function stopResizeGlassTouch(ev){
    resizing = false;
    container.classList.remove('resizing');
    window.removeEventListener('touchmove', resizeGlassTouch);
    window.removeEventListener('touchend', stopResizeGlassTouch);
}
