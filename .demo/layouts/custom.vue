<template>
        <div>
        <!-- content would be show here -->
        <slot />
    </div>
</template>

<script>

// useHead({
//   title: 'mindboost',
//   meta: {
//     name: 'theme-color',
//     content: '#E9C046'
//   },
//   link: [
//     { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' },
//   ],
//   script: [
//     {src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js'}
//   ]
// })

</script>

<style scoped>
 .testimonial-img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
        }

        .testimonial {
            display: flex;
            align-items: flex-start;
            margin-bottom: 1rem;
        }

        .testimonial-text {
            margin-left: 10px;
        }

        .main-testimonial {
            margin-top: 10rem;
        }

        #accordionPanelsStayOpenExample{
            margin-top: 7rem;
        }

        .services{
            margin-top: 7rem;
        }
</style>