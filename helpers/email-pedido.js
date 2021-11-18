const transporter = require("nodemailer").createTransport(require("../config/email"));
const { api: link } = require("../config/index");

module.exports = ({ usuario, pedido }, cb) => {
    let pedidos = '';
    let total = 0;
    let cont = 0;

    function createPedido(titulo, Imagem_URL, preco, quantidade ){
        return `
            <div style="justify-content: center;
                        align-items: center;
                        ">
                    <h3>Produto ${cont} : ${titulo}</h3> 
                    <br><img src="${Imagem_URL}" width=190 height=190> <br> 
                    <h3>Preco:</h3> R$${preco} <br>
                    <h3>Quantidade:</h3> ${quantidade}
                    <br><br><hr />
            </div>
        `
    }

    pedido.items.forEach(item => {
        cont++;
        pedidos += createPedido(item.titulo, item.Imagem_URL, item.preco, item.quantidade)
        total += (item.preco * item.quantidade)
        console.log(total)
    });
    
   /* const corpoPedido = `
        <h3>Produto 1: ${pedido.titulo}</h3> 
        <br><img src="${img}" width=190 height=190> <br> 
        <h3>Preco:</h3> R$${pedido.preco},00 <br>
        <h3>Quantidade:</h3> ${pedido.quantidade}
        <br><br><hr />
    `*/

    
    const messagePedido = `
    <h1 style="text-align: center;">Olá ${usuario.nome}! - Seu Pedido</h1>
    <br />
    <h2>
    Informações do pedido:
    </h2>
    <hr>
    ${pedidos}
    <h2>TOTAL: R$${total}</h2>
    <br />
        <p>
        <h3>Obrigado!</h3>
        Case Maker! - o maior e-commerce de Gabinetes customizados do mundo.
        </p>
        <br />
        <p>Atenciosamente, Case Maker Team.</p>
    `;

    const opcoesEmail = {
        from: process.env.EMAIL_USER,
        to: usuario.email,
        subject: "Pedido realizado com sucesso! - Case Maker",
        html: messagePedido
    };

    if(process.env.NODE_ENV === "production" || "development"){
        transporter.sendMail(opcoesEmail, (error, info) => {
            if(error){
                console.log(error);
                return cb("Aconteceu um erro no envio do email, tente novamente.");
            } else {
                return cb(null, "Seu pedido foi enviado para seu email.");
            }
        });
    } else {
        console.log(opcoesEmail);
        return cb(null, "Seu pedido foi enviado para seu email.");
    }
};