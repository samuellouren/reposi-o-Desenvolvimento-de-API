const express = require('express')

const app = express();
const PORT = 3333;


app.use(express.json());

let produtos = [
    {id: 1, nome: "notebook", preco: 3500, quantidade: 10},
    {id: 2, nome: "mouse", preco: 50, quantidade: 50},
    {id: 3, nome: "teclado", preco: 150, quantidade: 30}
];

let proximoId = 4;

app.get('/', (req, res) => {
    res.json({
        mensagem: "ta funcionando",
        rotas: {
            listar: "GET /produtos",
            buscar: "GET /produtos/:id",
            adicionar: "POST /produtos",
            atualizar: "PATCH /produtos/:id",
            deletar: "DELETE /produtos/:id"
        }
    })
})

app.get('/produtos', (req, res)=> {
    res.json({
        total: produtos.length,
        produtos: produtos
    })
})

app.get('/produtos/:id', (req, res ) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id ===id);

    if (!produto) {
        return res.status(404).json({
            erro: "Produto não encontrado"
        })
    }

    res.json(produto)
})

app.post('/produtos', (req, res) => {
    const {nome, preco, quantidade} = req.body;

    if (!nome || preco === undefined || quantidade === undefined) {
    return res.status(400).json({ 
      erro: "Preencha todos os campos" 
    })
  }

  if (preco < 0 || quantidade < 0) {
    return res.status(400).json({
        erro: "preco e quantidade deve ser positivo"
    })
  }

  const novoProduto = {
    id: proximoId++,
    nome,
    preco,
    quantidade
  }

  produtos.push(novoProduto)
  res.status(2001).json({
    mensagem:"produto add",
    produto: novoProduto
  })
})

app.patch('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {nome, preco, quantidade} = req.body;
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
    return res.status(404).json({ 
      erro: "Produto não achado" 
    });
  }

    if (nome !== undefined) produto.nome = nome;
    
    if (preco !== undefined) {
        if (preco < 0) {
            return res.status(400).json({ erro: "Preço não pode ser negativo" });
        }
        produto.preco = preco;
    }

    if (quantidade !== undefined) {
    
        if (quantidade < 0) {
            return res.status(400).json({ erro: "Quantidade não pode ser negativa" });
    }
        produto.quantidade = quantidade;
  }
  
    res.json({
        mensagem: "Produto atualizado",
        produto: produto
  });
})

app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ 
            erro: "Produto não encontrado" 
        });
    }
    
    const produtoRemovido = produtos.splice(index, 1)[0];

    res.json({
    mensagem: "Produto deletado",
    produto: produtoRemovido
  });
})

app.use((req, res) => {
  res.status(404).json({ 
    erro: "Rota não encontrada" 
  });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando  http://localhost:${PORT} `);
});