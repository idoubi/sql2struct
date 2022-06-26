import { json } from '@codemirror/lang-json'
import { Modal, TabPane, Tabs, TagInput } from '@douyinfe/semi-ui'
import CodeMirror from '@uiw/react-codemirror'
import { useState } from 'react'
import './Option.less'
import { OptionProps } from './type.d'

export default (props: OptionProps) => {
  const { isShow, specialIdentifiers, fieldMaps, onConfirm, onCancel } = props

  const [identifiers, setIdentifiers] = useState(specialIdentifiers)
  const [fieldMapsJson, setFieldMapsJson] = useState(JSON.stringify(fieldMaps, null, 4))

  const optionEle: JSX.Element = (
    <Tabs tabPosition="top" type="card">
      <TabPane tab={<span>Special Identifiers</span>} itemKey="1">
        <div style={{ padding: '0 24px' }}>
          <div className="tip">Special identifiers those will be UpperCased when transfered to go struct fields</div>
          <div style={{ lineHeight: 1.8 }}>
            <TagInput defaultValue={identifiers} placeholder="input..." onChange={(v) => setIdentifiers(v)} />
          </div>
        </div>
      </TabPane>
      <TabPane tab={<span>Field Maps</span>} itemKey="2">
        <div style={{ padding: '0 24px' }}>
          <div className="tip">Default map rule between sql field type and go struct field type </div>
          <CodeMirror value={fieldMapsJson} onChange={(v) => setFieldMapsJson(v)} extensions={[json()]} height="100%" />
        </div>
      </TabPane>
    </Tabs>
  )

  return (
    <Modal
      title="Options"
      visible={isShow}
      centered
      onOk={() => {
        if (onConfirm) {
          onConfirm(identifiers, JSON.parse(fieldMapsJson))
        }
      }}
      onCancel={() => {
        if (onCancel) {
          onCancel()
        }
      }}
      bodyStyle={{ overflow: 'auto', height: 560 }}
      hasCancel={false}
      okText="Submit"
    >
      {optionEle}
    </Modal>
  )
}
