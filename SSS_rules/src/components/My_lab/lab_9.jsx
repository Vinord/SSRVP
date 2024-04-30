import react from 'react'
import {Button1} from './../Button1'
import renderer from "react-test-renderer"
test("Mybutton",() =>{
    let x=0
    const instance = renderer
    .create(<Button1 onPress={() => x++}/>)
    .getInstance()
    expect(instance.handlePress).toBeDefined()
    expect(x).toBe(0)
    instance.props.handlePress()
    expect(x).toBe(1)
})
