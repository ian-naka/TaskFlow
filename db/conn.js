const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('TaskFlow', 'root', 'Iannakamura21', {
    host: 'localhost',
    dialect: 'mysql',
})
try {
    sequelize.authenticate()
    console.log('conectamos com sucesso!')
} catch (error) {
    console.log(`Erro na conexão com o banco!: ${err} `)
}
module.exports  = sequelize