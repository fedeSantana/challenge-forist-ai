/**
 * Shuffles array in place.
 * More readable info: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * algorithm used: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
 * @param {Array} a items An array containing the items.
 */
function shuffle<T = any>(a : Array<T>) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

export default shuffle
