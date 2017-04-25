window.$ = function () {
    let array = []
    return array
}

$.bom = {
    openAtCenter: function (width, height, url) {
        window.open(url, '_blank', `
        width = ${width}px,
        height = ${height}px,
        screenX = ${window.screen.width / 2 - width / 2}px,
        screenY = ${window.screen.height / 2 - height / 2}px,
        `)          
                   
    },
    search: function (name, value) {   
        let searchAll = function () {    
            let result = {}
            let search = window.location.search   //取到所有的查询字符串
            if (search[0] === '?') {
                search = search.slice(1)            //把前面的？去掉
            }
            let searchArray = search.split('&')        //把查询字符串以&进行切割，得到['a=1','b=2']类似的东西
            for (var i = 0; i < searchArray.length; i++) { //遍历
                let parts = searchArray[i].split('=')   //把刚才得到的数组里的每个元素以=进行切割，得到['a','1'] ['b','2']
                result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1] || '') 
            }                             //当遍历到['a','1']时就放到对象result里 {'a':'1'} 当遍历到第二个时，result就是{'a':'1','b':'2'}
            return result
        }
        let result = searchAll()
        if (value === undefined) {     //如果只有name参数时，就返回它对应的值
            return result[name]
        } else {
            if(result[name] === undefined){  //如果name和value两个参数都有时，但是没有出现在查询字符串中的情况
                console.log(name)            //那就把它放到location.search的末尾
                console.log(value)
                
                location.search += `&${encodeURIComponent(name)}=${encodeURIComponent(value)}`   
                //每次设置search都会刷新        不是字符串的拼接问题，=前后有空格就不行了，因为空格被encode成url的一部分
            }else{
                result[name] = encodeURIComponent(value)        //如果name和value两个参数都有，name对应的值和value不一样那就把name在result对应的值替换成value
                let newSearch = '?'                             //这里重构了一个新的查询字符串并且赋值给了location.search
                for(let key in result){
                    newSearch += `${encodeURIComponent(key)}=${encodeURIComponent(result[key])}&`
                }                                          
                location.search = newSearch
            }

        }
    }


}