(() => {
  const app = new Vue({
    el: "#container",
    data: {
      cps: {
        buffer: 0,
        actual: 0,
        total: 0,
        top: 0
      },
      rainbowMode: false,
      audioMode: false,
      audio: new Audio("./g.mp3")
    },
    mounted() {
      setInterval(() => {
        app.cps.actual = Number(app.cps.buffer);
        app.cps.top = Math.max(app.cps.buffer, app.cps.top)
        app.cps.buffer = 0;
      }, 1000);
    },
    methods: {
      click(e) {
        this.cps.buffer++;
        this.cps.total++;

        gsap.to(".g-total", {
          scale:
            this.cps.total % 100 == 99 || this.cps.total % 100 == 0
              ? "random(2,3)"
              : "random(1,1.6)",
          rotateZ: "random(-16,16)",
          top: "random(-10,10)",
          right: "random(-10,10)",
          duration: 0.4,
        });

        if (this.rainbowMode) {
          let total4x = app.cps.total * 8;
          gsap.to("#container", {
            backgroundPosition: `${total4x % 200 >= 100 ? total4x % 100 : 100 - total4x % 100}% ${total4x % 200 <= 100 ? total4x % 100 : 100 - total4x % 100}%`,
            duration: 1,
            ease: "expo.out"
          })
        }

        if (this.audioMode) {
          this.audio.currentTime = 0;
          this.audio.play();
        }
      },
    },
  });
})();