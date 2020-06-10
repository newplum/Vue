export default {
    props: {
        to: {
            type: String,
            requirest: true
        },
        tag: {
            default: 'a'
        }
    },
    methods: {
        handleClick () {
            const mode = this.$router.mode;
            if (mode == 'hash') {
                location.hash = this.to;
            }else {
                history.pushState(null, null, this.to);
                this.$route.path = this.to;
            }
        }
    },
    render (h) {
        const data = {};
        const mode = this.$router.mode;
        if (this.tag == 'a'&& mode == 'hash') {
            const href = '#' + this.to;
            data.attrs = { href }
        }else {
            data.on = { click: this.handleClick };
        }
        return h('a', data, this.$slot.default);
    }
} 