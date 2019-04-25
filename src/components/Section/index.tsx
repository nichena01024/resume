import * as React from 'react'
const style = require('./style.css')


interface ISectionProps{
    title: string,
}


export class Section<T> extends React.Component<ISectionProps> {
    render() {
        return (
            <section className={style.sectionWrapper}>
                <h1 className={style.header}>
                    {this.props.title}
                </h1>
                <div className={style.childrenWrapper}>
                    {this.props.children}
                </div>
            </section>
        )
    }
}

