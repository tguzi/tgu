import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import clear from 'rollup-plugin-clear'
import json from 'rollup-plugin-json'
import commonjs from 'rollup-plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
// import { eslint } from 'rollup-plugin-eslint'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

// 环境
const env = process.env.NODE_ENV
const isDev = env === 'development'

// 默认引入的包
const dependencies = ({ devDependencies }) => Object.keys(devDependencies || {})
const pkgdependencies = dependencies(pkg)

export default {
  input: './lib/index.ts', // 入口
  output: [
    {
      file: pkg.cjs, // 出口
      format: 'cjs', // 打包成commonjs模块
      sourcemap: !isDev, // 打包映射
    },
    {
      file: pkg.es,
      format: 'es',
      sourcemap: !isDev,
    }
  ],
  external: id => pkgdependencies.includes(id), // 排除不打包第三方包
  plugins: [
    json(), // 读取json插件
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }), // 加载node_modules中的第三方模块
    // eslint({
    //   // fix: true,
    //   includes: [
    //     '**/*.ts',
    //     '**/*.tsx',
    //   ],
    //   exclude: [
    //     '**/*.js',
    //     'node_modules/**',
    //     'dist/',
    //     'es/',
    //     '**/*.js',
    //     'packages/'
    //   ],
    // }), // eslint - NOTE: 这样配置其实并没有达到效果，还不知道是为什么，持续跟进吧
    babel({
      // NOTE: 似乎还没用到精髓
      exclude: 'node_modules/**', // 只编译源代码
      runtimeHelpers: true
    }), // babel 插件, 配置文件 .babelrc
    commonjs(), // 将CommonJS模块转换为ES6来兼容rollup
    clear({ targets: ['./dist', './es'] }), // 清理打包文件
    typescript({
      tsconfig: '../../tsconfig.json'
    }), // ts 扩展
    !isDev && terser(), // 压缩代码, 开发环境为了更方便调试，不压缩
  ]
}
