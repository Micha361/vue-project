<script setup>
  </script>

<template>
    <aside class="sidebar">
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Users</a></li>
          <li><a href="#">Bills</a></li>
          <li><a href="#">Tournament</a></li>
          <li><a href="#">Training Plan</a></li>
          <li><a href="#">Account</a></li>
          <li><a href="#">Sign Out</a></li>
        </ul>
      </nav>
    </aside>
  </template>
  

  
<style scoped>
.sidebar {
    width: 250px;
    height: 100vh;
    background-color: #333; 
    color: white; 
    position: fixed; 
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    padding: 1rem;
}
  
.sidebar nav ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
  
.sidebar nav ul li {
    margin: 1rem 0; 
}
  
.sidebar nav ul li a {
    text-decoration: none; 
    color: white;
    font-size: 1rem;
    transition: color 0.3s;
  }
  
  .sidebar nav ul li a:hover {
    color: #00bcd4; 
  }
  </style>
  