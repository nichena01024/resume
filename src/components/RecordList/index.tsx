import * as React from 'react'
import ContentEditable from 'react-contenteditable'
import {cloneDeep, isEqual} from 'lodash'

const style = require('./style.css')

export interface IRecordListItem {
    title: string,
    time: string,
    subTitle: string,
    description: string | string[]
}

interface IRecordListProps {
    record: IRecordListItem[],
    submitChange: (newRecord: IRecordListItem[]) => void
    isEnableChange?: boolean
}

interface IRecordListState {
    currentRecord: IRecordListItem[]
}

export class RecordList extends React.Component<IRecordListProps, IRecordListState> {
    constructor(props: Readonly<IRecordListProps>) {
        super(props)
        this.state = {
            currentRecord: props.record
        }
    }

    componentWillReceiveProps(nextProps: Readonly<IRecordListProps>, nextContext: any): void {
        this.setState({
            currentRecord: nextProps.record
        })
    }

    handleChange = <T extends IRecordListItem, K extends keyof IRecordListItem>(expIndex: number, key: K, value: T[K]) => {
        let result = cloneDeep<IRecordListItem[]>(this.state.currentRecord)
        result[expIndex][key] = value
        this.setState(() => {return {
            currentRecord: result
        }})
    }

    handleDescriptionItemChange = (expIndex: number, descriptionIndex: number, newDescription: string) => {
        let result = cloneDeep<IRecordListItem[]>(this.state.currentRecord)
        if(typeof result[expIndex].description === 'string') {
            throw new Error('type error')
        } else {
            let target = result[expIndex].description as string[]
            target[descriptionIndex] = newDescription
        }
        console.log(result)
        this.setState(() => {return {
            currentRecord: result
        }})
    }

    render() {
        console.log('rerender', this.state)
        return (
            <div className={style.experienceWrapper}>
                {
                    this.state.currentRecord.map((exp, expIndex) => (
                        <section key={`${expIndex}exp`} className={style.experienceItem}>
                            <header className={style.jobInfoContainer}>
                                {this.getContentEditable(exp.title, expIndex, 'h2', 'title', this.props.isEnableChange)}
                                {this.getContentEditable(exp.time, expIndex, 'div', 'time', this.props.isEnableChange)}
                                {this.getContentEditable(exp.subTitle, expIndex, 'h3', 'subTitle', this.props.isEnableChange)}
                            </header>
                            <article className={style.descriptionContainer}>
                                {
                                    Array.isArray(exp.description) ?
                                        <ul>
                                            {
                                                exp.description.map((d, i) => {
                                                        return this.getContentEditable(d, expIndex, 'li', 'description', this.props.isEnableChange, i)
                                                    }
                                                )
                                            }
                                        </ul>
                                        :
                                        this.getContentEditable(exp.description, expIndex, 'div', 'description', this.props.isEnableChange)
                                }

                            </article>
                        </section>
                    ))
                }
            </div>
        )
    }

    private getContentEditable = (value: string, expIndex: number, tagName: string, keyName: keyof IRecordListItem, isEnableChange: boolean, descriptionIndex?: number) => {
        return <ContentEditable
            html={value}
            onBlur={() => this.props.submitChange(this.state.currentRecord)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if(descriptionIndex || descriptionIndex === 0) {
                    this.handleDescriptionItemChange(expIndex, descriptionIndex, e.target.value)
                } else {
                this.handleChange(expIndex, keyName, e.target.value)
                }
            }}
            tagName={ tagName }
            key={descriptionIndex}
            disabled={!isEnableChange}
            className={isEnableChange ? style.editableContent : ''}
        />
    }
}

