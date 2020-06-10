export default {
    render (h) {
        const routeMap = this.$router.routeMap;
        const path = this.$route.path;
        return h(routeMap[path]);
    }
} 