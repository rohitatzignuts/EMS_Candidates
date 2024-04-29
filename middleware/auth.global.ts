// global middleware for user authentication
export default defineNuxtRouteMiddleware((to, from) => {
    // check the environment
    if (process.client) {
        // get the token from the localstorage
        const token = localStorage.getItem("loginToken");
        const isAuthenticated = token !== null;
        // restrict access to use /login 
        if (
            to.path === "/applications" ||
            to.path === "/savedJobs" 
        ) {
            if (!isAuthenticated) {
                return navigateTo("/");
            }
        }

        // redirect authenticated user to '/' if he tries to access '/login' route
        if(to.path === '/login' && isAuthenticated){
            return navigateTo("/");
        }
    }
});
