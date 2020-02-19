//console.log("js on");
var paginaActual = 1;
const xhttp = new XMLHttpRequest();
var botonBusqueda = document.querySelector("#botonBusqueda");
botonBusqueda.addEventListener("click", function(){
    paginaActual = 1;
    busqueda(paginaActual);
});
document.querySelector("#pagina1").addEventListener("click", function(){
    paginaActual = 1;
    busqueda(paginaActual);
});
document.querySelector("#paginanterior").addEventListener("click", function(){
    paginaActual -= 1;
    busqueda(paginaActual);
});
document.querySelector("#paginasiguiente").addEventListener("click", function(){
    paginaActual += 1;
    busqueda(paginaActual);
});
document.querySelector("#ultimapagina").addEventListener("click", function(){
    paginaActual = 26;
    busqueda(paginaActual);
});

function busqueda(pagina){
    //console.log("busqueda on");
    if(paginaActual>2){
        document.querySelector("#paginanterior").style.display = 'block';
        document.querySelector("#paginanterior").value = paginaActual -1;
    }
    else document.querySelector("#paginanterior").style.display = 'none';

    if(paginaActual<25){
        document.querySelector("#paginasiguiente").style.display = 'block';
        document.querySelector("#paginasiguiente").value = paginaActual +1;
    }
    else document.querySelector("#paginasiguiente").style.display = 'none';

    var categoria = document.querySelector('#busqueda').value;

   inicializar(pagina, categoria);

    xhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){

            let imagenes = JSON.parse(this.responseText);

            var center = document.querySelector('#center');
            
            for(let item of imagenes){
                if(item.categoria == filtro){
                    center.innerHTML += item.imagen;
                }
                
            }
        }
    }

}

function request(url) {

    return new Promise(function (resolve, reject) {

        const xhr = new XMLHttpRequest()

        xhr.timeout = 2000

        xhr.onreadystatechange = function (e) {

            if (xhr.readyState === 4) {

                if (xhr.status === 200) {

                    resolve(xhr.response)

                } else {

                    reject(xhr.status)

                }

            }

        }

        xhr.ontimeout = function () {

            reject('timeout')

        }



        xhr.open('get', url, true)

        xhr.send()

    })

}



function inicializar(pagina, categoria) {

    

    let api = 'https://pixabay.com/api/?key=15302803-762f6e93f6b7e642009d5c6eb&q=yellow+flowers&image_type=photo&q='+categoria+'&page='+pagina;

    const apiPromise = request(api)

    apiPromise

        .then(function printImagenes(json){

            let api = JSON.parse(json)
            
            var center = document.querySelector('#center');
            center.innerHTML = "";
            console.log(api)

            for (let item of api.hits) {

                var img = document.createElement("img");
                center.appendChild(img);
                img.setAttribute("src", item.previewURL);

            }

        })

        .catch(function handleErrors(error) {

            console.log("Error in the Movies Carousel Promise")

        })
}