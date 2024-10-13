import Class from "../models/Class";



export const isClassExists = async (className: string): Promise<boolean> => {

    const classExists = await Class.findOne({name: className });
    return classExists ? true : false

}

export const createClass = (className: string) => {
    const classs = new Class({
        name: className
    })
    return classs.save();
}

