// const baseURL = "http://museum.locslab.com";
// const baseURL =
//   window.location.origin === "http://192.168.20.9:8080"
//     ? "http://192.168.20.9:8080"
//     : "http://118.38.16.167:8080";
const baseURL =
    window.location.origin === "http://localhost:3000"
        // ? "http://127.0.0.1:8000"
        ? "http://locslab.com"
        : "http://locslab.com";

export { baseURL };
