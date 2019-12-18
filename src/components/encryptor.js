import { Exception } from './exception'
import { MemoryPoolHandle } from './memory-pool-handle'

export const Encryptor = ({ library, context, publicKey }) => {
  const _Exception = Exception({ library })
  const _MemoryPoolHandle = MemoryPoolHandle({ library })

  let _instance = null
  try {
    _instance = new library.Encryptor(context.instance, publicKey.instance)
  } catch (e) {
    // eslint-disable-next-line no-nested-ternary
    throw new Error(
      typeof e === 'number'
        ? _Exception.getHuman(e)
        : e instanceof Error
        ? e.message
        : e
    )
  }

  return {
    /**
     * Get the underlying wasm instance
     * @returns {instance} wasm instance
     */
    get instance() {
      return _instance
    },

    /**
     * Inject this object with a raw wasm instance
     * @param {instance} instance - wasm instance
     */
    inject({ instance }) {
      if (_instance) {
        _instance.delete()
        _instance = null
      }
      _instance = instance
    },

    /**
     * Encrypts a plaintext and stores the result in the destination parameter.
     * Dynamic memory allocations in the process are allocated from the memory
     * pool pointed to by the given MemoryPoolHandle.
     *
     * @param {PlainText} plainText - PlainText to encrypt
     * @param {CipherText} cipherText - CipherText destination to store the result
     * @param {MemoryPoolHandle} [pool=MemoryPoolHandle.global] - Memory pool pointer
     */
    encrypt({ plainText, cipherText, pool = _MemoryPoolHandle.global }) {
      try {
        _instance.encrypt(plainText.instance, cipherText.instance, pool)
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    }
  }
}
