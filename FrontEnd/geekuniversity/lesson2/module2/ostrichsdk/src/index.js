import Performance from "./performance.js";

class Ostrich {
  constructor(option) {
    if (!option.url) {
      throw new Error("参数数据，url为必填项");
    }
    this.options = Object.assign(
      {
        url: "",
        performance: {
          sampleRate: 1,
        },
        error: {},
        event: {},
      },
      option
    );
  }

  start() {
    if (this.options.performance) {
      new Performance(this.options).start(this.options);
    }
  }
}

export { Ostrich };
