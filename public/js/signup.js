window.addEventListener('load', () =>{
    const userName = document.querySelector('#name')
    const userEmail =  document.querySelector('#email')
    const userPass =  document.querySelector('#password')
    const signupBtn = document.querySelector('#signupbtn')

    signupBtn.addEventListener('click', async (e) =>{
      const name = userName.value
      const password = userPass.value
      const email = userEmail.value

      try {
        const {data} =  await axios.post('/api/v01/auth/register',{
          name:name,
          email:email,
          password:password
        })
        
        const token = data.token
        localStorage.setItem('YourToken', token)
        localStorage.setItem('YourName', name)
        window.location = 'dashboard.html'
      } catch (error) {
        const errorMsg = error.request.statusText
        if(errorMsg === "Unauthorized"){
            document.getElementById('noauth').textContent = `${error.request.statusText}! Please create account.`
        
        }
        else if(errorMsg === "Bad Request"){
            document.getElementById('noauth').textContent = `Yikes! Please provide name, email and password.`
        
        }
      
      } 
    })
})