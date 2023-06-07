export const pageRouteLinks = (() =>
  window.location.href.startsWith("http://localhost:")
    ? {
        main: "http://localhost:3000",
        user: "http://localhost:3001",
        admin: "http://localhost:3002",
      }
    : {
        main: "https://www.dsm-repo.com/",
        user: "https://user.dsm-repo.com/",
        admin: "https://teacher.dsm-repo.com/",
      })();
