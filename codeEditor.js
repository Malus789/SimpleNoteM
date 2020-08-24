//Matriz tipo objeto
const productos = [
  {
    nombre: "platanos",
    valor: "Este documentos habla sobre platanos",
    paper: 0,
    date: "2010-7-20 22:45:34",
  },
  {
    nombre: "pera",
    valor: "Este documentos habla sobre la pera",
    paper: 1,
    date: "2013-7-20 22:45:34",
  },
  {
    nombre: "sandia",
    valor: "La sandia es muy nutritiva digo",
    paper: 0,
    date: "2010-7-20 22:45:34",
  },
  {
    nombre: "melon",
    valor: "El melon es la hostia digo",
    paper: 1,
    date: "2019-7-20 22:45:34",
  },
  {
    nombre: "peras",
    valor: "peras, peras y mas peras",
    paper: 0,
    date: "2018-7-20 22:45:34",
  },
  {
    nombre: "uvas",
    valor: "Las uvas son deliciosas",
    paper: 0,
    date: "2017-7-20 22:45:34",
  },
];

//SearchFunction
const formulario = document.getElementById("formulario");
const searchButton = document.getElementById("button");
const resultSearch = document.getElementById("result");

function filter() {
  resultSearch.innerHTML = "";

  const text = formulario.value.toLowerCase();
  //ocupamos recorrer nuestra lista, y por cada ciclo guardar
  for (n = 0; n < productos.length; n++) {
    //guardamos el nombre del objeto productos en la variable name, ya pasado a minuscula
    let name = productos[n].valor.toLowerCase();
    //lo puse a buscar en el valor de los productos ///////BETA

    //si nombre.indexOf (indexOf nos localiza en que posicion esta la palabra que le pasemos)
    //si el cliente busca una "a" vamos a buscar esa "a" dentro de nombre, si la encuentra va a retornar cualquier cosa distinta a menos 1
    //si no encuentra el texto va a retornar -1
    if (name.indexOf(text) !== -1) {
      resultSearch.innerHTML += `
              <li>${productos[n].nombre}</li>               

              `;
    }
  }

  if (resultSearch.innerHTML === "") {
    resultSearch.innerHTML += `File not Found`;
  }
}
searchButton.addEventListener("click", filter);
formulario.addEventListener("keyup", filter);
filter();

///////////////////////////////////////////////////////////////
//ClickFile Function

// creamos un array vacio
let ElementsClick = new Array();
// capturamos el click y lo pasamos a una funcion
resultSearch.onclick = captureClick;

function captureClick(e) {
  let SrcClick;
  if (e == null) {
    // Si hac click un elemento, lo leemos
    SrcClick = event.srcElement;
  } else {
    // Si ha hecho click sobre un destino, lo leemos
    SrcClick = e.target;
  }
  // Añadimos el elemento al array de elementos
  ElementsClick.push(SrcClick);
  // Una prueba con salida en consola
  console.log(
    "Click " + SrcClick.innerHTML
  );

  LoadText(SrcClick.innerHTML);
}

////////////////////////////////////////////////////////////////
//TextEditor     //Este editor de texto no fue hecho por mi
function init(x) {
  if (x == "h") {
    document.getElementById("txtbox").style.display = "none";
    document.getElementById("text").style.display = "block";
  }

  if (x == "s") {
    document.getElementById("txtbox").style.display = "block";
    document.getElementById("text").style.display = "none";
  }
  document.getElementById("text").value = document.getElementById(
    "txtbox"
  ).innerHTML;
  if (x != "h" || x != "s") document.execCommand(x, false, null);
  document.getElementById("txtbox").focus();
}

//////////////////////////////////////////////////////////////////////
//LoadFiles
let loadedFileP = '';

function LoadText(NuevoTexto) {
  let textDiv = document.getElementById("txtbox");
  let FileToLoad = "";

  filterLoad();
  function filterLoad() {
    const text = NuevoTexto.toLowerCase();
    for (n = 0; n < productos.length; n++) {
      let name = productos[n].nombre.toLowerCase();
      //if (name.indexOf(text) !== -1) {
      if (name == NuevoTexto) {
        FileToLoad = productos[n];
        console.log(productos[n].valor);
      }
    }
  }

  Texto = `${FileToLoad.valor}
  <textarea id="text" name="text"></textarea>`;

  textDiv.innerHTML = Texto;
  console.log(FileToLoad.date);

  loadedFileP = FileToLoad;
}

