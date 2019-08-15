const name = document.getElementById(`name-profile`);
const city = document.getElementById(`city-profile`);
const state = document.getElementById(`state-profile`);
const imageProfile = document.getElementById(`img-profile`);
const containerProfile = document.getElementById(`profile`);
let profile = containerProfile.children[0];
let paginaActual = 1;
const buttonLoadMore = document.getElementById(`load-more`);
containerProfile.innerHTML = '';

const getAllUsers = () => {
    fetch(`https://randomuser.me/api/?page=${paginaActual}&results=50&seed=abc`)
    .then(response => response.json())
    .then(data => {
        console.log(data);


        for(const info of data.results){
            let newProfile = profile.cloneNode(true);

            newProfile.children[0].src = info.picture.thumbnail;
            newProfile.children[1].innerText = `
            ${info.name.first} ${info.name.last}`;
            newProfile.children[2].innerText = 
            `
            State:
            ${info.location.state}
            `;
            newProfile.children[3].innerText = 
            `
            City:
            ${info.location.city}`;

            containerProfile.appendChild(newProfile);

            // buttonLoadMore.onclick = () => {
            //     paginaActual++;
                
                
            // }
            // buttonLoadMore.onclick = () => {
            //     paginaActual++;
            //     getAllUsers(`https://randomuser.me/api/?page=${paginaActual}&results=50&seed=abc`)
                
            // }

            newProfile.onclick = () => {
                Swal.fire({
                    title: `<div id='pop-up-name'>${info.name.first} ${info.name.last}</div`,
                    imageUrl: `${info.picture.large}`,
                    html:
                        `<div id="pop-up">
                            <p>Username: ${info.login.username}</p>
                            <p>Email: ${info.email}</p>
                            <p>Edad: ${info.dob.age} años</p>
                            <p class='info-pop-up'>State: ${info.location.state}</p>
                            <p class='info-pop-up'>City: ${info.location.city}</p>
                        </div>`,
                    showCloseButton: true,
                    // showCancelButton: true,
                    // focusConfirm: false,
                    // confirmButtonText:
                    //   '<i class="fa fa-thumbs-up"></i> Great!',
                    // confirmButtonAriaLabel: 'Thumbs up, great!',
                    // cancelButtonText:
                    //   '<i class="fa fa-thumbs-down"></i>',
                    // cancelButtonAriaLabel: 'Thumbs down'
                  })
            }
            

            
        }

       
        
    })
}

// const button = () => {
//     paginaActual = 1;
//     containerProfile.innerHTML = "";
//     getAllUsers();
//     buttonLoadMore.onclick = () => {
//         paginaActual++;
//         getAllUsers();
//     }
// }


buttonLoadMore.onclick = () => {
    paginaActual++;
    getAllUsers();
  
    if(paginaActual === 100){
        buttonLoadMore.style.display = 'none';
    }
    
}


getAllUsers();


