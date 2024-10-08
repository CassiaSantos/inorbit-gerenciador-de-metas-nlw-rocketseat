const {select, input, checkbox} = require('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = "Bem-vinde ao APP de Metas com Node e Javascript"

let metasList

const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8")
        metasList= JSON.parse(dados) //Transforma em JSON
    } catch (erro) {
        metasList = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metasList, null, 2)) // metasList será tranformada em JSON
}

// CADASTRO DE METAS - Aguarda usuário digitar meta no console:
const cadastrarMeta = async () => {
    const meta = await input ({message: "Digite a meta: "})

    if(meta.length == 0) {
        mensagem = "A meta não pode ser vazia"
        return
    }

    metasList.push({
        value: meta,
        checked: false
    })

    mensagem = "Meta cadastrada com sucesso!"
}

// LISTAGEM DE METAS: 
const listarMetas = async () => {

    //no caso de não haver metas cadastradas
    if (metasList.length == 0) {
        mensagem = "Não existem metas!"
        return
    }

    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metasList], //faz uma cópia de metasList para que a original não seja modificada;
        instructions: false,
    })

    metasList.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0) {
        mensagem = "Nenhuma meta selecionada"
        return
    }

    respostas.forEach((resposta) => {
        const meta = metasList.find((m) => {
            return m.value == resposta
        })

        meta.checked = true;
    }) 

    mensagem = "Meta(s) marcada(s) como concluída(s): "
}

const metasRealizadas = async () => {

    //no caso de não haver metas cadastradas
    if (metasList.length == 0) {
        mensagem = "Não existem metas!"
        return
    }

    // Pega uma meta por vez e pra casa meta roda a função filter. Casa meta marcada como concluida, será locada em uma nova lista (realizadas)
    const realizadas = metasList.filter((meta) => { //higher order function: recebe uma outra função
        return meta.checked
    })

    
    if (realizadas.length == 0) {
        mensagem = 'Não existem metas realizadas :('
        return 
    }

    await select({
        message: "Metas realizadas: " + realizadas.length,
        choices: [...realizadas] // spread operator: ...
    })
} 

const metasAbertas = async () => {

    //no caso de não haver metas cadastradas
    if (metasList.length == 0) {
        mensagem = "Não existem metas!"
        return
    }

    const abertas = metasList.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length == 0) {
        mensagem = 'Não existem metas abertas :)'
        return
    }

    await select({
        message: "Metas Abertas: " + abertas.length, 
        choices: [...abertas]
    })
}

const deletarMetas = async () => {

    //no caso de não haver metas cadastradas
    if (metasList.length == 0) {
        mensagem = "Não existem metas!"
        return
    }

    const metasDesmarcadas = metasList.map((meta) => {
        return {value: meta.value, checkbox: false} //desmarca todas as metas
    })

    const itensADeletar = await checkbox({
        message: "Selecione um item para deletar",
        choices: [...metasDesmarcadas], //faz uma cópia de metasList para que a original não seja modificada;
        instructions: false,
    })

    if (itensADeletar.length == 0){
        mensagem = "Nenhum item para deletar!"
        return
    }

    //item selecionado será removido:
    itensADeletar.forEach((item) => {
        metasList = metasList.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = 'Meta(s) deletada(s) com sucesso!'
}

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {
    await carregarMetas()
    
    while(true){
        mostrarMensagem()
        await salvarMetas()

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
                    name: "Metas Abertas",
                    value: "abertas" //valor deve ter o menos nome do case;
                },
                {
                    name: "Deletar Metas",
                    value: "deletar" //valor deve ter o menos nome do case;
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
                await cadastrarMeta()
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log('Até a próxima! :)')
                return
        }
    }
}

start()