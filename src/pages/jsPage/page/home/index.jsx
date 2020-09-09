import React from 'react'
import { Link, urlFor } from '@gem-mine/durex-router'
import style from './style/index.module.less'

export default function HomeIndex () {
  return (
    <div className={style.home}>
      <div className={`gm-logo ${style['home-logo']}`} />
      <div className={style['home-content']}>
        欢迎
        <Link to={urlFor('demo')} className={style['home-link']}>
          ☞
          demo
        </Link>
      </div>
    </div>
  )
}
