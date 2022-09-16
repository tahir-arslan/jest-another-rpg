const Potion = require('../lib/Potion.js');

test('create health potion object', () =>{
    const potion = new Potion('health');
    expect(potion.name).toBe('health');
    // expect.any() takes in constructors as an argument (aka Number() in this case)
    // this allows value to be any numer
    // this general test helps us to avoid testing random num generator hundreds of time 
    // to make sure code is working
    expect(potion.value).toEqual(expect.any(Number));
});

test('create random potion object', () => {
    const potion = new Potion();
    expect(potion.name).toEqual(expect.any(String));
    expect(potion.name.length).toBeGreaterThan(0);
    expect(potion.value).toEqual(expect.any(Number));
});