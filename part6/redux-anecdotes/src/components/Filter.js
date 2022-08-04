import { useDispatch } from 'react-redux'
import { newFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'


const Filter = (props) => {
    // const dispatch = useDispatch()
    const handleChange = (event) => {
        const content = event.target.value
        console.log(content)
        props.newFilter(content)
    //   dispatch(newFilter(content))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

  const mapDispatchToProps = {
    newFilter,
  }

  const ConnectedFilter = connect(
    null,
    mapDispatchToProps,
  )(Filter)
  
  export default ConnectedFilter