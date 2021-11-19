const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");
const Carrinho = mongoose.model("Carrinho");
const enviarEmailRecovery = require("../helpers/email-recovery");
const enviarEmailPedido = require("../helpers/email-pedido");
const usuario = require("../models/usuario");
const { url } = require("inspector");
const ImageKit = require("imagekit");

const transporter = require("nodemailer").createTransport(require("../config/email"));

const imagekit = new ImageKit({
    publicKey : process.env.PUBLIC_KEY,
    privateKey : process.env.PRIVATE_KEY,
    urlEndpoint : process.env.URL_IMAGEKIT
});

class UsuarioController {

    // GET /
   index(req, res, next){
        Usuario.findById(req.payload.id).then(usuario => {
            if(!usuario) return res.status(401).json({ errors: "Usuario não registrado" });
            return res.json({ usuario: usuario.enviarAuthJSON() });
        }).catch(next);
    }

    async get(req,res,next){
        const get = await Usuario.find();
        return res.send({ get });
    }

    // GET /:id
    show(req, res, next){
        Usuario.findById(req.params.id)
        .then(usuario => {
            if(!usuario) return res.status(401).json({ errors: "Usuario não registrado" });
            return res.json({
                usuario: {
                    nome: usuario.nome,
                    email: usuario.email,
                    //permissao: usuario.permissao,
                    image: usuario.image
                }
            });
        }).catch(next);
    };
 
    // POST /registrar
    async store(req , res, next){
        const { nome, email, password } = req.body;
        const check = await Usuario.find({email: email})
            const usuario = new Usuario({ nome, email });
            usuario.setSenha(password);
            usuario.save()
            return res.json({ usuario: usuario.enviarAuthJSON() });
    }
    // PUT /
    async update(req, res, next){
        const { nome, email, password } = req.body;

        Usuario.findById(req.payload.id).then((usuario) => {
            if(!usuario) return res.status(401).json({ errors: "Usuario não registrado" });
            if(typeof nome !== "undefined") usuario.nome = nome;
            if(typeof email !== "undefined") usuario.email = email;
            if(typeof password !== "undefined") usuario.setSenha(password);
            return usuario.save().then(() => {
                return res.json({ usuario: usuario.enviarAuthJSON() });
            }).catch(next);
        }).catch(next);
    };

     // PUT /imagens/:id
    async updateImages(req, res, next){
        const { base64Image, fileName } = req.body;
        const data = await imagekit.upload({
            file: base64Image,
            fileName,
        }).then(res => res);
    
        const url = data.url;
        Usuario.findById(req.payload.id).then(async(usuario)  =>  {
            if(!usuario) return res.status(401).json({ errors: "Usuario não registrado" });
            usuario.imageUrl = url;
            await usuario.save();
            return res.send({ usuario: usuario.enviarJSON() });
        }).catch(next);
    }

    // DELETE /
    remove(req, res, next){
        Usuario.findById(req.payload.id).then(usuario => {
            if(!usuario) return res.status(401).json({ errors: "Usuario não registrado" });
            return usuario.remove().then(() => {
                return res.json({ Deletado: true });
            }).catch(next);
        }).catch(next);
    }

    // POST /login
    login(req, res, next){
        const { email, password } = req.body;
        Usuario.findOne({ email }).then((usuario) => {
            if(!usuario) return res.status(401).json({ errors: "Usuario não registrado" });
            if(!usuario.validarSenha(password)) return res.status(401).json({ errors: "Senha inválida" });
            return res.json({ usuario: usuario.enviarAuthJSON() });
        }).catch(next);
    }

    // RECOVERY

    // GET /recuperar-senha
    showRecovery(req, res, next){
        return res.render('recovery', { error: null, success: null });
    }

    // POST /recuperar-senha
    createRecovery(req, res, next){
        const { email } = req.body;
        if(!email) return res.render('recovery', { error: "Preencha com o seu email", success: null });

        Usuario.findOne({ email }).then((usuario) => {
            if(!usuario) return res.render("recovery", { error: "Não existe usuário com este email", success: null });
            const recoveryData = usuario.criarTokenRecuperacaoSenha();
            return usuario.save().then(() => {
                enviarEmailRecovery({ usuario, recovery: recoveryData }, (error = null, success = null) => {
                    return res.render("recovery", { error, success });
                });
            }).catch(next);
        }).catch(next);
    }

    async createEmailPedido(req, res, next){
        const { items, _id }  = req.body;
        const usuario = await Usuario.findById(_id);
        enviarEmailPedido({ usuario, pedido: { items } })
        return res.send({ success: true })
    }

    // GET /senha-recuperada
    showCompleteRecovery(req, res, next){
        if(!req.query.token) return res.render("recovery", { error: "Token não identificado", success: null });
        Usuario.findOne({ "recovery.token": req.query.token }).then(usuario => {
            if(!usuario) return res.render("recovery", { error: "Não existe usuário com este token", success: null });
            if( new Date(usuario.recovery.date) < new Date() ) return res.render("recovery", { error: "Token expirado. Tente novamente.", success: null });
            return res.render("recovery/store", { error: null, success: null, token: req.query.token });
        }).catch(next);
    }

    // POST /senha-recuperada
    completeRecovery(req, res, next){
        const { token, password } = req.body;
        if(!token || !password) return res.render("recovery/store", { error: "Preencha novamente com sua nova senha", success: null, token: token });
        Usuario.findOne({ "recovery.token": token }).then(usuario => {
            if(!usuario) return res.render("recovery", { error: "Usuario nao identificado", success: null });

            usuario.finalizarTokenRecuperacaoSenha();
            usuario.setSenha(password);
            return usuario.save().then(() => {
                return res.render("recovery/store", {
                    error: null,
                    success: "Senha alterada com sucesso. Tente novamente fazer login.",
                    token: null
                });
            }).catch(next);
        });
    }

}
module.exports = UsuarioController;