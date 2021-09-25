import { model } from "kidi";

model.create("performanceModel", {
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: "increment",
    },
    name: {
      type: String,
    },
  },
});
