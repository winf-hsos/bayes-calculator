/* global Vue */

function updateCanvas(canvas, prior, likelihood, e_not_h = 25) {
    var ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Add rectangle for prior
    ctx.fillStyle = "#009ee3";
    ctx.fillRect(0, 0, (prior / 100) * canvas.width, canvas.height);
    ctx.strokeRect(0, 0, (prior / 100) * canvas.width, canvas.height);

    // Add rectangle for likelihood
    ctx.fillStyle = "rgba(0, 79, 114, 1)";
    ctx.fillRect(0, canvas.height - (canvas.height * likelihood) / 100, (prior / 100) * canvas.width, canvas.height);

    // Add rectangle for not prior
    ctx.fillStyle = "#8eddff";
    ctx.fillRect((prior / 100) * canvas.width, 0, canvas.width - (prior / 100) * canvas.width, canvas.height);

    // Add rectangle for evidence if H is not true
    ctx.fillStyle = "rgba(0, 79, 114, 1)";
    ctx.fillRect((prior / 100) * canvas.width, canvas.height - canvas.height * e_not_h / 100, (canvas.width - (prior / 100)) * canvas.width, canvas.height * e_not_h / 100);


    ctx.strokeRect(0, 0, (prior / 100) * canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

}

Vue.component("bayes-canvas", {
    data: function () {
        return {
            count: 0
        };
    },

    props: ["prior", "likelihood", "enoth"],

    mounted: function () {
        updateCanvas(this.$refs.canvas, this.prior, this.likelihood, this.enoth);
    },

    computed: {
        canvasData: function () {
            if (this.$refs.canvas) {
                updateCanvas(this.$refs.canvas, this.prior, this.likelihood, this.enoth);
            }

            return this.prior + this.likelihood + this.enoth;
        }
    },

    template:
        '<canvas width="600px" height="600px" ref="canvas" :test="canvasData"></canvas>'
});
