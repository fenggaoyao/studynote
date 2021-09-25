import { shallowMount } from "@vue/test-utils";
import About from "@/views/About.vue";

describe("About.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(About, {
      propsData: { msg: "new message2222" },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
