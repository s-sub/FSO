interface courses {
    name: string,
    exerciseCount: number
  }

const Total = ({courseList}: {courseList: Array<courses>}) => {
    return (
        <p>
            Number of exercises{" "}
            {courseList.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
    )
}

export default Total