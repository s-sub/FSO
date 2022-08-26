/* eslint-disable react/jsx-key */
import Part from './Part'
import CoursePart from "../types";


const Content = ({courseList}: {courseList: Array<CoursePart>}) => {
    if (courseList.length === 0) {
        return <p>No courses</p>
    }
    return (
        <div>
            {courseList.map((courseX: CoursePart) => <Part course={courseX}/>)}
        </div>
    )
}

export default Content


