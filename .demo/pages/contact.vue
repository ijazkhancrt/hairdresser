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
              <h1><b>Your<br>Perfect<br>Hairstyle<br>Awaits</b></h1>
              <p>Book an appointment with our expert</p>
            </div>
          </div>
  
          <!-- Column 2 -->
          <div class="col-md-8 d-flex justify-content-center align-items-center header-image">
            <img src="/custom/img/header.png" alt="Hair Salon" class="img-fluid">
          </div>
        </div>
      </header>
  
  

  
      <!-- Testimonial -->
      <div class="bg-gray-100 text-gray-900 mt-12">
        <!-- Hero Section -->
        <section class="contact-hero-bg text-center flex items-center justify-center bg-opacity-80 ">
          <div class="mt-12">
            <h1 class="text-4xl font-bold mb-2">Contact Us</h1>
            <p class="text-lg">We’re here to assist you with any questions or feedback.</p>
          </div>
        </section>
    
        <!-- Contact Information -->
        <section class="container mx-auto my-12 px-6 lg:px-0">
          <!-- <h2 class="text-3xl font-semibold mb-6">Get in Touch</h2> -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h3 class="text-2xl font-semibold mb-4">Our Office</h3>
              <p class="mb-4">
                123 Hair Avenue<br>
                Style City, SC 12345<br>
                <a href="tel:+1234567890" class="text-pink-600">+1 (234) 567-890</a><br>
                <a href="mailto:support@yourplatform.com" class="text-pink-600">support@yourplatform.com</a>
              </p>
              <div class="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.124768141676!2d-122.39604468468192!3d37.79148627975511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807d5bfb64ef%3A0x6b0e8e1cf8fdbe8a!2s123%20Hair%20Ave%2C%20San%20Francisco%2C%20CA%2094103!5e0!3m2!1sen!2sus!4v1612205451335!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
    
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h3 class="text-2xl font-semibold mb-4">Send Us a Message</h3>
              <form @submit.prevent="submitForm">
                <div class="mb-4">
                  <label for="name" class="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    v-model="form.name"
                    class="w-full border border-gray-300 rounded-lg py-2 px-4"
                    required
                  />
                </div>
                <div class="mb-4">
                  <label for="email" class="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    class="w-full border border-gray-300 rounded-lg py-2 px-4"
                    required
                  />
                </div>
                <div class="mb-4">
                  <label for="message" class="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    class="w-full border border-gray-300 rounded-lg py-2 px-4"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  class="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
    
        <!-- Call to Action -->
        <section class="bg-black text-white text-center py-12">
          <h2 class="text-3xl font-semibold mb-4">Follow Us on Social Media</h2>
          <p class="text-lg mb-6">Stay connected and follow us for the latest updates and promotions.</p>
          <div class="flex justify-center space-x-4">
            <a href="https://facebook.com/yourplatform" target="_blank" class="text-white text-xl hover:text-gray-300">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com/yourplatform" target="_blank" class="text-white text-xl hover:text-gray-300">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com/yourplatform" target="_blank" class="text-white text-xl hover:text-gray-300">
              <i class="fab fa-twitter"></i>
            </a>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useHead } from '#app'
  import { definePageMeta } from '#imports' // Ensure this import is correct for Nuxt 3
  
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
  
  
  // customer 

const form = ref({
  name: '',
  email: '',
  message: '',
});

const submitForm = () => {
  // Logic to handle form submission, e.g., send an email or POST request
  console.log('Form submitted:', form.value);
  alert('Your message has been sent!');
};
  </script>
  
  <style scoped>
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
  
  
  /*============================  Caresol Style ============================*/
  .contact-hero-bg {
    background-image: url('/images/contact-hero-background.jpg');
    background-size: cover;
    background-position: center;
    height: 300px; /* Adjust height as needed */
  }
  
  .map-container iframe {
    border-radius: 8px;
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
  