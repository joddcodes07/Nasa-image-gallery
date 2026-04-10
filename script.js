let apiKey = 'HNVeCZmgoEnD4nlUQdX72iiRTQXQVrf3EtU2A7tw'
let monthSelect = document.getElementById('month-select')
let daySelect = document.getElementById('day-select')
let yearSelect = document.getElementById('year-select')
let fetchBtn = document.getElementById('fetch-btn')
let galleryGrid = document.getElementById('gallery-grid')
let modal = document.getElementById('detail-modal')
let closeModal = document.getElementById('close-modal')
let modalImg = document.getElementById('modal-img')
let modalTitle = document.getElementById('modal-title')
let modalDate = document.getElementById('modal-date')
let modalDesc = document.getElementById('modal-desc')

let months = [
    {val:'01', name:'January'}, {val:'02', name:'February'}, {val:'03', name:'March'},
    {val:'04', name:'April'}, {val:'05', name:'May'}, {val:'06', name:'June'},
    {val:'07', name:'July'}, {val:'08', name:'August'}, {val:'09', name:'September'},
    {val:'10', name:'October'}, {val:'11', name:'November'}, {val:'12', name:'December'}
]

months.forEach((m)=>{
    let opt = document.createElement('option')
    opt.value = m.val
    opt.innerText = m.name
    monthSelect.appendChild(opt)
})

for(let i=1; i<=31; i++){
    let d = i < 10 ? `0${i}` : `${i}`
    let opt = document.createElement('option')
    opt.value = d
    opt.innerText = d
    daySelect.appendChild(opt)
}

for(let x=2026; x>=1995; x--){
    let opt = document.createElement('option')
    opt.value = x
    opt.innerText = x
    yearSelect.appendChild(opt)
}

async function getInitialGrid() {
    try{
        let res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=6`)
        let data = await res.json()
        renderGrid(data)
    }
    catch(error){
        return error
    }
}

async function getSpaceByDate(selectedDate) {
    try{
        let res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${selectedDate}`)
        let data = await res.json()
        renderGrid([data])
    }
    catch(error){
        return error
    }
}

function renderGrid(dataArray) {
    galleryGrid.innerHTML = ''
    dataArray.forEach((n)=>{
        if(n.media_type==='image'){
            let wrapper = document.createElement('div')
            wrapper.className = 'grid-item'
            
            let html = `
                <img src="${n.url}" alt="${n.title}">
                <div class="item-overlay">
                    <h4>${n.title}</h4>
                    <button class="read-btn">Read More</button>
                </div>
            `
            wrapper.innerHTML = html
            
            let btn = wrapper.querySelector('.read-btn')
            btn.addEventListener('click', ()=>{
                openModal(n)
            })
            
            galleryGrid.appendChild(wrapper)
        }
    })
}

function openModal(dataObj) {
    modalImg.src = dataObj.url
    modalTitle.innerText = dataObj.title
    modalDate.innerText = dataObj.date
    modalDesc.innerText = dataObj.explanation
    modal.classList.remove('hidden')
}

closeModal.addEventListener('click', ()=>{
    modal.classList.add('hidden')
})

fetchBtn.addEventListener('click', ()=>{
    let m = monthSelect.value
    let d = daySelect.value
    let y = yearSelect.value
    
    if(m && d && y){
        let dateStr = `${y}-${m}-${d}`
        getSpaceByDate(dateStr)
    }
})

getInitialGrid()