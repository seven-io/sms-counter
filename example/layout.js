document.addEventListener('DOMContentLoaded', () =>
    Object.keys(Color)
        .filter(key => 'function' !== typeof Color[key])
        .forEach(key => document.getElementById(key).style.backgroundColor = Color[key])
);