///////////////////////////////////////////////////////
//Save Files
  let SaveFileButton = document.getElementById("SaveFileB");
  let textDiv = document.getElementById("txtbox");
  let InputNewName = document.getElementById("InputNewName");

function SaveText() {
  
  
  let newNameFile = '';

  //Date
  let DateNow = new Date();
  let DateNowPrint =
    DateNow.getFullYear() +
    "-" +
    DateNow.getMonth() +
    "-" +
    DateNow.getDate() +
    " " +
    DateNow.getHours() +
    ":" +
    DateNow.getMinutes() +
    ":" +
    DateNow.getSeconds();
  //
  

  if (InputNewName.value == "") {
    newNameFile = textDiv.innerText.substring(0, 20);
    
  } else {
    newNameFile = InputNewName.value;
  };

  productos.push({
    nombre: newNameFile,
    valor: textDiv.innerHTML,
    paper: 0,
    date: DateNowPrint,
  });
  console.log(newNameFile);
  console.log(textDiv.innerHTML);
  filter();
}

SaveFileButton.addEventListener("click", SaveText);

//////////////////////////////////////////
///Papelera de reciclaje
let paperButton = document.getElementById("PaperButton");
let paperList;

function PaperOn() {
  resultSearch.innerHTML = null;

  let filesPaper = "";

  //const resultado = productos.find((fruta) => fruta.paper === true);

  const paperStatus = productos.filter(function (elem) {
    return elem.paper != 0;
  });
  paperList = paperStatus;
  console.log(paperList.length);

  for (let n = 0; n < paperList.length; n++) {
    console.log(paperList[n]);

    resultSearch.innerHTML += `
            <li>${paperList[n].nombre}</li>               
            `;
  }

  console.log(paperStatus);
  paperList = paperStatus;
}

paperButton.addEventListener("click", PaperOn);

/////////////////////////////
//Files Button

let ListFilesButton = document.getElementById("ListFilesButton");
let filesList;

function FilesOn() {
  resultSearch.innerHTML = null;

  let filesPaper = "";

  //const resultado = productos.find((fruta) => fruta.paper === true);

  const filesStatus = productos.filter(function (elem) {
    return elem.paper != 1;
  });
  filesList = filesStatus;
  console.log(filesList.length);

  for (let n = 0; n < filesList.length; n++) {
    console.log(filesList[n]);

    resultSearch.innerHTML += `
            <li>${filesList[n].nombre}</li>               
            `;
  }



}

ListFilesButton.addEventListener("click", FilesOn);

//////////////////////////////
//Borrar archivo

let EraseButton = document.getElementById("EraseFileB");

function eraseFile() {
  console.log(loadedFileP);
  loadedFileP.paper = 1;

}

EraseButton.addEventListener("click",eraseFile);

////////////////////
//Recuperar de la papelera

let RecoverButton = document.getElementById("RecoverFileB");

function RecoverFile() {
  console.log(loadedFileP);
  loadedFileP.paper = 0;
}

RecoverButton.addEventListener("click",RecoverFile);

////////////////////
//Ordenar por fecha

let orderByDateButton = document.getElementById("SortDatebutton");
function quickSortM(array) {
  //si la longitud del arreglo es menor a 1 se devuelve una lista vacia.
  if (array.length < 1) {
    return [];
  }

  let left = [];
  let right = [];
  let pivot = array[0];

  contar(1);
  function contar(i) {
    if (i < array.length) {
      if (array[i].date > pivot.date) {
        left.push(array[i]);
      } else {
        right.push(array[i]);
      }

      contar(i + 1);
    }
  }

  return [].concat(quickSortM(left), pivot, quickSortM(right));
}


function filterDateSort() {

  console.log(quickSortM(productos));

  let newListSort = (quickSortM(productos));

  resultSearch.innerHTML = "";

  const text = '';
  for (n = 0; n < newListSort.length; n++) {
    let name = newListSort[n].valor.toLowerCase();
    if (name.indexOf(text) !== -1) {
      resultSearch.innerHTML += `
              <li>${newListSort[n].nombre}</li>               
              `;
    }
  }

  if (resultSearch.innerHTML === "") {
    resultSearch.innerHTML += `File not found`;
  }
}

orderByDateButton.addEventListener('click',filterDateSort);



