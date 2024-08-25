

const backendUrl = `https://xepxem-ecom-backend.vercel.app/`



const summaryAPI = {

   register: {
    url: `${backendUrl}/api/v1/register`,
   },

    login: {
    url: `${backendUrl}/api/v1/login`,
   },

   forget: {
    url: `${backendUrl}/api/v1/forget_password`,
   },

   reset: {
    url: `${backendUrl}/api/v1/reset_password`,
   },

   profile: {
      url: `${backendUrl}/api/v1/profile`,
   },

   Allusers : {
      url: `${backendUrl}/api/v1/Allusers`,
   }
}

export { summaryAPI} 