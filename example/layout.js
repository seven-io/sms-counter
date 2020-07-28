document.addEventListener('DOMContentLoaded', () => {
    Object.entries(Color)
        .forEach(([k, v]) => {
            const el = document.getElementById(k);

            el.style.backgroundColor = v;
        });
});