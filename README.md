# VHP frontend

Frontend webové aplikace pro registraci běžců na závody v rámci VH-půlmaratónu v CHKO Poodří.

## Getting Started

Tato webová aplikace je napsaná v [Reactu](https://reactjs.org/). Data si vyměňuje přes REST API s backendovou aplikací [VHP backend](https://github.com/MartinBelas/vhp-backend)

## Add frontend to backend server

1. Create frontend folder in backend app:

```
    mkdir public
```

2. BUILD frontend in vhp-frontend project
    
    ```
    ( sudo chmod -R 755 )
    npm run build
    ```
    
    This creates a build directory inside the root directory, which bundles your React app and minifies it into simple HTML, CSS, and JavaScript files. This build folder serves your app via a simple entry point, index.html, where your entire React app resides. Running your app via a remote server means running this index.html file on the server.

3. copy the content from vhp-frontend/build to vhp-backend/public    

## Authors

* **Martin Belas**