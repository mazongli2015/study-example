import { useCallback } from "react";

/**
 * 
 */
const Shape = (WrapperedComponent) => {
  const draw = useCallback(() => {
    throw new Error('you have to overwrite it');
  },[])
  return <WrapperedComponent draw={draw} />;
}


const Rectangle = (props) => {
  
  const draw = useCallback(() => {
    console.info('Shape: Rectangle');
  },[])

  return <p>This is a Rectangle component.</p>
}

const Circle = (props) => {
  const draw = useCallback(() => {
    console.info('Shape: Circle');
  },[props.draw])

  return <p>This is a Circle component.</p>
}

const ShapeDecorator = (props) => {

}

const RedShapeDecorator  = (props) => {

}