function addNumbers(num1, num2) {
  return num1 + num2;
}

describe('Example Test', () => {
  // One test is one 'it' BLOCK
  it('equals true', () => {
    expect(true).toEqual(true);
  });
});

describe('addNumbers', () => {
  it('adds two number', () => {
    expect(addNumbers(2, 2)).toEqual(4);
  });
});
