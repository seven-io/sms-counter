document.addEventListener('DOMContentLoaded', () =>
    Object.keys(Color)
        .filter(key => typeof Color[key] !== 'function')
        .forEach(key => document.getElementById(key).style.backgroundColor = Color[key])
);