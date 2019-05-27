describe('Creating Encryption Parameters', () => {
  test('low', async () => {
    const { HCrypt } = require('../index.js')
    const Crypt = await HCrypt
    const parms = Crypt.createParams({computationLevel: 'low'})
    expect(parms).toEqual({
      polyDegree: 4096,
      coeffModulus: 4096,
      plainModulus: 786433,
      scale: Math.pow(2, 54),
      security: 128
    })
  })
})
