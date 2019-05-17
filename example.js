describe('some method', () => {
  let x;

  before(() => {
    x = 1;
  });

  after(() => {
    x = 0;
  });

  it('works', () => {
    expect(x).to.equal(1);
  });

  describe('some edge case', () => {
    beforeEach(() => {
      x = 2;
    });

    afterEach(() => {
      x = 0;
    });

    it('works when it should', () => {
      expect(x).to.equal(2);
    });

    it('does not work when it should not', () => {
      expect(x).to.equal(0);
    });
  });
});
