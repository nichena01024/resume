import {IResumeSectionProps} from '../../dataTypes/IResumeSectionProps'
import {ISkillItem} from '../../dataTypes/ISkillItem'
import * as React from 'react'
import {cloneDeep} from 'lodash'

export interface IPlainListProps extends IResumeSectionProps<ISkillItem[]> {}

interface IPlainListState {
    currentSkill: ISkillItem[]
}

export class PlainList extends React.Component<IPlainListProps, IPlainListState> {
    constructor(props: Readonly<IPlainListProps>) {
        super(props)
        this.state = {
            currentSkill: props.data
        }
    }

    componentWillReceiveProps(nextProps: Readonly<IPlainListProps>, nextContext: any): void {
        this.setState({
            currentSkill: nextProps.data
        })
    }

    handleChange = <T extends ISkillItem, K extends keyof ISkillItem>(expIndex: number, key: K, value: T[K]) => {
        let result = cloneDeep<ISkillItem[]>(this.state.currentSkill)
        result[expIndex][key] = value
        this.setState(() => {return {
            currentSkill: result
        }})
    }

    handleDescriptionItemChange = (expIndex: number, descriptionIndex: number, newDescription: string) => {
        let result = cloneDeep<ISkillItem[]>(this.state.currentSkill)
        let target = result[expIndex].skills
        target[descriptionIndex] = newDescription
        this.setState(() => {return {
            currentSkill: result
        }})
    }

    render() {
        return (
            <ul>
                {
                    this.state.currentSkill.map((skillSection, i) => (
                        <li key={`skillSection${i}`}>
                            {`${skillSection.title}: ${skillSection.skills.join(', ')}`}
                        </li>
                    ))
                }
            </ul>
        )
    }
}
