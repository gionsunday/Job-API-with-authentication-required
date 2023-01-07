window.addEventListener('load', ()=>{
    const userEmail = document.querySelector('#email')
    const userPass =  document.querySelector('#password')
    const loginBtn = document.querySelector('#loginbtn')

    loginBtn.addEventListener('click', async (e)=>{
        e.preventDefault()
        email = userEmail.value
        password = userPass.value

       try {
        const {data} = await axios.post('/api/v01/auth/login', {
            email:email,
            password:password
        })
        userEmail.value = ""
        userPass.value = ""
        console.log(data)
        const token = data.token
        const name = data.user.name
        localStorage.setItem('YourToken', token)
        localStorage.setItem('YourName', name)
        window.location = "dashboard.html"
    
       } catch (error) {
        const errorMsg = error.request.statusText
        if(errorMsg === "Unauthorized"){
            document.getElementById('noauth').textContent = `${error.request.statusText}! Please create account.`
        
        }
        else if(errorMsg === "Bad Request"){
            document.getElementById('noauth').textContent = `Oops! Please provide email and password to login.`
        
        }
      
       }
})
})