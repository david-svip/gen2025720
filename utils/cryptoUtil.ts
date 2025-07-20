import CryptoJS from 'crypto-js'

export const cryptoAES = {
  // 默认解密密钥
  defaultSecretKey: 'zH3JDuCRXVGa3na7xbOqpx1bw6DAkbTP',
    /**
     * 业务公共解密方法
     * @param {string} ciphertext - 需要解密的密文
     * @returns {string} - 解密后的明文
     */
     aesDe(ciphertext:string) {
      if (!ciphertext) {
          console.warn('解密失败：输入的密文不能为空');
          return '';
      }
      try {
          const keyBytes = CryptoJS.enc.Utf8.parse("zH3JDuCRXVGa3na7xbOqpx1bw6DAkbTP");
          const decrypted = CryptoJS.AES.decrypt(ciphertext, keyBytes, {
              iv: keyBytes,
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7
          });
          return CryptoJS.enc.Utf8.stringify(decrypted);
      } catch (error) {
          console.error(`解密失败：${error}`);
          return '';
      }
  },


    /**
     * AES 加密方法
     * @param {string} plaintext - 明文字符串
     * @returns {string} - 加密后的密文
     */
     aesEn(plaintext:string) {
      try {
          const keyBytes = CryptoJS.enc.Utf8.parse(this.defaultSecretKey);
          const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plaintext), keyBytes, {
              iv: keyBytes,
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7
          });
          return encrypted.toString();
      } catch (error) {
          console.error(`加密失败：${error}`);
          return '';
      }
  },


  /**
   * AES加密
   * @param {string} word - 要加密的明文
   * @param {string} [secretKey] - 加密密钥（Base64格式），可选，默认为 defaultSecretKey
   * @returns {string} - 加密后的Base64格式密文
   */
  encrypt(word: string, secretKey: string = this.defaultSecretKey): string {
    // 检查输入参数
    if (!word) {
      console.warn('加密失败：输入的明文不能为空')
      return word
    }

    try {
      // 解析密钥（从Base64转换为字节数组）
      const keyHex = CryptoJS.enc.Base64.parse(secretKey)
      // 将要加密的明文转换为字节数组
      const messageHex = CryptoJS.enc.Utf8.parse(word)

      // AES加密，使用默认的ECB模式和PKCS7填充
      const encrypted = CryptoJS.AES.encrypt(messageHex, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })

      // 返回加密后的Base64字符串
      return encrypted.toString()
    } catch (error) {
      console.error(`加密失败：${error}`)
      return ''
    }
  },

  /**
   * AES解密
   * @param {string} ciphertext - 要解密的Base64格式密文
   * @param {string} [secretKey] - 解密密钥（Base64格式），可选，默认为 defaultSecretKey
   * @returns {string} - 解密后的明文
   */
  decrypt(ciphertext: string, secretKey: string = this.defaultSecretKey): string {
    // 检查输入参数
    if (!ciphertext) {
      console.warn('解密失败：输入的密文不能为空')
      return ciphertext
    }
    try {
      const keyBytes = CryptoJS.enc.Utf8.parse(secretKey)
      const decrypted = CryptoJS.AES.decrypt(ciphertext, keyBytes, {
        iv: keyBytes,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      })
      return CryptoJS.enc.Utf8.stringify(decrypted)
    } catch (error) {
      console.error(`解密失败：${error}`)
      return ''
    }
  },

  /**
   * 业务公共解密方法
   * @param {any} data - 传入的包含加密数据的对象
   * @param {string} [secretKey] - 用于解密的密钥（Base64格式），可选，默认为 defaultSecretKey
   * @returns {any} - 解密后的JSON对象或原始数据
   */
  decryptJson(data: any, secretKey: string = this.defaultSecretKey): any {
    // 判断数据是否存在
    if (!data) {
      return ''
    }
    // 判断是否有 json_data 字段
    if (data?.json_data) {
      try {
        // 解密 json_data 字段的内容
        const decryptedText = this.decrypt(data.json_data, secretKey)
        // 将解密后的内容转换为 JSON 对象
        if (decryptedText?.includes('{')) {
          return JSON.parse(decryptedText)
        } else {
          return decryptedText
        }
      } catch (error) {
        console.error('解密或JSON解析失败:', error)
        return '' // 解密或解析失败时返回空字符串
      }
    }

    // 如果没有 json_data 字段，直接返回原始对象
    return data
  }
}
