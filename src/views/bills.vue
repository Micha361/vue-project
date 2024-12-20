<script setup>

mounted() {
    console.log('HelloWorld component has been mounted!');}
 </script>

<template>
    <div class="users-page">
      <h1>Bills Page</h1>
      <p>Welcome to the Bills page!</p>
      <p>Here you can look at your bills.</p>
    </div>
  </template>
  

  
  <style scoped>
  .users-page {
    padding: 2rem;
    text-align: center;
  }
  
  .users-page h1 {
    color: #333;
    font-size: 2rem;
  }
  
  .users-page p {
    color: #555;
  }
  </style>
  