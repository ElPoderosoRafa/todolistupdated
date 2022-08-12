const inputSubmit = document.querySelector('.inputSubmit');
const btnSubmit = document.querySelector('.btnSubmit');
const listaTarefas = document.querySelector('.tarefas');
let tarefas = localStorage.getItem('tarefas') || '[]'; // isso vai trazer uma string array do local storage, 
// se não tiver, cria uma "string array" localmente.;
 let tasks = JSON.parse(tarefas);
window.onload = function() {
    tasks.forEach((e) => { // buscas as tarefas no array tasks e printa na tela.
        let li = criarLi(e.tarefa);
        listaTarefas.appendChild(li); // referente a mostrar na tela
    })
    apagarTarefa();

    let array2 = Array.prototype.map.call(document.querySelectorAll('li'), e => e.textContent).map((e) => {
        let teste = e.split(' ');
        [,id] = teste;
        return id;
    })
    
    


    /*
    for(let i = 0; i < array2.length; i++) {
        array2[i].split(' ');
    }
    [,id] = array2[0].split(' ');
    console.log(id);
*/
/*
    let array2 = Array.prototype.map.call(document.querySelectorAll('li'), e => e.textContent);
    for(let i = 0; i < array2.length; i++) {
        array2[i].split(' ');
    }
    [,id] = array2[0].split(' ');
    console.log(id);
*/
} // fim do onload.

function apagarTarefa() {
    const botaoApagar = document.querySelectorAll('.apagar'); // selecionando todos os elementos que possuam a classe .apagar

    botaoApagar.forEach((e) => { // atribuindo um evento a todos os botoes
        e.addEventListener('click', (event) => { // evento de escuta de click em todos os botoes e pegando o target.
            let posicaoArray = tasks.indexOf(event); // pegando o indice das tarefas do array
            if(Array.prototype.indexOf.call(botaoApagar, event) == tasks.indexOf(event)) {
                event.target.parentElement.remove();
                tasks.splice(posicaoArray,1);
                localStorage.setItem('tarefas', JSON.stringify(tasks)); // enviando para o localStorage o array ja convertido para string
        // tendo em vista que o localStorage so aceita string.
            }
        })
    })
}

function criarLi(valor){
    let li = document.createElement('li');
    li.innerHTML = `${valor} <button class="apagar">Apagar Tarefa </button>`;
    return li;
}


/*
    function criarLi(valor,id){
        let li = document.createElement('li');
        li.innerHTML = `ID: ${id} TASK: ${valor} <button class="apagar">Apagar Tarefa </button>`;
        return li;
    }
*/
btnSubmit.addEventListener('click', () => { // captura o objeto event nesse argumento.
    let tarefaObj = {id: Math.floor(Math.random() * 1000), tarefa: inputSubmit.value};
    if(tarefaObj.tarefa == '') {
        return;
    }


    let li = criarLi(tarefaObj.tarefa,tarefaObj.id);
    listaTarefas.appendChild(li); // adicionando a tela, a nova tarefa

    tasks.push(tarefaObj);   // colocando o valor do input dentro do array
    console.log(tasks); // imprimindo no console o que tem no array para acompanhar
    localStorage.setItem('tarefas', JSON.stringify(tasks)); // enviando para o localStorage o array ja convertido para string
    // tendo em vista que o localStorage so aceita string.

    inputSubmit.value = ''; // limpando o valor do input
    inputSubmit.focus(); // dando foco ao campo do input.

    apagarTarefa();

    });


 // let array2 = Array.prototype.map.call(document.querySelectorAll('li'), e => e.textContent);