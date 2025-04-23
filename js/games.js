const games = [
  {
    id: 2000,
    name: "Donkey Kong Country™ Returns HD",
    price: 169819,
    image:
      "https://assets.nintendo.com/image/fetch/q_auto/f_auto/https://atum-img-lp1.cdn.nintendo.net/i/c/d7e15809208f425ab20caca6f40e3b6d_1024",
    category: "Action",
  },
  {
    id: 1000,
    name: "Super Mario Party™ Jamboree",
    price: 75200,
    category: "Board",
    image:
      "https://assets.nintendo.com/image/fetch/q_auto/f_auto/https://atum-img-lp1.cdn.nintendo.net/i/c/49ff5c5e983d4a2a8682588179d496c5_1024",
  },
  {
    id: 3000,
    name: "Xenoblade Chronicles™ X",
    price: 79999,
    category: "Action",
    image:
      "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000088832/d33ed7f51de601b10cafa5814fd786bbad317b0421a43d54917a2c647be2f23b",
  },
  {
    id: 3150,
    name: "Luigi's Mansion™ 2 HD",
    price: 59999,
    category: "Adventure",
    image:
      "https://assets.nintendo.com/image/fetch/q_auto/f_auto/https://atum-img-lp1.cdn.nintendo.net/i/c/776b97135e90471e88842504a56ee583_1024",
  },
  {
    id: 4000,
    name: "The Legend of Zelda™: Tears of the Kingdom",
    price: 41400,
    category: "Adventure",
    image:
      "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000063714/956c12eb1a4c9e68b494cca7efd23d20ba8a789a5eb02589affae64bc6bc3282",
  },

];

const tableBodyHTML = document.getElementById("table-body")
const searchHTML = document.querySelector('#search')
const gamesFormHTML = document.getElementById("games-form")
/*
Esto no funciona porque esta linea se lee antes de que los juegos se pinten, por lo tanto el console.log no devuelve nada
const gameDetailButtons = document.querySelectorAll("button[data-game-detail]")
console.log(gameDetailButtons)
 */

let gameDetailButtons


// Agregar juegos mediante el formulario
gamesFormHTML.addEventListener("submit", (evt) => {
  evt.preventDefault()
  console.log(evt)

  const el = evt.target.elements

  const newGame = {
    //Toma los ultimos 4 numeros
    id: Date.now().toString().slice(-4),
    // id: Math.round(Date.now() / 1000000000),
    name: el.name.value,
    price: el.price.valueAsNumber,
    image: el.image.value,
    category: el.category.value,
  }

  games.push(newGame)

  pintarJuegos(games)
  gamesFormHTML.reset()
  console.log(newGame)
  //   console.log(el.name.value)
  //   console.log(el.image.value)
  //   console.log(el.price.value)
  //   console.log(el.category.value)
})

//Pintar los juegos en la tabla
function pintarJuegos(arrayJuegos) {

  tableBodyHTML.innerHTML = ""

  arrayJuegos.forEach((juego) => {

    tableBodyHTML.innerHTML += `<tr>
                                      <td class="image-cell">
                                          <img src="${juego.image}" alt="">
                                      </td>
                                      <td class="id-cell">
                                          ${juego.id}
                                      </td>
                                      <td class="name-cell">${juego.name}</td>
                                      <td class="category-cell">
                                          ${juego.category}
                                      </td>
                                      <td class="price-cell">
                                          $ ${juego.price} 
                                      </td>
                                      <td class="action-cell">
                                          
                                          <div class="buttons">
  
                                              <button class="button-icon" data-game-detail="${juego.id}" data-bs-target="#game-modal" data-bs-toggle="modal">
                                                  <i class="fa-solid fa-eye"></i>
                                              </button>
  
                                              <button class="button-icon danger" onclick="borrarJuego(${juego.id})">
                                                  <i class="fa-solid fa-trash"></i>
                                              </button>
  
                                          </div>
  
                                      </td>
                                  </tr>`;
  })

  gameDetailButtons = document.querySelectorAll("button[data-game-detail]")
  console.log(gameDetailButtons)

  gameDetailButtons.forEach(button => {
    button.addEventListener("click", (event) => {

      const id = event.currentTarget.dataset.gameDetail

      const juegos = games.find(game => {
        if (game.id == id) { return true }
      })
      // console.log(event.currentTarget.dataset.gameDetail)
      const modalTitle = document.getElementById("game-modal-title")
      const modalBody = document.getElementById("game-modal-body")

      modalTitle.innerText = juegos.name
      modalBody.innerHTML = 
      `<div class="row">
        <div class="col">
          <img src="${juegos.image}" width="150px" height="150px">
        </div>
        <div class="col">
        <p>${juegos.category}</p>
        <p>${juegos.price}</p>
        </div>
      </div>`
    })
  })
}

pintarJuegos(games)


function mostrarJuego(id) {

}





//Buscar juegos por nombre
searchHTML.addEventListener("input", function (evt) {

  const nombreDeJuegoABuscar = evt.target.value.toLowerCase()

  const filtarJuegosNombre = games.filter(game => {

    const nombreJuego = game.name.toLowerCase()

    return nombreJuego.includes(nombreDeJuegoABuscar)

    // if (nombreDeJuegoABuscar === game.name.toLowerCase()){
    //   return true
    // }
  })

  pintarJuegos(filtarJuegosNombre)
})

function borrarJuego(idBorar) {
  // Recibo el id
  // Vamos a buscar la posicion del elemento usando findIndex
  const indice = games.findIndex(juego => {
    if (juego.id === idBorar) {
      return true
    }
  })
  // Confirmamos que el usuario realmente quiere borrar el juego
  const borrar = confirm("Realmente desea borrar este juego?")
  if (borrar) {
    games.splice(indice, 1)
    pintarJuegos(games)
  }
  // Usamos splice para borrar el elemento encontrado en findIndex
}

// function ordenarPorPrecioAscendente() {

//   const juegosAsc = games.toSorted((a, b) => {
//     return a.price - b.price
//   })

//   pintarJuegos(juegosAsc)
// }

// function ordenarPorPrecioDescendente() {

//   const juegosDesc = games.toSorted((a, b) => {

//     return b.price - a.price
//   })
//   pintarJuegos(juegosDesc)
// }

function ordenarPorPrecio(orden) {

  if (!orden) {
    pintarJuegos(games)
    return
  }

  //Utilizando el operador ternario
  const juegosOrenados = games.toSorted((a, b) => orden === 'asc' ? a.price - b.price : b.price - a.price)

  //   if(orden==="desc") return b.price - a.price
  //   else return a.price - b.price

  // })


  pintarJuegos(juegosOrenados)
}

// Funcion para filtrar por categoria
function filtrarPorCategoria(eventito) {

  const categoriaSeleccionada = eventito.target.value.toLowerCase()

  const juegosFiltrados = games.filter(juego => {

    if (juego.category.toLowerCase() === categoriaSeleccionada) {
      return true
    }
    return false
  })

  pintarJuegos(juegosFiltrados)
}

function filtrarPorNombre() {
  console.log("Filtrar por nombre")
}

