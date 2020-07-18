// 提供操作本地用户信息的相关函数
const KEY = 'hm-toutiao-pc-108-user'

/**
 *  保存用户信息
 *  @param {Object} user - 是用户信息对象
 */
const setUser = user => {
    // sessionStorage 
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
}
/**
 * 获取用户信息 
 */ 
const getUser= () => {
    // localUSer结果: json字符串或null
    const localUser = window.sessionStorage.getItem(KEY)
    return JSON.parse(localUser || '{}')
}
/**
 * 删除用户信息
 */
const delUser = ()=>{
    window.sessionStorage.removeItem(KEY)
}

// 导出函数即可
export default {
    setUser,
    getUser,
    delUser
}