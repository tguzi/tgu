import { add, paowuxian } from '../lib'

describe('测试某个文件', () => {
  beforeAll (() => {
    // console.log('[BEFORE ALL]')
  })
  beforeEach (() => {
    // console.log('[BEFORE EACH]')
  })
  afterAll (() => {
    // console.log('[AFTER ALL]')
  })
  afterEach (() => {
    // console.log('[AFTER EACH]')
  })

  it('简单的加法函数测试', () => {
    expect(add(2, 2)).toBe(4)
  })

  it('简单不正确对加法函数测试', () => {
    expect(add(2, 2)).toBe(5)
  })


  it('测试抛物线', () => {
    expect(paowuxian(2)).toBe(11)
  })
  
})
