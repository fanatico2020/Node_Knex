var database = require('./database');

/* INSERT
var dados = [
    {
        nome:"GTA I",
        preco:20.25
    },
    {
        nome:"GTA II",
        preco:40.50
    },
    {
        nome:"GTA III",
        preco:45.20
    },
    {
        nome:"GTA IV",
        preco:65.15
    },
]


var query = database.insert(dados).into("games").then(data => {
console.log(dados);
}).catch(error => {
    console.log(error);
});
*/

/* SELECT
database.select().table("games").then(data =>{
    console.log(data);
}).catch(error => {
    console.log(error);
});

database.select(["id","preco"]).table("games").then(data =>{
    console.log(data);
}).catch(error => {
    console.log(error);
});
*/

/* NESTED QUERIES
var query = database.insert({nome:"GTA ES",preco:55.12}).into("games").then(data => {
    database.select().table("games").then(data =>{
        console.log(data);
    }).catch(error =>{
        console.log(error);
    });
    console.log(dados);
    }).catch(error => {
        console.log(error);
    });
*/

/* WHERE
database.select()
.whereRaw("nome = 'GTA II' or preco > 60")
.table("games").then(data => {
    console.log(data);
}).catch(error => {
    console.log(error);
});

*/

/* RAW query cruas
database.raw("SELECT * FROM games").then(data => {
    console.log(data);
}).catch(error => {
    console.log(error);
});

*/

/* DELETE
database.where({id:3}).delete().table("games").then(data => {
    console.log(data);
}).catch(error =>{
    console.log(error);
});

*/

/* UPDATE
database.where({id:2}).update({preco:110.15}).table("games").then(data =>{
    console.log(data);
}).catch(error => {
    console.log(error);
});

*/

/* ORDER BY
database.select().table("games").orderBy("preco","desc").then(data =>{
    console.log(data);
}).catch(error => {
    console.log(error);
});
*/

/* Associeted inserts
database.insert({
    nome:"Blizzard",
    game_id:6
}).table("estudios").then(data =>{
    console.log(data);
}).catch(error =>{
    console.log(error);
});
*/

/* Inner join 1 para 1
database.select(["games.id as g_id","estudios.id as est_id","games.nome as Nome_Game","estudios.nome as Est_Nome"]).table("games").innerJoin("estudios","estudios.game_id","games.id").then(data => {
    console.log(data);
}).catch(error =>{
    console.log(error);
});
*/

/* Join com Where
database.select(
    ["games.id as g_id","estudios.id as est_id","games.nome as Nome_Game","estudios.nome as Est_Nome"]
    ).table("games").innerJoin("estudios","estudios.game_id","games.id").where("games.id",6).then(data => {
    console.log(data);
}).catch(error =>{
    console.log(error);
});
*/

/* 1 para M
database.select(
    ["games.id as g_id","estudios.id as est_id","games.nome as Nome_Game","estudios.nome as Est_Nome"]
    ).table("games").innerJoin("estudios","estudios.game_id","games.id").where("games.id",6).then(data => {
    var estudiosGamesArray = data;
    var game = {
        id:0,
        nome:"",
        estudios:[]
    }
    game.id = data[0].g_id;
    game.nome = data[0].Nome_Game;

    data.forEach(estudio =>{
        game.estudios.push({nome:estudio.Est_Nome});
    });
        console.log(game);
}).catch(error =>{
    console.log(error);
});

*/

/* M para M
database.select([
    "estudios.nome as estudio_nome",
    "games.nome as game_nome"
]).table("games_estudios")
.innerJoin("games","games.id","games_estudios.game_id")
.innerJoin("estudios","estudios.id","games_estudios.estudio_id")
.where("games.id",6)
.then(data => {
    console.log(data);
}).catch(error =>{
    console.log(error);
});
*/

async function testeTransacao(){
    try{
        await database.transaction(async trans => {
            await database.insert({nome:"QIA"}).table("estudios");
            await database.insert({nome:"45a"}).table("estudios");
            await database.insert({nome:"Nanoit"}).table("estudios");
        });
    }catch(error){
        console.log(error);
    }
}
testeTransacao();