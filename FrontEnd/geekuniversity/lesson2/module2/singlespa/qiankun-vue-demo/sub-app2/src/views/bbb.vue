<template>
  <div @click.stop="save">bbb</div>
</template>

<script>
export default {
  methods: {
    save() {
      sessionStorage.setItem("a", 'b11')
    }
  }
}
</script>

