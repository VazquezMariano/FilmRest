
async function leerPelis(){

    try {
        let respuesta = await fetch("https://64ce61090c01d81da3eec240.mockapi.io/pelis");
        let resprocesada = await respuesta.json();
        for(let item of resprocesada){
            crearCarteles(item);
        }
    } catch (error) {
        console.log(error)
    }
}

function crearCarteles(objeto){
    let contenido = document.getElementById("contenido");
    let titulo = objeto.titulo;
    let valoracion = objeto.valoracion;
    let resumen = objeto.resumen;
    let id = objeto.id;
    let cartel = document.createElement("div");
    let tituloDOM = document.createElement("h1");
    tituloDOM.textContent = titulo;
    let valoracionDOM = document.createElement("h2");
    valoracionDOM.textContent = `${valoracion}/5`;
    let resumenDOM = document.createElement("p");
    resumenDOM.textContent = resumen;
    let idDOM = document.createElement("h4");
    idDOM.textContent = id;
    cartel.classList.add("carteles");
    cartel.appendChild(tituloDOM);
    cartel.appendChild(valoracionDOM);
    cartel.appendChild(resumenDOM);
    cartel.appendChild(idDOM)
    contenido.appendChild(cartel);
}

async function enviarPeli(){
    let titulo = document.getElementById("titulo").value;
    let resumen = document.getElementById("resumen").value;
    let valoracion = document.getElementById("valoracion").value;

        let peli = {
            "titulo": titulo,
            "valoracion": valoracion,
            "resumen": resumen
        }

        try {
            let respuesta = await fetch("https://64ce61090c01d81da3eec240.mockapi.io/pelis", {
                "method": "POST",
                "headers": {'Content-Type':"application/json"},
                "body": JSON.stringify(peli)
    
            });
    
            if(respuesta.status == 201){
                let mensaje = document.getElementById("msg");
                mensaje.innerHTML = "Creado!"
                setTimeout(() => {
                    mensaje.innerHTML = "";
                }, 4000)
                let jsonactualizado = await fetch("https://64ce61090c01d81da3eec240.mockapi.io/pelis");
                let jsonprocesado = await jsonactualizado.json();
                crearCarteles(jsonprocesado[jsonprocesado.length - 1]);
            }

        } catch (error) {

        console.log(error);

    } 
        
} 

async function eliminar(){
    try {

        let id = document.getElementById("id").value;

        let jsoneliminar = await fetch("https://64ce61090c01d81da3eec240.mockapi.io/pelis");
        let jsoneliminarProces = await jsoneliminar.json();

        for(item of jsoneliminarProces){
            if(item.id === id){
                let carteles = document.getElementById("contenido").children;
                for(let i = 0; i < carteles.length; i++){
                    if(carteles[i].children[3].textContent === id){
                        carteles[i].remove();
                    }
                }
            }
        }





        
        let respuestaEliminar = await fetch(`https://64ce61090c01d81da3eec240.mockapi.io/pelis/${id}`, {
        "method": "DELETE"
        });
        if(respuestaEliminar.status == 200){
            let mensaje = document.getElementById("msg");
            mensaje.innerHTML = "Eliminado!"
            setTimeout(() => {
                mensaje.innerHTML = "";
            }, 4000)
        }
    } catch (error) {
        console.log(error);
    }
}

async function editar(){
    let titulo = document.getElementById("PUTtitulo").value;
    let resumen = document.getElementById("PUTresumen").value;
    let valoracion = document.getElementById("PUTvaloracion").value;
    let id = document.getElementById("PUTid").value;

    let peli = {
        "titulo": titulo,
        "valoracion": valoracion,
        "resumen": resumen,
        "id": id
    }

    try {

        let cargarDatos = await fetch(`https://64ce61090c01d81da3eec240.mockapi.io/pelis`);
        let datosCargados = await cargarDatos.json();
        
            
        let carteles = document.getElementById("contenido").children;
        for(let i = 0; i < carteles.length; i++){
                //carteles[i].children[3].textContent === id
            if(carteles[i].children[3].textContent === id){
                
                carteles[i].children[0].textContent = peli.titulo;
                carteles[i].children[1].textContent = peli.valoracion;
                carteles[i].children[2].textContent = peli.resumen;
                carteles[i].children[3].textContent = peli.id;

            }
        }
            
        










        let respuestaPUT = await fetch(`https://64ce61090c01d81da3eec240.mockapi.io/pelis/${id}`,{
            "method": "PUT",
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify(peli)
        });
        if(respuestaPUT.status === 200){
            let mensaje = document.getElementById("msg");
            mensaje.innerHTML = "Editado!"
            setTimeout(() => {
                mensaje.innerHTML = "";
            }, 4000)


        }
    } catch (error) {
        console.log(error);
    }

}

let botonEnviar = document.getElementById("enviar");
let botonEliminar = document.getElementById("ideliminar");
let botonEditar = document.getElementById("PUTenviar");

botonEnviar.addEventListener("click", enviarPeli);
botonEliminar.addEventListener("click", eliminar);
botonEditar.addEventListener("click", editar);

leerPelis();