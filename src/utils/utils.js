export const saveToLocalStorage = (key, data) =>{
    let item = JSON.parse(localStorage.getItem(key))

    if(item == undefined){
        localStorage.setItem(key, 
            JSON.stringify(
                {
                    last:1,
                    1:data
                }
            ))
    }else{
        let next = item.last + 1
        item.last = next
        item.next = data

        localStorage.setItem(key, 
            JSON.stringify(
                item
            ))
    }
}

export const removeFromLocalStorage = (key, internalKey) =>{
    let item = JSON.parse(localStorage.getItem(key))

    if(item != undefined){
        delete item[internalKey]
    }

    localStorage.setItem(key, 
        JSON.stringify(item))
}

export const getFromLocalStorage = (key) =>{
    return JSON.parse(localStorage.getItem(key))
}