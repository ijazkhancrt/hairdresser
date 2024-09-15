<template>
    <div class="container">
      <!-- Navbar -->
      <nav class="custom-navbar">
        <div class="custom-container">
          <!-- Brand Name -->
          <NuxtLink class="navbar-brand" to="/">BrandName</NuxtLink>
  
          <!-- Toggler for responsive navbar -->
          <button class="custom-navbar-toggler" type="button" @click="toggleNavbar">
            <span class="custom-navbar-toggler-icon"></span>
          </button>
  
          <!-- Navbar Links -->
          <div :class="['custom-navbar-collapse', { 'show': isNavbarOpen }]" id="customNavbarNav">
            <ul class="custom-navbar-nav">
              <li class="custom-nav-item">
                <NuxtLink class="nav-link" to="/">Home</NuxtLink>
              </li>
              <li class="custom-nav-item">
                <NuxtLink class="nav-link" to="/about">About</NuxtLink>
              </li>
              <!-- <li class="custom-nav-item">
                <NuxtLink class="nav-link" to="/services">Services</NuxtLink>
              </li> -->
              <li class="custom-nav-item">
                <NuxtLink class="nav-link" to="/contact">Contact</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  
      <!-- Header Section -->
      <header class="mt-3">
        <div class="row w-100">
          <!-- Column 1 -->
          <div class="col-md-4 d-flex flex-column justify-content-center align-items-center header-content">
            <div>
              <h1><b>Your<br>Perfect<br>Hairstyle<br>Awaits</b> : {{apiUrl}}</h1>
              <p>Book an appointment with our expert</p>
            </div>
          </div>
  
          <!-- Column 2 -->
          <div class="col-md-8 d-flex justify-content-center align-items-center header-image">
            <img src="/custom/img/header.png" alt="Hair Salon" class="img-fluid">
          </div>
        </div>
      </header>
  
  
      <div class="services my-5">
        <h1><b>Book Your Appointment Online</b></h1>
        <p>Convenient and hassle-free booking system for your next hair appointment.</p>
      </div>
  
   
  <!-- about us -->
  <div class="bg-gray-100 text-gray-900">
    <!-- Hero Section -->
    <section class="hero-bg text-white text-center flex items-center justify-center bg-opacity-70">
      <div>
        <h1 class="text-4xl font-bold mb-2">About Us</h1>
        <p class="text-lg">Your Go-To Hair Care Destination</p>
      </div>
    </section>

    <!-- Introduction -->
    <section class="container mx-auto my-12 px-6 lg:px-0">
      <h2 class="text-3xl font-semibold mb-6">Welcome to [Your Platform Name]</h2>
      <p class="text-lg leading-relaxed">
        At [Your Platform Name], we make booking your next hair appointment a breeze. Whether you’re looking for a quick trim or a complete makeover, our platform connects you with top-rated hairdressers in your area, ensuring you get the best service tailored to your needs.
      </p>
    </section>

    <!-- Mission -->
    <section class="bg-white py-12">
      <div class="container mx-auto px-6 lg:px-0">
        <h2 class="text-3xl font-semibold mb-6">Our Mission</h2>
        <p class="text-lg leading-relaxed">
          Our mission is to revolutionize the way you book hairdressing appointments. We aim to provide a seamless, user-friendly experience that connects you with skilled professionals who can help you look and feel your best, all from the comfort of your home.
        </p>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="container mx-auto my-12 px-6 lg:px-0">
      <h2 class="text-3xl font-semibold mb-6">Why Choose Us</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="p-6 bg-white shadow-lg rounded-lg">
          <h3 class="text-xl font-semibold mb-2">User-Friendly Interface</h3>
          <p>Our easy-to-navigate platform ensures you can find and book your ideal hairdresser with just a few clicks.</p>
        </div>
        <div class="p-6 bg-white shadow-lg rounded-lg">
          <h3 class="text-xl font-semibold mb-2">Verified Professionals</h3>
          <p>We partner with top-rated hairdressers who are vetted for their expertise and professionalism.</p>
        </div>
        <div class="p-6 bg-white shadow-lg rounded-lg">
          <h3 class="text-xl font-semibold mb-2">Flexible Booking Options</h3>
          <p>Choose from a range of appointment times and services to suit your schedule and preferences.</p>
        </div>
      </div>
    </section>

    <!-- Meet the Team -->
    <section class="team-bg text-white py-12 bg-opacity-70">
      <div class="container mx-auto px-6 lg:px-0">
        <h2 class="text-3xl font-semibold mb-6 text-center">Meet the Team</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Team Member 1 -->
          <div class="bg-white p-6 rounded-lg shadow-lg text-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1664049685781-9f373ed1183a?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Team Member"
              class="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">Jane Doe</h3>
            <p class="text-gray-600">Lead Stylist</p>
          </div>
          <!-- Team Member 2 -->
          <div class="bg-white p-6 rounded-lg shadow-lg text-center">
            <img
              src="https://images.unsplash.com/photo-1632768461274-a7df80fcbc42?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Team Member"
              class="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">John Smith</h3>
            <p class="text-gray-600">Senior Stylist</p>
          </div>
          <!-- Team Member 3 -->
          <div class="bg-white p-6 rounded-lg shadow-lg text-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1661768233835-fd3d1d0ca08a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Team Member"
              class="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">Emily Johnson</h3>
            <p class="text-gray-600">Customer Support</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Achievements -->
    <section class="container mx-auto my-12 px-6 lg:px-0">
      <h2 class="text-3xl font-semibold mb-6 text-center">Our Achievements</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="p-6 bg-white shadow-lg rounded-lg">
          <h3 class="text-xl font-semibold mb-2">Top Platform Award</h3>
          <p>Recognized for excellence in customer satisfaction and ease of use.</p>
        </div>
        <div class="p-6 bg-white shadow-lg rounded-lg">
          <h3 class="text-xl font-semibold mb-2">Best User Experience</h3>
          <p>Awarded for delivering a seamless and intuitive booking experience.</p>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="bg-black text-white text-center py-12">
      <h2 class="text-3xl font-semibold mb-4">Get In Touch</h2>
      <p class="text-lg mb-6">We’re here to help you with any questions or feedback. Feel free to contact us or follow us on social media.</p>
      <a href="mailto:support@yourplatform.com" class="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold">Contact Us</a>
    </section>
  </div>
    </div>
  </template>
  
  <script setup>
  import { useHead } from '#app'
  import { definePageMeta } from '#imports' // Ensure this import is correct for Nuxt 3
  

  const config = useRuntimeConfig()
