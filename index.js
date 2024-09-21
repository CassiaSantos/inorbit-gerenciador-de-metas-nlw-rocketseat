const {select, input, checkbox} = require('@inquirer/prompts')

// Lista de metas:
let meta = {
    value: "Fazer musculação 2 horas por dia",
    checked: false
}

let metasList = [meta]

// CADASTRO DE METAS - Aguarda usuário digitar meta no console:
const cadastrarMeta = async () => {
    const meta = await input ({message: "Digite a meta: "})

    if(meta.length == 0) {
        console.log("A meta não pode ser vazia")
        return
    }
    metasList.push({
        value: meta,
        checked: false
    })
}

// LISTAGEM DE METAS: 
const listarMeta = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metasList], //faz uma cópia de metasList para que a original não seja modificada;
        instructions: false,
    })

    metasList.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0) {
        console.log("Nenhuma meta selecionada")
        return
    }

    respostas.forEach((resposta) => {
        const meta = metasList.find((m) => {
            return m.value == resposta
        })
        
        meta.checked == true;
    }) 

    console.log("Metas concluídas: ")
}

const metasRealizadas = async () => {
    // Pega uma meta por vez e pra casa meta roda a função filter. Casa meta marcada como concluida, será locada em uma nova lista (realizadas)
    const realizadas = metasList.filter((meta) => { //higher order function: recebe uma outra função
        return meta.checked
    })
    if (realizadas.length == 0) {
        console.log('Não existem metas realizadas :(')
        return
    }
    await select({
        message: "Metas realizadas",
        choices: [...realizadas] // spread operator: ...
    })
} 

const start = async () => {

    while(true){

        // Menu de opções + poder de escolha do usuário:
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar Meta",
                    value: "listar"
                },
                {
                    name: "Metas Realizadas",
                    value: "realizadas" //valor deve ter o menos nome do case;
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        // A opção escolhida pelo usuário é passada e analisada
        switch(opcao) {
            case "cadastrar":
                console.log("Vamos cadastrar")
                await cadastrarMeta()
                break
            case "listar":
                await listarMeta()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "sair":
                return
        }
    }
}

start()