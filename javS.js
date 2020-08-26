const productos = [
    {nombre: 'platanos', valor: 500},
    {nombre: 'pera', valor: 500},
    {nombre: 'sandia', valor: 500},
    {nombre: 'melon', valor: 500},
    {nombre: 'peras', valor: 500},
    {nombre: 'uvas', valor: 500}
]

//obtenemos la referencia al formulario y al boton
const formulario = document.getElementById("formulario");
const searchButton = document.getElementById("button");
const resultSearch = document.getElementById("result");


function filter () {
    //console.log(formulario.value);
    //guardamos en la variable const el valor que escribimos en nuestro formulario en minuscula
    resultSearch.innerHTML = '';
    
    const text = formulario.value.toLowerCase();   
        //ocupamos recorrer nuestra lista, y por cada ciclo guardar 
        for (n = 0; n<productos.length; n++) {
            //guardamos el nombre del objeto productos en la variable name, ya pasado a minuscula
            let name = productos[n].nombre.toLowerCase(); 
            
            //si nombre.indexOf (indexOf nos localiza en que posicion esta la palabra que le pasemos)
            //si el cliente busca una "a" vamos a buscar esa "a" dentro de nombre, si la encuentra va a retornar cualquier cosa distinta a menos 1
                //si no encuentra el texto va a retornar -1
            if (name.indexOf(text) !== -1){
                resultSearch.innerHTML += `
                <li>${productos[n].nombre} - Valor: ${productos[n].valor}</li>               

                `;

            }

        }

        if (resultSearch.innerHTML === '') {

            resultSearch.innerHTML += `Producto no encontrado`;

        }


};

searchButton.addEventListener('click',filter);
formulario.addEventListener('keyup',filter);
filter();








class Node {
    constructor(data,next,prev) {
        this.data = data;
        this.next = next;
        this.prev = prev;   
    };
};


class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    };

    //agregamos a la cabeza
    addToHead(data) {
        const newNode = new Node(data, this.head, null);
        if (this.head) {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        } else {
            this.head = newNode;
            this.tail = newNode;            
        };
        this.size++;
    };
    //agregamos a la cola
  
    addToTail(data) {
        const newNode = new Node(data, null, this.tail)
        if (this.tail) {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;      
        } else {
            this.head = newNode;
            this.tail = newNode;
        };
        this.size++;
    }

    //agregamos al index 
    insertAt(data, index) {
        if (index < 0 || index > this.size){
            return null;
        };

        const newNode = new Node(data, null, null);
        let current = this.head;
        let previous;

        if (index === 0) {
            newNode.next = current; 
            current.prev = newNode;
            this.head = newNode;
        } else {
          
            for (let i = 0; i < index; i++) {
                previous = current;
                current = current.next;
            };
            newNode.next = current;
            newNode.prev = previous;
            current.prev = newNode;
            previous.next = newNode;
        };
        this.size++;      
    };

    //Remover desde la cabeza

    removeFromHead() {
        if (!this.head){
            return null;
        };

        const valueToReturn = this.head.data;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {

            this.head = this.head.next;
            this.head.prev = null;
        };

        this.size--;
        return valueToReturn;
    }

    removeFromTail() {
        if (!this.tail) {
            return null;
        };

        const valueToReturn = this.tail.data;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        };

        this.size--;
        return valueToReturn;

    }
    //remover por los parametros
    removeData(data) {
        let current = this.head;
        let previous = null; 
        while (current !== null) {
            
            if (current.data === data) {
                if (!previous) {
                  return this.removeFromHead();
  
                } else if (!current.next) {
                   return this.removeFromTail();
                } else {

                    previous.next = current.next;
                    current.next.prev = previous;
                };
                this.size--;
                return current.data;
            };
            previous = current;
            current = current.next;

        };
        return null;

    }

    print() {
        let current = this.head;
        let result = '';
        while(current) {
            result += current.data + '<->';
            current = current.next;
        };
        return result += ' X ';
    };

    printList() {
        let current = this.head;
        let result = '';
        while(current) {
            result += '<li>'+current.data+'</li>';
            current = current.next;
        };
        resultSearch.innerHTML= result;
        
    };

    reversePrint() {
        let current = this.tail;
        let result = '';

        while(current) {
            result += current.data + '<->';
            current = current.prev
        };
        return result += 'X';
    };

    getsize() {
        return this.size;
    };

    isEmpty() {
        return this.size === 0;
    };

};

const doubleLinkedList = new DoubleLinkedList();

//llamamos al metodo agregar la cabeza y agregamos un valor

doubleLinkedList.addToHead(3);
doubleLinkedList.addToHead(4);
doubleLinkedList.addToTail(5);
doubleLinkedList.addToTail(6);

doubleLinkedList.addToHead(7);
doubleLinkedList.addToHead(111111);

doubleLinkedList.insertAt(99,2);

doubleLinkedList.removeFromHead();


console.log(doubleLinkedList.removeFromTail());


console.log(doubleLinkedList.print());