const apiUrl = config.public.API_BASE_URL




  // Set page meta and head elements
  useHead({
    title: 'mindboost',
    meta: [
      // { name: 'theme-color', content: '#E9C046' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' }
    ],
    script: [
      { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js' }
    ]
  })
  
  definePageMeta({
    layout: '/custom'
  })
  
  import { ref } from 'vue';
  
  const isNavbarOpen = ref(false);
  
  function toggleNavbar() {
    isNavbarOpen.value = !isNavbarOpen.value;
  }
  
  

  </script>
  
  <style scoped>

  .hero-bg {
    background-image: url('https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
    background-size: cover;
    background-position: center;
    height: 300px; /* Adjust height as needed */
  }
  
  .team-bg {
    background-image: url('https://images.pexels.com/photos/3998421/pexels-photo-3998421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
    background-size: cover;
    background-position: center;
    height: 400px; /* Adjust height as needed */
  }
  /* ============================ Add your styles here ============================ */
  .testimonial-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    /* Ensures image is treated as a block element */
    margin: 0 auto;
    /* Centers the image horizontally */
  }
  
  .testimonial {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
    text-align: center;
    /* Centers text inside the testimonial */
  }
  
  .testimonial-text {
    margin-left: 10px;
  }
  
  .main-testimonial {
    margin-top: 10rem;
  }
  
  #accordionPanelsStayOpenExample {
    margin-top: 7rem;
  }
  
  .services {
    margin-top: 7rem;
  }
  
  
  /* ============================ navbar style  ============================*/
  
  
  .custom-navbar {
    padding: 1rem;
  }
  
  .custom-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .custom-navbar-brand {
    text-decoration: none;
    font-size: 1.5rem;
  }
  
  .custom-navbar-toggler {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    /* Hide by default */
  }
  
  .custom-navbar-toggler-icon::before {
    content: '☰';
    /* Use any icon here */
  }
  
  .custom-navbar-collapse {
    display: flex;
    flex-direction: row;
    /* Horizontal layout by default */
  }
  
  .custom-navbar-nav {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    /* Ensure items are horizontally aligned */
  }
  
  .custom-nav-item {
    margin-left: 1rem;
  }
  
  .custom-nav-link {
    text-decoration: none;
  }
  
  /* Mobile Styles */
  @media (max-width: 768px) {
    .custom-navbar-toggler {
      display: block;
      /* Show on mobile */
    }
  
    .custom-navbar-collapse {
      display: none;
      flex-direction: column;
      /* Vertical layout on mobile */
      position: absolute;
      top: 60px;
      left: 0;
      width: 100%;
      background-color: #fff;
      /* Optional, for better visibility */
    }
  
    .custom-navbar-collapse.show {
      display: flex;
    }
  
    .custom-navbar-nav {
      flex-direction: column;
      /* Stack items vertically on mobile */
    }
  
    .custom-nav-item {
      margin: 0;
      padding: 1rem;
      border-bottom: 1px solid #ddd;
      /* Optional, for better separation */
    }
  }
  
  
  
  header {
    width: 100%;
  }
  
  .header-content h1 {
    font-size: 3rem;
    /* Adjust the font size as needed */
    line-height: 1.2;
    /* Adjust line height for better spacing */
    margin: 0;
  }
  
  h1 {
    font-size: 2.6rem;
    /* Adjust the font size as needed */
    line-height: 1.2;
    /* Adjust line height for better spacing */
    margin: 0;
  }
  
  
  
  .header-content p {
    font-size: 1.25rem;
    /* Adjust the font size for the paragraph */
    margin-top: 0.5rem;
  }
  
  .header-image img {
    max-width: 100%;
    height: auto;
    /* Ensure the image scales correctly */
  }

  </style>
  