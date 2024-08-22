function fuzzyFind(target, search) {
    let searchIndex = 0
    let i= 0
    for (; i < search.length && searchIndex < target.length; i++) {
        let index = target.indexOf(search[i], searchIndex)
        if (index === -1)
            return false
        searchIndex = index + 1
    }

    return i == search.length
}

function fuzzySearch(target, search) {
    let searchIndex = 0
    for (let i = 0; i < target.length; i++) {
        if (target[i] === search[searchIndex])
            searchIndex++
    }
    return searchIndex == search.length
}

// tests
let target = 'dylan'
let search = 'dn'
let text = fuzzyFind(target, search)
const text2 = fuzzySearch(target, search)
console.log(text)
console.log(text2)

export default fuzzyFind