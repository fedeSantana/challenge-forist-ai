import shuffle from '../src/utils/shuffle'

describe('shuffle array', () => {
    test('Shuffle array', () => {
        expect(shuffle([1,2,3,4,5,6,7,8,9,10])).not.toBe([1,2,3,4,5,6,7,8,9,10])
    })
})
