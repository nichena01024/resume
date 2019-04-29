import {ResumeState} from './store/types'
import {IEducationItem} from '../../dataTypes/IEducationItem'
import {IExperienceItem} from '../../dataTypes/IExperienceItem'
import * as React from 'react'
import {IRecordListItem, RecordList} from '../../components/RecordList'
import {connect} from 'react-redux'
import {setResumeData, updateResumeData} from './store/actions'
import {AppState} from '../../store'
import {Section} from '../../components/Section'
import {IPersonalInformation} from '../../dataTypes/IPersonalInformation'
import {ResumeHeader} from '../../components/ResumeHeader'
import {ISkillItem} from '../../dataTypes/ISkillItem'
import {PlainList} from '../../components/PlainList'
import {IProjectItem} from '../../dataTypes/IProjectItem'
const style = require('./style.css')

interface IResumeContainerProps {
    education: IEducationItem[],
    experience: IExperienceItem[],
    personalInformation: IPersonalInformation,
    skill: ISkillItem[],
    projects: IProjectItem[],
    isEditable: boolean,
    updateResumeData: typeof updateResumeData,
    setResumeData: typeof setResumeData
}


class ResumeContainer extends React.Component<IResumeContainerProps> {
    componentDidMount(): void {
        this.props.updateResumeData()
    }

    render() {
        return (
            <article className={style.cn}>
                <React.Fragment>
                {
                    this.props.personalInformation.name ? (
                        <ResumeHeader
                            data={this.props.personalInformation}
                            submitChange={(newPI) => this.props.setResumeData('personalInformation', newPI)}
                            isEditable={true}
                        />
                    ) : ''
                }
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
                                submitChange={(newRecord) => this.props.setResumeData('education', newRecord.map(record => {
                                    return {
                                        schoolName: record.title,
                                        time: record.time,
                                        diploma: record.subTitle,
                                        description: record.description
                                    }
                                }))}
                                isEditable={true}
                            />
                        </Section>) : ''
                }
                {
                    this.props.skill ? (
                        <Section title={'专业技能'}>
                            <PlainList
                                data={this.props.skill}
                                submitChange={newRecord => this.props.setResumeData('skill', newRecord)}
                                isEditable={true}
                            />
                        </Section>) : ''
                }
                {
                    this.props.experience ? (
                        <Section title={'工作经历'}>
                            <RecordList
                                data={this.props.experience.map(item => {
                                    return {
                                        title: item.workplace,
                                        time: item.time,
                                        subTitle: item.job,
                                        description: item.description
                                    }
                                })}
                                submitChange={(newRecord) => this.props.setResumeData('experience', newRecord.map(record => {
                                    return {
                                        workplace: record.title,
                                        time: record.time,
                                        job: record.subTitle,
                                        description: record.description
                                    }
                                }))}
                                isEditable={true}/>
                        </Section>
                    ) : ''
                }
                {
                    this.props.projects ? (
                        <Section title={'项目经历'}>
                            <RecordList
                                data={this.props.projects.map(item => {
                                    return {
                                        title: item.workplace,
                                        time: item.time,
                                        subTitle: item.projectName,
                                        description: item.description
                                    }
                                })}
                                submitChange={(newRecord) => this.props.setResumeData('project', newRecord.map(record => {
                                    return {
                                        workplace: record.title,
                                        time: record.time,
                                        projectName: record.subTitle,
                                        description: record.description
                                    }
                                }))}
                                isEditable={true}/>
                        </Section>
                    ) : ''
                }
                </React.Fragment>
            </article>
        )
    }
}

const mapStateToProps = (state: ResumeState) => {
    return {
        education: state.education,
        experience: state.experience,
        skill: state.skill,
        isEditable: state.isEditable,
        personalInformation: state.personalInformation,
        projects: state.project,
    }
}

const Resume = connect(
    mapStateToProps,
    {updateResumeData, setResumeData}
)(ResumeContainer)

// @ts-ignore
Resume.load = (store) => {
    return store.dispatch(updateResumeData())
}

export { Resume }
