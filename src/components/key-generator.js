import { PublicKey } from './public-key'
import { SecretKey } from './secret-key'
import { RelinKeys } from './relin-keys'
import { GaloisKeys } from './galois-keys'

export const KeyGenerator = ({library, context, secretKey = null, publicKey = null}) => {

  const _getException = library.getException
  const _library = library
  const constructInstance = (secretKey, publicKey) => {
    try {
      if (secretKey && publicKey) {
        return new library.KeyGenerator(context.instance, secretKey.instance, publicKey.instance)
      }
      if (secretKey && !publicKey) {
        return new library.KeyGenerator(context.instance, secretKey.instance)
      }
      return new library.KeyGenerator(context.instance)
    } catch (e) {
      throw new Error(typeof e === 'number' ? _getException({ pointer: e }) : e instanceof Error ? e.message : e)
    }
  }
  let _instance = constructInstance(secretKey, publicKey)

  return {
    get instance() {
      return _instance
    },
    inject({instance}) {
      if (_instance) {
        _instance.delete()
        _instance = null
      }
      _instance = instance
    },

    /**
     * Return the generated SecretKey
     *
     * @returns {SecretKey}
     */
    getSecretKey() {
      try {
        const instance = _instance.getSecretKey()
        const key = SecretKey({library: _library})
        key.inject({instance})
        return key
      } catch (e) {
        throw new Error(typeof e === 'number' ? _getException({ pointer: e }) : e instanceof Error ? e.message : e)
      }
    },

    /**
     * Return the generated PublicKey
     *
     * @returns {PublicKey}
     */
    getPublicKey() {
      try {
        const instance = _instance.getPublicKey()
        const key = PublicKey({library: _library})
        key.inject({instance})
        return key
      } catch (e) {
        throw new Error(typeof e === 'number' ? _getException({ pointer: e }) : e instanceof Error ? e.message : e)
      }
    },

    /**
     * Generate and return a set of RelinKeys
     *
     * @returns {RelinKeys}
     */
    genRelinKeys() {
      try {
        const instance = _instance.createRelinKeys()
        const key = RelinKeys({library: _library})
        key.inject({instance})
        return key
      } catch (e) {
        throw new Error(typeof e === 'number' ? _getException({ pointer: e }) : e instanceof Error ? e.message : e)
      }
    },

    /**
     * Generate and return a set of GaloisKeys
     *
     * @returns {GaloisKeys}
     */
    genGaloisKeys() {
      try {
        const instance = _instance.createGaloisKeys()
        const key = GaloisKeys({library: _library})
        key.inject({instance})
        return key
      } catch (e) {
        throw new Error(_getException({pointer: e}))
      }
    }
  }
}
