import {ResumeState} from './store/types'
import {EducationItem} from '../../dataTypes/EducationItem'
import {ExperienceItem} from '../../dataTypes/ExperienceItem'
import * as React from 'react'
import {IRecordListItem, RecordList} from '../../components/RecordList'
import {connect} from 'react-redux'
import {updateResumeData} from './store/testAction'
import {AppState} from '../../store'
import {Section} from '../../components/Section'

interface IResumeContainerProps {
    education: EducationItem[],
    experience: ExperienceItem[],
    isEditable: boolean,
    updateResumeData: typeof updateResumeData
}


class ResumeContainer extends React.Component<IResumeContainerProps> {
    componentDidMount(): void {
            console.log('get resume data')
            this.props.updateResumeData()
    }

    render() {
        console.log(this.props)
        return (
            <React.Fragment>
                {
                    this.props.education ? (
                        <Section title={'教育背景'}>
                            <RecordList
                                data={this.props.education.map(item => {
                                    return {
                                        title: item.schoolName,
                                        time: item.time,
                                        subTitle: item.diploma,
                                        description: item.description
                                    }
                                })}
                                submitChange={console.log}
                                isEditable={this.props.isEditable}
                            />
                        </Section>) : ''
                }
                {
                    this.props.experience ? (
                        <Section title={'工作经历'}>
                            <RecordList data={this.props.experience.map(item => {
                                return {
                                    title: item.workplace,
                                    time: item.time,
                                    subTitle: item.job,
                                    description: item.description
                                }
                            })} submitChange={console.log}
                            isEditable={this.props.isEditable}/>
                        </Section>
                    ) : ''
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: ResumeState) => {
    return {
    education: state.educations,
    experience: state.experiences,
    isEditable: state.isEditable
}}

export const Resume = connect(
    mapStateToProps,
    { updateResumeData }
)(ResumeContainer)
