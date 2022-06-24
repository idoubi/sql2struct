import React, { useState, useEffect } from 'react'
import fs from 'vite-plugin-fs/browser';
import Editor from "./components/editor/Editor"
import Toolbar from './components/toolbar/Toolbar';
import Option from './components/option/Option';
import { pregSqlStatement } from './lib/sql';
import { genGoStructCode } from './lib/gostruct';
import { SqlTable } from './lib/type.d';
import { defaultGoStructOptions, defaultGoStructTags, defaultSpecialIdentifiers, defaultFieldMaps } from './lib/option';
import './App.less';
import { Button } from '@douyinfe/semi-ui';
import { IconSetting } from '@douyinfe/semi-icons';

export default () => {
  const [sqlCode, setSqlCode] = useState(`paste sql statement from "show create table tabel_name\G"`)

  const [sqlTable, setSqlTable] = useState({} as SqlTable)

  const [goStructCode, setGoStructCode] = useState(`type TableName struct`)

  const [goStructTags, setGoStructTags] = useState(defaultGoStructTags)

  const [optionIsShow, setOptionIsShow] = useState(false)

  const [specialIdentifiers, setSpecialIdentifiers] = useState(defaultSpecialIdentifiers)

  const [fieldMaps, setFieldMaps] = useState(defaultFieldMaps)

  // go struct option change handler
  const goStructOptionOnChange = (tags: any[]) => {
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
    const goStructCode = genGoStructCode(sqlTable, goStructTags, specialIdentifiers, fieldMaps)
    if (!goStructCode) {
      setGoStructCode(`gen go struct failed`)
      return
    }
    setGoStructCode(goStructCode)
  }

  // componentDidMount
  useEffect(() => {
    console.log('init')
    // load demo sql
    fs.readFile('src/demo.sql').then((content) => {
      setSqlCode(content)
    });
  }, [])

  // after sql code changed
  useEffect(() => {
    console.log('sql code changed')
    const sqlTable = pregSqlStatement(sqlCode)
    if (!sqlTable) {
      setSqlTable({} as SqlTable)
      return
    }
    setSqlTable(sqlTable)
  }, [sqlCode])

  // after sql table changed
  useEffect(() => {
    console.log('sql table changed')
    renderGoStructCode()
  }, [sqlTable])

  // after go struct tags changed
  useEffect(() => {
    console.log('go struct tags changed')
    renderGoStructCode()
  }, [goStructTags])

  // after special identifiers in options changed
  useEffect(() => {
    console.log('special identifiers in options changed')
    renderGoStructCode()
  }, [specialIdentifiers])

  // after field maps in options changed
  useEffect(() => {
    console.log('field maps in options changed')
    renderGoStructCode()
  }, [fieldMaps])

  return <div className="app">
    <Option isShow={optionIsShow}
      onCancel={() => { setOptionIsShow(false) }}
      onConfirm={(identifiers, fieldMaps) => {
        setSpecialIdentifiers(identifiers)
        setFieldMaps(fieldMaps)
        setOptionIsShow(false)
      }}
      specialIdentifiers={specialIdentifiers}
      fieldMaps={fieldMaps} />
    <div className="wrapper">
      <div className="header">
        <h1>SQL2Struct</h1>
      </div>
      <div className="main">
        <div className="sqlarea">
          <Toolbar languages={{ "sql": "SQL" }} />
          <Editor codeLanguage='sql' code={sqlCode} onChange={sqlCodeOnChange} />
        </div>
        <div className="structarea">
          <Toolbar
            languages={{ "go": "Go Struct" }}
            options={defaultGoStructOptions}
            optionValues={goStructTags}
            optionOnChange={goStructOptionOnChange}
            buttons={<Button icon={<IconSetting />} onClick={() => { setOptionIsShow(true) }}>options</Button>} />
          <Editor codeLanguage='go' code={goStructCode} />
        </div>
      </div>
    </div>
  </div>
}