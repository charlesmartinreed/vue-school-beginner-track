Vue.component('product', {
    // product receives a prop named message
    props: {
        message: {
            type: String,
            required: true,
            default: "Test!"
        }
    }
    template: `
    <div>
    <h1>I'm a component</h1>
    <h2>And I'm a component as well</h2>
    <p>{{message}}</p>
    </div>
    `,
    data() {
        // object instead of property so that each component instance can have unique data
    }
})