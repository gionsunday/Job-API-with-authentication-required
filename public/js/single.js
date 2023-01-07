window.addEventListener('load', async () =>{
    const jobid = localStorage.getItem('JobId')
    const token =  localStorage.getItem('YourToken')
    const {data} = await axios.get(`api/v01/jobs/${jobid}`,{
        headers:{
            authorization: `Bearer ${token}`
        }
    })

console.log(data.job)
document.getElementById('jobid').textContent = data.job._id
    const companyUpdate = document.querySelector('#company')
    const positionUpdate =  document.querySelector('#position')
    const statusUpdate =  document.querySelector('#status')
    const dateUpdate =  document.querySelector('#date')
    const updateBtn = document.querySelector('#updatebtn')
          
    companyUpdate.value = data.job.company
    positionUpdate.value = data.job.position
    statusUpdate.value = data.job.status
    dateUpdate.value = data.job.createdAt
        updateBtn.addEventListener('click', async (e) =>{
            e.preventDefault()
            console.log(token)
            console.log(companyUpdate.value)
            
            try {
                const {data} = await axios.post(`/api/v01/jobs/${jobid}`, {
                    company:companyUpdate.value,
                    position: positionUpdate.value,
                    status: statusUpdate.value,
                    createdAt:dateUpdate.value,
                    
                    auth: `Bearer ${token}`
    
    
                })
                
                updateBtn.textContent = "Job Updated!"
                setTimeout(() =>{

                    window.location = "dashboard.html"
                }, 1000)
            } catch (error) {
                console.log(error)
            }
        })
})