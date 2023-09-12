import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'

export const About = () => {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
    // react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div>This is About {a.state.name} reading in class {a.state.class}</div>
  )
}
