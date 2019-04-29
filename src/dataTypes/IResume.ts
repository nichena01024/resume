import {IPersonalInformation} from './IPersonalInformation'
import {IExperienceItem} from './IExperienceItem'
import {ISkillItem} from './ISkillItem'
import {IProjectItem} from './IProjectItem'
import {IEducationItem} from './IEducationItem'

export interface IResume {
    personalInformation: IPersonalInformation,
    experience: IExperienceItem[],
    skill: ISkillItem[],
    project: IProjectItem[],
    education: IEducationItem[]
}
