<template>
  <nav class="d-flex justify-center">
    <a href="#" class="ma-2 pa-2">Home</a>
    <a href="#" class="ma-2 pa-2">About</a>
    <a href="#" class="ma-2 pa-2">Experience</a>
    <a href="#" class="ma-2 pa-2">Project</a>
    <a href="#" class="ma-2 pa-2">Contact</a>
  </nav>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: black;
}

nav {
  width: 100%;
  height: 60px;
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

nav a {
  color: white;
  text-decoration: none;
  transition: text-decoration 1 linear;
}

nav a:hover {
  text-decoration: underline;
}
</style>
