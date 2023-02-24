/*global M*/
export default {
    // eslint-disable-next-line
    install (Vue, options) {
        Vue.prototype.$message = function(html) {
            M.toast({html})
        }
        Vue.prototype.$error = function(html) {
            M.toast({html: `[Ошибка]: ${html}`})
        }
    }
}