import { Apple } from "./Phone";

const appleModel = new Apple({
  model: "IphoneX",
}).getModel();

console.log(appleModel);
