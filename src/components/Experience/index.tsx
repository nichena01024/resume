import * as React from 'react'
const style = require('./style.css')
import ContentEditable from 'react-contenteditable'
import {cloneDeep} from 'lodash'

interface ExperienceDescription {
    workplace: string,
    time: string,
    job: string,
    description: string | string[]
}

interface IExperienceProps {
    experience: ExperienceDescription[],
    submitChange: (newExperience: ExperienceDescription[]) => void
    isEnableChange?: boolean
}

interface IExperienceState {
    currentExperience: ExperienceDescription[]
}

export class Experience extends React.Component<IExperienceProps, IExperienceState> {
    constructor(props: Readonly<IExperienceProps>) {
        super(props)
        this.state = {
            currentExperience: props.experience
        }
    }

    handleChange = <T extends ExperienceDescription, K extends keyof ExperienceDescription>(expIndex: number, key: K, value: T[K]) => {
        console.log(expIndex, key, value)
        let result = cloneDeep<ExperienceDescription[]>(this.state.currentExperience)
        result[expIndex][key] = value
        this.setState(() => {return {
            currentExperience: result
        }})
    }

    handleDescriptionItemChange = (expIndex: number, descriptionIndex: number, newDescription: string) => {
        let result = cloneDeep<ExperienceDescription[]>(this.state.currentExperience)
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
                                {this.getContentEditable(exp.workplace, expIndex, 'h2', 'workplace', this.props.isEnableChange)}
                                {this.getContentEditable(exp.time, expIndex, 'div', 'time', this.props.isEnableChange)}
                                {this.getContentEditable(exp.job, expIndex, 'h3', 'job', this.props.isEnableChange)}
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

    private getContentEditable = (value: string, expIndex: number, tagName: string, keyName: keyof ExperienceDescription, isEnableChange: boolean, descriptionIndex?: number) => {
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
