<template>

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
              <li class="custom-nav-item">
                <NuxtLink class="nav-link" to="/services">Services</NuxtLink>
              </li>
              <li class="custom-nav-item">
                <NuxtLink class="nav-link" to="/contact">Contact</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>


      
<div class="container mt-2">

    <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);"
        aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item main"><a href="#"><b>Services</b></a></li>
            <li class="breadcrumb-item active" aria-current="page">Professional</li>
            <li class="breadcrumb-item active" aria-current="page">Time</li>
            <li class="breadcrumb-item active" aria-current="page">Confirm</li>
        </ol>
    </nav>

    <div class="row  d-flex justify-content-between">
        <div class="col-md-6 select-services">
            <h1 class="my-2"><b>Select services</b></h1>
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                        aria-selected="true">
                        Hair & styling
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                        aria-selected="false">
                        Children's clip
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                        aria-selected="false">
                        Beard
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="extra-services-tab" data-bs-toggle="pill"
                        data-bs-target="#extra-services" type="button" role="tab" aria-controls="extra-services"
                        aria-selected="false">
                        Extra service
                    </button>
                </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
                <!--  -->
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel"
                    aria-labelledby="pills-home-tab" tabindex="0">
                    <h1 class="mb-3"><b>Hair & styling</b></h1>
                    <div class="card my-3">
                        <div class="card-body m-2 d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="card-title">Machine cut</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">15 min • Men only</h6>
                                <p class="card-text">Dell cut/single machine haircut</p>
                                <h6 class="card-subtitle mb-2 text-body-secondary">NOK 300</h6>
                            </div>
                            <button class="btn btn-light">
                                <h1><b>+</b></h1>
                            </button>
                        </div>
                    </div>

                    <div class="card my-3">
                        <div class="card-body m-2 d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="card-title">Machine cut</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">15 min • Men only</h6>
                                <p class="card-text">Dell cut/single machine haircut</p>
                                <h6 class="card-subtitle mb-2 text-body-secondary">NOK 300</h6>
                            </div>
                            <button class="btn btn-light">
                                <h1><b>+</b></h1>
                            </button>
                        </div>
                    </div>

                    <div class="card my-3">
                        <div class="card-body m-2 d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="card-title">Machine cut</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">15 min • Men only</h6>
                                <p class="card-text">Dell cut/single machine haircut</p>
                                <h6 class="card-subtitle mb-2 text-body-secondary">NOK 300</h6>
                            </div>
                            <button class="btn btn-light">
                                <h1><b>+</b></h1>
                            </button>
                        </div>
                    </div>

                    <div class="card my-3">
                        <div class="card-body m-2 d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="card-title">Machine cut</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">15 min • Men only</h6>
                                <p class="card-text">Dell cut/single machine haircut</p>
                                <h6 class="card-subtitle mb-2 text-body-secondary">NOK 300</h6>
                            </div>
                            <button class="btn btn-light">
                                <h1><b>+</b></h1>
                            </button>
                        </div>
                    </div>

                </div>


                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"
                    tabindex="0">
                    <h1 class="mb-3"><b>Children's clip</b></h1>
                    <div class="card my-3">
                        <div class="card-body m-2 d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="card-title">Machine cut</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">15 min • Men only</h6>
                                <p class="card-text">Dell cut/single machine haircut</p>
                                <h6 class="card-subtitle mb-2 text-body-secondary">NOK 300</h6>
                            </div>
                            <button class="btn btn-light">
                                <h1><b>+</b></h1>
                            </button>
                        </div>
                    </div>

                    <div class="card my-3">
                        <div class="card-body m-2 d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="card-title">Machine cut</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">15 min • Men only</h6>
                                <p class="card-text">Dell cut/single machine haircut</p>
                                <h6 class="card-subtitle mb-2 text-body-secondary">NOK 300</h6>
                            </div>
                            <button class="btn btn-light">
                                <h1><b>+</b></h1>
                            </button>
                        </div>
                    </div>

                    <div class="card my-3">
                        <div class="card-body m-2 d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="card-title">Machine cut</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">15 min • Men only</h6>
                                <p class="card-text">Dell cut/single machine haircut</p>
                                <h6 class="card-subtitle mb-2 text-body-secondary">NOK 300</h6>
                            </div>
                            <button class="btn btn-light">
                                <h1><b>+</b></h1>
                            </button>
                        </div>
                    </div>

                    <div class="card my-3">
                        <div class="card-body m-2 d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="card-title">Machine cut</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">15 min • Men only</h6>
                                <p class="card-text">Dell cut/single machine haircut</p>
                                <h6 class="card-subtitle mb-2 text-body-secondary">NOK 300</h6>
                            </div>
                            <button class="btn btn-light">
                                <h1><b>+</b></h1>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab"
                    tabindex="0">
                    <h1 class="mb-3"><b>Beard</b></h1>
                    <div class="card my-3">
                        <div class="card-body m-2 d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="card-title">Machine cut</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">15 min • Men only</h6>
                                <p class="card-text">Dell cut/single machine haircut</p>
                                <h6 class="card-subtitle mb-2 text-body-secondary">NOK 300</h6>
                            </div>
                            <button class="btn btn-light">
                                <h1><b>+</b></h1>
                            </button>
                        </div>
                    </div>

                    <div class="card my-3">
                        <div class="card-body m-2 d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="card-title">Machine cut</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">15 min • Men only</h6>
                                <p class="card-text">Dell cut/single machine haircut</p>
                                <h6 class="card-subtitle mb-2 text-body-secondary">NOK 300</h6>
                            </div>
                            <button class="btn btn-light">
                                <h1><b>+</b></h1>
                            </button>
                        </div>
                    </div>

                    <div class="card my-3">
                        <div class="card-body m-2 d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="card-title">Machine cut</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">15 min • Men only</h6>
                                <p class="card-text">Dell cut/single machine haircut</p>
                                <h6 class="card-subtitle mb-2 text-body-secondary">NOK 300</h6>
                            </div>
                            <button class="btn btn-light">
                                <h1><b>+</b></h1>
                            </button>
                        </div>
                    </div>

                    <div class="card my-3">
                        <div class="card-body m-2 d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="card-title">Machine cut</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">15 min • Men only</h6>
                                <p class="card-text">Dell cut/single machine haircut</p>
                                <h6 class="card-subtitle mb-2 text-body-secondary">NOK 300</h6>
                            </div>
                            <button class="btn btn-light">
                                <h1><b>+</b></h1>
                            </button>
                        </div>
                    </div>

                    <div class="card my-3">
                        <div class="card-body m-2 d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="card-title">Machine cut</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">15 min • Men only</h6>
                                <p class="card-text">Dell cut/single machine haircut</p>
                                <h6 class="card-subtitle mb-2 text-body-secondary">NOK 300</h6>
                            </div>
                            <button class="btn btn-light">
                                <h1><b>+</b></h1>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="extra-services" role="tabpanel" aria-labelledby="extra-services-tab"
                    tabindex="0">
                    <h1 class="mb-3"><b>Extra Services</b></h1>
                    <div class="card my-3">
                        <div class="card-body m-2 d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="card-title">Machine cut</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">15 min • Men only</h6>
                                <p class="card-text">Dell cut/single machine haircut</p>
                                <h6 class="card-subtitle mb-2 text-body-secondary">NOK 300</h6>
                            </div>
                            <button class="btn btn-light">
                                <h1><b>+</b></h1>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="card my-3">
                    <div class="card-body m-2 d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="card-title">Machine cut</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">15 min • Men only</h6>
                            <p class="card-text">Dell cut/single machine haircut</p>
                            <h6 class="card-subtitle mb-2 text-body-secondary">NOK 300</h6>
                        </div>
                        <button class="btn btn-light">
                            <h1><b>+</b></h1>
                        </button>
                    </div>
                </div>

                <div class="card my-3">
                    <div class="card-body m-2 d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="card-title">Machine cut</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">15 min • Men only</h6>
                            <p class="card-text">Dell cut/single machine haircut</p>
                            <h6 class="card-subtitle mb-2 text-body-secondary">NOK 300</h6>
                        </div>
                        <button class="btn btn-light">
                            <h1><b>+</b></h1>
                        </button>
                    </div>
                </div>

                <div class="card my-3">
                    <div class="card-body m-2 d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="card-title">Machine cut</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">15 min • Men only</h6>
                            <p class="card-text">Dell cut/single machine haircut</p>
                            <h6 class="card-subtitle mb-2 text-body-secondary">NOK 300</h6>
                        </div>
                        <button class="btn btn-light">
                            <h1><b>+</b></h1>
                        </button>
                    </div>
                </div>

                <div class="card my-3">
                    <div class="card-body m-2 d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="card-title">Machine cut</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">15 min • Men only</h6>
                            <p class="card-text">Dell cut/single machine haircut</p>
                            <h6 class="card-subtitle mb-2 text-body-secondary">NOK 300</h6>
                        </div>
                        <button class="btn btn-light">
                            <h1><b>+</b></h1>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-5 selected-services">
            <div class="card">
                <div class="card-header">
                    Selected Services
                </div>
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <img src="/custom/img/selected-service.png" class="rounded me-3" width="62px" alt="Image Hairdresser">
                        <div>
                            <h5 class="card-title"><b>Image Hairdresser</b></h5>
                            <h5 class="card-title">Storhaug, Stavanger</h5>
                        </div>
                    </div>
                    <p class="card-text mt-3">No services have been selected</p>
                    <hr>
                    <div class="d-flex justify-content-between">
                        <h5>Total</h5>
                        <h5>free</h5>
                    </div>
                    <div class="mt-5 d-grid gap-2">
                        <button class="btn btn-secondary" type="button">Continue</button>
                    </div>
                </div>
            </div>
        </div>
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
  