export const deleteRouteId = (route) => {
  if (route) {
    const routeArray = route.split("/");
    routeArray.pop();
    const newRoute = routeArray.join("/") + "/";
    return newRoute;
  }
};
