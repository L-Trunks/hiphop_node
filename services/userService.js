import USERMODEL from '../model/userModel'
import CONNECT from '../mongo/dbase'
import errorNumber from '../config/errorNum'
import mongoose from 'mongoose';
function userRegister(userData, callback) {
    CONNECT.connect().then(res => {

        USERMODEL.find(userData, (err, data) => {
            if (err) {
                callback(err, data)
                //抛出异常
            } else {
                //data是我们查数据库得到的数据，没有查到为[]
                if (data == 0) {
                    const register = new USERMODEL(userData);
                    register.save((err, data, numAffected) => {
                        mongoose.disconnect()
                        if (err) {
                            callback(err, data)
                            //数据库异常
                        } else {
                            //保存成功
                            callback(err, data)
                        }
                    });
                } else {
                    mongoose.disconnect()
                    console.log(data)
                    callback(err, errorNumber.USER_ALREADY())
                    //提示用户该账户已经注册
                }

            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })

}

function userLogin(userData, callback) {
    CONNECT.connect().then(res => {

        USERMODEL.find(userData, (err, data) => {
            mongoose.disconnect()
            if (err) {
                callback(err, data)
                //抛出异常
            } else {
                console.log(data)
                //data是我们查数据库得到的数据，没有查到为[]
                if (data == 0) {
                    callback(err, errorNumber.USER_LOGIN_ERR())
                } else {
                    callback(err, data)
                }
            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}

//设置管理员
function setManagement(userData, callback) {
    CONNECT.connect().then(res => {
        USERMODEL.update({ username: userData['username'] }, { $set: { permission: userData['permission'] } }, (err, data) => {
            mongoose.disconnect()
            if (err) {
                callback(err, data)
                //抛出异常
            } else {
                //data是我们查数据库得到的数据，没有查到为[]
                if (data == 0) {
                    callback(err, errorNumber.USER_FIND_ERR())
                } else {
                    console.log(data)
                    callback(err, data)
                }
            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}

//根据id获取用户信息

function getUSerInfoByID(data, callback) {
    CONNECT.connect().then(res => {

        USERMODEL.find({ _id: mongoose.Types.ObjectId(data['_id']) }, (err, data) => {
            mongoose.disconnect()
            if (err) {
                callback(err, data)
                //抛出异常
            } else {
                //data是我们查数据库得到的数据，没有查到为[]
                if (data == 0) {
                    callback(err, errorNumber.USER_FIND_ERR())
                } else {
                    callback(err, data)
                }
            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}
//封号
//解禁
function updateUserPermission(data, callback) {
    CONNECT.connect().then(res => {
        USERMODEL.update({ _id: mongoose.Types.ObjectId(data['_id']) }, { $set: { permission: data['permission'] } }, (err, data) => {
            mongoose.disconnect()
            if (err) {
                callback(err, data)
                //抛出异常
            } else {
                //data是我们查数据库得到的数据，没有查到为[]
                if (data == 0) {
                    callback(err, errorNumber.USER_FIND_ERR())
                } else {
                    callback(err, data)
                }
            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}
/**
 * 根据信息查询用户
 * @param {*} data 
 * @param {*} callback 
 */
//验证用户名
//验证昵称
function getUserInfoByUserNameAndNickName(data, callback) {
    CONNECT.connect().then(res => {
        USERMODEL.find(data, (err, data) => {
            mongoose.disconnect()
            if (err) {
                callback(err, data)
                //抛出异常
            } else {

                callback(err, data)

            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}
//验证原密码
function verifyOldPassWord(userData, callback) {
    CONNECT.connect().then(res => {
        USERMODEL.find({ _id: mongoose.Types.ObjectId(userData['_id']) }, (err, data) => {
            mongoose.disconnect()
            if (err) {
                callback(err, data)
                //抛出异常
            } else {
                //data是我们查数据库得到的数据，没有查到为[]
                if (data == 0) {
                    callback(err, {})
                } else {
                    if (data.password === userData.password) {
                        callback(err, data)
                    } else {
                        callback(err, errorNumber.OLD_PASSWORD_ERR())
                    }

                }
            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}
//修改个人信息
function updateUserInfo(data, callback) {
    CONNECT.connect().then(res => {

        USERMODEL.update({ _id: mongoose.Types.ObjectId(data['_id']) }, { $set: data }, (err, data) => {
            mongoose.disconnect()
            if (err) {
                callback(err, data)
                //抛出异常
            } else {
                //data是我们查数据库得到的数据，没有查到为[]
                if (data == 0) {
                    callback(err, {})
                } else {
                    callback(err, data)
                }
            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}
//获取用户列表

function getUserList(data, callback) {
    CONNECT.connect().then(res => {

        USERMODEL.find(data, (err, data) => {
            mongoose.disconnect()
            if (err) {
                callback(err, data)
                //抛出异常
            } else {
                //data是我们查数据库得到的数据，没有查到为[]
                if (data == 0) {
                    callback(err, {})
                } else {
                    callback(err, data)
                }
            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}
module.exports = {
    userRegister: userRegister,
    userLogin: userLogin,
    setManagement: setManagement,
    getUSerInfoByID: getUSerInfoByID,
    updateUserPermission: updateUserPermission,
    getUserInfoByUserNameAndNickName: getUserInfoByUserNameAndNickName,
    updateUserInfo: updateUserInfo,
    verifyOldPassWord: verifyOldPassWord,
    getUserList: getUserList



};