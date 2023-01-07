window.addEventListener('load', async () =>{
    const token =  localStorage.getItem('YourToken')
    const UserName =  localStorage.getItem('YourName')

    try {
        const {data} = await axios.get('/api/v01/jobs',{
            headers:{
                authorization: `Bearer ${token}`
            }
            
        })
        
        console.log(data.jobs.length)
    

    const user = document.querySelector('#user').textContent = `User : ${UserName}`
    const numberofjobs = document.querySelector('#numberofjobs').textContent = `Number Of Jobs : ${data.count}`
    if(data.jobs.length === 0){
        document.getElementById('nojob').textContent = "You don't have any job yet!"
     }
    

     data.jobs.forEach(jobb => {
        const {_id, company, createdAt, createdBy, position, status, } = jobb
     
    
 
     
    const article = document.createElement('article')
    article.id = "job"
    article.className = _id 
    

    const companyt = document.createElement('h4')
    companyt.classList.add("job_item")
    companyt.textContent = "Company : "
    const companytSpan = document.createElement('input')
    companytSpan.id = "comp"
    companytSpan.value = company
    companytSpan.setAttribute('readonly', 'readonly')
    companytSpan.style.border = "none"
    companyt.appendChild(companytSpan)
    article.appendChild(companyt)

    const positiont = document.createElement('h4')
    positiont.classList.add("job_item")
    positiont.textContent = "Position : "
    const positiontSpan = document.createElement('input')
    positiontSpan.setAttribute('readonly', 'readonly')
    positiontSpan.id = "pos"
    positiontSpan.value = position
    positiontSpan.style.border = "none"
    positiont.appendChild(positiontSpan)
    article.appendChild(positiont)

    const statust = document.createElement('h4')
    statust.classList.add("job_item")
    statust.textContent = "Status : "
    const statustSpan = document.createElement('input')
    statustSpan.setAttribute('readonly', 'readonly')
    statustSpan.value = status
    statustSpan.style.border = " none"
    statustSpan.id = "stat"
    statust.appendChild(statustSpan)
    article.appendChild(statust)

    const date = document.createElement('h4')
    date.classList.add("job_item")
    date.textContent = `Date : `
    const dateSpan = document.createElement('span')
    dateSpan.id = "dat"
    dateSpan.textContent = createdAt
    date.appendChild(dateSpan)
    article.appendChild(date)

    const hr = document.createElement('hr')
    hr.id = "hr"
    dateSpan.appendChild(hr)
         
     const divBtn = document.createElement("div")
     divBtn.classList.add("functionbtn")
     divBtn.style.display = "flex"
     article.appendChild(divBtn)

     const editBtn = document.createElement('button')
     editBtn.id = "editbtn"
     editBtn.textContent = "Edit Job"
     divBtn.appendChild(editBtn)
     editBtn.addEventListener('click', ()=>{
        console.log(article.className)
        localStorage.setItem('JobId', article.className)
        window.location = "singlejob.html"
       
       
     })
     
     const deletebtn = document.createElement('button')
     deletebtn.id = "deletebtn"
     deletebtn.textContent = "Delete Job"
     divBtn.appendChild(deletebtn)
     deletebtn.addEventListener('click', async ()=>{

        await axios.delete(`/api/v01/jobs/${article.className}`,{
            headers:{
                    authorization: `Bearer ${token}`
                }
            },
        )
        window.location = 'dashboard.html'
     })
     


    document.getElementById('jobs').append(article)
    
});
} catch (error) {
    console.log(error)
}
 
    
    const newCompany =  document.querySelector('#company')
    const newPosition = document.querySelector('#position')
    const newStatus = document.querySelector('#status')
    const createBtn = document.querySelector('#createbtn')

    createBtn.addEventListener('click', async (e) =>{
        e.preventDefault()
        console.log(token)
        
        try {
            const {data} = await axios.post('/api/v01/jobs', {
                company:newCompany.value,
                position: newPosition.value,
                status: newStatus.value,
                
                auth: `Bearer ${token}`


            })
            window.location = "dashboard.html"
        } catch (error) {
            console.log(error)
        }
    })
 



})
