<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.btn {
  box-shadow: 3px 4px 0px 0px #8a2a21;
  background: linear-gradient(to bottom, #c62d1f 5%, #f24437 100%);
  background-color: #c62d1f;
  border-radius: 18px;
  border: 1px solid #d02718;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 17px;
  padding: 7px 25px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #810e05;
}
.btn:hover {
  background: linear-gradient(to bottom, #f24437 5%, #c62d1f 100%);
  background-color: #f24437;
}
.btn:active {
  position: relative;
  top: 1px;
}
</style>
