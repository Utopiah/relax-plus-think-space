AFRAME.registerComponent("watch", {
    init: function() {
        this.timer = AFRAME.utils.getUrlParameter('timer')
        if (!this.timer) this.timer = 300 //5min
        document.querySelector("#watch").setAttribute("text","value:" + this.formatSeconds(this.timer))
        this.tick = AFRAME.utils.throttleTick(this.tick, 1000, this);
        // details https://aframe.io/docs/1.0.0/core/utils.html#aframe-utils-throttle-function-minimuminterval-optionalcontext
    },

    formatSeconds: function(secs) {
        function pad(n) {
            return (n < 10 ? "0" + n : n)
        }

        var m = Math.floor(secs / 60);
        var s = Math.floor(secs - m * 60);

        return pad(m) + ":" + pad(s);
    },

    tick: function (t, dt) {
        var time = Number( this.timer )
        console.log(this.timer);
        if(this.timer > 0){
            this.timer--
        } else {
            this.timer = 0
            document.querySelector("#endMessage").setAttribute("visible","true")
        }
        document.querySelector("#watch").setAttribute("text","value:"+ this.formatSeconds(time))
    },
});
