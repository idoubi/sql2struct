import { IconSetting } from '@douyinfe/semi-icons'
import { Button } from '@douyinfe/semi-ui'
import { useEffect, useState } from 'react'
import './App.less'
import Editor from './components/editor/Editor'
import Option from './components/option/Option'
import Toolbar from './components/toolbar/Toolbar'
import demoSql from './demo.sql?raw'
import logoUrl from './images/logo.png'
import { genGoStructCode } from './core/gostruct'
import { defaultFieldMaps, defaultGoStructOptions, defaultGoStructTags, defaultSpecialIdentifiers } from './core/option'
import { pregSqlStatement } from './core/sql'
import { SqlTable } from './core/type'

export default () => {
  const [sqlCode, setSqlCode] = useState(``)

  const [sqlTable, setSqlTable] = useState({} as SqlTable)

  const [goStructCode, setGoStructCode] = useState(`type TableName struct`)

  const [goStructTags, setGoStructTags] = useState(defaultGoStructTags)

  const [optionIsShow, setOptionIsShow] = useState(false)

  const [specialIdentifiers, setSpecialIdentifiers] = useState(defaultSpecialIdentifiers)

  const [fieldMaps, setFieldMaps] = useState(defaultFieldMaps)

  // go struct option change handler
  const goStructOptionOnChange = (tags: string[]) => {
    setGoStructTags(tags)
  }

  // sql code change handler
  const sqlCodeOnChange = (code: string) => {
    setSqlCode(code)
  }

  // render go struct code
  const renderGoStructCode = () => {
    if (!sqlTable || !sqlTable.name || !sqlTable.fields) {
      setGoStructCode(`invalid sql`)
      return
    }
    const code = genGoStructCode(sqlTable, goStructTags, specialIdentifiers, fieldMaps)
    if (!code) {
      setGoStructCode(`gen go struct failed`)
      return
    }
    setGoStructCode(code)
  }

  // after sql code changed
  useEffect(() => {
    const table = pregSqlStatement(sqlCode)
    if (!table) {
      setSqlTable({} as SqlTable)
      return
    }
    setSqlTable(table)
  }, [sqlCode])

  // after sql table changed
  useEffect(() => {
    renderGoStructCode()
  }, [sqlTable])

  // after go struct tags changed
  useEffect(() => {
    renderGoStructCode()
  }, [goStructTags])

  // after special identifiers in options changed
  useEffect(() => {
    renderGoStructCode()
  }, [specialIdentifiers])

  // after field maps in options changed
  useEffect(() => {
    renderGoStructCode()
  }, [fieldMaps])

  // componentDidMount
  useEffect(() => {
    // load demo sql
    setSqlCode(demoSql)
  }, [])

  return (
    <div className="app">
      <Option
        isShow={optionIsShow}
        onCancel={() => {
          setOptionIsShow(false)
        }}
        onConfirm={(identifiers, maps) => {
          setSpecialIdentifiers(identifiers)
          setFieldMaps(maps)
          setOptionIsShow(false)
        }}
        specialIdentifiers={specialIdentifiers}
        fieldMaps={fieldMaps}
      />
      <div className="wrapper">
        <div className="header">
          <div className="logo">
            <img src={logoUrl} alt="logo" />
          </div>
          <div>
            transfer sql statement to go struct.
            <a href="https://github.com/idoubi/sql2struct.git" target="_blank" className="github">
              <img src="https://img.shields.io/github/stars/idoubi/sql2struct.svg" alt="github stars" />
            </a>
          </div>
        </div>
        <div className="main">
          <div className="sqlarea">
            <Toolbar languages={{ sql: 'SQL' }} />
            <Editor
              codeLanguage="sql"
              code={sqlCode}
              placeholder={`paste sql statement like "CREATE TABLE ..." here`}
              onChange={sqlCodeOnChange}
            />
          </div>
          <div className="structarea">
            <Toolbar
              languages={{ go: 'Go Struct' }}
              options={defaultGoStructOptions}
              optionValues={goStructTags}
              optionOnChange={goStructOptionOnChange}
              buttons={
                <Button
                  icon={<IconSetting />}
                  onClick={() => {
                    setOptionIsShow(true)
                  }}
                >
                  options
                </Button>
              }
            />
            <Editor codeLanguage="go" placeholder="go struct to be transfered" code={goStructCode} />
          </div>
        </div>
      </div>
    </div>
  )
}
