import * as React from 'react'
import ContentEditable from 'react-contenteditable'
import {cloneDeep} from 'lodash'

const style = require('./style.css')

interface IRecordListItem {
    title: string,
    time: string,
    subTitle: string,
    description: string | string[]
}

interface IRecordListProps {
    experience: IRecordListItem[],
    submitChange: (newExperience: IRecordListItem[]) => void
    isEnableChange?: boolean
}

interface IRecordListState {
    currentExperience: IRecordListItem[]
}

export class RecordList extends React.Component<IRecordListProps, IRecordListState> {
    constructor(props: Readonly<IRecordListProps>) {
        super(props)
        this.state = {
            currentExperience: props.experience
        }
    }

    handleChange = <T extends IRecordListItem, K extends keyof IRecordListItem>(expIndex: number, key: K, value: T[K]) => {
        console.log(expIndex, key, value)
        let result = cloneDeep<IRecordListItem[]>(this.state.currentExperience)
        result[expIndex][key] = value
        this.setState(() => {return {
            currentExperience: result
        }})
    }

    handleDescriptionItemChange = (expIndex: number, descriptionIndex: number, newDescription: string) => {
        let result = cloneDeep<IRecordListItem[]>(this.state.currentExperience)
        if(typeof result[expIndex].description === 'string') {
            throw new Error('type error')
        } else {
            let target = result[expIndex].description as string[]
            target[descriptionIndex] = newDescription
        }
        console.log(result)
        this.setState(() => {return {
            currentExperience: result
        }})
    }

    render() {
        console.log('rerender', this.state)
        return (
            <div className={style.experienceWrapper}>
                {
                    this.state.currentExperience.map((exp, expIndex) => (
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
            onBlur={() => this.props.submitChange(this.state.currentExperience)}
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
        />
    }
}
