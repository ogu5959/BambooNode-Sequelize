module.exports = (sequelize, DataTypes) => {
    // User 모델 정의
    const Users = sequelize.define('User', {
        cstno: { type: DataTypes.STRING, primaryKey: true},
        name : { type: DataTypes.STRING },
        description : { type: DataTypes.TEXT }
    })
    return Users
}
