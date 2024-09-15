// stores/counter.js
import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: {},
      is_login: false,
      token: '',
      audioInputDevice: {},
      audioOutputDevice: {},
      nextAuthRequired: Date.now(), // allow offline access for one day
      offlineMode: false // if user is offline then don't try to connect to the backend
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async UserLogin(email, password) {
      try {
        // Make the API request
        const data = await $fetch('http://localhost:8000/api/v1/login', {
          method: 'POST',
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        // Check if the response indicates an error
        if (data.response == false) {
          // Show error toaster with the exact message from the API response
          const toaster = useToaster();
          toaster.show({
            title: "Error",
            message: data.error || 'Email or password are incorrect.',
            color: "danger",
            icon: "ph:x",
            class: "end-2 top-2",
            closable: true,
          });
          return; // Exit the function early
        }
    
        // Check if the response contains user data and a token
        if (data.user && data.user.name) {
          // Handle success
          this.user = data.user;
          this.token = data.token;
          this.is_login = true;
    
          // Optionally set the nextAuthRequired if offlineMode is false
          if (!this.offlineMode) {
            this.nextAuthRequired = Date.now() + 24 * 60 * 60 * 1000;
          }
    
          // Redirect to the dashboard
          const router = useRouter();
          // Show error toaster if user data is incomplete
          const toaster = useToaster();
          toaster.show({
            title: "success",
            message: `Login Successfully`,
            color: "success",
            icon: "ph:x",
            class: "end-2 top-2",
            closable: true,
          });
          router.push('/dashboards'); // Adjust the path if necessary
        } else {
          // Show error toaster if user data is incomplete
          const toaster = useToaster();
          toaster.show({
            title: "Error",
            message: `Login failed. User information is incomplete.`,
            color: "danger",
            icon: "ph:x",
            class: "end-2 top-2",
            closable: true,
          });
        }
      } catch (error) {
        // Handle any errors during the fetch
        const toaster = useToaster();
        toaster.show({
          title: "Error",
          message: `An unexpected error occurred.`,
          color: "danger",
          icon: "ph:x",
          class: "end-2 top-2",
          closable: true,
        });
      }
    },


    //  Register user with
     async RegisterUser(name, email, password){
      const data = await $fetch('http://localhost:8000/api/v1/register', {
         method: 'POST',
         body: JSON.stringify({
          name: name.value,
           email: email.value,
           password: password.value,
         }),
         headers: {
           'Content-Type': 'application/json',
         },
       })
       // Handle success (e.g., store token, redirect, etc.)
       console.log('Login successful:', data)
       console.log('user.user:', data.user)
       console.log('this.user:', this.user)
       this.user = data.user
       this.token = data.token
       console.log('this.user:', this.user)
       this.is_login = true
       if (!this.offlineMode) { this.nextAuthRequired = Date.now() + 24 * 60 * 60 * 1000 }
      },

    async UserLogout() {
      const token = this.token; // Ensure this.token is properly set
      const data = await $fetch('http://localhost:8000/api/v1/logout', {
        method: 'POST',
        headers: {
          Accept: "application/json",
          'Authorization': `Bearer ${token}`, // Use backticks for template literals
        },
      });
    
      // Handle success
      console.log('Logout successful:', data);
      this.$reset()
    // Redirect to dashboard
    const router = useRouter();
    router.push('/auth'); // Adjust the path if necessary
    },
    
    resetState() {
      // Reset state to initial values
      this.$reset(); // Use $reset() to restore initial state if available
    },

    // logout the user
    logout () {
      this.user = {}
      this.is_login = false
    },
    updateUser (user) {
      this.user = user
    },
    reset() {
      this.$reset(); // This will reset the state to its initial values
    }
  },
  getters: {
    getUserScenery () {
      if (this.user.scenery) {
        return this.user.scenery
      } else {
        return 'meadow'
      }
    },
    isAuthenticated () {
      if (this.is_login === true) {
        this.changeOfflineMode(false)
        return true
      } else if (Date.now() < this.nextAuthRequired) {
        this.changeOfflineMode(true)
        return true
      }
      return false
    }
  },
  persist: true
})
