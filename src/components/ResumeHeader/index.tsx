import {IResumeSectionProps} from '../../dataTypes/IResumeSectionProps'
import {IPersonalInformation} from '../../dataTypes/IPersonalInformation'
import * as React from 'react'
import {cloneDeep} from 'lodash'
import ContentEditable from 'react-contenteditable'
const style = require('./style.css')

interface IResumeHeaderProps extends IResumeSectionProps<IPersonalInformation> {}

interface IResumeHeaderState {
    currentPersonalInfo: IPersonalInformation
}

export class ResumeHeader extends React.Component<IResumeHeaderProps, IResumeHeaderState> {
    constructor(props: Readonly<IResumeHeaderProps>) {
        super(props)
        this.state = {
            currentPersonalInfo: props.data
        }
    }

    componentWillReceiveProps(nextProps: Readonly<IResumeHeaderProps>, nextContext: any): void {
        this.setState({
            currentPersonalInfo: nextProps.data
        })
    }

    handleChange = <T extends IPersonalInformation, K extends keyof IPersonalInformation>(key: K, value: T[K]) => {
        let result = cloneDeep<IPersonalInformation>(this.state.currentPersonalInfo)
        result[key] = value
        this.setState(() => {return {
            currentPersonalInfo: result
        }})
    }

    render() {
        return (
            <div className={style.resumeHeaderContainer}>
                <div className={style.sideNoteContainer}>
                    {
                        this.props.data.sideNotes
                            .filter((_, i) => i % 2 === 0)
                            .map((sn, i) => (
                                <div key={`sideNote${i}`}>{sn}</div>
                            ))
                    }
                </div>
                <div className={style.infoContainer}>
                    {this.getContentEditable(
                        this.state.currentPersonalInfo.name,
                        'h1',
                        'name',
                        this.props.isEditable)}
                    {this.getContentEditable(
                        this.state.currentPersonalInfo.phone,
                        'div',
                        'phone',
                        this.props.isEditable)}
                    {this.getContentEditable(
                        this.state.currentPersonalInfo.email,
                        'div',
                        'email',
                        this.props.isEditable)  }
                </div>
                <div className={style.sideNoteContainer}>
                    {
                        this.props.data.sideNotes
                            .filter((_, i) => i % 2 === 1)
                            .map((sn, i) => (
                                <div key={`sideNote${i}`}>{sn}</div>
                            ))
                    }
                </div>
            </div>
        )
    }

    private getContentEditable = (value: string, tagName: string, keyName: keyof IPersonalInformation, isEnableChange: boolean) => {
        return <ContentEditable
            html={value}
            onBlur={() => this.props.submitChange(this.state.currentPersonalInfo)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                this.handleChange(keyName, e.target.value)
            }}
            tagName={ tagName }
            disabled={!isEnableChange}
            className={isEnableChange ? style.editableContent : ''}
        />
    }
}
