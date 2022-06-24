import { Tabs, TabPane, TagInput, Button, Modal } from '@douyinfe/semi-ui';
import { OptionProps } from './type.d'
import CodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';

export default (props: OptionProps) => {
    const { isShow, specialIdentifiers, fieldMaps, onConfirm, onCancel } = props

    const [identifiers, setIdentifiers] = useState(specialIdentifiers)
    const [fieldMapsJson, setFieldMapsJson] = useState(JSON.stringify(fieldMaps, null, 4))

    const optionEle: JSX.Element = (
        <Tabs tabPosition="top" type="card">
            <TabPane
                tab={
                    <span>
                        Special Identifiers
                    </span>
                }
                itemKey="1"
            >
                <div style={{ padding: '0 24px' }}>
                    <p>Special identifiers those will be UpperCased when transfered to go struct fields</p>
                    <p style={{ lineHeight: 1.8 }}>
                        <TagInput
                            defaultValue={identifiers}
                            placeholder='input...'
                            onChange={v => setIdentifiers(v)}
                        />
                    </p>
                </div>
            </TabPane>
            <TabPane
                tab={
                    <span>
                        Fields Map
                    </span>
                }
                itemKey="2"
            >
                <div style={{ padding: '0 24px' }}>
                    <p>Default map rule between sql field type and go struct field type </p>
                    <CodeMirror
                        value={fieldMapsJson}
                        onChange={(v) => setFieldMapsJson(v)}
                        height="100%"
                    />
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