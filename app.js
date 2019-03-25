
const cafeList = document.querySelector('#cafe-list')
const form     = document.querySelector('#add-cafe-form') 

//create elements and render the coffe places

const renderCafe = (doc) => {
     let li   = document.createElement('li')
     let name = document.createElement('span')
     let city = document.createElement('span')
     let ex   = document.createElement('div')

     li.setAttribute('data-id', doc.id)
     name.textContent = doc.data().name
     city.textContent = doc.data().city
     ex.textContent = 'X'   

     li.appendChild(name);
     li.appendChild(city);
     li.appendChild(ex)
     
     cafeList.appendChild(li);

     //deleting data
     ex.addEventListener('click', (ev) => {
          ev.stopPropagation();
          let id = ev.target.parentElement.getAttribute('data-id')
          console.log(id)
          DB.collection('cafes').doc(id).delete()
     })

} 

//getting data
// Doing QUERYS .where('city','<','C')
// ordering those queries .orderBy('city')


// DB.collection('cafes').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc)
//     })
// })

//saving data
form.addEventListener('submit', (ev) => {
        ev.preventDefault()
        DB.collection('cafes').add({
            name: form.name.value,
            city: form.city.value
        })
        form.name.value = '';
        form.city.value = '';
})


//real time listener

DB.collection('cafes').orderBy('city').onSnapshot(snapshot => {
        let changes = snapshot.docChanges()
        changes.forEach( change => {
            //console.log(change.doc.data())
            if(change.type == 'added') {
                renderCafe(change.doc)
            }else if (change.type == 'removed'){
                let li = cafeList.querySelector(`[data-id="${change.doc.id}"`)
                cafeList.removeChild(li)
            }
        })
})

//update
// DB.collection('cafes').doc('g2MBshRZefkfCTMFLffy').update({
//     name: 'Galeria Molona Libro',
//     city: 'New York'
// })

//set - overwrite all the document properties
// DB.collection('cafes').doc('g2MBshRZefkfCTMFLffy').set({
//     name: 'Galeria Molona Libro',
//    city: 'New York'
// })
