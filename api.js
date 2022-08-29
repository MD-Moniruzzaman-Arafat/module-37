// load Data
const loadData = () => {
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLoadData(data.data.slice(0, 20)))
}

// display load data
const displayLoadData = allPhone => {
    const phoneDetails = document.getElementById('phoneDetails');
    phoneDetails.textContent = ''
    const displayData = document.getElementById('displayData');
    displayData.textContent = '';
    if (allPhone.length == 0) {
        const errorMassage = document.getElementById('errorMassage');
        errorMassage.style.display = 'block'
        errorMassage.innerText = 'NOT FOUND';

    } else {
        const errorMassage = document.getElementById('errorMassage');
        errorMassage.style.display = 'none'
        allPhone.forEach(singlePhone => {
            console.log(singlePhone);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card" >
                    <img src="${singlePhone.image}" class="card-img-top img-fluid" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Name : ${singlePhone.phone_name}</h5>
                        <p class="card-text">Brand : ${singlePhone.brand}</p>
                        <button type="button"  class="btn btn-primary" onclick="detailsApi('${singlePhone.slug}')">Detail</button>
                    </div>
                </div>
        `
            displayData.appendChild(div);
        });
    }

}

// phone details api
const detailsApi = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => detailsPhone(data.data))
}

// details phone
const detailsPhone = details => {
    console.log(details)
    const phoneDetails = document.getElementById('phoneDetails');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.style.width = '18rem'
    div.innerHTML = `
        <img src="${details.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <p class="card-text">Name : ${details.name}</p>
        <p class="card-text">Brand : ${details.brand}</p>
            <p class="card-text">Release Date : ${details.releaseDate ? details.releaseDate : 'not found'}</p>
            <p class="card-text">Main Features : ${details.mainFeatures.chipSet} , ${details.mainFeatures.displaySize} , ${details.mainFeatures.memory}</p>
            <p class="card-text">Sensors : ${details.mainFeatures.sensors[0]} , ${details.mainFeatures.sensors[1]} , ${details.mainFeatures.sensors[2]} , ${details.mainFeatures.sensors[3]} , ${details.mainFeatures.sensors[4]} , ${details.mainFeatures.sensors[5]} , ${details.mainFeatures.sensors[6]}</p>
            <p class="card-text">Others : Bluetooth :- ${details.others ? details.others.Bluetooth : 'not found'} , GPS :- ${details.others ? details.others.GPS : 'not found'} , NFC :- ${details.others ? details.others.NFC : 'not found'} , Radio :- ${details.others ? details.others.Radio : 'not found'} , USB :- ${details.others ? details.others.USB : 'not found'} , WLAN :- ${details.others ? details.others.WLAN : 'not found'}</p>
        </div>
    `
    phoneDetails.appendChild(div);
}

