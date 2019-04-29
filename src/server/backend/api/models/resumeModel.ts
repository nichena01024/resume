import {Document, Model, model, Schema} from 'mongoose'
import {IResume} from '../../../../dataTypes/IResume'

export interface IResumeDocument extends IResume, Document {}

// interface of model
export interface IResumeModel extends Model<IResumeDocument> {
    findResume(
        name: string
    ): IResumeDocument,
    updateResume(
        section: string,
        data: any
    ): any
}

// define mongoose schema
export const ResumeSchema: Schema = new Schema({
    personalInformation: {
        name: String,
        phone: String,
        email: String,
        sideNotes: [String]
    },
    experience: [
        {
            workplace: String,
            time: String,
            job: String,
            description: Schema.Types.Mixed
        }
    ],
    skill: [
        {
            title: String,
            skills: [String]
        }
    ],
    project: [
        {
            workplace: String,
            time: String,
            projectName: String,
            description: Schema.Types.Mixed
        }
    ],
    education: [
        {
            schoolName: String,
            time: String,
            diploma: String,
            description: Schema.Types.Mixed
        }
    ]
})

ResumeSchema.statics.findResume = async function(name: string) {
    const result = this.findOne().exec()
}

ResumeSchema.statics.updateResume = async function(section: string, info: any) {
    const resume = await this.findOneAndUpdate({}).exec()
    resume[section] = info
    return await this.findOneAndUpdate({}, resume, {
        useFindAndModify: false
    }).exec()
}

export const Resume = model<IResumeDocument, IResumeModel>('resume', ResumeSchema)
