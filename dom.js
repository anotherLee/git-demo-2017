window.$ = function(selectorOrNode){       //$()返回一个array，而array里构造了一些新的API
    let array = []                         //声明一个数组赋值给array
    if(typeof selectorOrNode ==='string'){
        let items = document.querySelectorAll(selectorOrNode)  //如果参数是字符串的话，那就用querySelectorAll方法获取所有的标签并且储存在一个数组里赋值给items
        for(var i = 0; i < items.length; i++){                 //遍历items里的所有元素，并且把它们push到之前声明的array里面
            array.push(items[i])
        }
        
    }else if(selectorOrNode instanceof Element){               //如果参数是一个元素的话，那就直接把元素push到array里面
        array.push(selectorOrNode)
    
    }else if(selectorOrNode instanceof Array){
        for(var i=0; i<selectorOrNode.length; i++){
            array.push(selectorOrNode[i])
        }
    }
    //如果参数是一个数组的话，那就遍历这个数组，把数组里的每一项push到array里

    //以上就是通过if else接收不同类型的参数然后生成了一个array
    //接下来要利用原始的DOM API来组合出新的API


    array.on = function(eventType,fn){  //array.on() 这个函数接收事件类型eventType和fn两个参数
        for(var i = 0; i<array.length; i++){
            array[i].addEventListener(eventType,fn)
        }
        return array
    }
    //array是一个数组，通过array.on()方法给遍历每个元素并且添加添加监听事件；fn可以由使用者自己定义；
    //注意这里最后返回一个array，因为作用域的关系，所以这个array就是最开始的由selectorOrNode参数生成的array

    array.addClass = function(className){  //array.addClass() 这个函数接收className类名称这个参数
        for(var i = 0; i < array.length; i++){
            array[i].classList.add(className) //classList它的作用就是把element的className放到一个DOMtokenlist里
        }
        return array
    }
    //使用array.addClass()函数接收一个className参数，遍历每个array元素并把这个className添加到类名称里
    //注意最后依然返回一个原本的array

    array.removeClass = function(className){
        for(var i = 0; i<array.length; i++){
            array[i].classList.remove(className)
        }
        return array
    }
    //array.removeClass()这个函数同样接收一个className参数，和之前的相反，它会遍历每个array元素并且从DOMtokenlist删除指定的参数

    array.text = function(content){
        if(content !== undefined){
            for(var i = 0; i<array.length; i++){
                array[i].textContent = content
            }
            return array
        }else{
            let result = []
            for(var i=0; i<array.length; i++){
                result.push(array[i].textContent)
            }
            return result
        }
        
    }
    //这是一个针对text操作的新API
    //array.text()函数要分两种情况，一种是当参数为空时（undefined）时，遍历array所有元素并且将每个元素置空
    //如果参数不为undefined时那就把参数作为text追加到array每个元素的textContent里


    array.get = function(index){
        return array[index]
    }
    //array.get()这个就比较简单了，给一个索引index然后把array里对应的数字返回就行了

    array.siblings = function(){
        let children = array[0].parentNode.children  //取到array里第一个元素所有的兄弟元素（包括它自己）赋值给children
        let resultArray = []                         //声明一个新数组resultArray
        for(var i=0;i<children.length;i++){          //遍布children里的每个元素然后把除了自己的其它元素push到result这个数组里
            if(children[i] !== array[0]){
                resultArray.push(children[i])
            }
        }
        let items = $(resultArray)                   //这一步很关键，因为如果到上面return的是resultArray的话这个链条就断了
        items.previousSelection = array              //所以这里通过复用$()这个函数重新返回array,只是这个array已经不是开始的那个array
        return items                                 //开始的那个array是包含它自己和其它兄弟的数组，而这个新的array没有它自己
    }                                                
    //array.siblings()这个新API有点绕

    array.end = function(){
        return array.previousSelection
    }

    array.insert = function(name){
        for(var i = 0; i<array.length; i++){
            array[i].insertAdjacentHTML('afterend',name)
        }
    }

    return array

    //这个函数其实只有在array.siblings()使用以后才能生效所以只能 array.siblings().end() 这样用

    
}
    

    