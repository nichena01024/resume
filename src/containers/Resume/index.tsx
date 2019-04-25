import {ResumeState} from './store/types'
import {EducationItem} from '../../dataTypes/EducationItem'
import {ExperienceItem} from '../../dataTypes/ExperienceItem'
import * as React from 'react'
import {IRecordListItem, RecordList} from '../../components/RecordList'
import {connect} from 'react-redux'
import {updateResumeData} from './store/testAction'
import {AppState} from '../../store'

interface IResumeContainerProps {
    education: EducationItem[],
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
        return this.props.education ? (<RecordList
            record={this.props.education.map(item => {
                return {
                    title: item.schoolName,
                    time: item.time,
                    subTitle: item.diploma,
                    description: item.description
                }
            })}
            submitChange={console.log}
            isEnableChange={this.props.isEditable}
        />) : ''
    }
}

const mapStateToProps = (state: ResumeState) => {
    return {
    education: state.educations,
    isEditable: state.isEditable
}}

export const Resume = connect(
    mapStateToProps,
    { updateResumeData }
)(ResumeContainer)
